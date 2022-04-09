# Developing with NestJS and EventStoreDB using Lando

This example demonstrates a Lando configuration to power a sample NestJS application that uses EventStoreDB to store and
retrieve events. 

[NestJS](https://nestjs.com/) is a Node.js framework for building server-side applications in TypeScript. Our sample app
is based on an [EventStoreDB tutorial] demonstrating how to build a basic event-sourced NestJS web application and hook
it up to an EventStoreDB instance to write and read data. We are running our app in a mostly-default Lando NodeJS
service with a couple of small tweaks for the benefit of NestJS and our sample app. These consist of
globally adding the Nest CLI npm package to our service and setting an environment variable that our app can use to find
the EventStoreDB instance. We also add a Nest CLI command to start the Nest development server that will host our app.

After starting Lando, you can access the app at
http://example-nest.lndo.site

[EventStoreDB](https://www.eventstore.com) is an event sourcing database that stores data as an immutable stream of
events. We use the Lando Compose service to use Docker Compose syntax to define the parameters of our service.
This includes using EventStoreDB-provided Docker image, setting environment variables, setting up persistent storage
for the database, and launching the EventStoreDB daemon on startup.

After starting Lando, you can access the app at
http://example-eventstore.lndo.site

[EventStoreDB tutorial]: (https://www.eventstore.com/blog/building-a-nestjs-web-application-with-eventstoredb)
