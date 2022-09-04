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

It might be already obvious that when you have 3 instances of the same app running in different iframes at the same moment, there is a need for communication between them. There are different approaches someone can take in order to achieve this. The simplest one is to store the information he wants to share in the local storage. Then this information is available to each one of the running instances. The problem with this approach is that when you use a redux based solution to store the global state of your app (we use NgRx), then you have two places where you save the same information. One is the local storage and the other one the NgRx store. Apart from breaking the single source of truth architecture of our app, we have the extra burden of keeping the NgRx store in sync with the local storage. 

So what if instead of sharing infrormation between all the running instances of the app using the local storage we could just keep in sync the NgRx store between them? In the next paragraphs I'm going to show you how we can keep in sync the NgRx store between multiple instances of the app running in iframes using the Broadcast Channel API. 

### The solution in simple words

In applications using NgRx the only way to change the global state is through actions. Pure functions which we call reducers take the previous state and an action and they return the next state. Because of the fact that reducers are pure functions we can be sure that if we dispatch the same actions (actions without side effects) in the same order multiple times in an app, the value of the state will be the same every time. That also means that if we have two instances of the same app running in parallel and we dispatch in both the same actions, both of them will end up having the same state. So if we want to synchronize the state between two or three apps running in iframes, we need to make sure that the same actions will be dispatched to all of them. What if we had a way to share the dispatched actions from one app to any other instance of the app running in an iframe or a tab or a window? The actions are just plain objects. They can be serialized and shared between a communication channel.


In our case the communication channel which we're going to use to share the actions is the Broadcast Channel API. When a broadcast channel is created, we can subsribe to it from any browsing context in the same origin and listen for messages posted to it. In the following image we have the same application running in two iframes. Let's assume that this application uses NgRx. When the first instance of the application dispatches an action, this action will also be posted as a message to the broadcast channel. The second instance which has subscribed to this channel, will listen to the message and when it receives it, it will dispatch the action in this instance as well. As we described in the previous paragraph, when we have the same actions dispatched, we know for sure that the global state of the application will be the same and synchronized between all the running instances of the app.


![shared actions](/assets/blog/synchronizing-app-state-across-iframes/shared-actions.png)

### The code

For our solution, the first thing we have to do is to create a broadcast channel service. This service will have two methods. One method to post messages in the broadcast channel and 



