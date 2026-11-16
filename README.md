# AUDP — ASPF Unified Device Protocol

Public concept site for **AUDP**, by **Agriculture Service of Product Farm (ASPF)**.

AUDP is a protocol family for agricultural devices: sensors, controllers, and gateways exchanging **small, frequent messages** over constrained links. The problem it exists to solve is one every modern farm depends on: **data that arrives complete and correct**, from the sensor in the field to the decision that uses it.

This repository is information. It does not contain the private core, wire formats, or internal specifications.

© 2026 Sbruice Singh / Agriculture Service of Product Farm (ASPF). All rights reserved. Proprietary — not open source. See [LICENSE](LICENSE).

## The problem

Field devices send small messages over radio, long cables, and shared or congested channels. Interference flips symbols. Bursts wipe runs of bytes. Weak signals leave values unknown. Asking again is often slow, costly, or impossible.

A missing reading is visible. A corrupted reading that still parses is not. Irrigation, a controller, and a research series will treat it as fact. AUDP is being built so that path refuses to treat damage as data.

## What ASPF is building

| Piece | Role |
| --- | --- |
| **AUDP** | The protocol family. How devices agree to speak when the link cannot be trusted. |
| **[AUDP-ECM](https://sbruices.github.io/AUDP-ECM-Website/)** | The error-correction engine. Detect, correct inside a proven budget, recover, then verify. |
| **[AUDP-DSP](https://agriculture-service-of-product-farm.github.io/AUDP-DSP-Website/)** | Software-defined signal processing for research on measurements that can be believed. |

A value moves in that order: the device speaks AUDP, ECM decides whether the frame can be recovered, only a verified payload goes onward, and DSP studies the signal.

## Public mathematics (AUDP-ECM)

Already described in public. These handle **channel noise**. They do not authenticate a sender and they do not stop a deliberate attacker.

- **Reed–Solomon over GF(256).** Corrects `e` unknown symbol errors and `s` erasures when `2e + s ≤ n − k`. The public Python shape is `ReedSolomon(31, 23)`.
- **Binary BCH.** Bit-level correction for bit-oriented links.
- **CRC-16/CCITT-FALSE.** Residual detection after decoding. A CRC detects; it does not repair.
- **Burst-resilient framing.** Interleaving so a contiguous wipe can fall inside the correction budget.

Bindings, under licence, not an open-source release of the core:

- Python — <https://github.com/SbruiceS/AUDP-ECM-Python>
- D — <https://github.com/SbruiceS/AUDP-ECM-D>

## Principles

- **Mathematics first** — proven coding theory rather than black-box hardware.
- **Correctness you can check** — every recovered value is verified before it is used.
- **Safety by design** — memory-safe software, strict input validation, continuous testing.
- **Honest scope** — error correction protects against noise, not attackers.

## Where it is used

Soil moisture, temperature, humidity, water and crop monitoring. Farm telemetry over radio, long cables, and shared channels. Distributed field devices, gateways, and firmware links. Constrained networks where retransmission is slow, costly, or impossible. Machinery condition signals. Research handoff from aerial and remote platforms into AUDP-DSP.

## People and contact

**Sbruice Singh** — researcher and developer of AUDP-ECM at ASPF.

Licensing, research collaboration, and private vulnerability reports: [sbruicesingh@haclon.in](mailto:sbruicesingh@haclon.in).

## This site

This repository is a [Jekyll](https://jekyllrb.com/) site. GitHub Pages builds it when the source is **Deploy from a branch**, branch `main`, folder **`/ (root)`**.

The pages state the public concept model. They are not a specification you can implement the private protocol from.
