# AWS Certificate Manager ACM

- Regional Service
- ACM jest Trusted Certificate Authority
- Może zarządzać i publicznymi i prywatnymi certyfikatami
- ACM może generować lub importować certyfikaty
- **EXAM** Certyfikaty generowane przez ACM są automatycznie odnawiane
- **EXAM** Certyfikaty importowane do ACM nie są automatycznie odnawiane
- **EXAM** ACM może udostępniać cerfytikaty tylko konkretnym, wspieranym serwisom AWS (głównie CloudFront i Application Load Balancery)
- **EXAM** Certyfikaty w ACM są region-bound, **Certyfikat i serwis które mają go użyć muszą być w tym samy regionie!!**
- **EXAM** WAŻNY WYJĄTEK - dla CloudFront ACM trzeba traktować jakby był odpalony w `us-east-1`
