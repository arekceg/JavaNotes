# AWS Directory Service

- `Directory` służy do przechowywania obiektów sieciowych w strukturze odwróconego drzewa (nazywane `domain` lub `tree`)
	- np. Userzy, Grupy, Share itd
- AD DS (Microsoft Active Directory Domain Services) - propritery
- SAMBA - Open Source
- AWS DS to AWSowa implementacja. AWS DS jest dla AD DS tym czym RDS dla baz danych 
- AWS DS działa w VPC 
- Directory stowrzone w AWS może być
	- isolated: istnieje tylko na AWS
	- zintegrowane z on-premowymi directory
	- jedynie _proxy_ istniejących on-premowych directory

## Simple AD Mode
- Oparte na SAMBA 4 (Open Source)
- Small (max 500 userów)
- Large (max 5000 userów)
- Tylko isolated, nie potrafi się integrować z on-prem 

## AWS Managed Microsoft AD
- Używa dosłownie Microsoft AD
- Może się integrować z on-prem używając **secure** connection (tunele IPSec). AWSowe Directory jest zawsze Primary. 
- Wybieramy kiedy używamy apek wymagających MS AD DS  

## AD Connector
- Proxy on-premowego directory
- Używając VPN możemy nakierować AD Connector na on-premowe direcotry i używać jego zawartośći 
