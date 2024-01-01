---
title: 'All you need to know about the NgRx Signals Store'
excerpt: 'In this article we explore how we can migrate a codebase using NgRx Store to the NgRx SignalStore'
coverImage: '/assets/blog/ngrx-signals-store/ngrx-signals-store.png'
date: '2024-01-08T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo-2.jpg'
ogImage:
  url: '/assets/blog/ngrx-signals-store/ngrx-signals-store.png'
---

# Introduction

When the Angular team introduced the signals implementation, I started thinking about what a nice solution for the state management of signals would look like. Having worked for many years in big and small projects with NgRx, I had the hope that the solution that would emerge would be just a very thin layer on top of Angular signals that would give the necessary tools to work with them in your project in a structured and scalable way. Having worked with [Pinia](https://pinia.vuejs.org/), the official state management solution for Vue.js, I really liked its simplicity and modularity. Pinia has only a few core concepts and a very small API which makes it super easy to start working with. So, I was positively surprised when I saw the [NgRx SignalStore RFC](https://github.com/ngrx/platform/discussions/3796) from the NgRx team some months ago because its logic is very similar to Pinia. After some months of development and discussions with the community, the stable version of the NgRx Signals Store package was officially released. The final result made me very happy and enthusiastic so let's explore it together in the next sections:

# Overview of the NgRx Signals Store

The new NgRx Signals Store is an all-in-one functional state management solution for Angular Signals.

![ngrx signals structure](/assets/blog/ngrx-signals-store/ngrx-signals-structure.png)

As you can see in the above diagram, the API for the Signals Store is quite small. You can create a store using the `signalStore` function. You can handle simple pieces of state using the `signalState`. You can extend the core functionality with custom features. You can integrate RxJS using the `rxMethod` and you can manage entities using the `withEntities` feature. And that's it. If you need extra functionality it's super simple to extend it with custom features (we're going to explore them in one of the next sections).

The simplest example of a store is:

```ts
import { signalStore, withState } from '@ngrx/signals';

export const HelloStore = signalStore(
  withState({ firstName: 'John', lastName: 'Doe' })
);
```

and this can be used in the components like this: 

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HelloStore } from './hello.store';

@Component({
  selector: 'app-hello',
  standalone: true,
  template: `
    <h1>Hello {{ helloStore.firstName() }}!</h1>
  `,
  providers: [HelloStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HelloComponent {
  readonly helloStore = inject(HelloStore);
}
```

After this example, you might wonder why the NgRx team decided to follow a more functional approach in comparison to the class-based approach they used for the ComponentStore for example. A few months ago, in the NgRx repo there was an [RFC](https://github.com/ngrx/platform/discussions/3769) about a new way to create custom NgRx ComponentStore without using a "class-based" approach but using a function instead. This explains their decision to follow a functional approach for the new NgRx Signals Store. 

> - There are several community ComponentStore plugins - ImmerComponentStore, EntityComponentStore, etc. However, in JS/TS, a class can only extend one class by default and without additional hacks. What if we want to create a ComponentStore that reuses entity features but also has immer updaters? 🤔 With the createComponentStore function, I see the possibility of combining reusable features in a more flexible way.
> - Easier scaling into multiple functions if needed. (See the "Scaling" section above)
> - With the "class-based" approach, ComponentStores that use onStoreInit and/or onStateInit hooks must be provided by using the provideComponentStore function. This won't be necessary with the createComponentStore function.

Indeed, as we will see in the next sections, it's super easy to extend the functionality of the new NgRx Signals Store with custom features, to compose features and to split the code. Also something that is not mentioned in the above RFC is that the code is more tree-shakeable.

# How the NgRx Signals Store works

#### signalStore

Conceptually the `signalStore` function is similar to the RxJS `pipe` function. The `pipe` function takes pipeable operators as arguments, it will first perform the logic of the first pipeable operator and then use that value to perform the logic of the next pipeable operator, and so on. In this way, we define the behavior of a stream. In the same way, the `signalStore` function takes `store feature functions` (`SignalStoreFeature`) as an argument, it will first perform the logic of the first ` store feature function` and then use that value to perform the logic of the next feature function and so on. In this way, we define the intended behavior of our store.

```ts
import { computed } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';

export const HelloStore = signalStore(
  withState({ firstName: 'John', lastName: 'Doe' }),
  withComputed(({ firstName, lastName }) => ({
    name: computed(() => `${firstName()} ${lastName()}`),
  }))
);
```

Let's explore what happens internally when we call the `signalStore` function. The first thing that happens is that an `injectable service` will be created. This service is what the signalStore function returns back. Depending on the configuation we have provided, Angular will provide the service in the root injector making it available throughout the application (global state) or we will have to provide it in a specific component (local state).

![ngrx signals store injectable](/assets/blog/ngrx-signals-store/signal-store-injectable.png)

In the constructor of the created class, the store features we have provided will be start executed one by one in the order we have provided them. The order of the features depends on the functionality you want to be provided from the previous feature to the next one. For example, if you want to use a method you have declared in the `withMethods` feature in the `withHooks` method, you need to add `withMethods` first in the order. 

![ngrx signals store features execution](/assets/blog/ngrx-signals-store/features-execution-2.png)

There are 4 core features provided to us from NgRx. Let's explore what each one of them does: 

#### 
We use the `withState` feature to define the shape and the value of our state in the store. For example we could define the value of a `UserStore` like this:

```ts
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({
    user: {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      address: {
        id: 1,
        country: 'UK',
      },
    },
    settings: {
      allowAutoSync: false,
    },
  })
);
```

The `withState` function will create a deep signal for us. That means that we can access in our components and we can use generally in our code any property of the state as we would do for any other signal. For example for the above store, we can display the country of the user like this:

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.store';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `
    <h1>Country: {{ userStore.user.address.country() }}!</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {
  readonly userStore = inject(UserStore);
}
```

Because internally the `withState` feature function uses a `Proxy` to create the deep signal, the signal for every property (which in reality is a `computed`) will be created lazily, only when we try to access the propery. This improves the overall performance in cases where we only need to observe a small subset of the object's(state) properties. Also if the nested signal has already been accessed(created), it won't be created again.

As we saw earlier the features are called based on the order we have placed them when we call the `signalStore` function. Each one of them is a factory function which returns a function which internally will be called with the store as an argument as it is defined until the point of its execution. That mean that if the store contains already a method or a state slice or a computed entry with the same key as the keys of the state we define with the `withState` feature, the latter will override previously defined state slices, computed, and methods with the same name as you can see in the following diagram. Because unintentional overriding might lead to issues which are difficult to be detected, the NgRx team might improve soon the DX by showing a warning or an error when this happens (follow up on this open [issue](https://github.com/ngrx/platform/issues/4144)).

![ngrx signals store features execution](/assets/blog/ngrx-signals-store/with-state-remove-same-keys-2.png)

#### withMethods

The withMethods feature enable us to add methods in our store. This can be the public API of our store. Inside these methods, we can update our state using the `patchState` utility function or we can integrate RxJS using the `rxMethod`, or you can add any other logic you want to perform in this method. In the same manner as with the `withState`, it will override previously defined state slices and computed properties with the same name. 

Examples of `withMethods` usage:

```ts
export const HelloStore = signalStore(
  withState({ firstName: 'John', lastName: 'Doe' }),
  withMethods((store) => ({
    changeFirstName(firstName: string) {
      patchState(store, { firstName });
    },
  })),
);
```

```ts
export const ArticleStore = signalStore(
  { providedIn: 'root' },
  withState<ArticleState>(articleInitialState),
  withMethods(
    (
      store,
      articlesService = inject(ArticlesService),
      actionsService = inject(ActionsService),
      router = inject(Router),
    ) => ({
      getArticle: rxMethod<string>(
        pipe(
          switchMap((slug) =>
            articlesService.getArticle(slug).pipe(
              tapResponse({
                next: ({ article }) => {
                  patchState(store, { data: article });
                },
                error: () => {
                  patchState(store, { data: articleInitialState.data });
                },
              }),
            ),
          ),
        ),
      ),
  ...
  ...
```
***You can find the full implementation of the above store [here](https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/blob/main/libs/articles/data-access/src/lib/article.store.ts)***


#### patchState

The patchState utility function provides a type-safe way to perform immutable updates on pieces of state. Due to a recent change to the default equality check function in signals in Angular 17.0.0-next.8 release, it is important to make sure that we update the values of the nested signals of our state in an immutable way. That's because in the new default equality check of the Angular signals, objects are checked by reference. So if you return the same object, just mutated, your signal will not send a notification that is updated. The `patchState` function helps us with this.

#### withComputed

Using the `withComputed` feature we can specify in our store derived state, thus state which is calculated based on one or more slices of our state. In the same manner as with the `withState` and the `withMethods` features, it will override previously defined state slices and methods with the same name.

Examples of `withComputed` usage:

```ts
export const HelloStore = signalStore(
  { providedIn: 'root' },
  withState({ firstName: 'John', lastName: 'Doe' }),
  withComputed(({ firstName }, articlesService = inject(AddressStore)) => ({
    name: computed(() => firstName().toUpperCase()),
    nameAndAddress: computed(
      () => `${firstName().toUpperCase()} ${articlesService.address()}`
    ),
  })),
  ...
  ...
```

#### withHooks

In case we want to perform specific actions when the store is created or destroyed like calling one of the methods we have defined previously in the `withMethods` feature or performing some clean-up logic, we can use the `withHooks` feature. The lifecycle methods also have access to the injection context for automatic cleanup using the takeUntilDestroyed() function from Angular.

Example of `withHooks` usage:

```ts
export const HelloStore = signalStore(
  withState({ firstName: 'John', lastName: 'Doe' }),
  withComputed(({ firstName }, articlesService = inject(AddressStore)) => ({
    name: computed(() => firstName().toUpperCase()),
    nameAndAddress: computed(
      () => `${firstName().toUpperCase()} ${articlesService.address()}`
    ),
  })),
  withMethods((store) => ({
    changeFirstName(firstName: string) {
      patchState(store, { firstName });
    },
  })),
  withHooks({
    onInit({ changeFirstName }) {
      changeFirstName('Nick');
    },
    onDestroy({ firstName }) {
      console.log('firstName on destroy', firstName());
    },
  })
);
```

### Customs features

### RxMethod
will throw an error when used out of the injection context.

### Conclusion

If you already use NgRx in a project, I would suggest to start working with the NgRx Signals Store for new state. You can easily combine the NgRx Store and the NgRx Signals Store ([example](https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/blob/main/libs/articles/data-access/src/lib/article.store.ts#L121)). For a new project I would strongly suggest to start working directly with the NgRx Signals Store for the state management, since it can reduce dramatically the boilerplate and of course it has full support for working with Angular Signals in a structured way.


part 2: WithEntities feature/Testing

> **_Bibliography_**
> 
> \[1\]:RFC: NgRx SignalStore [https://github.com/ngrx/platform/discussions/3796](https://github.com/ngrx/platform/discussions/3796)
>
> \[2\]:Signals Store docs [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
>
> \[3\]:RFC: Add createComponentStore Function [https://github.com/ngrx/platform/discussions/3769](https://github.com/ngrx/platform/discussions/3769)
