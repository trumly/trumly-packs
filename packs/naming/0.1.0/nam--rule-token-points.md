---
id: nam--rule-token-points
type: rule
title: Tokens stand for something
fields:
  name: Tokens stand for something
  statement: Every name token stands for a node or a type
  severity: warn
  applies_to:
    type: name-token
  check:
    require_link:
      min: 1
      type: stands-for
  pack: naming@0.1.0
---
**Why:** a token that stands for nothing is only a word. Calculated names read the token that stands for the node they are working out, so an unpointed token leaves that part of the name unworked out.

**Fix:** add a `stands-for` link from the token to the node it names (`prd` to the production environment, `euw2` to the London region, your workload short name to its component or datastore), or to a type when it names every node of that type (`db` to datastore). Point it at the node that already exists in the design; do not make a new one.
