---
title: 'State machines as a single source of truth'
excerpt: 'State machines as a single source of truth for the QA, devs and POs'
coverImage: '/assets/blog/working-with-state-machines-part-2/different-worlds.jpg'
date: '2022-03-01T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo.jpeg'
ogImage:
  url: '/assets/blog/working-with-state-machines-part-2/different-worlds.jpg'
---

Some time ago, I wrote the following article [Working with State Machines in Angular ](https://stefanos-lignos.dev/posts/working-with-state-machines). *(If you don't know what a state machine/statechart is, and you want to continue reading this article, I would suggest first to have a look at this article)*

My main focus on this article was to explain how we can reduce the complexity in a web app by using state machines. Apart from this, I also tried to explain how we can create and use state machines in an Angular project with a library called [XState](https://xstate.js.org/). In this article, I want to focus more on a topic I clumsily touched at the end of my previous article. In the last paragraph I wrote:

> In my ideal world, the Business Analyst would be responsible for drawing up the state machine configuration as part of the task specification and this state machine would be committed on GitHub or BitBucket ready for revision and part of the actual implementation process. In this way, the team would talk the same language and we would be able to avoid most of the misunderstandings.

One of the reasons, I feel I can focus more on this topic now is the latest tools the team behind XState has released recently.

## Looking back upon the creation of Statecharts

Before we dive into the topic of this article, let's go 40 years back



> **_Bibliography_**
> 
> \[1\]:David Harel, Statecharts in the Making: A Personal Account [http://www.wisdom.weizmann.ac.il/~harel/papers/Statecharts.History.pdf](http://www.wisdom.weizmann.ac.il/~harel/papers/Statecharts.History.pdf)