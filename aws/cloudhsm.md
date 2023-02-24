# CloudHSM

- Podobne do KMS, zarządznie kryptografią i kluczami
- KMS to _shared service_ więc security issue
- **EXAM** CloudHSM to true **Single Tenant** Hardware Security Module
- AWS zarządza samym urządzeniem ale nie ma w ogóle dostępu do miejsca gdzie są składowane klucze
- **EXAM** CloudHSM jest zgodny ze standardem _FIPS 140-2 Level 3_ (KMS jest głównie L2).
- **EXAM** Jeżeli wymagamy standardu FIPS 140-2 L3 to albo CloudHSM albo zarządzane samodzielnie urządzenie on-prem urządzenie HSM
- **EXAMM** Dostęp do CloudHSM jest tylko używając industry-standard APIs. np. _PKCS#11_, Java Cryptography Exentsions _JCE_, M$ _CryptoNG_
- KMS może użyć CloudHSM jako `custom key store`
- CloudHSM jest deployowany do VPC zarzadznego przez AWS, nie mamy tam wjazdu - nie jest HA by default. Trzeba zdeployować do każdeo AZ i połączyć w klaster
- CHSM w klastrze automatycznie sie syncują
- **EXAM** CloudHSM nie integruje się natywnie z innymi produktami AWS, np nie można go użyć do Server-Side-Encryption S3
- **EXAM** CloudHSM może robić procesowanie SSL/TLS dla Web Serverów
- **EXAM** CloudHSM może być użyty żeby robić Transparent Data Encrytpion dla Oracle DB
- **EXAM** CloudHSM może być użyty żeby przechowywać private keye dla Issuing Certificate Authority CA
