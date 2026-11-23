---
id: release-ops-prod
type: release
title: Operations API (production)
plane: k8s--helm
fields:
  chart-version: 0.3.0
  values-file: values-prod.yaml
links:
- type: installs
  to: chart-ops
- type: belongs-to
  to: namespace-ops
---
The production install of the chart. A test environment would be a second release of the same chart.
