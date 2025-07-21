---
layout: post
title:  "Inheritance and Decorators in Python"
date:   "Thu Apr 25 01:35:18 AM EDT 2024"
tags: [python]
---

## Source Code

### Classes

`Admin` is a child of `User`: it inherits the instance properties `name` and `is_logged_in`.

```python
class User:
    def __init__(self, name):
        self.name = name
        self.is_logged_in = False


class Admin(User):
    def __init__(self, name):
        super().__init__(name)
```

`Post` in reality would never have a randomnly generated id, but would receive its ID from a `posts` table in the database.
I have yet to learn the Django equivalent of a Model in Ruby on Rails.

```python
class Post:
    def __init__(self, id=None):
        self.id = id or random.randint(0, 1000)
```

### Decorator Functions

`is_authenticated` checks the `is_logged_in` instance attribute of the object.
```python
def is_authenticated(function):
    def wrapper(*args):
        if args[0].is_logged_in is True:
            return function(*args)
        else:
            raise Exception("401")

    return wrapper
```

`is_admin` checks whether the object itself `isinstance` of Admin.

```python
def is_admin(function):
    def wrapper(*args, **kwargs):
        if isinstance(args[0], Admin):
            return function(*args, **kwargs)
        else:
            raise Exception("401")

    return wrapper
```

### Functions with Class Instance Objects

`create_blog_post` can be performed by either User or Admin providing he `is_authenticated`, i.e. `is_logged_in`:

```python
@is_authenticated
def create_blog_post(user):
    print(f"This is {user.name}'s new blog post.")
    return {"status": "ok"}
```

`delete_blog_post can be performed only by an `Admin`` who `is_logged_in`.

```python
@is_admin
@is_authenticated
def delete_blog_post(user, post):
    print(f"{user.name} deleted post {post.id}")
    return {"status": "ok"}
```

## Testing

### Fixtures

Testing requires setup of Class Instance objects in a certain state -- logged in or not, admin or not.

This is trickier than using primitives are objects with a fixed state, both in setup and execution of the tests.

Test scenarios require `user_with_login`, `user_sans_login`, `admin_with_login`.  Admin not logged in is identical to a User not logged in, so both cases are covered by `user_sans_login`.  An instance of `Post` is also required to test a successful execution of `delete_blog_post(user, post)`.

```python
@pytest.fixture
def user_with_login():
    u = d.User("Foo")
    u.is_logged_in = True
    yield u


@pytest.fixture
def user_sans_login():
    u = d.User("Bar")
    print(u.name)
    print(u.is_logged_in)
    yield u


@pytest.fixture
def admin_with_login():
    u = d.Admin("MyAdmin")
    u.is_logged_in = True
    yield u


@pytest.fixture
def my_post():
    post = d.Post(42)
    yield post
```

### Tests

Tests are filtered by a custom tag `filter` and the command `pytest -k filter` or `ptw -- -k filter`.

```python
@pytest.mark.filter
def test_authenticated(user_with_login):
    assert user_with_login.is_logged_in is True
    assert d.create_blog_post(user_with_login) == {"status": "ok"}


@pytest.mark.filter
def test_unauthenticated(user_sans_login):
    assert user_sans_login.is_logged_in is False
    with pytest.raises(Exception) as e:
        d.create_blog_post(user_sans_login)
        assert e.value == "401"


@pytest.mark.filter
def test_authenticated_admin(admin_with_login, my_post):
    assert admin_with_login.is_logged_in is True
    assert isinstance(admin_with_login, d.Admin) is True
    assert my_post.id == 42
    assert d.delete_blog_post(admin_with_login, my_post) == {"status": "ok"}


@pytest.mark.filter
def test_authenticated_not_admin(user_with_login, my_post):
    assert user_with_login.is_logged_in is True
    assert isinstance(user_with_login, d.User) is True
    assert my_post.id == 42
    with pytest.raises(Exception) as e:
        d.delete_blog_post(user_with_login, my_post)
        assert e.value == "401"

```
