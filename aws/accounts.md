## AWS ACCOUNTS

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

