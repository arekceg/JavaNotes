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
- **EXAM** `Global Service` - baza danych IAM jest wspólna dla wszystich regionów itd dla danego konta AWS
- IAM do którego mam dostęp jest konkretną instacją tylko dla mnie, odseparowaną od innych kont AWS
- Konto AWS ma **full trust** do swojej instancji IAM
	-	IAM ma wszystkie permissiony które ma root user
	- Jak damy identity nowe permissiony to przez to że IAM zarządza tym identity - konto pozwala tej identity korzystać z nowych permissionów
- IAM pozwala tworzyć trzy różne typy identity
	-	`user`
	-	`group`
	-	`role`
- `Least privilaged access` - maksymalne ograniczenie dostępu pojedycznego identity
- **EXAM**  IAM ma trzy główne zadania: 
	- ID Provider -`IDP`, pozwala na tworzenie, modyfikowanie lub usuwanie identities
	- Authentication Process - autentykacja crednetiali agenta logującego się do AWS
		- po autentykacji agent staje się Authenticated Identity
	- Authorize - pozwala lub nie na dostęp do zasobów i serwisów AWS
- IAM nic nie kosztuje
- IAM nie potrafi kontrolować co może a czego nie user z __zewnętrznego__ konta
- IAM pozwala na korzystanie z `Identity Federation` i `MFA`
- Dobrą praktyką jest używanie root usera tylko do stworzenia konta a potem używanie konta w stylu `IAM Admin` które ma też szerokie uprawnienia, ale w przeciwieństwie do konta root można je ograniczyć w razie potrzeby

### USER
- Mapuje sie na jednego użytkownika danego konta, np. jednego devleopera lub jedną aplikację 

### GROUP
- Zbiór userów

### ROLE
- Służy do szczegółowego nadawania uprawnień dla __nieznanej__ ilości agentów
- Używane przez różne AWS Serwisy
- Może umożliwić dostęp do konta z zewnątrz
- Role mogą być przypisywane nie tylko do userów ale do serwisów też. np. można nadać EC2 rolę która pozwoli na dostęp do S3

### POLICY
- Zestaw dostępów/zabronień dostępu do serwisów AWS
- Muszą być podłączone do konkretnych User, Group lub Role 

### Tworzenie IAM Admin

- Wchodzmy w `IAM`
- Mamy tam `Sign-in URL for IAM users in this account` czyli URL którego będą używali userzy IAM do logowania się na to konto AWS
	- Możemy zrobić alias temu linku (musi być globally unique)
- `Users` -> `Add users`
- Przy tworzeniu usera możemy mu od razu nadać hasło i albo go zmusić do zmienienia przy pierwszym logowaniu (policy `IAMUserChangePassword`) albo przypisać mu od razu stałe hasło
- Jako permissions dajemy `AdministratorAccess`
- Potem możemy się zalogować używając stworzonego loginu przez wyżej stworzony alias albo przez globalną stronę AWS