---
layout: post
title:  "Why are there parentheses in a class definition?"
date:   "Tue Apr 23 03:27:56 AM EDT 2024"
tags: [python]
---

|Code               |Explanation                                                                                          |
|-------------------|-----------------------------------------------------------------------------------------------------|
|`class MyClass:`   | Explicitly no inheritance                                                                           |
|`class MyClass():` | Call to class constructor functionally identical to no parentheses                                  |


In Python, both `class MyClass:` and `class MyClass():` are valid ways to define a class.

1. `class MyClass:`: This is a class definition with no explicit inheritance. It's the simplest form of defining a class. In this case, MyClass doesn't inherit from any other class explicitly. This style is more common when you have a simple class with no inheritance.

2. `class MyClass():`: This is also a class definition, but it's an example of using parentheses with the class name. This can be seen as a call to the class constructor, although the parentheses are empty since no explicit inheritance is stated. The empty parentheses are optional in this case. They don't change the behavior or functionality of the class. This style is sometimes used for consistency when subclassing or when additional arguments are passed to the class constructor.
