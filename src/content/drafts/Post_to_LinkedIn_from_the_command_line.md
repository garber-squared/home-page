---
layout: post
title:  "Post to LinkedIn from the command line"
date:   "Sun Apr 21 06:57:34 AM EDT 2024"
tags: [python,api]
---
Source code available from my [Gist](https://gist.github.com/clockworkpc/c311d4aea82d8b5adc27bbb6382455ee) too.

```python
from dotenv import load_dotenv, find_dotenv
from linkedin_api.clients.restli.client import RestliClient
import json
import os
import sys

"""
 ACCESS_TOKEN must available either as a system variable
 or in .env in the same folder as this script

 In order to generate the access token, you have to register a LinkedIn app.
 If this is news to you, start here:
 https://www.linkedin.com/developers
"""


class LinkedIn:
    def __init__(self, text=None):
        self.userinfo_resource = "/userinfo"
        self.posts_resource = "/posts"
        self.api_version = "202404"
        self.load_credentials()
        self.access_token = self.get_access_token()
        self.restli_client = self.load_restcli_client()
        self.userinfo = self.get_userinfo()
        self.text = text

    def load_credentials(self):
        sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
        load_dotenv(find_dotenv())

    def get_access_token(self):
        access_token = os.getenv("ACCESS_TOKEN")
        if access_token is None:
            raise Exception("No access token in .env")
        return access_token

    def load_restcli_client(self):
        restli_client = RestliClient()
        restli_client.session.hooks["response"].append(lambda r: r.raise_for_status())
        return restli_client

    def get_userinfo(self):
        userinfo = self.restli_client.get(
            resource_path=self.userinfo_resource, access_token=self.access_token
        )
        print(f"Successfully fetched profile: {json.dumps(userinfo.entity)}")
        return userinfo

    def create_post(self, commentary):
        posts_create_response = self.restli_client.create(
            resource_path=self.posts_resource,
            entity={
                "author": f"urn:li:person:{self.userinfo.entity['sub']}",
                "commentary": commentary,
                "lifecycleState": "PUBLISHED",
                "visibility": "PUBLIC",
                "distribution": {
                    "feedDistribution": "MAIN_FEED",
                    "targetEntities": [],
                    "thirdPartyDistributionChannels": [],
                },
            },
            version_string=self.api_version,
            access_token=self.access_token,
        )
        print(
            f"Successfully created post using /posts: {posts_create_response.entity_id}"
        )


if __name__ == "__main__":
    text = sys.argv[1] if len(sys.argv) > 1 else input("Text for post: ")
    linkedin = LinkedIn()
    linkedin.create_post(text)
```
