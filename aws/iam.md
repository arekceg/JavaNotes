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

### AWS ACCOUNTS

-	Konto AWS to **kontener** na `identities` i `resources`
	-	`identity` to może być user, group lub role
		jedno konto może mieć wiele identities, np dla każdego z developerów pracujących w obrębie danego konta
	- `resources` to zasoby dostępne dla danego identity

- Każde konto ma `root` identity
	-	`root` ma pełny dostęp do całego kota i nie można tego ograniczyć!

- Warto mieć wiele kont AWS w zależności od klienta, środowiska, zespołu itd
	-	 dzięki temu jak ktoś borknie jedno konto to są inne konta które cały czas działają 

### MFA

-	`Security Credentials` -> `MFA` -> `Activate MFA`

### Principal
- Pojęcie AWS oznaczające __coś__ lub __zbiór cosi__ potrzebujących uzyskać dostęp do konta AWS

#### Authentication
- Principal musi się autentykować przez IAM
	- username i password
	lub
	- Access Keys
- Po autentykacji Principal staje się `Authenticated Identity`

#### Authorization
- Po autoryzacji i sprawdzeniu Policy AWS wie jakie Policy Statement łączą się z tą Identity więc wie jakie ma dostępy

### USER
- Mapuje sie na jednego użytkownika danego konta, np. jednego devleopera lub jedną aplikację 
- IAM Users are an identity used for anything requiring __long-term__ AWS access e.g. Humans, Applications, Service Accounts
- **EXAM** Jeżeli mamy dać dostęp do konta __jednej, konkretnej__ rzeczy którą potrafimy nazwać to w 99% przypadków chodzi o identity IAM User
- **EXAM** Konto może mieć max 5000 IAM Userów (per konto, nie per region)
- **EXAM** IAM User może byc członkiem maksymalnie 10 grup


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

### ACCESS KEYS
- Long Term Credentials 
	-	nie zmienjają się automatycznie
- hasło + login -> logowanie przez stronę
-	access keys -> api, cli
- Można stworzyć usera który ma mieć dostęp tylko przez konsolę i wteyd ma tylko Acces Key, bez hasła
		- Password is optional for IAM user
- IAM User może mieć **dwa** Access Keys, nie więcej
	- Dzięki temu możemy robić podmianę Access Keys, czyli stworzyć nowy zestaw, podmienić jego wartość np. aplikacji i potem zdeaktywować stary
- Access Keys mogą być tworzone, usuwane, aktywowane i dezaktywowane

- Access Keys to para kluczy:
	1. Access Key ID 
	2. Secret Access Key (wyświetlane tylko raz, przy tworzeniu pary!!!)

#### Tworzenie Access Keys
- `Security Credentials` -> `Create Access Key`


### IAM Identity Policies 
- Pozwalają na szczegółowe ustawienie polityk dostępu do zasobów AWS
- Definicja Policy to JSON
- Policy musi posiadać 1 lub więcej `Statement`

#### Statement
- Głównym elementem Statementu jest połączenie Action + Resource
- W momencie wykonania danej Action na danym Resource sprawdzany jest Statemento

Składowe:
- `Sid`
	- Opcjonalne pole
	- Pozwala nazwać / opisać statemen
-	`Action`
	-	Jedna lub wiele akcji których dotyczy Statement
	- Dopuszcza wildcardy
- `Resource`
	-	Zasób / zasoby na którym akcję definiujemy
	- Dopuszcza wildcardy
-	`Effect`
	- `Allow` lub `Deny`
	- Mówi czy dopuszczamy wykonanie danej akcji na zasobie czy nie 

Overlap:	Jeżeli jeden Statement daje Allow na szeroki zakres zasobu a drugi Deny na mniejszy obszar tego samego zasobu
Priorytetyzacja w takim wypadku:
`Deny, Allow, Deny`
-	Explicit DENY
	- Jeżeli robimy `Deny` na jakąkolwiek część zasobu to nie ma do niej dostępu, koniec kropka
- Explicit ALLOW
	-	Jeżeli zrobimy explicite `Allow` na jakiś zasób to będzie on dostępny
	- Chyba że na ten zasób istnieje już explicite `Deny`
- Default DENY
	- AWS Identities domyślnie zaczynają nie mając w ogóle dostepów do zasobów AWS
	- Więc jeżeli nie zrobimy explicte `Allow` to Identity nie będzie miała dostępu do danego zasobu

Jeżeli User ma jakieś Policy, jest w grupie która ma Policy i próbuje uzyskać dostep do zasobu który ma ustawione Policy to AWS łączy te wszystkie Policy ze sobą i tak określa ostateczne uprawnienia. Zasada `Deny Allow Deny` obowiązuje niezależnie od ilości zagregowanych Policy

#### Inline Policy
- Policy nadawane każdego userowi z osobna
- Dla trzech userów powstają wtedy 3 oddzielne policy
- Używane tylko w wyjątkowych wypadkach kiedy np. dla jednego usera musimy nadać lub odebrać uprawnienia 

#### Managed Policy
- Policy tworzona _raz_ i przypisywana potem do różnych identities
- Reusable
- Low Management Overhead
- Powinny być używane `for normal, default operation rights`
