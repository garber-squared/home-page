---
layout: post
title:  "ASCII letters and numbers"
date:   "Mon Apr 22 09:16:43 AM EDT 2024"
tags: [python]
---
There is a more efficient way than this:

```python
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']
```

The `String()` module makes this a lot simpler:

```python
letters = [c for c in string.ascii_letters],
numbers = [c for c in string.digits],
symbols = list("!#$%&()*+"),
```
