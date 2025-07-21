---
layout: post
title:  "Basics of Flask"
date:   "Wed Apr 24 02:10:48 AM EDT 2024"
tags: [python,webdev]
---
This Flask file illustrates the fundamentals.

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

if __name__ == "__main__":
    app.run()
```

To run the app, we need the following:
- The [Main Guard]({% post_url 2024-04-24-Python_Main_Guard %}){:target="_blank"}
- Export the `$FLASK_APP` system variable

```sh
export FLASK_APP=/path/from/current/directory/to/file.py flask run
```
