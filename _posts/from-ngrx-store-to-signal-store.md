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

When the Angular team introduced the signals implementation, I started thinking what a nice solution for the state management of signals would look like. Having worked for many years in big and small projects with NgRx, I had the hope that the solution that would emerge would be a very thin layer on top of Angular signals that would give the necessary tools to work with them in your project in a structured and scalable way. Having worked with [Pinia](https://pinia.vuejs.org/), a state management solution for Vue.js, I really liked its simplicity and modularity. Pinia has only a few core concepts and a very small API which make it super easy to start working with. So, I was positively surprised  when I saw the [NgRx SignalStore RFC](https://github.com/ngrx/platform/discussions/3796) from the NgRx team some months ago. After some months of disucssions with the community, the stable version of the NgRx Signals Store package was officially released. The final result made me very happy and entuousiastic so let's explore it together in the next sections:

# Overview of the NgRx Signals Store

The new NgRx Signals Store is an all-in-one functional state managment solution for Angular Signals. 


![ngrx signals structure](/assets/blog/ngrx-signals-structure/ngrx-signals-structure.png)

As you can see in the above diagram, the API for the Signals Store is quite small. You can create a Store using the `signalStore` function. In this store you can add specific behaviour using the core features (withState, withMethods, withHooks, withComputed) which we're going to explain later and you can add your own custom features. There is also a core feature specificaly for handling entities. The simplest example of a store is:

import { signalStore, withState } from '@ngrx/signals';

```ts
export const CounterStore = signalStore(
  withState({ count: 0 })
);
```

and this can be used in the component like this: 

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CounterStore } from './counter.store';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Count: {{ store.count() }}</p>
    <p>Double Count: {{ store.doubleCount() }}</p>

    <button (click)="store.increment()">Increment</button>
    <button (click)="store.decrement()">Decrement</button>
  `,
  providers: [CounterStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CounterComponent {
  readonly store = inject(CounterStore);
}
```

A few months ago, in the NgRx repo there was an [RFC](https://github.com/ngrx/platform/discussions/3769) about a new way to create custom NgRx ComponentStore without using a "class-based" approach but using a function instead. This explains the decision to follow a functional approach for the new NgRx Signals Store. 

> * There are several community ComponentStore plugins - ImmerComponentStore, EntityComponentStore, etc. However, in JS/TS, a class can only extend one class by default and without additional hacks. What if we want to create a ComponentStore that reuses entity features but also has immer updaters? 🤔 With the createComponentStore function, I see the possibility of combining reusable features in a more flexible way.
> * Easier scaling into multiple functions if needed. (See the "Scaling" section above)
> * With the "class-based" approach, ComponentStores that use onStoreInit and/or onStateInit hooks must be provided by using the provideComponentStore function. This won't be necessary with the createComponentStore function.

Indeed, as we will see in the next sections, it's super easy to extend the functionality of the new NgRx Signals Store with custom features, to compose features and to split the code. Also something that is not mentioned in the above RFC is that the code is more tree-shakeable.

# How the NgRx Signals Store works

#### signalStore

Conceptually the `signalStore` function is similar to the RxJS `pipe` function. The `pipe` function takes pipeable operators as argument, it will first perform the logic of the first pipeable operator and then use that value to perform the logic of the next pipeable operator and so on. In this way we define the behaviour of a stream. In the same way, the `signalStore` function takes `store feature functions` (`SignalStoreFeature`) as argument, it will first perform the logic of the first ` store feature function` and then use that value to perform the logic of the next feature function and so on. In this way we define the intented behaviour of our store.

```ts
import { computed } from '@angular/core';
import { signalStore, patchState, withComputed } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withComputed(({ count }) => ({
    doubleCount: computed(() => count() * 2),
  })),
);
```

> **_Bibliography_**
> 
> \[1\]:RFC: NgRx SignalStore [https://github.com/ngrx/platform/discussions/3796](https://github.com/ngrx/platform/discussions/3796)
>
> \[2\]:Signals Store docs [https://ngrx.io/guide/signals/signal-store](https://ngrx.io/guide/signals/signal-store)
>
> \[3\]:RFC: Add createComponentStore Function [https://github.com/ngrx/platform/discussions/3769](https://github.com/ngrx/platform/discussions/3769)
