---
title: 'Angular Composables'
excerpt: 'TBD'
coverImage: '/assets/blog/angular-composables/angular-composables-4.jpg'
date: '2023-05-01T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo.jpeg'
ogImage:
  url: '/assets/blog/angular-composables/angular-composables-4.jpg'
---

### Introduction

In version 16.0.0-next.0 the Angular team introduced a very first implementation of `Signals` which is a reactive primitive which can offer fine-grained reactivity in Angular. With such big changes like a new reactive primitive, considering also other very useful features the Angular team has introduced in the latest versions like the [inject](https://angular.io/api/core/testing/inject) function or the concept of [DestroyRef](https://next.angular.io/api/core/DestroyRef), it's anavoidable that new patterns will emerge. 

This article is an attempt to explore and give a name to something that maybe a lot of you have already thought. A new pattern that can emerge out of the introduction of `Signals`. This is not a new concept. It's already used and tested in other framewroks like `Vue.js`. Let's explore it in the next paragraphs, in the context of Angular this time.

### What is a "Composable"?

*** I'm copying this section and the example from Vue's docs since it's very well written there ***

In the context of Angular applications, a "composable" is a function that leverages Angular's Signals API to encapsulate and reuse **stateful logic**. 

When building frontend applications, we often need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example lodash and date-fns, which you may have heard of.

By contrast, stateful logic involves managing state that changes over time. A simple example would be tracking the current position of the mouse on a page. In real-world scenarios, it could also be more complex logic such as touch gestures or connection status to a database.

### Mouse Tracker Example

In an Angular component using Signals, the mouse tracking functionality would look like this:

```ts
@Component({
  standalone: true,
  template: ` {{ x() }} {{ y() }} `,
})
export class StudentsComponent implements AfterViewInit, OnDestroy {
  // injectables
  document = inject(DOCUMENT);

  // state encapsulated and managed by the composable
  x = signal(0);
  y = signal(0);

  ngAfterViewInit() {
    document.addEventListener('mousemove', this.update.bind(this));
  }

  // a composable can update its managed state over time.
  update(event: MouseEvent) {
    this.x.update(() => event.pageX);
    this.y.update(() => event.pageY);
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.update.bind(this));
  }
}
```

If we want to reuse this logic, we can extract it in a composable like this:

```ts
// mouse-tracker.ts file

export function useMouse() {
  // injectables
  const document = inject(DOCUMENT);

  // state encapsulated and managed by the composable
  const x = signal(0);
  const y = signal(0);

  // a composable can update its managed state over time.
  function update(event: MouseEvent) {
    x.update(() => event.pageX);
    y.update(() => event.pageY);
  }

  document.addEventListener('mousemove', update);

  // lifecycle to teardown side effects.
  inject(DestroyRef).onDestroy(() =>
    document.removeEventListener('mousemove', update)
  );

  // expose managed state as return value
  return { x, y };
}
``` 

And now it can be use in all the different components like this:

```ts
@Component({
  standalone: true,
  template: ` {{ mouse.x() }} {{ mouse.y() }} `,
})
export class StudentsComponent {
  mouse = useMouse();
}
```

What we simply did was to extract the logic we had in the component (and we want to reuse in other components) into an external function. Here are some conventions and best practices we follow:

#### Naming

It is a convention to name composable functions with camelCase names that start with "use".


#### Return Values

From this function we return the state we want to be exposed in the component. The state consists of one or more Signals which can be used in the template of our component or other computed properties or effects. In our example we initialized the `mouse` field with the `useMouse` composable which returns two signals.

#### Usage Restrictions

*** Because this function injects the `DOCUMENT` token using the `inject` function can only be used in construction context (i.e. in the of constructor, fields initialization) but not in the component's lifecycle hooks for example ***

Angular v16 has introduced a new provider called DestroyRef. DestroyRef lets you set callbacks to run for any cleanup or destruction behavior. The scope of this destruction depends on where DestroyRef is injected. This new feature fits perfectly with the Angular composables and gives us the power to perform clean up tasks (e.g removing the event listener like in our example , unsubscribe from subscriptions) in our components, when the Component or Directive that uses it is destroyed. 

### Async State Example



### Why not exposing the same logic in a service?

// Some ideas to elaborate on...
- Tent to become complex files including the logic for too many different things. 
- Easier re-used, nested to each other (enable us to compose complex logic using small, isolated units, similar to how we compose an entire application using components.)
- Require more boilerplate
- Require more in-depth knowledge of Angular features (Injectable/providers)


### What about testing?

1. Using Tetsbed
2. Mocked providers as default values in parameters



Notes:

/**
//https://github.com/angular/angular/blob/2703fd626040c5e65401ebd776404a3b9e284724/packages/core/src/signals/README.md

ReactiveNodes keep track of dependency ReactiveEdges to each other. Producers are aware of which consumers depend on their value, while consumers are aware of all of the producers on which they depend. These references are always bidirectional.

A major design feature of Angular Signals is that dependency edges (ReactiveEdges) are tracked using weak references (WeakRef). At any point, it's possible that a consumer node may go out of scope and be garbage collected, even if it is still referenced by a producer node (or vice versa). This removes the need for explicit cleanup operations that would remove these dependency edges for signals going "out of scope". Lifecycle management of signals is greatly simplified as a result, and there is no chance of memory leaks due to the dependency tracking.
 */

 /** 
Yes! You can create and read signals in components, services, regular functions, top-level JS module code - anywhere you might need a reactive primitive. We see this as a huge benefit of signals - reactivity is not exclusively contained within components. Signals empower you to model data flow without being constrained by the visual hierarchy of a page
*/ 
