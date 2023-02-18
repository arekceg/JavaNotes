# AWS DataSync

- Data Transfer Z lub DO AWS
- Migracje, Transfer Danych, Archiwizacja, DR/BC
- Zachowuje metadane plików!
- Built-in data validation
- Pay as you use / GB
- Huuuge scale

# Architektura

- Musi być zainstalowany lokalnie na on-premie np. w VMWare
- Komunikuje się bezpośrednio z SAN/NAS używająć NFS/SMB
- Transfery danych schedulowane
- TLS in-transit
- Dane trafiają np. do S3, EFS, FSx
- Umie throttlować bandwidth 
- Bi-directional, incremental transfer

# Składowe
- Task:	
	- "job" do wykonania
- Agent:
	- software do zapisywania/odczytywania danych z on-premu
- Location:
	- FROM i TO
