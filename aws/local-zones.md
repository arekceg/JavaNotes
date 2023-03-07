# AWS Local Zones

- Local Zone to mini-region AWS 
- Każdy LZ ma swój parent–region, np:
	- `us-west-2-las-1`
	- `us-west-2-lax-1a`
	- `us-west-2-lax-1b`
- VPC mozna rozszerzyć na konkretne LZ i tam tworzyć subnety i zasoby
- **EXAM** Local Zony mają private networking z Parent Regionem
- Jeżeli np. zrobimy snapshot EC2 z Local Zone to zostanie on stworzony na S3 w Parent Regionie
- **EXAM** Local Zone nie mają wbudowanej resillience, 1 zona to 1 zona
- Nie wszystkie produkty to wspierają i wiele ma konkretne ograniczenia
- **EXAM** Local Zones dają highest performance przez bliskość geograficzną
