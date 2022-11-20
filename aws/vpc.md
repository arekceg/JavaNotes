# VPC

- Virtual Private Cloud
- **EXAM** VPC są Regionally Resilient i związane z konkretnym regionem
- VPC istenieją w konteście jednego konta i jednego regionu
- VPC domyślnie są prywatne i odizolowane
	-	serwisy wewnątrz jednego VPC mogą się komunikować ale żadna komunikacja nie może wyjść z zewnątrz ani z zewnątrz przyjść

- Są dwa typy VPC
	- Default
		- **EXAM** Może istnieć tylko 1 Default VPC per region
		- są skonfigurowane w bardzo konkretny sposób
		- mniej flexible niż customy
	- Custom
		- wymagają szczegółowej konfiguracji
		- domyślnie są prywatne

## 1. Default VPC
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

## 2. VPC CIDR (Classless Inter-Domain Routing)
- Lista adresów IP dostępna dla serwisów wewnątrz VPC
- Definiowana używając prefixu, np. `10.0.0.0/16` 
- Customowe VPC mogą mieć wiele CIDR, domyślny ma tylko jeden - `172.31.0.0/16`
- VPC moze miec max /16 adresow, min /28

## 3. VPC Subnets
- Każdy subnet musi być przypisany do konkretnej Availibility Zone i nie można tego zmienić
- Default VPC ma od razu gotowe subnety w każdym AZ dostępnym dla regionu
	- Jeżeli padnie jeden AZ to pada tylko ten subnet, wszystkie pozostałe działają O K 
- Serwisy AWS nie działają bezpośrednio w VPC tylko właśnie w tych subnetach
- **EXAM** VPC Subnet nie może nachodzić na inne subnety

### 3.1. Reserved IP Adresy
1.  Network Address 
    - Pierwszy adres IP danej sieci
2.  Network +1
    - Drugi adres IP sieci
    - VPC Router
3.  Network +2
    - DNS
4.  Network +3
    - Zarezerwowany na przyszłość
5.  Network Broadcast Address
    - Ostatni adres sieci

### 3.2. DHCP
- Każdy VPC ma konfigurację DHCP w formie DHCP Option Set i ta konfiguracja odnosi sie też do subnet


## 4. Default vs Dedicated Tenancy
- Określa czy zasoby hostowane w ramach VPC są hostowane na współdzielonym hardwarze czy dedykowanym
- Jak wybierzemy Defualt to można potem per-resource wybrać jak mam być hostowane
- Jak wybierzemy Dedicated to **wszystkie** zasoby stworzone w tym VPC będą hostowane na dedykowanym sprzęcie ($$$$ drogo!!!!)

## 5. DNS
- Każdy VPC ma dedykowany DNS używający Route 53
- Adres DNSa to podstawowy adres VPC + 2
    - VPC: 10.0.0.0 -> DNS: 10.0.0.2
- **EXAM** `enableDnsHostnames` po włączeniu wszystkie zasoby mające publiczny dostęp w VPC będa miały przydzielony Host Name
- **EXAM** `enableDnsSupport` włączenie / wyłączenie DNS dla VPC

## 6. VPC Router
- Istnieje w każdym subnet, na adresie +2 i zarządza traffikiem między subnetami

### 6.1. Route Tables
- Route table danego subnetu konfiguruje VPC Routera i decyduje co się dzieje z traffikiem po tym jak opuści subnet
- Domyślnie używa `Main` route table, ale można zdefiniować swoje
- **EXAM** VPC Router musi mieć tylko jedną route table podpiętą, ale jedna route table może być podpięta 0 lub więcej subnetów
- **EXAM** Im wyższy prefix adresu w route table tym większy priorytet ma:
    request np do 10.0.1.1. wskoczy w route 10.0.0.0/16 a nie 10.0.0.0/8
- Po stworzeniu Route Table musimy ja skojarzyć z subnetem - `Subnet Association`

## 7. Internet Gateway IGW
- **EXAM** Internet Gateway jest `Regionally Resilient` więc nie trzeba instancji IGW w każdym AZ, jedna instancja IGW zapewni funkcjonalność dla wszystkich AZ w regionie
- **EXAM** IGW działa z poziomu AWS Public Zone, rozsyła traffic między VPC a Internetem lub serwisami z AWS Public Zone (np. S3, SQS)
- **EXAM** Kiedy przypisujemy zasobowi w VPC publiczny adres IP to w IGW pojawia się wpis mapujący prywatny adres IP zasobu na adres publiczny. **Konfiguracja publicznego adresu IP nie dotyka nawet zasobu** - wszystko się dzieje w IGW. np. instancja EC2 z publicznym adresem IP nie wie o tym adresie i `ipconfig` wewnątrz instancji będzie pokazywał tylko prywatny IP
- **EXAM** IGW podmienia prywatny IP w `Source Address` każdej paczki danych na publiczny adres IP. Kiedy paczka wraca to jako `Destination` ma ten public IP który wskazuje na IGW. IGW mapuje ten adres na prywany adres zasobu i wysyła go wgłąb VPC
- **EXAM** dla IPv6 IGW tylko przekazuje traffic do VPC bo wszystkei adresy IPv6 zasobów wewnątrz VPC to adresy publiczne
- IGW Tworzy się podpinając go pod konkretny VPC

## 8. Bastion Host / Jumpbox
- Wejścia do zabezpieczonych, prywatnych VPC
- Można np ograniczyć dostęp do VPC tylko dla niektórych adresów IP czy użyć on-premise autentykacji 
- Podobno są na to teraz lepsze sposoby niż Bastion
- Bastion to instancja EC2 stworzona wewnątrz danego subnetu

## 10. Tworzenie publicznych subnetów
1.  Stworzyć IGW dla danego VPC
2.  Stworzyć route table, podpiąć pod subnet
3.  Przekierować domyślny ruch w subnecie na IGW
    0.0.0.0/0 i ::/0 -> IGW
4.  Włączyć automatyczne przydzielanie adresów IPv4
    Subnet -> Actions -> Subnet Settings -> Enable auto-assign IPv4

## 11. Stateful vs Stateless Firewal

### 11.1. Stateless
- Firewall nic nie wie o szczegółach połączenia, widzi połączenie TCP jako dwa oddzielne połączenia - jedno `INBOUND` a drugie `OUTBOUND`
- Na oba połączenia trzeba robić oddzielne zasady
- Więcej admin overhead

### 11.2. Stateful
- Firewall jest na tyle mądry że potrafi skojarzyć response z requestem więc wystarczy tylko jeden rule
- Wystarczy stworzyć rule na request
- Mniej admin overhead

## 12. NACL Network Access Control List
- Stateless Firewall dla subnetu
- Kontroluje dane inbound i outbound z subnetu
- Nie kontroluje przepyłwu danych między zasobami subnetu
- **EXAM** NACL pozwalają na explicit allow i explicit deny komunikac
- **EXAM** Rules są procesowane w kolejności, od najniższego `Rule Number`
- **EXAM** Domyślnie VPC są tworzone z defaultowym NACL który ma implicit DENY na wszystko i explicit ALLOW na wszystko. Domyślnie więc cała komunikacja jest otwarta
- **EXAM** Każdy **customowy** NACL zaczyna z implicit DENY na wszystko - cała komunikacja jest zamknięta
- **EXAM** NACLe nie wiedzą nic o logicznych zasobach AWS, tylko IP, CIDRY, porty i protokoły
- **EXAM** NACL do zabraniania komunikacji, Security Group dla otwierania komunikacji
- **EXAM** Każdy subnet ma jeden NACL, każdy NACL może mieć wiele subnetów
