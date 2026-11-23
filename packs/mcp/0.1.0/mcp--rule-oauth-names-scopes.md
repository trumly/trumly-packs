---
id: mcp--rule-oauth-names-scopes
type: rule
title: OAuth names its scopes
fields:
  name: OAuth names its scopes
  statement: Every OAuth setup lists its scopes
  severity: warn
  applies_to:
    type: mcp-auth
    scheme: oauth
  check:
    require_fields:
    - scopes
  pack: mcp@0.1.0
---
**Why:** broad or unstated scopes mean an agent gets more than the task needs.

**Fix:** list the scopes, with a narrow read scope separate from write and destructive ones.
