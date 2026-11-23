---
id: registry-ecr
type: registry
title: Container registry
plane: ctr--containers
fields:
  url: 123456789012.dkr.ecr.eu-west-2.amazonaws.com
  visibility: private
links:
- type: runs-in
  to: cloud-service-ecr
---
Private registry for every image the system ships. Provided by Amazon ECR.
