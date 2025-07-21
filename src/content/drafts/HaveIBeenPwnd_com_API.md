---
layout: post
title:  "HaveIBeenPwnd.com API"
date:   "Thu Sep 12 03:14:13 PM EDT 2024"
tags: [api,rest,rails]
---

Refer to my previous post on the [Salesforce REST API]({% link _posts/2024-09-12-Connect_to_an_API.md %}) for a full Dockerized Rails setup.

Here is a wrapper for the "Have I Been Pwnd" API.

Note that the API key is in encrypted credentials and also in a private method so as not to be inadvertently exposed outside the Class.

```ruby
require 'uri'
require 'net/http'
require 'digest'

class HibpApi
  BASE_URL = 'https://haveibeenpwned.com/api/v3/'
  BREACHED_ACCOUNT_URL = "#{BASE_URL}/breachedaccount/"

  def pwnd_password?(password)
    base_url = 'https://api.pwnedpasswords.com/range'
    sha1_password = Digest::SHA1.hexdigest(password).upcase
    prefix = sha1_password[0, 5]
    suffix = sha1_password[5..-1]
    url = URI("https://api.pwnedpasswords.com/range/#{prefix}")
    response = Net::HTTP.get(url)

    found = false
    breach_count = 0

    response.each_line do |line|
      hash_suffix, count = line.split(':')
      next unless hash_suffix.strip == suffix

      Rails.logger.info "Password found #{count.strip} times."
      found = true
      breach_count += count.to_i
      break
    end

    Rails.logger.info('Password not been found in breach') unless found
    { found:, breach_count: }
  end

  def pwnd_email_account?(email:)
    found = false

    url = URI("#{BREACHED_ACCOUNT_URL}/#{email}")
    response = send_get_request(url)
    hsh_ary = JSON.parse(response.body)
    breaches = hsh_ary.pluck('Name')
    found = true if breaches.count.positive?

    { found:, breaches: }
  end

  private

  def api_key
    Rails.application.credentials[:hibp_api_key]
  end

  def send_get_request(url)
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true
    request = Net::HTTP::Get.new(url)
    request['hibp-api-key'] = api_key
    https.request(request)
  end
end
```

Here are the specs.

The email address is an environmental variable using `dotenv-rails`.

```ruby
# app/services/hibp_api.rb

require 'rails_helper'

RSpec.describe HibpApi do
  before do
    @service = described_class.new
  end

  describe 'Password' do
    it 'checks whether "password123" has been pwnd', focus: false do
      res = @service.pwnd_password?('password123')
      expect(res[:found]).to be true
    end
  end

  describe 'Email Account' do
    it 'checks whether personal account has been pwnd', focus: false do
      email = ENV.fetch('TEST_EMAIL_ACCOUNT', nil)
      res = @service.pwnd_email_account?(email:)
      expect(res[:found]).to be true
    end
  end
end
```
