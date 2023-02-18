# AWS Transfer Family

- Managed file transfer service - trasfer Z i DO S3 i EFS
- Pozwala na komnuikację z S3 i EFS używając standardowych, popularnych protokółów:
	- FTP
		- Tylko VPC-Internal
	- FTPS
	- SFTP
	- AS2 Applicability Statement 2
		- VPC-Internal/Internet
- Dla FTP i FTPS można używać tylko Directory Service lub Custom Identity Providerów

- MFTW - Managed File Transfer Workflows
- Multi-AZ
- $$ Server/hour  + data trasnfered

# Architekrura

- Tworzymy Transfer Family Servers, stanowią one pośrednik między klientem a S3/EFS
- Typy endpointów:
	- Public
	- VPC-Internet
	- VPD-Internal

## Public
- Endpoint śmiga w publicznej strefie AWS, publicznie dostępny
- Tylko SFTP
- Dynamiczne IP

## VPC-Internet VPC-Internal
- Wewnątrz VPS
- SFTP i FTPS
	- Internal: dodatkowo FTP
- Dostępne przez VPN/DX
- Static IP
	- VPC-Internet dostaje ElasticIP
- Dostępne SG i NACL
