---
layout: post
title:  "Python Coding Practice"
date:   "Thu Jun 12 11:45:23 AM EDT 2025"
tags: [python]
---
Working on Python fundamentals.

Rather than writing simplistic functions to solve common coding exercises in a superficial way, I went a little deeper.

I started with a simple set of PyTests and hand-wrote the code (NO AI) to make them pass.  This was a good way to clarify the Pythonic way of expressing these concepts.
Then I added some more expectations -- empty arguments, wrong argument types -- and wrote decorators to handle the use cases.  I didn't want the functions to become bloated.

Finally, I moved all the free functions into classes that inherit the decorators from a parent Base class.

The resulting code is clean and DRY.

[https://github.com/clockworkpc/codesignal_exercises](https://github.com/clockworkpc/codesignal_exercises)
