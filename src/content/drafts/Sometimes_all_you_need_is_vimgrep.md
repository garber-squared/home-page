---
layout: post
title:  "Sometimes all you need is vimgrep"
date:   "Tue Jul  8 11:50:06 AM EDT 2025"
tags: [vim,grep]
---
I wanted to look for a string within the `app/` subdirectory, and after looking around, I concluded that all I needed was vimgrep.

```
:vimgrep /your_pattern/ app/**/*.rb
:copen
```

Normally I'd use Telescope Live Grep, which searches across the whole project:

![Telegraph Live Grep](/assets/telegraph_live_grep.png)

But even then, I'd take that to a quickfix list and use `:cfdo`:

![Quickfix Replace](/assets/quickfix_replace.png)

So it turns out that all I really need is simple `vimgrep`:

```vim
:vimgrep /your_pattern/ app/**/*.rb
:copen
```
