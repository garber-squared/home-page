---
layout: post
title:  "Pad a String representation of a multi-digit number"
date:   "Mon Apr 22 09:06:28 AM EDT 2024"
tags: [python]
---
I want to convert any integer into a two-or-more digit number, such that 0 becomes "00", 9 becomes "09", but 10 becomes "10".

However, I do not want to use dynamic typing.

A clumsy way of achieving this is to reassign a scoped variable from integer to string:

```python
def convert_to_two_digit_string(num):
    # Convert integer to string
    num_str = str(num)

    # If the length of the string is less than 2, pad it with leading zeros
    if len(num_str) < 2:
        num_str = '0' + num_str

    return num_str
```

But a better way I think is this:

```python
num_str = "{:02d}".format(num)
```

Or this:

```python
num_str = f"{num:02d}"
```
