---
layout: post
title:  "Arbitrary Argument Lists and Keyword Argument Dictionaries"
date:   "Mon Apr 22 08:32:22 AM EDT 2024"
tags: [python]
---
## Arbitrary Arguments

```python
def foo(*args):
    for n in args:
        print(n)
```

## Arbitrary Argument Dictionaries

To iterate, call `kwargs.items()`

```python
def foo(**kwargs):
    for k,v in kwargs.items():
        print(f"{k}: {v}")
```

If I were to call `foo(x=10, y=11, z=12)`, the resulting `kwargs` variable would be this:

```python
{ x: 10, y: 11, z: 12}
```
