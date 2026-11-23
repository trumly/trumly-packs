---
id: mcp--rule-tool-name-fits
type: rule
title: Tool names fit 64
fields:
  name: Tool names fit 64
  statement: A tool's name as a client shows it is at most 64 characters
  severity: warn
  applies_to:
    type: mcp-tool
  check:
    field_is:
      handle:
        max_length: 64
        optional: true
  pack: mcp@0.1.0
---
**Why:** the model API limits a tool name to 64 characters, and the client name includes the server's name as well as the tool's.

**Fix:** shorten the server's title or the tool's title.
