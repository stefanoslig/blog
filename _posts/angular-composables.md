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

*Composables is not a new idea. It's a concept coming from `Vue.js`. A lot of the examples and ideas I use in this blog come directly from [Vue.js Composables](https://vuejs.org/guide/reusability/composables.html) docs.*

In version 16.0.0-next.0 the Angular team introduced a very first implementation of `Signals` which is a reactive primitive which can offer fine-grained reactivity in Angular. With such big changes like a new reactive primitive, considering also other very useful features the Angular team has introduced in the latest versions like the [inject](https://angular.io/api/core/testing/inject) function or the concept of [DestroyRef](https://next.angular.io/api/core/DestroyRef), it's anavoidable that new patterns will emerge. 

This article is an attempt to explore and give a name to something that maybe some of you have already thought. A new concept that can emerge out of the introduction of `Signals`. As I mentioned already, this is not a new concept. It's already used and tested in other framewroks like `Vue.js`. Let's explore it in the next paragraphs, in the context of Angular this time.

### What is a "Composable"?

A "composable" in the context of an Angular application is a function which encapsulates stateful logic using the Signal's API. The composables can be re-used in multiple components, can be nested within each other and they can help us to organize the stateful logic of our components into small, flexible and simpler units.

In the same way, we create util functions in order to reuse stateless logic across our components, we create  composables to share stateful logic. You can check some if the use cases [here](https://vueuse.org/functions.html).   

But let's see how a composable would look like in an Angular application (in the following examples I don't use the API which is proposed in the RFC for Angular Signals). When this API is in place (e.g [Application rendering lifecycle hooks, Signal-based queries](https://github.com/angular/angular/discussions/49682)) we will be able to write very useful composables for every Angular app.

But let's start with a very simple exaple.

### Mouse Tracker Example

In an Angular component using Signals, the mouse tracking functionality would look like this:

```ts
@Component({
  standalone: true,
  template: ` {{ x() }} {{ y() }} `,
})
export class MouseTrackerComponent implements AfterViewInit, OnDestroy {
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
export class MouseTrackerComponent {
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

The next example is a data fetching composable. When we do an HTTP request, we need to describe different states of this request in our components (e.g Loading, Error, Success). We might also want to re-fetch automatically the data, when one parameter in the url changes. We don't want to replicate the logic for the different states or the logic for the re-fetch on every component. We can extract this logic to a composable as you can see in the following snippet.

```ts
export function useFetch<D>(url: Signal<string>) {
  const data = signal<D | null>(null);
  const error = signal<Error | null>(null);

  async function doFetch() {
    const urlValue = url();

    try {
      // artificial delay / random error
      await timeout();

      const res = await fetch(urlValue);
      data.set(await res.json());
      error.set(null);
    } catch (e) {
      data.set(null);
      error.set(e as Error);
    }
  }

  effect(doFetch);

  return { data, error, retry: doFetch };
}
```

Which can be used in the component like this:

```ts
@Component({
  standalone: true,
  template: `
    ...
      <p>Oops! Error encountered: {{ fetch.error()?.message }}</p>
      <button (click)="fetch.retry()">Retry</button>
    ...
  `,
  imports: [NgFor, JsonPipe, NgIf],
})
export class UsersComponent {
  ...
  url = computed(() => baseUrl + this.id());

  fetch = useFetch(this.url);
}
```

### Sync LocalStorage Example

```ts
export function useLocalStorage(key: string) {
  // state encapsulated and managed by the composable
  const value = signal('');

  const onDestroy = () => {
    localStorage.setItem(key, JSON.stringify(value()));
    window.removeEventListener('storage', handler);
  };

  const serializedVal = localStorage.getItem(key);
  if (serializedVal !== null) {
    value.set(parseValue(serializedVal));
  }

  function handler(e: StorageEvent) {
    if (e.key === key) {
      const newValue = e.newValue ? parseValue(e.newValue) : null;
      value.set(newValue);
    }
  }

  window.addEventListener('storage', handler, true);

  // lifecycle to teardown side effects.
  inject(DestroyRef).onDestroy(onDestroy);
  window.onbeforeunload = onDestroy;

  // expose managed state as return value
  return { value };
}
```

Which can be used in the component like this:

```ts
@Component({
  standalone: true,
  template: `
    <button (click)="useTheme('Dark')">Use dark theme</button>
    <button (click)="useTheme('Light')">Use light theme</button>

    <p>Stored used: {{ storage.value() }}</p>
  `,
})
export class LocalStorageComponent {
  storage = useLocalStorage('theme');

  useTheme(theme: 'Dark' | 'Light') {
    this.storage.value.set(theme)
  }
}
```

### Why not exposing the same logic in a service?

// Some ideas to elaborate on...
- Tent to become complex files including the logic for too many different things. 
- Easier re-used, more flexible, nested to each other (enable us to compose complex logic using small, isolated units, similar to how we compose an entire application using components.)
- Require more boilerplate
- Require more in-depth knowledge of Angular features (Injectable/providers)


Notes:

/**
//https://github.com/angular/angular/blob/2703fd626040c5e65401ebd776404a3b9e284724/packages/core/src/signals/README.md

ReactiveNodes keep track of dependency ReactiveEdges to each other. Producers are aware of which consumers depend on their value, while consumers are aware of all of the producers on which they depend. These references are always bidirectional.

A major design feature of Angular Signals is that dependency edges (ReactiveEdges) are tracked using weak references (WeakRef). At any point, it's possible that a consumer node may go out of scope and be garbage collected, even if it is still referenced by a producer node (or vice versa). This removes the need for explicit cleanup operations that would remove these dependency edges for signals going "out of scope". Lifecycle management of signals is greatly simplified as a result, and there is no chance of memory leaks due to the dependency tracking.
 */

 /** 
Yes! You can create and read signals in components, services, regular functions, top-level JS module code - anywhere you might need a reactive primitive. We see this as a huge benefit of signals - reactivity is not exclusively contained within components. Signals empower you to model data flow without being constrained by the visual hierarchy of a page
*/ 
