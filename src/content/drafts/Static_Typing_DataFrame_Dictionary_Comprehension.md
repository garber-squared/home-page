---
layout: post
title:  "Static Typing, DataFrame, Dictionary Comprehension"
date:   "Tue Apr 23 07:34:57 AM EDT 2024"
tags: [python]
---
This code looks back-to-front to me.

```python
birthdays_dict = {
    (data_row["month"], data_row["day"]): data_row
    for (index, data_row) in data.iterrows()
}
```

By contrast, this code is much easier to understand.
What it loses in brevity, it makes up for in being declarative.

```python
birthdays_dict: dict[tuple[int, int], any] = {}
for index, data_row in data.iterrows():
key: tuple[int, int] = (data_row["month"], data_row["day"])
birthdays_dict[key] = data_row
return birthdays_dict
```
