---
title: 'Migrating from class-based guards and resolvers to functional'
excerpt: 'TBD'
coverImage: '/assets/blog/class-guards-to-functional/class-guards-to-functional.png'
date: '2023-05-21T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo.jpeg'
ogImage:
  url: '/assets/blog/class-guards-to-functional/class-guards-to-functional.png'
---

In version [15.2.0](https://github.com/angular/angular/blob/main/CHANGELOG.md#1520-2023-02-22) the Class and InjectionToken guards and resolvers marked as deprecated. If you migrate to v16.0.0 you will notice that the `CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Resolve` interfaces will be removed automatically from your guards and resolvers as you can see in the following snippet.

```diff
-import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
+import { ActivatedRouteSnapshot } from "@angular/router";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { Observable } from "rxjs";
import { inject } from "@angular/core";

-export class HeroResolver implements Resolve<Hero> {
+export class HeroResolver  {
  resolve(route: ActivatedRouteSnapshot): Observable<Hero> {
    return inject(HeroService).getHero(route.params["id"]!);
  }
}
```

The reasons why the Angular team decided to deprecate the class-based resolvers and guards are explained in [this PR](https://github.com/angular/angular/pull/47924#issue-1430181322). This decision has triggered a lot of concerned comments in the community (you can find some [here](https://github.com/angular/angular/pull/47924) and [here](https://github.com/angular/angular/issues/50234)). The Angular team still tries to make more clear the reasons. Minko Gechev, the product lead of Angular, volunteered even to schedule a call with people form the community who have concerns in order to discuss functional router guards vs classe-based guards, etc.

Some of the arguments from the Angular team in favor of the functional guards and resolvers are: 

> Class and InjectionToken-based guards and resolvers are not as configurable are less re-usable, require more boilerplate, cannot be defined inline with the route, and require more in-depth knowledge of Angular features (Injectable/providers). In short, they're less powerful and more cumbersome.

On the other hand, some people from the Angular community consider the functional guards and resolvers as an anti-pattern. They see that this transition will lead to an increased usage of the `inject` function and they believe that without the constructor injection the dependencies are hidden in the body of the function. 

In my opinion both sides have some valid arguments. For example I also believe that it's easier to configure functional guards and resolvers but on the other hand I can imagine that their complexity might be increased due to the usage of a "hidden" DI using the inject function. In any case, I will post the outcome from the discussion with Minko as an update on this post. 

### Do I need to migrate to the functional approach?

Despite the fact that the Angular team shows a preference to the functional guards and resolvers, you can definitely use for the short and the long term class-based  

example with using the helper functions 

The Router types only support functional guards definitions. Classes can still be used as the underlying implementation of functional guards and resolvers but there will not be an interface requiring a specific structure for those classes.



> **_Bibliography_**
>
> \[1\]: [https://github.com/angular/angular/pull/48709](https://github.com/angular/angular/pull/48709) 
> 
> \[2\]: [https://github.com/angular/angular/pull/47924](https://github.com/angular/angular/pull/47924)
>
> \[3\]: [https://github.com/angular/angular/issues/50234](https://github.com/angular/angular/issues/50234)
> 
> \[4\]: [https://github.com/angular/angular/pull/49337](https://github.com/angular/angular/pull/49337) 
>
> \[5\]: [https://github.com/angular/angular/pull/49338](https://github.com/angular/angular/pull/49338)  


