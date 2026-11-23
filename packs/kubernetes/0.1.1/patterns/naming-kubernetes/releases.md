---
id: releases
type: name-pattern
title: Helm releases
parent: namespaces
plane: k8s--names
fields:
  scope: Helm releases
  pattern: '{installs/title}-{belongs-to/belongs-to/runs-in/^stands-for/value}'
  example: ops-prd
  case: kebab
  max-length: 53
links:
- type: describes
  to: k8s--type-release
---
Calculated for you: the title of the chart it installs and the environment code of the namespace it installs into, so two environments can install the same chart side by side. 53 characters at most, which is Helm's own limit.
