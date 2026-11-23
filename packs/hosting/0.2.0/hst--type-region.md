---
id: hst--type-region
type: type
title: region
fields:
  name: region
  plane: hst--topology
  description: Use for a geographic location the system runs in, such as London or Virginia. The company that provides it is a cloud provider in the hosting pack.
  shape: folder 2d
  fields:
  - name: code
    kind: text
    label: Provider's own code, e.g. eu-west-2
  pack: hosting@0.2.0
---
