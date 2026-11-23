---
id: k8s--derived-chart-handle
type: derived
title: Chart handle
fields:
  name: chart-handle
  field-name: handle
  description: A chart is named by its title.
  template: '{title}'
  applies_to:
    type: chart
  enabled: true
  pack: kubernetes@0.1.1
---
Title the chart with the application it installs (`ops`).
