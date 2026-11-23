---
id: charts
type: name-pattern
title: Helm charts
parent: namespaces
plane: k8s--names
fields:
  scope: Helm charts
  pattern: '{title}'
  example: ops
  case: kebab
  max-length: 53
links:
- type: describes
  to: k8s--type-chart
---
The application's short name, lower case; title the chart with it and its handle is calculated. Helm limits a release name to 53 characters, and a chart name follows it.
