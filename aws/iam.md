# IAM

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
- IAM nie potrafi kontrolować co może a czego nie user z **zewnętrznego** konta
- IAM pozwala na korzystanie z `Identity Federation` i `MFA`
- Dobrą praktyką jest używanie root usera tylko do stworzenia konta a potem używanie konta w stylu `IAM Admin` które ma też szerokie uprawnienia, ale w przeciwieństwie do konta root można je ograniczyć w razie potrzeby

## AWS ACCOUNTS

-	Konto AWS to **kontener** na `identities` i `resources`
	-	`identity` to może być user, group lub role
		jedno konto może mieć wiele identities, np dla każdego z developerów pracujących w obrębie danego konta
	- `resources` to zasoby dostępne dla danego identity

- Każde konto ma `root` identity
	-	`root` ma pełny dostęp do całego kota i nie można tego ograniczyć!

- Warto mieć wiele kont AWS w zależności od klienta, środowiska, zespołu itd
	-	 dzięki temu jak ktoś borknie jedno konto to są inne konta które cały czas działają 

## MFA

-	`Security Credentials` -> `MFA` -> `Activate MFA`

## Principal
- Pojęcie AWS oznaczające **coś** lub **zbiór cosi** potrzebujących uzyskać dostęp do konta AWS

### Authentication
- Principal musi się autentykować przez IAM
	- username i password
	lub
	- Access Keys
- Po autentykacji Principal staje się `Authenticated Identity`

### Authorization
- Po autoryzacji i sprawdzeniu Policy AWS wie jakie Policy Statement łączą się z tą Identity więc wie jakie ma dostępy

## IAM User
- Mapuje sie na jednego użytkownika danego konta, np. jednego devleopera lub jedną aplikację 
- IAM Users are an identity used for anything requiring **long-term** AWS access e.g. Humans, Applications, Service Accounts
- **EXAM** Jeżeli mamy dać dostęp do konta **jednej, konkretnej** rzeczy którą potrafimy nazwać to w 99% przypadków chodzi o identity IAM User
- **EXAM** Konto może mieć max 5000 IAM Userów (per konto, nie per region)
- **EXAM** Jeżeli musimy dać dostęp do konta dużej ilości użytkowników lub pozwolić na rejestrację się z internetu to nie wolno używać IAM User bo wyczerpiemy to 5000 szybko
- **EXAM** IAM User może byc członkiem maksymalnie 10 grup


## IAM Group
- Zbiór userów
- **EXAM** Nie da się zalogować do IAM Group, jest to tylko kontener na IAM Users
- **EXAM** Jeden IAM User może być członkiem wielu (max 10) IAM Group
- **EXAM** Domyślnie nie istnieje jedna _all users_ IAM Group która zawiera wszystkich IAM Userów
- **EXAM** IAM Groupy nie są nestowalne, nie można mieć grupy w grupie
- **EXAM** Konto domyślnie może mieć max 300 IAM Groups, ale można to zwiększyć support tiketem
- **EXAM** IAM Group is **not** a `true identity` and cannot be referenced as a `principal` in a policy - do roli czy do usera mozemy dostać konkretny ARN, a do grupy **nie**. W związku z tym IAM Policy przypięte do jakiegos zasobu (Resource Policy) nie będzie w stanie odnieść się do konkretnej IAM Group (bo odnosi się do IAM Identity po ARN)

- Grupy mogą mieć wiele IAM Policy podpięte, i Inline Policy i Managed Policy

## IAM Role
- **EXAM** IAM Role służy do szczegółowego nadawania uprawnień dla **nieznanej** ilości principali
- Używane przez różne AWS Serwisy
- Może umożliwić dostęp do konta z zewnątrz - Role mogą być przypisywane nie tylko do userów ale do serwisów też. np. można nadać EC2 rolę która pozwoli na dostęp do S3
	-	Np. Możemy nadać Lambdzie `Lambda Execution Role` która ma Trust Policy takie że może być nadawana lambdom
	- Taka rola jest przydzielana lambdzie w momencie jej wykonania i na czas jej wykonania - w takim wypadku całe Runtime Environment Lambdy przymuje rolę Foo i używa tymczasowych credentiali do wykonania operacji
- IAM Role jest też używany jako coś tymczasowego - na pewien czas otrzymujes rolę `Foo` a potem już nie 
	- np. Apka mobilna dostaje jakąś IAM Role na moment requestu, strzela do AWS jako Rola `Foo` a potem już tej roli nie ma
- IAM Role nie reprezentuje **czym** jest principal, ale mówi o dostępach jakie ma wewnątrz AWS
- **EXAM** IAM Role to **real identity** czyli może być referncowana przez ARN

- IAM Role ma dwa typy IAM Policy:
	1.	Trust Policy
		-	Określa co i kto może przyjmować raną IAM Role
		- Do przyjęcia roli używana jest operacja `sts:AssumeRole` (STS - Security Token Service) i STS generuje Temporary Security Credentials
		- Jeżeli principal może przyjąć rolę Foo to AWS generuje Temporary Security Credentials dla principala
		- Te credentiale umożliwiają dostęp do zasobów zdefiniowanych w Permissions Policy
		- Dzięki Temporary Security Credentials unikamy konieczności hardkodowania kredek np. w Lambdach, Lambda pobiera tymczasowe kredki przy każdym wywołaniu
	2.	Permissions Policy

### Break Glass Situation
- Sytuacja awaryjna kiedy nagle, na krótki czas, potrzeba userowi nadać dodakowe uprawnienia
- IAM Role sie tu przydają bo nie trzeba modyfikować uprawnień usera, user może po prostu przyjąć rolę z większymi uprawnieniami, ugasić pożar i wrócić do swoich standarowych uprawnień

### IAM Role i External Identities (ID Federation)
- IAM Role mogą służyć do nadania uprawnień do zasobów AWS zewnętrznym Identities, np. kontom Google, Facebook itd
- Takie External Identities nie mogą mieć bezpośredniego dostepu do zasobów AWS

### Obsługa dużej ilości userów aplikacji mobilnej (Web Identity Federation)
- Używanie IAM Role do obsługi dużej ilości użytkowników
- Użytkownicy używają istniejących zewnętrznych Identity

### Service-linked IAM Role
- IAM Role przypisana do danego serwisu, predefiowana przez ten serwis
-	Zapewnia uprawnienia których potrzebuje ten serwis żeby komunikować się z innymi serwisami AWS
-	Tworzona przez serwis automatycznie w momencie jego tworzenia lub ręcznie przez usera
- Nie można manualnie usunąć Service-Linked IAM Role

### IAM PassRole
- Umożliwia pozwolenie IAM Userowi na przypisywanie istniejących ról serwisom
- Role te mogą mieć większe uprawnienia niż ten IAM User
- https://blog.rowanudell.com/iam-passrole-explained/

## Tworzenie IAM Admin

- Wchodzmy w `IAM`
- Mamy tam `Sign-in URL for IAM users in this account` czyli URL którego będą używali userzy IAM do logowania się na to konto AWS
	- Możemy zrobić alias temu linku (musi być globally unique)
- `Users` -> `Add users`
- Przy tworzeniu usera możemy mu od razu nadać hasło i albo go zmusić do zmienienia przy pierwszym logowaniu (policy `IAMUserChangePassword`) albo przypisać mu od razu stałe hasło
- Jako permissions dajemy `AdministratorAccess`
- Potem możemy się zalogować używając stworzonego loginu przez wyżej stworzony alias albo przez globalną stronę AWS

## ACCESS KEYS
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

### Tworzenie Access Keys
- `Security Credentials` -> `Create Access Key`

## IAM Identity Policies (IAM Policy)
- Zestaw dostępów/zabronień dostępu do serwisów AWS
- Muszą być podłączone do konkretnych User, Group lub Role 
- Pozwalają na szczegółowe ustawienie polityk dostępu do zasobów AWS
- Definicja Policy to JSON
- Policy musi posiadać 1 lub więcej `Statement`

### Statement
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

### Inline Policy
- Policy nadawane każdego userowi z osobna
- Dla trzech userów powstają wtedy 3 oddzielne policy
- Używane tylko w wyjątkowych wypadkach kiedy np. dla jednego usera musimy nadać lub odebrać uprawnienia 
- Dodawane np. przez `Add inline policy` w zakładce `Permissions` dla danego usera

### Managed Policy
- Policy tworzona _raz_ i przypisywana potem do różnych identities
- Reusable
- Low Management Overhead
- Powinny być używane `for normal, default operation rights`
- Dodawane np. przez `Add permissions` w zakładce `Permissions` dla danego usera

### Service Control Policy
- Specjalny tym IAM Policy któro jest nadawane częsciom IAM Organization
- Może być nadane organization-wide, per Organization Unit lub nawet per konto w organizacji
	-	Propaguje się wgłąb organizacji, tzn jeżeli OU któremu nadajemy SCP ma w sobie pomniejsze OU to SCP odniesie się do nich też
- Samo z siebie **nie nadaje i odejmuje uprawnień** ale określa **jakie uprawnienia możemy i nie możemy nadać przez IAM Policy**
	- SCP Defines account permissions boundaries
	- Określa granice uprawnień dla zwykłych userów i dla root userów **też**
		(Root User ma **zawsze** nieograniczone uprawnienia do wszystkiego co można zrobic na koncie, ale SCP ogranicza **co** można zrobić na koncie)
- **SCP NIE DZIAŁA NA MANAGEMENT ACCOUNT**

#### Allow list vs Deny list
**Deny List**
- Allow by default, block selected services
- Defaultowa opcja
	- AWS nadaje organizacji Policy `FullAwsAccess`

**Allow List**
- Block by default, allow selected services
1.	Usunąć domyślną `FullAwsAccess` Policy
2.	Dodać nową SCP z konkretnymi allowami

#### Aktywowanie SCP
1.	AWS Organizations
2.	Policies
3.	SCP -> Enable SCP
4.	AWS Accounts -> Klik na wybrane OU -> Policies -> Attach Policy
