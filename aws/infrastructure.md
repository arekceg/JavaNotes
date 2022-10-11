## Infrastructure

### Public vs Private Services
- Public i Private odnoszą się stricte do networkingu
	-	Public serwisy mogą być dostępne z zewnątrz, np. wystawiając endpoint
	- Private serwisy istnieją jedynie w VPC (Virtual Private Cloud)
- VPC domyślnie nie mogą ze sobą gadać i nie są dostępne z zewnątrz

- Networking AWS ma dwie strefy - Private i Public
	- Jest jeszcze trzecia, poza AWSem - Public Internet
- Strefa public też istnieje w seci AWS, nie jest hostowana bezpośrednio w publicznym Internecie, może jedynie wystawiać publiczne endpointy
- Nawet jeżeli użyjemy gatewaya do skomunikowania np. S3 (public) z EC2 (private) to komunikacja między nimi dzieje się wewnątrz AWS, traffic nie dotyka w ogóle publicznego internetu

## Global Infrastructure
### AWS Region
-	Miejsce gdzie jest hostowana infrastruktura AWS
- Każdy region jest niezależny od innego, więc np. problemy z datacenter w jednym regionie nie będą się propagować na inny

### AWS Edge Location
- Znacznie mniejsze niż Region, ale jest ich więcej
- Najczęściej służa do przechowywania kontentu

### Awailibility Zones AZ
- Podstrefy wewnątz regionu, np.
	- region Sydney to `ap-southeast-2`
	- ten region ma AZ:
		-	ap-southeast-2a
		-	ap-southeast-2b
		-	ap-southeast-2c
- Możemy skonfigurować że chcemy 6 serwerów, po 2 w każdym AZ - dzięki temu jak w regionie padnie datacenter to mamy zapasowe 4 serwry

### Service Resilience
#### Globally Resilient
-	Serwis który istnieje __jeden__ na całą infrastrukturę
- Dane przez niego używane są klonowane do wszystkich regionów
- Dla takich serwisów nie możemy wybrać regionu, region to `Global`
- np. IAM

#### Region resilient
- Serwisy które istnieją w kontekście jednego regionu

#### AZ Resilient
- Serwisy które istenieją w konteście jednego AZ

### ARN
- Amazon Resource Name
- __Unikalny__ identyfikator zasobu AWS w formacie:
	`arn:partition:service:region:account-id:resource`
- Dopuszcza wildcardy, dzięki temu możemy odnosić się do grupy zasobów
- Niektóre częsci ARN można opuścić kiedy nie mają znaczenia, np dla S3 (globalny serwis) opuszczamy region i konto
	`arn:aws:s3:::foo`
- Po zasobie można się jeszcze odnieść do konkretnych częsci zasobu, np
	`arn:aws:s3:::foo/*`
	- w tym wypadku odnosimy się do wszystkiego w buckecie `foo` ale nie do __samego__ bucketu `foo`

### **EXAM** Shared Responsibility Model

- AWS jest odpowiedzialny za bezpieczeństwo chmury
- Klient jest odpowiedzialny za bezpieczeństwo __w__ chmurze

### High Availibilty
- Aims to ensure an agreed level of operational performance, usually uptime, for a higher than normal period
- Nie oznacza to systemu __non stop__ dostępnego który nigdy nie pada
- Oznacza to system który jest __up__ tak często jak się da i który po padnięciu jest w stanie szybko się podnieść
- Maksymalizacja czasu kiedy system jest online
- Availiblity można przedstawiać np.
	- Three 9's - 99.9% availibility (8.77 h downtime na rok)
	- Five 9's - 99.999% availibility (5.26 min downtime na rok) 
- Np w wypadku failu jednego serwera przełączamy sie na drugi serwer
	- User może doświadczyć małej czkawki czy chwilowego przerwania dostaw usług i to jest ok

### Fault-Tolerance
- Property that enables a system to continue operating propertly in the event of the failure of some (one or more faults within) of its components
- System projektujemy tak żeby przerwał usterki bez przerywania dostawy usług
- HA się w tym mieści
- Np. kiedy korzystamy z dwóch serwerów jednoczesnie to jak jeden padnie to bez zatknięcia możemy dalej używać drugiego bez konieczności przepinania się 

### Disaster Recovery
- A set of policies, tools and procedures to enable the recovery or continuation of vital technology ifrastructure and systems following a natural or human-induces disaster
