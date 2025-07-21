---
layout: post
title:  "FaaS Factoria"
date:   "Thu Jan 11 02:39:18 AM EST 2024"
tags: [portfolio]
---
Welcome to the home page of **FaaS Factoria**, a portfolio project by Alexander Yaäkov Garber.

*FaaS* stands for *Factory as a Service*, a play on the "as a Service" acronyms that abound in software these days.

I will provide a link to the visible portion of the project when it is up and running.

## What is it?

**FaaS Factoria** is a simulation of the day-to-day operations of a business that manufactures custom widgets, gadgets, gizmos, and other such synonyms.  It has a (mostly) growing list of customers and an evolving catalogue of products, an Order Manager, Customer and Product Manager, Dashboard of orders, and Factories that receive production orders and notify the Order Manager when they are complete.

The simulation is composed of microservices.  Initially every component will be a continuously running microservice in the cloud, e.g. Heroku or EC2, but I want to explore the feasibility of making the Factory microservice serverless, i.e. to spin up whenever a production order is sent and to spin down when it is completed.

## The process in brief

- Customers place orders for custom products with the Order Manager.
- The Order Manager sends production orders to the Factories.
- The Factories complete the production orders and notify the Order Manager.
- The Order Manager saves the details of the order to the database and transmits them to a Google-Sheet-based Dashboard.

Below is a growing list of blog posts on this topic.

{% for page in site.tags.portfolio %}
<ul>
    <li><a class="color-{{ page.color }}-hover" href="{{ page.url }}">{{ page.title }}</a></li>
</ul>
{% endfor %}
