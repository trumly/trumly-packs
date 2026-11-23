---
id: ctr--derived-reference
type: derived
title: Image reference
fields:
  name: reference
  label: Image reference
  description: The full reference of an image, the name a container pulls.
  template: '{stored-in/url}/{repository}:{tag}'
  applies_to:
    type: image
  enabled: true
  pack: containers@0.1.0
---
The ops-api image gives `123456789012.dkr.ecr.eu-west-2.amazonaws.com/ops-api:1.4.2`. An image with no repository, tag or registry address is reported incomplete.
