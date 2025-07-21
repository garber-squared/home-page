---
layout: post
title: "JS Class vs Ruby Class"
date: "Sun Jan 29 09:58:43 PM EST 2023"
tags: [javascript, ruby]
---

Javascript class with a constructor:

```javascript
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = 18;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    isVoter() {
        return this.age >= 18;
    }

    greeting() {
        return `Hello, ${this.fullName}, how are you?`;
    }
}
```

Ruby class with an initialize method:

```ruby
class Person do
  def initialize(first_name, last_name, age)
    @first_name = first_name
    @last_name = last_name
    @age = 18
  end

  def full_name
    "#{@first_name} #{@last_name}"
  end

  def voter?
    @age >= 18
  end

  def greeting
    "Hello, #{full_name}, how are you?"
  end
end
```
