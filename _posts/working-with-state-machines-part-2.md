---
title: 'Working with State Machines in Angular (part 2)'
excerpt: 'State machines as a single source of truth'
coverImage: '/assets/blog/working-with-state-machines-part-2/different-worlds.jpg'
date: '2022-03-01T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo.jpeg'
ogImage:
  url: '/assets/blog/working-with-state-machines-part-2/different-worlds.jpg'
---

Some time ago, I wrote the following article [Working with State Machines in Angular ](https://stefanos-lignos.dev/posts/working-with-state-machines). *(If you don't know what a state machine/statechart is, and you want to continue reading this article, I would suggest first to have a look at this article)*

My main focus on this article was to explain how we can reduce the complexity in a reactive system by using state machines. Apart from this, I also tried to explain how we can create and use state machines in an Angular project with a library called [XState](https://xstate.js.org/). In this article, I want to focus more on a topic I clumsily touched at the end of my previous article. In the last paragraph I wrote:

> In my ideal world, the Business Analyst would be responsible for drawing up the state machine configuration as part of the task specification and this state machine would be committed on GitHub or BitBucket ready for revision and part of the actual implementation process. In this way, the team would talk the same language and we would be able to avoid most of the misunderstandings.

One of the major issues every development team has is the miscommunication between its members. In a development team we have people from different backgrounds, different areas of experise. We have people using different vocabulary. People using technical terminology, who can give a detailed explanation of the internals of a system and others who see it as a blackbox. All of them approach the same problem from a different point of view. However all these people have the same goal. The goal is to provide a system which has a specific behaviour for the end user. In this article we're going to explore how we can create a common language for the team by using state machines and statecharts. We want the team to have a common source of truth to describe the behaviour of the system they're building. One of the reasons, I feel I can focus more on this topic now is the latest tools the team behind XState has released recently.

<!-- ## An example of a miscommunication

We have a team which builds a mail platform. Let's see how a business analyst could describe one of the features of this platform. 

> The platform should contain a toggle button. When this button is on, if there are sensitive data in the mail, a notification appears with a message explaining to the user that there is a danger of exposing sensitive data. This toggle button is OFF by default. The user can set it ON manually or can be automatically on by default based on a setting in the admin panel. -->


## Looking back upon the creation of Statecharts

Before we dive into the topic of this article, let's go 40 years back. This is when the Computer Scientist David Harel invented the language of Statecharts. As he describes in his paper "Statecharts in the Making: A Personal Account", in 1982 he was asked to consult the Israel Aerospace Industries (IAI) which in that period was trying to build a home-made fighter aircraft and the project was facing some serious issues. Working with all these talended engineers in IAI, he realized very soon that the main issue they had was basically the difficulty to explain in simple words the behaviour of the varius systems they were trying to build. Their source of truth was a two-volume document of 2000 pages each, written from different people, from different perspectives.  

> It seemed extraordinary that this talented and
professional team did have answers to questions such as
"What algorithm is used by the radar to measure the
distance to a target?", but in many cases did not have the
answers to questions that seemed more basic, such as
"What happens when you press this button on the stick
under all possible circumstances?". 

It was clear to David Harel that what the avionics team was trying to build was a fully reactive system. A system, event-driven, control-driven with an event-response nature, including strict time constraints and parallelism. It was also clear that the real need for a reactive system like this was to provide a clear yet precise description of what the system does, or should do. To specify its behaviour in a language understandable to everyone. To describe the behaviour of such a system the notion of state and a transition to a new state is fundamendal. A Finite state machine could be very useful for this. However, it would not be possible to describe a huge system like this with Finite state machines in an intuitive way. That's why David Harel invented the language for the Statecharts.

<!-- TODO: make it better--> 
It's now obvious to me that Statecharts would be the perfect tool to describe the highly reactive nature of the frontend applications. And the magic thing is that everyone is able to understand a diagram. 





> **_Bibliography_**
> 
> \[1\]:David Harel, Statecharts in the Making: A Personal Account [http://www.wisdom.weizmann.ac.il/~harel/papers/Statecharts.History.pdf](http://www.wisdom.weizmann.ac.il/~harel/papers/Statecharts.History.pdf)