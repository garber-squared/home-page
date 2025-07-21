---
layout: post
title:  "How to return Panda Series CSV column headers"
date:   "Mon Apr 22 04:58:10 AM EDT 2024"
tags: [python,csv]
---
The `.columns` attribute returns a pandas Index object representing the column labels of the DataFrame, e.g. column headers of a CSV.

```python
import pandas as pd
data = pd.read_csv("my_data.csv")

column_headers = data.columns
print(column_headers)
```
