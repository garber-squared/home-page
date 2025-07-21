---
layout: post
title:  "Reduce Function"
date:   "Mon Apr 22 08:38:23 AM EDT 2024"
tags: [python]
---
The `functools.reduce()` function accumulates the results of applying a binary function to the items of an iterable, from left to right. It is similar to the `#inject` method in Ruby.

Ruby `#inject` example:

```ruby
# Sum of elements in an array
array = [1, 2, 3, 4, 5]
sum = array.inject(0) { |result, element| result + element }
puts sum  # Output: 15
```

Equivalent Python code using `functools.reduce()`:

```python
from functools import reduce
my_list = [1, 2, 3, 4, 5]
sum_result = reduce(lambda result, element: result + element, my_list, 0)
print(sum_result)  # Output: 15
```

In this example, `reduce()` takes three arguments:
- A function (lambda function in this case) that specifies the operation to perform on each pair of elements.
- An iterable (list in this case) containing the elements to be processed.
- An optional initial value (`0` in this case) for the accumulator.

The `lambda` function `lambda result, element: result + element` adds each element to the accumulated sum. The initial value `0` is specified as the third argument to `reduce()`, ensuring that the summation starts from zero.

The same with a function definition instead of a lambda:

```python
from functools import reduce

def add(a, b):
    return a + b

my_list = [1, 2, 3, 4, 5]
sum_result = reduce(add, my_list, 0)
print(sum_result)  # Output: 15
```
