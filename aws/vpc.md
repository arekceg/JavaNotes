## VPC

- Virtual Private Cloud
- **EXAM** VPC są Regionally Ressilient
- VPC istenieją w konteście jednego konta i jednego regionu
- VPC domyślnie są prywatne i odizolowane
	-	serwisy wewnątrz jednego VPC mogą się komunikować ale żadna komunikacja nie może wyjść z zewnątrz ani z zewnątrz przyjść

- Są dwa typy VPC
	- Default
		- **EXAM** może istnieć tylko 1 per region
		- są skonfigurowane w bardzo konkretny sposób
		- mniej flexible niż customy
	- Custom
		- wymagają szczegółowej konfiguracji
		- domyślnie są prywatne

### Default VPC
- Jedna per region
	- można ją usuąć i stworzyć ponownie
	- nie tworzymy przez `Create VPC` tylko przez `Actions` -> `Create Default VPC`
- Niektóre serwisy wymagają żeby default VPC istniał
- CIDR zawsze `172.31.0.0/16`
- W każdym AZ regionu tworzona jest mniejszy, `/20` subnet
- Domyślnie ma:
	- Internet Gateway IGW
	- Security Group SH
	- Network ACL NACL
- Subnety defaultowego VPC są skonfigurowane tak że cokolwiek tam jest dostanie publiczny adres IP

### VPC CIDR (Classless Inter-Domain Routing)
- Lista adresów IP dostępna dla serwisów wewnątrz VPC
- Definiowana używając prefixu, np. `10.0.0.0/16` 
- Customowe VPC mogą mieć wiele CIDR, domyślny ma tylko jeden - `172.31.0.0/16`

### VPC Subnety
- Każdy subnet musi być przypisany do konkretnej Availibility Zone i nie można tego zmienić
- Default VPC ma od razu gotowe subnety w każdym AZ dostępnym dla regionu
	-	Jeżeli padnie jeden AZ to pada tylko ten subnet, wszystkie pozostałe działają O K 

