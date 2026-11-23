---
id: k8s--rule-release-installs-chart-in-namespace
type: rule
title: Releases install one chart
fields:
  name: Releases install one chart
  statement: Every release installs one chart into one namespace
  severity: error
  applies_to:
    type: release
  check:
    require_link:
    - min: 1
      type: installs
      max: 1
      node_type: chart
    - min: 1
      type: belongs-to
      max: 1
      node_type: namespace
  pack: kubernetes@0.1.1
---
**Fix:** add an `installs` link to the chart and a `belongs-to` link to the namespace.
