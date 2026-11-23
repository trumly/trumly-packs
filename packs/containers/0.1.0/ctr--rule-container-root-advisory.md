---
id: ctr--rule-container-root-advisory
type: rule
title: Root needs a reason
fields:
  name: Root needs a reason
  statement: Containers should not run as root unless there is a reason
  severity: info
  applies_to:
    type: container
    runs-as-root: true
  pack: containers@0.1.0
---
Advisory only. Some containers, such as log agents that read host files, genuinely need root. This flags them so the reason is a conscious decision; record it in the node's body.
