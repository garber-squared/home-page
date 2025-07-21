---
layout: post
title:  "Factory Microservices"
date:   "Thu Jan 11 02:14:05 AM EST 2024"
tags: [portfolio,devops]
---
In my original conception of the factory simulation, which I think to christen "Clockwork Factoria" or perhaps "FaaS" (Factory as a Service), I thought of a set number of "factory" microservices, running continuously, awaiting POST requests from the Order Management microservice.

However, I think a better way would be to have a single Factory microservice running continuously, and if a certain threshold of requests is exceeded, to spin up another one to share the load, and so on in response to increased demand.

Even cleverer would be a serverless approach where the POST request from the Order Manager prompts the cloud service(e.g. AWS) to spin up a Factory microservice on demand, execute the job, and then spin it down.  For this to be feasible, the Factory microservice would have to be something like a very lightweight Docker image, but I think it can be done.

For the minimum viable product, I will create each microservice as a continuously running entity, e.g. a Heroku deployment or EC2 container, with a view to introducing more advanced DevOps principles to the workflow.
