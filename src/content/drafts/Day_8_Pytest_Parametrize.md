---
layout: post
title:  "Day 8: Pytest Parametrize"
date:   "Sat Apr 20 12:46:29 AM EDT 2024"
tags: [100daysofcode,pytest]
---
Parametrize makes for a whole lot less unit testing code.

Three test cases in just a few lines:

```python
@pytest.mark.parametrize(
    "start_text,shift_amount,expected",
    [("abc", 1, "bcd"), ("abc", 26, "abc"), ("xyz", 3, "abc"), ("xyz", 26, "xyz")],
)
def test_encode(caesar, start_text, shift_amount, expected):
    assert caesar.encode(start_text, shift_amount) == expected
```
