---
id: nam--type-name-pattern
type: type
title: name-pattern
fields:
  name: name-pattern
  plane: nam--names
  shape: document
  description: 'Use for the template one kind of thing is named by, such as Azure resources or storage accounts. Write the value as ordinary text and put a name in curly brackets wherever something from the node should go, the same way a calculated value reads it: {field}, {link/field}, {^link/field}, {@type/name}. Attach it with describes to the types, plane or nodes it names.'
  fields:
  - name: scope
    kind: text
    label: What it names
    required: true
  - name: pattern
    kind: text
    label: 'Pattern, e.g. {title}-{runs-in/code}'
    required: true
  - name: example
    kind: text
    label: Example name
    required: true
  - name: case
    kind: choice
    values:
    - lower
    - upper
    - kebab
    - snake
    - camel
    - pascal
  - name: max-length
    kind: number
    label: Maximum length of the calculated name
  pack: naming@0.1.0
---
**Ask:** What would someone, or an agent, need to know to name a new one of these correctly first time?

One pattern per kind of thing. Write the value as ordinary text and put a name in curly brackets wherever something from the node should go: `{title}` is the node's own field (`title`, `id` or any field it has); `{runs-in/code}` follows the `runs-in` link and takes the `code` field of the node reached; `{^runs-in/code}` follows links that point at this node; `{@type/name}` reads from the node's type definition. A name token is reached the same way, for example `{runs-in/^stands-for/value}` for the code of the environment a node runs in. If a link reaches several nodes you get one value for each. Because it is written the way a derived value reads, a pattern can be carried out by a `derived` definition with the same text. Use `describes` to attach it to what it names, so an agent about to create one is shown it.

**Calculated names.** Where a name can be worked out from the graph, a `derived` definition called `handle` carries the pattern out and `details` it, so every node it applies to shows its handle and can be found by it. A pattern with no definition is guidance only, for example where the title already is the name. A node whose real name breaks the pattern sets `overrides` rather than changing the pattern.

**Watch:** limits the platform imposes belong in the fields, not just the body. `max-length` is the most characters the calculated name may have. It limits the result, it is not part of working the name out, and a rule can hold the calculated `handle` to it.
