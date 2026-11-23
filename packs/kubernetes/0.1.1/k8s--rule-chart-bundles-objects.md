---
id: k8s--rule-chart-bundles-objects
type: rule
title: Charts bundle something
fields:
  name: Charts bundle something
  statement: Every chart bundles at least one object
  severity: warn
  applies_to:
    type: chart
  check:
    require_link:
      min: 1
      type: bundles
  pack: kubernetes@0.1.1
---
**Fix:** add `bundles` links to the workloads, services and config the chart contains.
