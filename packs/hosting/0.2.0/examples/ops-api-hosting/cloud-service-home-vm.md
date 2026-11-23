---
id: cloud-service-home-vm
type: cloud-service
title: Virtual machine
plane: hst--hosting
fields:
  service: KVM virtual machine
  kind: compute
links:
- type: runs-in
  to: cloud-provider-home-server
- type: runs-in
  to: environment-lab
- type: details
  to: component-ops-api
- type: in-region
  to: region-home-lab
---
Runs a development copy of the API. Swap it for any virtual machine or bare server and nothing in the design changes.
