---
layout: post
title:  "Vim and FZF function"
date:   "Thu Nov 21 02:36:39 PM EST 2024"
tags: [vim,bash,scripting]
---
A function to open a file anywhere in the `$HOME` folder from anywhere and to jump right back to where you were.

```bash
vimf () {
  current_directory=$(pwd) 
  cd $HOME 
  fzf_res=$(fzf)
  echo $fzf_res 
  res_dir=$(dirname $fzf_res) 
  res_basename=$(basename $fzf_res) 
  cd $res_dir 
  vim $res_basename
  cd $current_directory
}
```
