---
id: k8s--type-release
type: type
title: release
fields:
  name: release
  plane: k8s--helm
  description: Use for one installed copy of a chart in a particular namespace, with its own settings.
    The same chart installed in test and in production is two releases.
  fields:
  - name: chart-version
    kind: text
  - name: values-file
    kind: text
    label: Settings file
  pack: kubernetes@0.1.1
---
**Ask:** Which chart and version? Into which namespace? Which settings differ from the defaults?

Link it to the chart with `installs` and to its namespace with `belongs-to`. One chart can have a release per environment.
