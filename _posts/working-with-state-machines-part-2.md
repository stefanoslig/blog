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

One of the major issues every development team has is the miscommunication between its members. In a development team we have people from different backgrounds, different areas of experise. We have people using different vocabulary. People using technical terminology, who can give a detailed explanation of the internals of a system and others who see it as a blackbox. All of them approach the same problem from a different point of view. However all these people have the same goal. The goal is to provide a system which has a specific behaviour for the end user. In this article we're going to explore how we can create a common language for the team by using state machines and statecharts. We want them to have a common source of truth describing the behaviour of the system they're building. One of the reasons, I feel I can focus more on this topic now is the latest tools the team behind XState has released recently.

<!-- ## An example of a miscommunication

We have a team which builds a mail platform. Let's see how a business analyst could describe one of the features of this platform. 

> The platform should contain a toggle button. When this button is on, if there are sensitive data in the mail, a notification appears with a message explaining to the user that there is a danger of exposing sensitive data. This toggle button is OFF by default. The user can set it ON manually or can be automatically on by default based on a setting in the admin panel. -->



## Looking back upon the creation of Statecharts

Before we dive into the topic of this article, let's go 40 years back



> **_Bibliography_**
> 
> \[1\]:David Harel, Statecharts in the Making: A Personal Account [http://www.wisdom.weizmann.ac.il/~harel/papers/Statecharts.History.pdf](http://www.wisdom.weizmann.ac.il/~harel/papers/Statecharts.History.pdf)