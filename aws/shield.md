# AWS SHIELD

- DDOS Protection
- Standard (free) lub Adavanced ($$$)
- Chroni przed:
	- Volumetric Attacks (L3)
	- Protocol Attacks (L4)
	- Application Layer Attacks (L7)

# Shield Standard
- Darmowe
- Ochrona na granicy regionu lub VPC
- Chroni przed atakami L3 i L4
- Dobre dla R53, CF, Global Accelerator

# Shield Advanced
- 3000$ / month / org 
- 1 year lock-in
- Chroni wszystko co Standard + Load Balancery + EIPs
- Trzea explicite włączyć
- Cost protection jeżeli Shield nie obroni nas przed atakami
- Proactive Engagement (?)
- AWS Shield Response Team
- Chroni przed atakami L7 (Application Layer) przez integrację z WAF
- Real time metryki o eventach i atakach DDOS
- Health-based detection, śledzenie zdrowia apek
- Protection groups 
	- agregat na zasoby którym przydzielamy konkretny sposób ochrony
