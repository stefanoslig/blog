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


### Conventions and Best Practices

### Why not using services?

https://github.com/stefanoslig/angular-composables-demo