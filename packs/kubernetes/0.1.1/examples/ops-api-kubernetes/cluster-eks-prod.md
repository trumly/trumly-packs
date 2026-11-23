---
id: cluster-eks-prod
type: cluster
title: Production cluster
plane: k8s--kubernetes
fields:
  distribution: eks
  version: '1.31'
links:
- type: runs-in
  to: cloud-service-eks
- type: runs-in
  to: environment-production
---
The production Kubernetes cluster, provided by Amazon EKS.
