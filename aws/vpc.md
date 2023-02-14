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
- **Stateless** Firewall dla subnetu
- Kontroluje dane inbound i outbound z subnetu
- Nie kontroluje przepyłwu danych między zasobami subnetu
- **EXAM** NACL pozwalają na explicit allow i explicit deny komunikac
- **EXAM** Rules są procesowane w kolejności, od najniższego `Rule Number`
- **EXAM** Domyślnie VPC są tworzone z defaultowym NACL który ma implicit DENY na wszystko i explicit ALLOW na wszystko. Domyślnie więc cała komunikacja jest otwarta
- **EXAM** Każdy **customowy** NACL zaczyna z implicit DENY na wszystko - cała komunikacja jest zamknięta
- **EXAM** NACLe nie wiedzą nic o logicznych zasobach AWS, tylko IP, CIDRY, porty i protokoły
- **EXAM** NACL do zabraniania komunikacji, Security Group dla otwierania komunikacji
- **EXAM** Każdy subnet ma jeden NACL, każdy NACL może mieć wiele subnetów

## 13. Security Groups SG
- **Statefull** jakby firewall
- **EXAM** Nie pozwala na **explicic deny**, pozwala tylko na implicit deny i explicit allow. Nie można blokować dostępu dla konkretnych IP używając SG
- **EXAM** SG operują na IP/CIDR ale też potrafią odnosić się do konkretnych logicznych zasobów AWS, innych SG albo nawet __samego siebie__. Referencowanie samego siebie pozwoli na komunikację między różnymi instancjami tej samej apki w ramach tej samej VPC
- **EXAM** SG nie są podpięte bezpośrednio pod instacje zasobów logicznych, ani pod subnety, są podpięte pod ENI Elastic Network Interfaces. **SG są zawsze podpięte pod network interfaces**
    - np. jak SG `FOO` ma allow zasadę z  `source` ustawionym na  SG `BAR` to wtedy wszystko co ma podpiętą SG `BAR` będzie mogło sie komunikować przez SG `FOO`

## 14. NAT Network Address Translation, NAT Gateway
- NAT służy podmienie adresów IP w pakietach danych 

### 14.1. IP Masquerading
- Przypisywanie prywatnemu zakresowi CIDR **jednego** publicznego adresu IP.
- **Działa tylko dla outgoing komunikacji** 

### 14.2. NAT Gateway
- Pozwala na IP Masquaraing
- **EXAM** NAT Gateway musi istniec w **publicznym subnecie** i mieć przydzielony publiczny adres IP
- Instancje w prywatnym subnecie strzelają do NATG w publicznym subnecie i potem NATG strzela przez IGW do publicznego internetu
- **EXAM** NAT Gateway jest **AZ resilient**
    - **EXAM** Żeby NAT Gateway był region resilient to trzebaby stworzyć NATG w każdym AZ i dla każego prywatnego subentu w każdym AZ stworzyć Route Table kierujące na ten NATG
- **EXAM** NAT Gateway używa Elastic IP
- **EXAM** Przed NAT Gateway były NAT Instances działające na instancjach EC2. EC2 domyślnie blokuje traffic który jako source lub destination nie ma tego EC2. Żeby EC2 mogło działać jako NAT Instnace trzeba **wyłączyć Source/Destination Checks** 
- **EXAM** W większości pytań egzaminowych NAT Gateway >> NAT Instance, ale NAT Instance może być tańszy 
- **EXAM** Nie można podpiąć Security Group pod NAT Gateway, tylko NACL
- Jak routujemy traffic na NATGW to route table musi mieć podpięte __wszystkie__ prywatne subnety danej AZ??

### 14.3. NAT Instance
- Instancj EC2 która robi NAT
- **EXAM** NAT Instance jest normalną instancją EC2 więc może mieć przypisaną Security Group, być multitaskowana jako bastion czy używana do post forwardów, NAT Gateway nie. 

### 14.4. IPv6 a NAT 
- **EXAM** IPv6 nie wymaga NAT, wszystkie adresy IPv6 mogą być po prostu publiczne. Wystarczy zrobić route od `::/0` do IGW

# VPC Flow Logs
- Przechwytują metadane pakietów (source IP, dest IP itp) dla połączeń:
	- ACCEPTED
	- REJECTED
	- ALL
- Monitory można zapiąć na:
	- VPC
	- Subnet
	- pojedyncze ENI
- Nie są realtime!

# Egress-Only Internet Gateway
- NAT zapewnia outbound-only dla IPv4
- IPv6 domyślanie w AWS są publiczne in-and-out
- Egress-Only zapewnia outbound-only traffic dla IPv6
- Architektonicznie tak samo jak przy IGW
	- HA by default across all AZs
	- Istenieje zapięty na VPC

# VPC Endpoints

## VPC Gateway Endpoints
- Privade access to S3 or DynamoDB
- Pozwala private service albo service wewnątrz private-only VPC na komunikację z S3 lub DynamoDB
- Dzięki niemu prywatny zasób ma dostęp do publiczne serwisu np. S3 ale nie ma dostępu do reszty publicznego internetu
- Tworzy sie per-service per-region
- **EXAM** VPC Gateway Endpoint jest HA na wszystkich AZ w danym regionie, nie przypisujemy go do konkretnego subnetu, przypisujemy do VPC i wybieramy które subnety ma obsługiwać
- Endpoint policy określa do czego gateway ma dostęp
- **EXAM** VPC Gateway Endpoint jest accesible jedynie z VPC do którego został przypisany
- **EXAM** Endpoint Policy służy do definiowania zachowania Gateway i Interface Endpointów
- **EXAM** Gateway Endpoints używają prefix list i route tables do zarządzania trafficiem

## VPC Interface Endpoints
- Provide private access to AWS Public Services
- **EXAM** VPC Interface Endpoints sa dodawane do konkretnego Elastic Network Inteface w danym subnecie wewnątrz VPC, nie są HA by default
- Interface Endpoints używają tylko TCP lub IPv4
- Uzywają **PrivateLink**
- **EXAM** Private DNS pozwala nadpisać defaultowy URL serwisu tak żeby wskazywał na prytwany IP naszego Interface Endpointu

# VPC Peering
- **EXAM** VPS Perring to direct encrypted link between **two VPCs**
- możliwośc Cross-region + cross-account
- Jak mamy peering w tym samym regionie go przy konfiguracji SG możemy się odwołać bezpośrednio do SG drugiego VPC
- **EXAM** VPC Peering nie jest _transitive_ czyli nie można ich chainować. VPC A -> VBC B -> VBC C nie oznacza połączenia VPC A -> VPC C
- Po obu stronach Peera trzeba odpowiednio skonfigurować routing
- **EXAM** VPC Peering nie może być użyte kiedy mamy konflikt w CIDR dwóch VPC
