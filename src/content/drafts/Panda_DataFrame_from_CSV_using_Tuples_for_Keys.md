---
layout: post
title:  "Panda DataFrame from CSV using Tuples for Keys"
date:   "Tue Apr 23 04:07:11 AM EDT 2024"
tags: [python,panda,csv]
---
```python
birthdays_dict = { (data_row["month"], data_row["day"]):
    data_row for (index, data_row) in data.iterrows() }
```

This line is a dictionary comprehension that iterates over each row in the DataFrame data. For each row, it creates a key-value pair in the birthdays_dict dictionary. The key is a tuple containing the values from the "month" and "day" columns of the current row, and the value is the entire row itself (represented by data_row).

Here's what happens in detail for each iteration of the comprehension:

```python
(index, data_row)
```

The `iterrows()` function iterates over the rows of the DataFrame, returning an index (row number) and a pandas Series object representing the row data.

```python
(data_row["month"], data_row["day"])
```

These expressions access the values in the "month" and "day" columns of the current row, respectively.
placing them in parentheses constructs a tuple containing the values of "month" and "day" from the current row. This tuple serves as the key for the dictionary.

```python
data_row
```

The entire row from the DataFrame is used as the value corresponding to the key.

So, `birthdays_dict` is a dictionary where the keys are tuples representing month and day combinations, and the values are the corresponding rows from the CSV file. This dictionary can be used to look up birthday information by `(month, day)`.

![Foo](../assets/python_panda_2024-04-23_10-54-00.png)
![Foo](../assets/python_panda_2024-04-23_11-01-04.png)
![Foo](../assets/python_panda_2024-04-23_11-02-04.png)
