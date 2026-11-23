---
id: app
type: namespace
parent: cluster
title: myapp
plane: k8s--kubernetes
fields:
  purpose: The application and its helpers
links:
- type: belongs-to
  to: cluster
---
Everything for one application, kept apart from others. Its name is calculated from its title and the environment code: myapp-prd. Change the title to your application's short name.
