---
layout: post
title:  "BASH script: Functions and Conditionals"
date:   "Mon Apr 22 05:36:15 AM EDT 2024"
tags: [bash,workflow,cli]
---

```bash
#!/usr/bin/bash

latest_commit=$(git log origin/master --pretty=format:"%H" -n 1)
lastPosts=$(git diff-tree --no-commit-id --name-only -r $latest_commit)

publish_prompt() {
  local myPost="$1"
  glow "$myPost"
  cat "$myPost"
  echo "Publish to LinkedIn?"
  echo "1. Publish as is"
  echo "2. Publish a link with a short text"
  echo "No"
  read num
}

publish_post() {
  if [[ $num -eq 1 ]]; then
    echo "Publish body to LinkedIn as a micropost"
  elif [[ $num -eq 2 ]]; then
    echo "Prompt user for text, get body of post, micropost text with link"
  else
    echo "Never mind."
  fi

}

for myPost in $lastPosts; do
  publish_prompt "$myPost"
  publish_post
done
```
