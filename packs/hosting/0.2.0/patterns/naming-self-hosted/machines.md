---
id: machines
type: name-pattern
title: Machines
plane: hst--names
fields:
  scope: Virtual machines and servers you run yourself
  pattern: '{title}-{details/runs-in/^stands-for/value}'
  example: api-lab
  case: kebab
  max-length: 63
links:
- type: describes
  to: hst--type-cloud-service
---
Title the machine for the job it does (`api`, `db`) and its name adds the code of the environment it serves. Host names are DNS labels: lower case, digits and -, 63 characters at most. Provider-neutral, so it fits a home server, a rented server or a virtual machine anywhere.
