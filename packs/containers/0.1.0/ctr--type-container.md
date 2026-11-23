---
id: ctr--type-container
type: type
title: container
fields:
  name: container
  plane: ctr--containers
  description: 'Use for one running instance of an image: the process, its limits and its ports. Model
    one per place the image runs, such as your laptop, a Kubernetes workload or a managed container service.'
  fields:
  - name: port
    kind: number
    label: Listening port
  - name: cpu-limit
    kind: text
  - name: memory-limit
    kind: text
  - name: runs-as-root
    kind: boolean
  - name: body
    kind: text
    label: Description
    required: true
  pack: containers@0.1.0
---
**Ask:** Which image does it run, and where? What are its limits? Does it need root?

Link it to its image with `runs` and to the one place it runs with `runs-in`: a host, a cloud service, or a workload when the kubernetes pack is added.
