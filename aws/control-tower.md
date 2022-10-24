# AWS CONTROL TOWER

- Narzdzie do setupowania środowisk multi-account
- Synchronizuje działania wielu serwisów, m.in. AWS Organizations, IAM Identity Center itd
- Pod maską używa CloudFormation więc przy uzywaniu AWS Control Tower zobaczymy że tworzą się staki CloudFormation

## Landing Zone
- Część AWS Control Tower służaca do właściwego zarządznia multi-accountowym środowiskiem
- Używa IAM Identity Center (aka. AWS SSO) żeby zaimplementować SSO i ID Federation
- Userzy końcowi mogą zlecać tworzenie nowych kont używając `Service Catalog`

### Home Region
- Region w którym zdeplojowaliśmy produkt
-	Używania innych regionów można zabronić, ale Home Region jest zawsze dostepny

## Guard Rails
-	`Detect/Mandate rules/standards across all accounts`
Trzy poziomy:
- Mandatory
	- Zawsze włączone
-	Strongly Recommended
	-	Polecane
-	Elective

Typy:
-	Preventive
	-	Zapobiegają robieniu rzeczy
	-	Używają SCP pod maską
-	Detective
	- Użwayją AWS CONFIG Rules
	- Upewnia się że konfiguracje wewnątrz kont AWS są zgodne ze zdefiniowanymi przez nas standardami
	- Statusy:
		- Clear
		- In Violation
		-	Not Enabled

## Account Factory
-	Automatyzacja i standaryzacja tworzenia nowych kont
- Może być używana przez adminów lub end userów (z odpowiednimi uprawnieniami)
- Guardrailsy są automatycznie dodawane
- Admini lub członkowie naszej organizcji mogą mieć nadane adminowe uprawnienia do tak stworzonych kont
-	Każde konto jest tworzone wg. `baseline` lub `cookie-cutter` konfiguracji i każdo ma domyślne konfiguracje:
	- Account Baseline (template)
	- Network Baseline (template)

## Dashboard
- Pozwala na wgląd w strukturę tego czym zarządza AWS Control Tower

## Architektura
- Główna część AWS Control Tower operuje Wewnątrz Management Account
-	W ramach tego samego konta AWS Organizations tworzy dwa OU:
	- Foundational OU (default name: Security)
	- Custom OU (default name: Sandbox)
- Wewnątrz Foundational OU tworzone są dwa konta
	-	Audit Account
		- Konto do informacji audytowych generowanych przez AWS Control Tower
		- SNS
		- CloudWatch
	-	Log Archive Account
		- Konto któro pozwal na read-only wgląd do logów ze wszystkich kont stworzonych przez procesy i serwisy Control Tower we wszystkich kontach do niej należnych
		- Używa AWS Config, AWS CloudTrail
		- Trzeba **explicie** nadać uprawnienia żeby móc sie dostać do tego konta

### Account Facotory
