---
title: 'How to organize your libs in a nrwl/nx monorepo'
excerpt: ''
coverImage: '/assets/blog/organize-your-libs-in-nx-monorepo/building-blocks.jpeg'
date: '2022-02-01T05:35:07.322Z'
author:
  name: Stefanos Lignos
  picture: '/assets/my-photo.jpeg'
ogImage:
  url: '/assets/blog/organize-your-libs-in-nx-monorepo/building-blocks.jpeg'
---

https://github.com/stefanoslig/organize-nx-libs-article-demo

For this project I created a monorepo. There is one app for the moment (learning-cube) which consumes the libraries under the libs folder. 

The folder structure is:
~~~
libs 
	> learnings
		> data-access
		> feature-list
		> feature-search
		> feature-shell
    > utils-testing  
	> shared
		> data-access
		> ui
		> api-types
	> users
		> data-access
		> feature-list
		> feature-search
		> feature-shell
    > utils-testing  
~~~

I used two classifiers to name my libraries. The first classifier is the `scope` and the second the `type`. The main reason is that I want every developer when he looks a library to understand where this library can be used and which kind of services/components/etc contains. 

The `scope` is the section (domain) of the app the library can be used.  It gives a clear indication that a feature belongs to a specific domain. For example the libraries under `learnings` scope, are used in the learnings page, the libraries under the `users` scope in the users page and the libraries under the `shared` scope can be reused between all the sections of the app.

The `type` indicates the purpose of a library. I have used 5 different types (feature, data-access, ui, feature-shell, utils) The `feature-...` type contains smart components. These are components which enable the communication with the data-sources (most likely they inject api services). The `data-access` type contains  code for interacting with the server. An example is from the `users-data-access` library:
~~~
users
	> data-access
		> learnings-api.service
		> learnings-store.service
~~~ 

The `ui` type contains dumb (presentational) components. These components are reusable in the scope of this library. The `feature-shell` is the glue between the `feature-...` libs and most likely is a lazy loaded module. In this project, they are lazy loaded modules (you can see it in the `app-routing.module` file).  

The `utils` libraries is used here to keep some mock data and services for the testing. Generally they contain low level code used by from all the other libraries in the same scope.
