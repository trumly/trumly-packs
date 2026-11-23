---
id: mcp--derived-tool-handle
type: derived
title: Tool handle
fields:
  name: tool-handle
  field-name: handle
  description: The name a client shows for a tool, built from its server and its own title.
  template: 'mcp__{^offers/title}__{title}'
  applies_to:
    type: mcp-tool
  enabled: true
  pack: mcp@0.1.0
---
A server titled `ops` that offers a tool titled `list_jobs` gives `mcp__ops__list_jobs`. Clients show this name and the model API limits it to 64 characters, so a long server name and a long tool name can break the limit together.
