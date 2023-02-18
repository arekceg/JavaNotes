# FSx 

# FSx for Windows File Server

- Alternatywa dla EFS 
- Native windows file servers/shares
- Integruje się z Directory Service / Self-Managed Active Directory
- Single lub Multi-AZ tryby
- On-Demand i Scheduled bakups
- **EXAM** Jeżeli pytanie mówi coś o `native Windows file systems`, `active directory integration` itp to możliwe że chodzi o FSx
- Potrafi od ręki integrować się z on-prem Active Directory

**EXAM** Keywordy które wskazują na FSx
- VSS: user-driven restores
- Native Windows File Systems accesible via SMB
- Windows Permissions Model (FSx go ma)
- DFS - Distributed File System
- Managed Windows file server, w/o admin overhead
- Integracja z DS albo on-prem AD

# FSx for Lustre

- **EXAM** Lustre to filesystem zaprojektowany specjalnie pod High Performance Computing (Linux clients + **POSIX style permissions**)
- Dostępny przez VPN lub Direct Connect

## Typy deploymentu
1. Scratch
	- High performance
	- Low resilience 
	- Short term, temp workloads
	- **ZERO HA, ZERO REPLICATION**

2. . Persistent
	- Long-term storage
	- HA **in one AZ**
	- self-healing

Oba typy pozwalają na backupy danych do S3!

## Architektura
- File system może mieć podpięte repository S3 z którego dane są Lazy Loadowane do systemu 
- Nie ma automatycznego synchronizowania danych z FS do S3, trzeba użyć komendy `hsm_archive`

### Składowe
1. MST Metadata Stored on Metadata Targets
	- metadane plików, permisiony id
	- 1 per FSx
2. OSTs Object Storage Targets
	- Obiekty sa rodzielane między OST
	- Dzięki temu mamy wysoki perfomans
