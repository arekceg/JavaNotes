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
