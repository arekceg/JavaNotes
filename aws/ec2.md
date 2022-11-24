# EC2

- Elastic Compute Cloud
- IAAS - Infra As A Service
	- dostajemy `Instance` EC2 z systemem operacyjnym
- __Private service__
- EC2 domyślnie deployuje się pojedynczym subnecie VPC
	- **EXAM** w związku z tym EC2 jest `AZ Resilient`
	- bo każdy subnet istnieje w konteście jednego AZ
	- jak AZ padnie, pada subnet, pada EC2
- Działają na EC Hosts
- Instancja może zmienić EC Host jeżeli:
    - Zastopujemy i ponownie włączymi instację
    - Host padnie 
    - Host jest zdjęty z powodów maintenencowych
- Nawet jak instnacja zmieni Host to i tak zostanie w tym samym AZ

4 składowe:
- CPU
- Memory
- Storage
	- Local on-host storage
	- Elastic Block Store EBS
		- network storage do którego instance ma dostęp
        - **EXAM** EBS istnieje jak jak EC2 - w kontekście jednej AZ
- Networking

## **EXAM** Kiedy EC2?
- Tradycyjne hostowanie aplikacji wewnątrz OSa
- Odpalanie długich procesów 
- Aplikacje serwerowe
- Dobre do burstów w zapotrzebowaniu jak i długotrwałych obciążeń 
- Stacki do monolitycznych aplikacji
- jako fallback przy Disaster Recovery


## EC2 State
Podstawowe:
- Running
	- włączona
	- Płacimy za wszystkie 4 składowe
- Stopped
	- wyłączona (ale w każdej chwili można włączyć)
	- **EXAM** Jak EC2 jest Stopped to płacimy tylko za storage
- Terminated
	- usunięta (nie można tego odwołać)
	- nie płacimy za nic (duh)

## AMI Amazon Machine Image
- Może służyć do stworzenia instancji EC2
- Może być stworzony z instancji EC2

### AMI Zawiera:
- AMI ma w sobie zdefiniowane permissions określające jakie konto może i nie może używać tego obrazu
	- Public - każdy może używać
	- Private (Implicit) - może używać tylko właściciel AMI
	- Explicit - można zdefiniować kto może używać tego AMI
- Zawsze zawiera `Boot Volume` czyli partycję z którego startuje system
- Block Device Mapping - okresla który volume AMI jest czym (np. który to Boot Volume)

## Łączenie z EC2
- Do autentykacji używana jest para kluczy
- Private key ściągamy i trzymamy u siebie
- EC2 ma public key i dzięki niemu potwierdza naszą tożsamość
- Możemy kliknąć prawą myszką na jakimś EC2 na liście i wybrać `Connect`

### Windows
- Używamy private key aby dostać hasło admina i jego używamy żeby zalogowac się na instancję
- Remote Desktop Protocol RDP
	- port 3389

### Linux
- SSH
	- port 22

### Instance Connect vs SSH
- Instance Connect używa specjalnego serisu EC Connect Service żeby połączyć sie z instancją
    - Używa identity permissions osoby która się łączy
    - EC_INSTANCE_CONNECT używa konkretnego adresu IP do łączenia sie z instancją


## Tworzenie EC2
1. Stworzyć parę kluczy
	`EC2` -> `Key Pairs`
	 **EXAM** KeyName to nazwa KeyPair 
2. Stworzyć instancję
	`Instances` -> `Launch an instance`
3. W trakcie tworzymy nowy Secuity Group

## Usuwanie
1. RMB -> Terminate
2. Pamiętać żeby usunąć też Security Group

## Typy instancji EC2
- https://aws.amazon.com/ec2/instance-types/
- https://instances.vantage.sh/
### Nazwa typu instancji:
- np. R5dn.8xlarge
    - `R` : instance family
    - `5` : instance generation
    - `dn` : różne dodatkowe informacje, opcjonalne
    - `8xlarge` : rozmiar 
### Kategorie EC2
1. General Purpose
    - Ogólne zapotrzebowania
    - Równy podział zasobów między CPU a pamięć
    - Default
2. Compute Optimized
    - Wydajne CPU
    - Procesowanie mediów, ML itd
3. Memory optimized
    - Procesowanie danych in-memory
4. Accelerated Computing
    - Hardwarowe GPU
    - FPGAs
5. Storage Optimized
    - Dużo szybkiej pamięci
    - wydaje sequential i random IO
    - Elastic, analityka

## Pamięć EC2
- Direct (Instance Store)
    - lokalna pamięc maszyny EC2
    - szybka ale zawodna
- Network Attached Storage (Elastic Block Storage EBS)
    - pamięć nie związana ściśle z maszyną EC2
- Ephemeral
    - tymczasowa pamięć
    - **EXAM** Instance Store to przykład Ephemeral pamięci
- Persistent Storage
    - pamięć która istnieje niezaleznie od lifecycle EC2
    - **EXAM** EBS zapewnia Persistent Storage

### Kategorie pamięci EC2
- Block Storage
    - pamięc przechowywana jako zbiór bloków bez konkretnej struktury
    - OS montuje ją jako Volume i nadaje jej format (np. ntfs, ext4)
    - mountable
    - bootable
- File Storage
    - pamięć jako zbiór plików
    - mountable
    - **non-bootable**
- Object storage
    - nie ma struktury, płaska struktura obiektów (etcd, s3)
    - non-mountable
    - non-bootable

### Storage Perfomance
Ważne terminy:
- IO (block) size
- IOPS (IO per second)
- Throughput (Mb/s)


