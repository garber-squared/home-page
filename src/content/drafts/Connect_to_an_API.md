---
layout: post
title:  "How to connect to the Salesforce REST API"
date:   "Thu Sep 12 05:42:02 AM EDT 2024"
tags: [api, salesforce, rest]
---

This is my personal guide to connecting to an API, using Salesforce as an example.

# Executive Summary

By the end of this article, you should have everything needed to consume and test the Salesforce REST API using the following stack and tools:
- Ruby on Rails
- Postgresql and Redis
- Docker and Docker Compose
- `rspec` and `restforce`

## What Is My Goal?

- To connect to an API via a Rails application
- Write an API wrapper as a Rails app service to perform CRUD (Create, Read, Update, Delete) operations. 
- Write specs in RSpec to test the API wrapper

## Steps

1. Create a dockerized Rails app with Postgresql and Redis.
2. Read the API documentation.
3. Create a Salesforce account.
4. Create a connected app and retrieve credentials and tokens.
5. Create an API user.
6. Save the sensitive data to the Rails encrypted credentials.
7. Write a service Class `SalesforceApi` in `app/services/salesforce_api.rb`
8. Write a Spec in `spec/services/salesforce_api_spec.rb`
9. Initialize `SalesforceApi` with the `Restforce` client.
10. Write and test CRUD methods using the `Account` sobject as an example:
    - READ: `#list_accounts(id:)`, `#find_account(id: nil, name: nil)`
    - CREATE: `#create_account(name:)`
    - UPDATE: `#change_account_name(id: nil, name: nil, new_name:)`
    - DELETE: `#delete_account(id: nil, name: nil)`

# Create a dockerized Rails app with Postgresql and Redis

- Create a new rails app
- Write a Gemfile with my favourite development gems and [restforce](https://github.com/restforce/restforce), a Ruby Salesforce API client.
- Write a dev Dockerfile (Rails comes with a Dockerfile for Production, which is too complicated for this purpose)
- Write a docker compose YAML to set up the Rails app with a Postgresql database and a Redis server
- Write a Guardfile for TDD

This way I can get going in the Rails app with a simple `docker compose up`

## Create a new Rails app with a Postgresql database 

- `rails new api-demo -d postgresql`

## `Gemfile`

```ruby
source 'https://rubygems.org'

ruby '3.3.5'

gem 'bootsnap', require: false
gem 'importmap-rails'
gem 'jbuilder'
gem 'pg', '~> 1.1'
gem 'puma', '>= 5.0'
gem 'rails', '~> 7.1.3', '>= 7.1.3.2'
gem 'redis', '>= 4.0.1'
gem 'restforce'
gem 'sprockets-rails'
gem 'stimulus-rails'
gem 'turbo-rails'
gem 'tzinfo-data', platforms: %i[windows jruby]

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'database_cleaner'
  gem 'database_cleaner-active_record'
  gem 'debug', platforms: %i[mri windows]
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'guard'
  gem 'guard-livereload'
  gem 'guard-rails', require: false
  gem 'guard-rspec'
  gem 'guard-rubocop'
  gem 'pry-byebug'
  gem 'pry-theme'
  gem 'rspec'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
  gem 'shoulda-matchers'
end

group :development do
  gem 'web-console'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
end
```

## `Dockerfile.dev` from the Ruby base image

```docker
# Use the Ruby base image
FROM ruby:latest

# Set the working directory inside the container
WORKDIR /rails

# Install dependencies needed for Rails (optional)
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Copy Gemfile and Gemfile.lock to the container
COPY Gemfile Gemfile.lock ./

# Install Bundler and gems
RUN gem install bundler -v 2.5.18 && bundle install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Rails server
EXPOSE 3000

# Run the Rails server
CMD ["bash", "-c", "bundle exec rails server -b 0.0.0.0"]

```

## `docker-compose.yml` for the app, db, redis, and network

```yaml
name: api_demo

services:
  web:
    build:
      context: .             # Use the current directory as build context
      dockerfile: Dockerfile.dev  # Use the Dockerfile in the current directory
    container_name: api_demo_web
    command: bash -c "bundle exec rails db:create db:migrate && bundle exec rails server -b 0.0.0.0"
    working_dir: /rails
    volumes:
      - .:/rails              # Mount the current directory to /rails inside the container
    environment:
      - RAILS_ENV=development
      - DATABASE_URL=postgres://api_demo:password123@db:5432/api_demo_development
      - REDIS_URL=redis://redis:6379/0
      - INSIDE_DOCKER=true
    ports:
      - "3000:3000"           # Expose port 3000 for the Rails app
    depends_on:
      - db                    # Ensure the db service is running before starting the web service
      - test_db
      - redis                 # Ensure Redis is running before starting the web service
    networks:
      - api_demo_network           # Use a custom network for communication

  db:
    image: postgres:latest
    container_name: api_demo_db
    environment:
      POSTGRES_USER: api_demo
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: api_demo_development
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persist PostgreSQL data
    networks:
      - api_demo_network

  test_db:
    image: postgres:latest
    container_name: api_demo_test_db
    environment:
      POSTGRES_USER: api_demo
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: api_demo_test
    volumes:
      - postgres_test_data:/var/lib/postgresql/data
    networks:
      - api_demo_network

  redis:
    image: redis:latest
    container_name: api_demo_redis
    volumes:
      - redis_data:/data  # Persist Redis data
    networks:
      - api_demo_network

networks:
  api_demo_network:
    driver: bridge

volumes:
  postgres_data:
  postgres_test_data:
  redis_data:

```

## RSpec and Guardfile for TDD

### Install RSpec

```bash
$ bundle exec rails g rspec:install
      create  .rspec
      create  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```

### Generate a Guardfile

#### Note on Guard in Docker

`bundle exec guard` will not work, instead run this, where `web` is the name of the Rails app:

`docker compose run web bundle exec guard`

It's also important to have a separate test database in the `docker-compose.yml`.

#### Guardfile

This is my customised Guardfile with two scopes: `default` and `focus`.

```ruby
# Guardfile

def rspec_guard(cmd) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
  guard(:rspec, cmd:) do # rubocop:disable Metrics/BlockLength
    require 'guard/rspec/dsl'
    dsl = Guard::RSpec::Dsl.new(self)

    # Feel free to open issues for suggestions and improvements

    # RSpec files
    rspec = dsl.rspec
    watch(rspec.spec_helper) { rspec.spec_dir }
    watch(rspec.spec_support) { rspec.spec_dir }
    watch(rspec.spec_files)

    # Ruby files
    ruby = dsl.ruby
    dsl.watch_spec_files_for(ruby.lib_files)

    # Rails files
    rails = dsl.rails(view_extensions: %w[erb haml slim])
    dsl.watch_spec_files_for(rails.app_files)
    dsl.watch_spec_files_for(rails.views)

    watch(rails.controllers) do |m|
      [
        rspec.spec.call("routing/#{m[1]}_routing"),
        rspec.spec.call("controllers/#{m[1]}_controller"),
        rspec.spec.call("acceptance/#{m[1]}")
      ]
    end

    # Rails config changes
    watch(rails.spec_helper)     { rspec.spec_dir }
    watch(rails.routes)          { "#{rspec.spec_dir}/routing" }
    watch(rails.app_controller)  { "#{rspec.spec_dir}/controllers" }

    # Capybara features specs
    watch(rails.view_dirs)     { |m| rspec.spec.call("features/#{m[1]}") }
    watch(rails.layouts)       { |m| rspec.spec.call("features/#{m[1]}") }

    # Turnip features and steps
    watch(%r{^spec/acceptance/(.+)\.feature$})
    watch(%r{^spec/acceptance/steps/(.+)_steps\.rb$}) do |m|
      Dir[File.join("**/#{m[1]}.feature")][0] || 'spec/acceptance'
    end
  end
end

group :default do
  cmd = 'bundle exec rspec --format documentation'
  rspec_guard(cmd)
end

group :focus do
  cmd = 'bundle exec rspec --tag focus --format documentation'
  rspec_guard(cmd)
end

```

# Read the API documentation

## Summary

1. Look up the REST API documentation
2. Find out the requirements for API integration

##  Look up the API documentation

For Salesforce, the best place to start is the [REST API guide](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_list.htm) in the [Developer Documentation](https://developer.salesforce.com/docs#browse).

## Find out the requirements for API integration

I took note of the following:
- [Supported editions for API access and API user permissions](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest_compatible_editions.htm)
- [Get your very own Developer Edition](https://developer.salesforce.com/signup)
- Turning on the API Enabled permission.
- [Give Integration Users API Only Access](https://help.salesforce.com/s/articleView?id=sf.integration_user.htm&language=en_US)
- [Rest Resources and Requests](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest_resources.htm)
- [Sending REST requests with cURL](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_curl.htm)
- [Authorize Apps with OAuth](https://help.salesforce.com/articleView?id=remoteaccess_authenticate.htm&language=en_US)
- [Authorization through connected apps and OAuth 2.0](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_oauth_and_connected_apps.htm)
- [Create a connected app](https://help.salesforce.com/articleView?id=connected_app_create.htm&language=en_US)
- [Enable OAuth settings for API integration](https://help.salesforce.com/articleView?id=connected_app_create_api_integration.htm&language=en_US)

# Create a Salesforce account

- [Get your very own Developer Edition](https://developer.salesforce.com/signup)

# [Create A Connected App](https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm&type=5) and retrieve credentials and tokens

This includes creating an execution user:

> Select an execution user for the flow.  Although there’s no user interaction in the client credentials flow, Salesforce still requires you to specify an execution user. By selecting an execution user, you allow Salesforce to return access tokens on behalf of this user.

1. [Configure Basic Connected App Settings](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_basics.htm&type=5)
2. [Enable OAuth Settings for API Integration](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_api_integration.htm&type=5)
3. [Configure a Connected App for the OAuth 2.0 Client Credentials Flow](https://help.salesforce.com/s/articleView?id=sf.connected_app_client_credentials_setup.htm&type=5)

# Save the sensitive data

`EDITOR=nvim bundle exec rails credentials:edit`

```yml
sf_username: myemail@host.com
sf_password: obviouslynotpassword123
sf_security_token: checkyouremailforthesecuritytoken
sf_consumer_key: a-very-long-alpha-numeric-special-character-string
sf_consumer_secret: another-very-long-alpha-numeric-special-character-string
sf_host: my-domain.develop.my.salesforce.com
sf_instance_url: https://my-domain.develop.my.salesforce.com
sf_org_id: alpha-numeric-string
```

# Write a `restforce` service class in the Rails app

`mkdir app/services && touch app/services/salesforce_service.rb`

```ruby
# app/services/salesforce_service.rb

require 'restforce'
require 'uri'
require 'net/http'

class SalesforceService
  attr_reader :access_token, :client

  def initialize
    @client = Restforce.new(
      client_id: Rails.application.credentials[:sf_consumer_key],
      client_secret: Rails.application.credentials[:sf_consumer_secret],
      host: Rails.application.credentials[:sf_host],
      api_version: '61.0'
    )
  end

  def sobjects
    @client.describe
  end

  def sobject_names
    sobjects.pluck('name')
  end

  def list_users
    @client.query('SELECT Id, Name FROM User')
  end

  def list_accounts
    @client.query('Select Id, Name FROM Account')
  end

  def find_account(id: nil, name: nil)
    if id
      @client.find('Account', id)
    elsif name
      @client.query("select Id,Name from Account where Name = '#{name}'")
    end
  end

  def create_account(name:)
    @client.create('Account', Name: name)
  end

  def delete_account(id:)
    @client.destroy('Account', id)
  end
end
```

# Write a Spec in `spec/services/salesforce_service_spec.rb`

```ruby
require 'rails_helper'

RSpec.describe SalesforceService, type: :service do
  before do
    @service = described_class.new
  end

  describe 'Restforce Client' do
    before do
      @client = @service.client
    end

    it 'is not nil', focus: false do
      expect(@client).not_to be_nil
    end

    it 'can authenticate' do
      expect { @client.authenticate! }.not_to raise_error
    end

    it 'can execute a query to list users', focus: false do
      expect(@service.list_users.count).to be > 0
    end

    it 'can execute a query to list accounts', focus: false do
      res = @service.list_accounts
      puts res.first
      expect(res.count).to be > 0
    end

    it 'can find an account by Id', focus: false do
      id = '001ak00000W8ZRDAA3'
      name = 'Sample Account for Entitlements'
      res = @service.find_account(id:)
      expect(res['Id']).to eq(id)
      expect(res['Name']).to eq(name)
    end

    it 'can find an account by Name', focus: false do
      id = '001ak00000W8ZRDAA3'
      name = 'Sample Account for Entitlements'
      res = @service.find_account(name:).first
      expect(res['Id']).to eq(id)
      expect(res['Name']).to eq(name)
    end

    it 'can create and delete an account', focus: false do
      name = Faker::Company.name
      id = @service.create_account(name:)
      expect(id.length).to eq(18)
      res = @service.find_account(id:)
      expect(res['Id']).to eq(id)
      expect(res['Name']).to eq(name)
      @service.delete_account(id:)
      expect { @service.find_account(id:) }.to raise_error(Restforce::NotFoundError)
    end
  end

  describe 'Access Token' do
    before do
      @access_token = @service.request_access_token
    end

    it 'is 112 characters long' do
      puts @access_token
      expect(@access_token.length).to eq(112)
    end

    it 'matches a broad alphanumeric pattern' do
      expect(valid_token?(@access_token)).to be true
    end
  end

  def valid_token?(token)
    has_lowercase = token.match?(/[a-z]/)
    has_uppercase = token.match?(/[A-Z]/)
    has_number = token.match?(/\d/)
    has_special = token.match?(/[!@#$%^&*(),.?":{}|<>]/)

    has_lowercase && has_uppercase && has_number && has_special
  end
end
```
