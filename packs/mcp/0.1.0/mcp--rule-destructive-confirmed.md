---
id: mcp--rule-destructive-confirmed
type: rule
title: Destructive tools confirmed
fields:
  name: Destructive tools confirmed
  statement: Every destructive tool says who confirms it, and it is not no one
  severity: warn
  applies_to:
    type: mcp-tool
    effect: destructive
  check:
    field_is:
      confirmation:
        in:
        - client-prompts
        - in-tool
  pack: mcp@0.1.0
---
**Why:** an agent can be wrong or be misled, and a deletion cannot be taken back.

**Fix:** set `confirmation` to `client-prompts` or `in-tool`, or make the tool a write that can be undone.
