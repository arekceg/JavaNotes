## EC2

- Elastic Compute Cloud
- IAAS - Infra As A Service
	- dostajemy `Instance` EC2 z systemem operacyjnym
- __Private service__
- EC2 domyślnie deployuje się pojedynczym subnecie VPC
	- **EXAM** w związku z tym EC2 jest `AZ Resilient`
	- bo każdy subnet istnieje w konteście jednego AZ
	- jak AZ padnie, pada subnet, pada EC2

4 składowe:
- CPU
- Memory
- Storage
	-	Local on-host storage
	- Elastic Block Store EBS
		- network storage do którego instance ma dostęp
- Networking

### EC2 State
Podstawowe:
- Running
	- włączona
	- Płacimy za wszystkie 4 składowe
-	Stopped
	- wyłączona (ale w każdej chwili można włączyć)
	- **EXAM** Jak EC2 jest Stopped to płacimy tylko za storage
-	Terminated
	- usunięta (nie można tego odwołać)
	- nie płacimy za nic (duh)

### AMI Amazon Machine Image
-	Może służyć do stworzenia instancji EC2
- Może być stworzony z instancji EC2

#### AMI Zawiera:
- AMI ma w sobie zdefiniowane permissions określające jakie konto może i nie może używać tego obrazu
	- Public - każdy może używać
	- Private (Implicit) - może używać tylko właściciel AMI
	- Explicit - można zdefiniować kto może używać tego AMI
- Zawsze zawiera `Boot Volume` czyli partycję z którego startuje system
- Block Device Mapping - okresla który volume AMI jest czym (np. który to Boot Volume)

### Łączenie z EC2
- Do autentykacji używana jest para kluczy
- Private key ściągamy i trzymamy u siebie
- EC2 ma public key i dzięki niemu potwierdza naszą tożsamość
- Możemy kliknąć prawą myszką na jakimś EC2 na liście i wybrać `Connect`

#### Windows
- Używamy private key aby dostać hasło admina i jego używamy żeby zalogowac się na instancję
- Remote Desktop Protocol RDP
	- port 3389

#### Linux
- SSH
	-	port 22


### Tworzenie EC2
1. Stworzyć parę kluczy
	`EC2` -> `Key Pairs`
	 **EXAM** KeyName to nazwa KeyPair 
2. Stworzyć instancję
	`Instances` -> `Launch an instance`
3. W trakcie tworzymy nowy Secuity Group

### Usuwanie
1. RMB -> Terminate
2. Pamiętać żeby usunąć też Security Group


