# AWS ORGANIZATIONS

- Sposób AWS na połączenie wielu kont w jedną organizację
- Tworzone przez jedno konto któro staje się `Management Account` (kiedyś `Master Account`)
- MA zaprasza inne konta do organizacji i stają sie one `Member Accounts`
- Można też tworzyć konta __od razu__ wewnątrz IAM Organizations

## `Consolidated Billing`
-	Wszystkie konta w organizacji współdzielą metodę płatności, Management Account staje się `Payer Account`
- Wykupione moce zasobów AWS  jak również zniżki z częstego używania zasobó są współdzielone w całej organizacji

## Struktura
- IAM Organization ma hierarchiczną strukturę
- Struktura składa się z `Organizational Units` - `OU`

### Organization Root
- Główny, top-level node organizacji
- Zawiera __wszytkie__ konta AWS w danej organizacji
- Może zawierać pomniejsze OU 

### Organizational Unit
- Podstawowa jednostka zarządzania strukturą IAM Organization
-	Może zawierać konta lub kolejne warstwy OU

### Schemat logowania
-	Kiedy używamy IAM Organization zmienia się trochę zalecany sposób logowania
- Zamiast logować się bezpośrednio na IAM Usera każdego z kont wewnątrz organizacji wszyscy logują się na jedno konto i potem uzywają rol żeby przałączać się między kontami wewnątrz organizacji

## Tworzenie organizacji
1.	AWS Organizations -> Create Organization
2.	Potem używając `Account ID` możemy zapraszać konta do organizacji
3.	AWS Organizations -> Add an AWS Account

- Jeżeli utworzymy konto wewnątrz organizacji to od razu tworzona jest rola na którą można się "logować" używając tego konta
- Jeżeli zaprosimy konto do organizacji to musimy dla niego stworzyć rolę ręcznie
Tworzenie IAM Role dostępnej dla głównego konta IAM Organization na koncie do którego chcemy dać dostęp:
1.	IAM -> Create Role -> AWS Account
2.	Jako `Another AWS account` wybieramy konto któro ma miec dostęp do obecnego konta
3.	Wybieramy `AdministratorAccess` jako IAM Policy -> Next
4.	Standardowa nazwa takiej roli to `OrgnizationAccountAccessRole`
5.	Potem możemy użyć `Switch Role`, podać nr konta do którego chcemy dostęp i nazwę roli którą stworzyliśmy i uzyskamy dostęp do tego konta 
	-	Pod maską AWS przydziela nam tą rolę używająć tymczasowych credentiali

## Dzielenie organizacji
1.	Wybrać `Root` lub inny OU który chcemy podzielić
2.	Action -> Create New
