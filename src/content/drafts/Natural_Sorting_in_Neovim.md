---
layout: post
title:  "Natural Sorting in Neovim"
date:   "Wed Jan  8 02:02:34 PM EST 2025"
tags: [vim sort]
---
To achieve natural numeric sorting (`1`, `2`, `3`, `10`) in Neovim, you can use a custom sorting command rather than the default `:sort u`, as it performs a lexicographical sort by default.

Select the lines you want to sort in visual mode (`v` or `V`):

```vim
:'<,'>!sort -n
```

- `!sort -n` pipes the selected lines to the Unix `sort` command with numeric sorting (`-n` flag).

---

### **Method 2: Add a Key Mapping**

If you often need this, you can add a custom key mapping to your Neovim configuration file (`~/.config/nvim/init.lua` or `lua/custom/mappings.lua` for NVChad users).

Add this snippet:

```lua
vim.keymap.set('v', '<leader>sn', ":'<,'>!sort -n<CR>", { noremap = true, silent = true })
```

- **Usage**: In visual mode, press `<leader>sn` to sort selected lines numerically.
