---
layout: post
title:  "Project Wide Find and Replace in Neovim"
date:   "Sat Apr 20 12:52:59 AM EDT 2024"
tags: [vim,workflow]
---
A good tutorial on project-wide find-and-replace in Neovim
https://lnkd.in/e8Jhsh2q

Summary:

- Use telescope to find (grep) the things
- Send the things to the Quickfix list (CTRL+Q)
- Use cfdo command to change the string to what you want and update all the files:

`cfdo %s/stringOne/stringTwo/g | update | bd`
