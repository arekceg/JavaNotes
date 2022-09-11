## IAM

- Identity and Access Management
- Służy do tworzenia dodatkowych indentities w ramach jednego konta
- Pozwala na ograniczanie dostępów różnym identities
	-	każda nowostworzona identity ma zupełnie ograniczony dostęp do konta AWS
- Aby nie-root identity miały dostęp do Billingu i Cost Management w ustawieniach konta root trzeba: 
	- znaleźć `IAM User and Role Access to Billing Information`
	- `Edit`
	- `Activate IAM Access`
- **EXAM** `Globally resilient service` - any data is always secure across all AWS regions
- IAM do którego mam dostęp jest konkretną instacją tylko dla mnie, odseparowaną od innych kont AWS
- Konto AWS ma **full trust** do swojej instancji IAM
	-	IAM ma wszystkie permissiony które ma root user
	- Jak damy identity nowe permissiony to przez to że IAM zarządza tym identity - konto pozwala tej identity korzystać z nowych permissionów
- IAM pozwala tworzyć trzy różne typy identity
	-	`user`
	-	`group`
	-	`role`


### USER
- Mapuje sie na jednego użytkownika danego konta, np. jednego devleopera lub jedną aplikację 

### GROUP
- Zbiór userów

### ROLE
- Służy do szczegółowego nadawania uprawnień dla __nieznanej__ ilości agentów
- Używane przez różne AWS Serwisy
- Może umożliwić dostęp do konta z zewnątrz
- Role mogą być przypisywane nie tylko do userów ale do serwisów też. np. można nadać EC2 rolę która pozwoli na dostęp do S3
