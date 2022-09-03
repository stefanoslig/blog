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

In this article we're going to see how we can use the [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) to synchronize the app state across iframes. Our use case which I'm going to describe in the next paragraph includes iframes, however the synchronization can happen between any [Browsing context](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context) (tabs, windows, frames).

### Our use case

One of the projects we build in my company is an add-in for Outlook on the web. With this add-in we help people to work more securely in their Office 365 mail environment and we prevent data leaks through encryption and contextual, machine-learning powered business rules. 

Our add-in is an Angular application using NgRx for it's global state management. Because of the way that Office 365 manages the add-ins, there are scenarios where 3 or even more instances of the same app can run in parallel in different iframes. In the picture below you can see a scenario like this. 

![iframes](/assets/blog/synchronizing-app-state-across-iframes/iframes-owa.png)

It might be already obvious that when you have 3 instances of the same app running in different iframes at the same moment, there is a need for communication between them. There are different approaches someone can take in order to achieve this communication. The simplest one is to store the information he wants to share in the local storage. Then this information is available to each one of the running instances. The problem with this approach is that when you use a redux based solution to store the global state of your app (we use NgRx), then you have two places where you save the same information. One is the local storage and the other one the NgRx store. Apart from breaking the single source of truth architecture of our app, we have the extra burden of keeping the NgRx store in sync with the local storage. 

So what if instead of sharing infrormation between all the running instances of the app using the local storage we could just keep in sync the NgRx store between them? In the next paragraphs I'm going to show you how we can keep in sync the NgRx store between multiple instances of the app running in iframes using the Broadcast Channel API. For this we're going to use the following example app.



