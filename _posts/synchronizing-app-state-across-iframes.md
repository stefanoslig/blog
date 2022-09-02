---
title: 'Synchronizing app state across iframes using NgRx and the Broadcast Channel API'
excerpt: ''
coverImage: '/assets/blog/synchronizing-app-state-across-iframes/main-photo.jpeg'
date: '2022-09-14T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo.jpeg'
ogImage:
  url: '/assets/blog/synchronizing-app-state-across-iframes/main-photo.jpeg'
---

In this article we're going to see how we can use the [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) to synchronize the app state across iframes. Our use case which I'm going to describe in the next paragraph includes iframes, however the synchronization can happen between any (Browsing_context)[https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context] (tabs, windows, frames).

### Our use case

One of the projects we build in my company is an add-in for Outllook on the web. With this add-in we help people to work more securely in their Office 365 mail environment and we prevent data leaks through encryption and contextual, machine-learning powered business rules. 

Our add-in is an Angular application using NgRx for it's global state management. Because of the way that Office 365 manages the add-ins there are scenarios where even 4 (maybe more) instances of the same app might run in parallel in different iframes. In the picture below you can see a scenario like this. 

