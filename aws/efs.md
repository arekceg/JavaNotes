# EFS Elastic File System

- Zewnętrzne systemy plików które mogą być współdzielone między instancjami EC2 i istnieją niezależnie od ich lifecycle
- Private service, istninieje w konteście VPC w którym został stworzony 
- Mogą być dostępne z on-prem używająć VPN lub DX

- Dostęp do EFS odbywa się przez `mount targets` które istnieją wewnątrz subnetów VPC
- **EXAM** Żeby zapewnić HA dla EFS powinien istnieć `mount target` w każdym subnecie danej VPC
- **EXAM** EFS działa tylko pod Linuxem
- **EXAM** EFS ma dwa tryby - General Purpose i Max I/O
- **EXAM** EFS ma dwa tryby throughputu - Bursting i Provisoned. Przy provisoned określamy wymagania odnośnie throughputu oddzielnie od wymagań odnośnie ilości storage
- **EXAM** EFS ma dwie klasy dostępu - Standard i Infrequent Access (IA)
- **EXAM** EFS ma, jak S3, Lifecycle Policies któro może zautomatyzować przenoszenie danych między klasami


# AWS Backup
- Może być Cross-account, cross-region (używa Control Tower, IAM Organizations)
- Wspiera wiele AWSowych produktów których bakapy mogą byc centralnie zarządzane przez AWS Backup

## Konfiguracja
1. Backup Plans - frequency, window, lifecycle, vault, region copy
	- Niektóre produkty wspierają continous backup, dzięki temu można zrestorować serwis do konkretnego momentu w czasie
	- Lifecycle - kiedy backup przechodzi do cold storage a kiedy expiruje
		- w cold storage backup musi leżeć coanjmniej 90dni
2. Resources
	- Co ma być bakappowane
3. Valuts
	- gdzie bakapy będą przechowywane
4. Vault Lock - Write Once Read Many
	- po 72h nikt, nawet AWS, nie może usunąć nic z Vaulta
5. On-Deman backup
	- nie tylko schedulowane Backup Plany
6. PITR
	- Point In Time Recovery

