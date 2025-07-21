---
layout: post
title:  "Unique Lists in Python"
date:   "Tue Apr 16 04:00:46 AM EDT 2024"
tags: [python, 100daysofcode]
---

Sometimes the crossover from Ruby to Python requires a little more effort.

## Ruby
```ruby
my_dict.values.uniq
```

## Python
```python
list({e for v in my_dict.values() for e in v})
```
