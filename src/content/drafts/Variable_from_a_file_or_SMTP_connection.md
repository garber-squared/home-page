---
layout: post
title:  "Variable from a file or SMTP connection"
date:   "Tue Apr 23 08:05:47 AM EDT 2024"
tags: [python]
---
Although the file connection is closed after executing the code block, the variable `contents` remains accessible.

```python
with open(file_path) as letter_file:
    contents = letter_file.read()
    contents = contents.replace("[NAME]", birthday_person["name"])
```
