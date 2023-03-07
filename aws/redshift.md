# REDSHIFT

- Petabyte-scale data warehouse as a service
- Provisioned (chwilę zajmuje stawianie go), używa konkretnych serwrów
- One AZ by default, w swojej własnej prywatnej sieci
- Leader node + compute nody
	- Leader: query input, agregacja danych
	- Compute: wykonuje query
- **EXAM** Redshift to OLAP db - Online Analitycial Processing (Column-based)
- **EXAM** Redshift zazwyczaj ładuje dane publicznymi routami, ale możemy mu włączyć Enchanced VPC Routing. Wtedy Redshift będzie używał naszej konfiguracji VPC, czyli nasze SG, NACL, VPC Gatewaye. Jeżeli musimy spełnić customowe wymagania konfiguracji networkingy przy Redshift to musimy włączyć Enchanced VPC Routing
- **EXAM** Dane do Redshift mogą być ładowane przez:
	- S3
	- DynamoDB 
	- DMS z innych DB
	- Firehose może streamowac dane 

- Redshift Specturm
	- Direct query through S3

- Federated Query
	- Direct query through other DBs

# Resilience and recovery
- Backupy w S3 (snapshoty)
	- Auto - co 8h/5GB
		- 1-35 day ret.
	- Manual 
		- no retention
- Backupy S3 cross-region
