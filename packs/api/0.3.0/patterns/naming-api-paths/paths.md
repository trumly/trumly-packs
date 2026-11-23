---
id: paths
type: name-pattern
title: API paths
plane: api--names
fields:
  scope: API endpoint paths
  pattern: '/v{major}/{operates-on/title}'
  example: /v1/work-orders
  case: kebab
links:
- type: describes
  to: api--type-api-endpoint
- type: describes
  to: api--type-api-resource
---
`<resources>` is the resource name in the plural, in kebab case. A single item adds its id (/v1/work-orders/:id); nest at most one level (/v1/work-orders/:id/notes). Actions that are not create, read, update or delete go last as a verb (/v1/work-orders/:id/close). Guidance only: the endpoint's path field is the path.
