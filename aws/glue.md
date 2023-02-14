# AWS GLUE

- Serverless ETL (Extract, Transform, Load)
	- wcześniej do tego służyl Data Pipeline
	- **EXAM** Jezeli pytanie egzaminacyjne mówi o _ad-hoc, serverless, cost-effective_ trzeba wybrać Glue zamiast DataPipelie
- Przenosi i modyfikuje dane 
- Potrafi crawlować data sourcy i tworzyć AWS Glue Data Catalog

- Sources: S3, RDA, JDBC, DynamoDB, Streamy
- Targets: S3, RDS, JDBC

## AWS Glue Data Catalog
- "Persistent metadata about data sources in region"
- Jeden katalog / region / konto
- używa crawlerów z odpowiednimi uprawnieniami 
