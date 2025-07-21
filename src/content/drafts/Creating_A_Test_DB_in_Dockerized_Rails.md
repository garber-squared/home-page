---
layout: post
title:  "Creating A Test DB in Dockerized Rails"
date:   "Sun Nov 24 09:54:53 PM EST 2024"
tags: [rails,docker,ruby]
---
I ran into all sorts of trouble when trying to create a simple test database for a Dockerized Rails app.

Maybe Docker Compose was not passing the environmental variable `RAILS_ENV=test`?

```bash
$ docker compose exec -e RAILS_ENV=test web bash 
root@b1c40fe16325:/rails# echo $RAILS_ENV 
test
```

Maybe Rails wasn't picking up `RAILS_ENV=test`?

```bash
Loading test environment (Rails 7.1.5) 
[1] pry(main)> Rails.env 
=> "test" 
```

After many frustrating, useless iterations with ChatGPT, I took the time to **RTFM**:

```bash
$ docker compose exec -e RAILS_ENV=test web rails -T | grep "db:create"

bin/rails db:create # Create the database from DATABASE_URL or config/database.yml for the current RAILS_ENV (use db:create:all to create all databases in the config). Without RAILS_ENV or when RAILS_ENV is development, it defaults to creating the development and test databases, except when DATABASE_URL is present
```

The key is here:

> it defaults to creating the development and test databases, **except when DATABASE_URL is present**

And what was in `docker-compose.yml`?  You guessed it:

```yaml
- DATABASE_URL=postgres://...
```

Which means:

1. `Rails_ENV=test` should not be necessary for creating a test DB, because it is the default behaviour of `rails db:create`.
2. If `DATABASE_URL` is set in `docker-compose.yml`, Rails will ignore `RAILS_ENV` anyway.

Therefore, to create a test DB, I simply removed the `DATABASE_URL` from `docker-compose.yml`.
