---
title: 'All you need to know about the NgRx Signals Store'
excerpt: 'In this article we explore how we can migrate a codebase using NgRx Store to the NgRx SignalStore'
coverImage: '/assets/blog/angular-composables/angular-composables-4.jpg'
date: '2024-01-01T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo-2.jpg'
ogImage:
  url: '/assets/blog/angular-composables/angular-composables-4.jpg'
---

# Introduction

When the Angular team introduced the signals implementation, I started thinking about what a nice solution for the state management of signals would look like. Having worked for many years in big and small projects with NgRx, I had the hope that the solution that would emerge would be just a very thin layer on top of Angular signals that would give the necessary tools to work with them in your project in a structured and scalable way. Having worked with [Pinia](https://pinia.vuejs.org/), the official state management solution for Vue.js, I really liked its simplicity and modularity. Pinia has only a few core concepts and a very small API which makes it super easy to start working with. So, I was positively surprised when I saw the [NgRx SignalStore RFC](https://github.com/ngrx/platform/discussions/3796) from the NgRx team some months ago because its logic is very similar to Pinia. After some months of development and discussions with the community, the stable version of the NgRx Signals Store package was officially released. The final result made me very happy and enthusiastic so let's explore it together in the next sections:

# Overview of the NgRx Signals Store

The new NgRx Signals Store is an all-in-one functional state management solution for Angular Signals.

![ngrx signals structure](/assets/blog/ngrx-signals-structure/ngrx-signals-structure.png)

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

After this example, you might wonder why the NgRx team decided to follow a more functional approach in comparison to the class-based approach they used for the ComponentStore for example. A few months ago, in the NgRx repo there was an [RFC](https://github.com/ngrx/platform/discussions/3769) about a new way to create custom NgRx ComponentStore without using a "class-based" approach but using a function instead. This explains the decision to follow a functional approach for the new NgRx Signals Store. 

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

![ngrx signals store injectable](/assets/blog/ngrx-signals-structure/signal-store-injectable.png)

In the constructor of the created class, the store features we have provided will be start executed one by one in the order we have provided them. The order of the features depends on the functionality you want to be provided from the previous feature to the next one. For example, if you want to use a method you have declared in the `withMethods` feature in the `withHooks` method, you need to add `withMethods` first in the order. 

![ngrx signals store features execution](/assets/blog/ngrx-signals-structure/features-execution-2.png)

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

The `withState` function will create a deep signal for us. That means that we can access in our components and we can use generally in our code any property of the state as we would do for any other signal. For example for the above store, we can dispay the country of the user like this:

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

Because internally the `withState` feature function uses a `Proxy` to create the deep signal, the signal for every property (which in reality is a `computed`) will be created lazily, only when we try to access the propery. This improves the overall performance in cases where you only need to observe a small subset of the object's(state) properties. Also if the nested signal has already beem accessed(created), won't be created again.

As we saw earlier the features are called based on the order we have placed them when we call the `signalStore` function. Each one of them is a factory function which returns a function which internally will be called with the store as an argument as it is defined until the point of its execution. That mean that if the store contains already a method or a state slice or a computed entry with the same key as the keys of the state we define with the `withState` feature, the latter will override previously defined state slices, computed, and methods with the same name as you can see in the following diagram.


![ngrx signals store features execution](/assets/blog/ngrx-signals-structure/with-state-remove-same-keys.png)

#### withMethods

#### withComputed

#### withHooks

### Testing


> **_Bibliography_**
> 
> \[1\]:RFC: NgRx SignalStore [https://github.com/ngrx/platform/discussions/3796](https://github.com/ngrx/platform/discussions/3796)
>
> \[2\]:Signals Store docs [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
>
> \[3\]:RFC: Add createComponentStore Function [https://github.com/ngrx/platform/discussions/3769](https://github.com/ngrx/platform/discussions/3769)
