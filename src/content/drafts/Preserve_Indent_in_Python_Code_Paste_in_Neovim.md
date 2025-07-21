---
layout: post
title:  "Preserve Indent in Python Code Paste in Neovim"
date:   "Fri Jun 27 12:32:58 PM EDT 2025"
tags: [python,vim]
---
I was frustrated by the fact that when I pasted Python code into Neovim, it would not preserve the indentation of the code.

```python
local M = {}

-- Normalize indentation from clipboard, and reindent to match current line
function M.paste_with_indent()
  local indent_width = vim.fn.indent('.')
  local expandtab = vim.bo.expandtab
  local shiftwidth = vim.bo.shiftwidth
  local indent_str

  if expandtab then
    indent_str = string.rep(" ", indent_width)
  else
    indent_str = string.rep("	", math.floor(indent_width / shiftwidth))
  end

  local raw = vim.fn.getreg('+', 1, true)
  local lines = type(raw) == "string" and { raw } or raw

  -- Find smallest common leading indent
  local function get_min_indent(lines)
    local min_indent = nil
    for _, line in ipairs(lines) do
      if line ~= "" then
        local current_indent = line:match("^(%s*)")
        if current_indent then
          local len = vim.fn.strdisplaywidth(current_indent)
          if not min_indent or len < min_indent then
            min_indent = len
          end
        end
      end
    end
    return min_indent or 0
  end

  local common_indent = get_min_indent(lines)

  -- Strip common leading spaces/tabs and apply new indent
  for i, line in ipairs(lines) do
    if line ~= "" then
      -- Strip the common indent (preserves alignment of multiline blocks)
      lines[i] = indent_str .. line:sub(common_indent + 1)
    end
  end

  vim.api.nvim_put(lines, 'l', true, true)
end

return M
```
