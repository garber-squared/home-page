---
layout: post
title:  "BASH Script for Kazam"
date:   "Sat Apr 20 12:38:08 AM EDT 2024"
tags: [bash,script,workflow]
---
I like Kazam as a screencast recorder, but it insists on saving to ~/Videos rather than my chosen subdirectory. A small hashtag#bash script solves the problem:

Using a `for loop` iterate through the latest recordings and move each one into the desired subdirectory, with a suitably incremented basename.

```sh
#!/bin/bash

video_dir=~/Videos
kazam_dir="$video_dir/Kazam_Screencasts"

for VIDEO in $(ls ~/Videos/Kazam_screencast*.mp4)
do
  number=$(basename $(ls $kazam_dir -v1 | tail -n 1) ".mp4" | grep -o '[0-9]\+')
  new_number=$((10#$number + 1))
  printf -v new_number "%05d" "$new_number"
  new_basename="Kazam_screencast_$new_number.mp4"
  mv $VIDEO "$kazam_dir/$new_basename"
done
```

![Bash Script for Kazam](/assets/mvkazav_script.jpeg)
