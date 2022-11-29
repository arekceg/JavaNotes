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
- Instancja może zmienić EC Host jeżeli: - Zastopujemy i ponownie włączymi instację
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


# EBS
- Elastic Block Storage
- Dane przechowywane jako surowe bloki
- **EXAM** EBS może być zakodowany KMSem
- **EXAM** **EBS JEST AZ RESILIENT**
- EBS jest przypisany do jednego EC2 ale może być do wielu (np. jak mam klaser EC2)
- **EXAM** EBS jest persistent, nie jest związane z lifecycle aplikacji

## EBS Volume Types

### GP2 General Purpose
- **EXAM** EBS GP2 może mieć pojemność od 1GB to 16TB
- **EXAM** EBS GP2 jest dobre dla boot partycji, apek interaktywnych, środowisk dev i test

#### **EXAM** Architektura EBS, IO Credits
- Dla pojemności <1TB EBS ma coś co nazywa się IO Credits
    - IO Credit ma "pojemność" 16kb
- Każdy storage zaczyna z 5.4mil IOC i zużywa się z każdą 16kb operacją na sekundę
- IO Credits uzupełniają się z częstotliwością Baseline Performance:
    - min. 100 IOC/sec
    - 3 IOC * 100 * size[GB]
- Dopuszcza bursty do 3000 IOPS 
- Powyżej 1TB pojemnośći Baseline Perfomance > burst 3000 IOPS więc system IO Credis nie obowiązuje 
    - max. Baseline Performance dla 16TB = 16000IOC
- IOC to jakby dopuszczalna ilość IOPS dla danego storage

### GP3 
- Prostsza wersja GP2
- Domyślnie zaczyna z 3000IOPS i 125Mb/s
- Więcej IOPS trzeba dokupić
- Baseline 20% tańszy niż GP2!
- **EXAM** EBS GP3 jest dobre dla VMek, średnich instancji DB, dev, test, boot

### Provisioned IOPS SSD (io1 io2)
- Low latency, low jitter
- O wiele szybsze niż GP, max:
    - 64000 IOPS
    - io1:
        - max. 50 IOPS/GB
    - io2:
        - max. 500 IOPS/GB
    - 1000 MB/s
    - 4GB-16 TB
- **EXAM** Per Instance Perfomance Limit. Performance EBS Provisoned IOPS dla jednej EC2 jest limitowana. io1: 260000IOPS 7500MB/s, io2: 160000IOPS 4750Mb/s - kilka volume musi być podpiętych do jednej instancji EC2 żeby to osiągnąć
- Specjalny typ instancji - Block Express:
    - 256000 IOPS
    - 4000 MB/s
    - max dla instancji 260000IOPS 7500 MB/s
    - 4GB-64TB
- **EXAM** Provisioned IOPS SSD dobre dla high performacne low latecy środowisk, high performanc nierelacyjne i relacyjne bazy danych

### HDD-Based
- Oparte na OLDSKULOWYCH DYSKACH MORDO TRRYT TRRYYYYT
- 125 GB-16 TB
- tanie, ale wolniejsze niż GP i IOPS
- 1 IOPS = 1MB/s

#### st1
- 40 IOPS/TB base
- 250 IOPS/TB burst
- max 500 IOPS

#### st2 cold
- najwolniejszy, **najtańszy**
- 12 IOPS/TB base
- 80 IOPS/TB burst
- max 250IOPS

### Instance Store Volumes
- Fizycznie podpięte pod EC2 Host, wliczone w cene
- Najszybszy storage - w chuj więcyj IOPS i throughput
- **EXAM** Instance Store Volumes są dołączane do EC2 przy tworzeniu instancji, nie można ich dodać więcej
- **EXAM** Wszystkie Instance Store Volumes trzeba traktować jako ephemeral - tymczasowe. Jeżlei instancja EC2 np. zmieni host to tracimy dane na tym volumie

## **EXAM** Wybór typu storage EC2
- Persistence, Resilience, Retention -> EBS
- Storage niezależny od lifecycle EC2 -> EBS
- Resilience ale apka ma In-built Replication -> to zależy
    - można użyć wielu IS dla wielu EC2
- High Performance -> to zależy
- Super High Perfomance -> IS
- Koszt -> IS najtańszy
    - ale jezeli musimy użyć EBS to st1 lub sc1 bo najtańsze z EBS

## **EXAM** Wybór typu EBS
- Koszt -> ST1 / SC1
- Throughput / STreaming -> ST1
- Boot -> **NIE** ST1 **NIE** SC1
- Up to 16000 IOPS -> GP2/3
- Up to 64000 (*256000 - Block Express*) IOPS -> IO1/2
- Up to 260000 IOPS - RAID0 + EBS 
    - można rózne instancje storage łączyć w RAID0 i wtedy dostajemy maksymalnie ich combined performance
- > 260000 IOPS - Instance Store
    - EPHEMERAL! nie jest persystenta!

# EBS Snapshots
- Kopiowanie zawrtości volume do S3, więc dane stają się regionally resilient
- Snapshoty sa inkrementalne, przechowują różnicę między poprzednim snapshotem a obecnym
- Można tworzyć EC2 volume z danego snapshota
- Snapshot jest tworzony tylko z **używanych** danych, nie z całego volume
    - jak używamy 10 GB z 40 GB to snapshot będzie ważył 10 GB

## FSR Fast Snapshot Restore
- **EXAM** Bez FSR EC2 Volume restorowane ze snapshotu jest restorowane lazy, zajmie trochę czasu zanim osiągnie pełen performans level
- **EXAM** Fast Snaphot Restore ustawia się na snapshocie i jest on instantly restorowany do volume. Koszuje piniądze
- **EXAM** Można mieć max 50 FSR ustawionych na region

# EBS Encryption
- Używa KMS
- Jak to KMS, dane sa kodowane używając DEK, DEK jest kodowany używając KMS Key
- Dane są kodowane _at rest_
- **EXAM** Snapshot zakodowanych EBS jest też zakodowany tym samym DEK
- **EXAM** AWS Account może być ustawione tak żeby z defaultu kodowała EBS
- **EXAM** Każdy EBS Volume na swój własny DEK, chyba że jest tworzony ze snapshota - wtedy dziedziczy DEK po Volume z którego był zrobiony snapshot
- **EXAM** Nie da się wyłączyć enkrypcji na EBS Volume, jak już go raz zakodujemy to zostaje zakodowane.
- **EXAM** OS na EC2 nie jest w ogóle świadomy zakodowania danych, zakodowanie i dekodowanie dzieje się poza OSem, OS dostaje dane plaintext. **No performance lost**
- **EXAM** EBS jest zakodowane AES-256

# EC2 Networking
- Każda instancja EC2 ma conajmniej 1 ENI Elastic Network Interface
    - 1 Main 
    - wiele Secondary
        - Secondary ENI można odpiąć od tego EC2 i podpiąć pod inny
- Każdy ENI ma:
    - MAC
    - 1 primary private IPv4
    - 0 or more secondary private IPv4
    - 0 or 1 public IPv4
    - 1 Elastic IP per private IPv4
    - 0 or more IPv6
- **EXAM** SG podpięta pod EC2 jest tak naprawde podpięta pod Elastic Network Interface podpięty pod to EC2 i działa na wszystkie IP skonfigurowane w tym ENI
- **EXAM** Kiedy przypisujemy EC2 Elastic IP to traci ona wcześniej podpięty publiczny IPv4 i nie da sie go już odzyskać. Jak usuniemy Elastic IP to EC2 dostanie nowy publiczny IPv4
- **EXAM** Niektóre programy wydają licencje oparte o adres MAC, więc możemy zarejestrować soft na MAC danego ENI a potem ten ENI odpiąć i podpiąć po inny EC2
- **EXAM** Różne ENI podpięte pod jeden EC2 mogą być w róznych subnetach wewnątrz tej samej AZ
- **EXAM** OS EC2 nigdy nie widzi publicznego IPv4, publiczny IP jest zarządzany przez IGW
- **EXAM** Jeżeli zastopuje EC2 i odpalę znowu to dostanie nowy IPv4. Restartowanie tego nie triggeruje
- **EXAM** Publiczny DNS który jest nadany EC2 będzie wkazywał na **primary private** IPv4 jeżeli odpytamy go z wewnątrz VPC, i na **publiczny** jeżeli z zewnątrz

# AMI Amazon Machine Image
- Obrazy używane do stawiania EC2
- **EXAM** AMI są region-bound, AMI o danym ID isteniej tylko w tym jednym regionie
- AMI można stworzyć samemu z instancji EC2 zachowując tym samym konfig tej instancji
- Przy tworzeniu AMI tworzą się też snapshoty wszystkich EBS Volumes podpiętych pod to EC2
    - Te snapshoty są połączone z AMI używając `block device mapping`
    - Block Device Mapping pozwala zapamiętać który snapshot miał jaki adres w EC2 np `/dev/xvda`
- **EXAM** AMI Baking - tworzenie AMI z w pełni skonfigurowanej instancji + apki na EC2
- **EXAM** AMI nie można edytować!!
- **EXAM** AMI można kopiować między regionami
- **EXAM** Domyślnie do AMI ma dostęp tylko konto któro je tworzyło. AMI może być private, public lub z nadanymi konkretnymi dostępami

## Tworzenie AMI
- Zastopować EC2
- Prawą myszką -> Images -> Create Image

## Permissions
- AMI -> Right click -> Edit Permissions

# EC2 Purchase Types (Launch Types)

## On-Demand
- Default
- Instancje są odpalane na różnych hostach, na współdzielonym hardwarze
- Uninterrupted - instancja po odpaleniu działa cały czas, dopóki jej nie zatrzymamy
- Ma mniejszy priorytet w przydziale capacity niż np Reserved
- Krótkie albo nieznanje długości workloady które nie mogą być przerwane 

## Spot
- Zużywa capacity która pozostała po przydzieleniu np. On-Demand
- Ceny dynamiczne
- Zawsze się płaci max. cenę ustaloną przez AWS
- Jeżeli nagle cena sie podniesie powyżej tego co postanowiliśmy zapłacić to terminuje nasze instacje
- Działanie Spot może zostać przerwane w każdym momencie
- Dobre do:
    - non-critical zadań
    - burstów
    - cost sensitive workloads
    - stateless worklods
    - image processing, video processing

## Reserved
- Płacimy za zarezerwowanie _miejsca_ w AZ na instację EC2
- Płacimy z to niezaleznie od tego czy coś tam działa czy nie
- Jak działa to płacimy mniej za użytkowanie
- Jak odpalimy duża instację w miejscu gdzie mieliśmy rezerwację na mniejszą to i tak zapłacimy mniej za użytkowanie, ale tylko częściowo
- Dobre do:
    - Long-term, consistent usage

### Płacenie za Reserved
- Za Reserved płacimy na 1 rok lub 3 lata rezerwacji
1. No Upfront
    - Nic nie płacimy z góry, ale płacimy opłatę per/s nawet jak instancja nie działa
    - Najmniejsze discounty

2. Partial Upfrotn
    - Płacimy trochę z góry i mamy trochę taniej per/s

3. All Upfront
    - Płacimy za całość z góry, nie płacimy nic za per/s
    - Największe discounty

#### Scheduled Reserved
- Mamy rezerwację capacity ale tylko na jakiś okreslony okres czasu
- Troszkę taniej od Standard Reserved
	- Trza kupić min. 1200h/rok i 1 rok min
- Dobre to np:
	- Batchowe przetwarzanie czegoś co wieczór przez 2h
	- Cotygodniowe obczliaczeni i analiza wypłat

#### Regional Reservation
- Rezerwujemy miejsce w danym regionie, nie określając AZ
- **EXAM** Regional Reservation nie rezerwuje capcity w konkretnym AZ, ma niższy priorytet w przydziale capacity niż Zonal Reservation

#### Zonal Reservation
- Rezerwacja w konkretnym AZ

#### On-Demand Capacity Reservation
- Rezerwacja miejsca w danym AZ, ale bez obniżki kosztów
- Mamy pewność że zawsze będziemy mieć capacity i nie musimy podpisywać umowy na rok czy trzy, ale płacimy za to capacity tyle ile za normalne on-demand i to niezależnie od tego czy jest używane czy nie

## Dedicated Host
- EC2 Host tylko dla mnie!
- Płacimy za Host, nic za instancje
- Host affinity: nawet po zatrzymaniu i odpaleniu instancji ponownie zostaje ona na tym samym hoście

## Dedicated Instances
- Podobnie jak DH ale płacimy za instacje a nie za host
- Też cały host dla nas
- Wyższe opłaty

# EC2 Savings Plan
- 1 lub 3 letni commitment do AWS obejmujący jakąś ilość przepracowanych godzin przez nasze zasoby
	- Deklaruje sie że przez 3 lata będę wydawał 20$/h za computowanie i dzięki temu mogę wytargowac lepsza cenę godzinową
	- Jak przekoryczmy tę zadeklarowaną wartość to płacimy znowu cenę jak On-Demand
- Sa dwa typy
	- General Compute Savings Plan
		- EC2, Lambda, Fargate
	- EC2 Savings Plan
- **EXAM** Jeżeli chcemy przenieść architekturę opartą na EC2 na rozkonteneryzowane, serwerlessowe EKSy czy Lambdy to warto rozważyć General Compute Savings Plan w celach oszczędności
