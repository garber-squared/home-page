---
layout: post
title:  "Post to LinkedIn with Python"
date:   "Sun Apr 21 02:18:10 PM EDT 2024"
tags: [python,linkedin,api,workflow]
---
In this video I will present the script that I use to micro-post to LinkedIn from the command line.  For longer posts and articles I still use the LinkedIn UI, but for those little titbits that I want to shoot off without breaking my workflow, this command-line Python tool works a treat.

I will start at the end, with the entity that the LinkedIn API expects:
a POST request to the endpoint `POST https://api.linkedin.com/rest/posts` the body of which is a JSON Object containing at least the following:

- author
- commentary (the text of the post)
- visibility
- distribution
- lifecycleState

The API documentation mentions other optional parameters.

As you can see, this is the end product of the Python script.

Back to the beginning of the script.

The script contains a Class simply called LinkedIn and relies on the LinkedIn Python API library.

When instantiated, it prepares the following instance variables:

```python
self.userinfo_resource = "/userinfo"
self.posts_resource = "/posts"
self.api_version = "202404"
self.load_credentials()
self.access_token = self.get_access_token()
self.restli_client = self.load_restcli_client()
self.userinfo = self.get_userinfo()
```

It loads the credentials, that is to say the access token, either as a system variable or from the .env file.
Then it instanties the load_restcli_client using the API library.
Then it uses this library to retrieve the necessary information about the user associated with the access token (me), from which it instructs the identification string for the URN, which is a necessary parameter for the POST request.

Using the restcli client again, it sends a POST request with all the required parameters and receive a response object, which can be used to log the success or failure of the API call.

It is important to explicitly note the API version (at the time of writing April 2024), because non-versioned calls have been deprecated.

Finally, the script ends with a `main block`, which either takes a command line argument `ARGV1` for the text of the post or prompts the user to enter the desired text on the command line.

This allows for automating posts by piping the output of prepared text files, but as I mostly use it for micro-posting I usually bash out a few words in the terminal prompt.
