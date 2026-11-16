---
id: sdr--rule-failure-mitigated
type: rule
title: Failures have a mitigation
fields:
  name: Failures have a mitigation
  statement: Every failure mode has a mitigation
  severity: error
  applies_to:
    type: failure-mode
    impact: outage
  check:
    require_link:
      type: mitigated-by
  pack: runtime@0.2.0
---
