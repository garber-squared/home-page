---
layout: post
title:  "Python Main Guard"
date:   "Wed Apr 24 02:15:56 AM EDT 2024"
tags: [python]
---
In Python, the construct `if __name__ == "__main__":` is often used to allow a script to be run either as the main program or imported as a module into another script.

When a Python script is executed, the special variable `__name__` is set to `"__main__"` if the script is being run directly. If the script is imported as a module into another script, `__name__` is set to the name of the module.

Therefore, `if __name__ == "__main__":` is a common idiom to specify code that should only be executed when the script is run directly, and not when it's imported as a module. This is often used to define entry points or to execute specific setup code.

For example:

```python
# my_script.py

def my_function():
    print("This is my function.")

if __name__ == "__main__":
    # This code block will only be executed if the script is run directly
    print("This script is being run directly.")
    my_function()
```

If you run `my_script.py` directly, you will see the output:
```
This script is being run directly.
This is my function.
```

But if you import `my_script.py` into another script, the `if __name__ == "__main__":` block will not be executed, and only the function definitions will be imported.
