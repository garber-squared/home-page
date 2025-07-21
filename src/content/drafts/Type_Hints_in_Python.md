---
layout: post
title:  "Type Hints in Python"
date:   "Tue Apr 23 07:24:19 AM EDT 2024"
tags: [python]
---
| Type Hint  | Meaning                                             | Example(s)                                                  |
|------------|-----------------------------------------------------|-------------------------------------------------------------|
| `int`      | Integer                                             | `x: int = 5`                                                |
| `float`    | Floating-point number                               | `pi: float = 3.14`                                          |
| `str`      | String                                              | `name: str = "John"`                                        |
| `bool`     | Boolean                                             | `is_active: bool = True`                                    |
| `list`     | List                                                | `numbers: list[int] = [1, 2, 3]`                            |
| `tuple`    | Tuple                                               | `coordinates: tuple[int, int] = (10, 20)`                   |
| `dict`     | Dictionary (string keys, any values)                | `person: dict[str, any] = {"name": "John", "age": 30}`      |
| `dict`     | Dictionary (tuple keys, any values)                 | `person: dict[tuple, any] = {(10,12): "John", (11,12): 30}` |
| `set`      | Set                                                 | `unique_numbers: set[int] = {1, 2, 3}`                      |
| `any`      | any type (dynamic typing)                           | `value: any = 10`                                           |
| `Union`    | Union of multiple types                             | `mixed: Union[int, str] = 10`                               |
| `Optional` | Optional type (None or specified type)              | `age: Optional[int] = None`                                 |
| `Callable` | Callable (function or method)                       | `operation: Callable[[int, int], int] = lambda x, y: x + y` |
| `Iterable` | Iterable (e.g., list, tuple, dictionary keys)       | `items: Iterable[int] = [1, 2, 3]`                          |
| `Iterator` | Iterator (e.g., returned by iter() function)        | `iter_obj: Iterator[int] = iter([1, 2, 3])`                 |
| `Generator`| Generator (function returning iterator)             | `def squares(n: int) -> Generator[int, None, None]: ...`    |
| `Type`     | Type (class or type object)                         | `cls: Type[MyClass] = MyClass`                              |
| `ClassVar` | Class variable (shared among instances)             | `count: ClassVar[int] = 0`                                  |
| `AnyStr`   | Any string type (str or bytes)                      | `data: AnyStr = "abc"`                                      |
| `NoReturn` | Used for functions that never return a value        | `def my_func() -> NoReturn: ...`                            |
| `Literal`  | Literal value (specific constant value)             | `status: Literal["success", "failure"] = "success"`         |
| `Final`    | Final variable (cannot be reassigned)               | `MAX_SIZE: Final[int] = 100`                                |
| `NewType`  | Creates a new distinct type (e.g., for validation)  | `UserId = NewType("UserId", int)`                           |
