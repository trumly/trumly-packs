---
id: sdr--pack
type: pack
title: Runtime
fields:
  name: runtime
  namespace: sdr
  version: 0.2.0
  description: 'Deep module: how the system behaves under load and failure. Service level objectives,
    the capacity it is sized for and how it can fail. Rules are errors: a service with an objective needs
    a way to know it is missed, and every failure mode needs a mitigation.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - component
  use-when: 'When you need to say how well the system must behave: its objectives, the load it is sized
    for and how it can fail.'
  requires:
  - core@^1.0.0
---
