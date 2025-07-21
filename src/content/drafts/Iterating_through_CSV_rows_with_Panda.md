---
layout: post
title:  "Iterating through CSV rows with Panda"
date:   "Mon Apr 22 05:49:13 AM EDT 2024"
tags: [python,csv]
---
```python
data = pandas.read_csv("docs/solutions/day_26/nato_phonetic_alphabet.csv")
phonetic_dict = {row.letter: row.code for (index, row) in data.iterrows()}
```
