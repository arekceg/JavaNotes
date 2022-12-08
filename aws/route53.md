# ROUTE 53

- Global service, single database
-	Globally resilient
- Służy do:
	1.	Rejestrowania domen
	2.	Hostowania Zones, ZoneFiles na Name Serverach
- Może być Public lub Private
	- Private będzie dostępna tylko dla określonych VPC

1.	R53 tworzy ZoneFile (w R53 to się nazywa `Hosted Zone`)
2.	Hostuje ją na (standardowo) 4 name serverach
3.	Komunikuje się z TLD zarządzającą odpowiednim rejestrem (.com, .org itd)
4.	TLD dodaje do swojej strefy Name Server Records wskazujące na Name Servery R53

## Rejestracja domeny
1.	R53
2.	Registered Domains
3.	Register domain
4.	Adres, TLD, cena
5.	Rejestracja osób
	- Zazwyczaj rejestracja domeny wymaga 3 różnych osób
6. Domena ląduje w `Pending Requests` i czekamy aż zostanie zarejestrowana w TLD

- R53 tworzy NameServery ale nic nie stoi na przeszkodzie żeby użyć Name Serverów zewnętrznych
- Te Name Servery są rejestrowane w TLD i ich użyje DNS żeby odnaleźć naszą domenę

## Konfiuracja routingu do bucektu S3
Jeżeli hostujemy static website w S3 to możemy uzyć R53 żeby stworzyć dla tego bucketu domenę.
**Bucket musi mieć DNS name takie jak domena**
1.	R53 -> Hosted zones -> wybrać jakąś zonę
2.	Create Record -> Simple Routing -> Define Simple Record
	-	Record Type: A
	-	Value/Route traffic to: Alias to S3 Website Endpoint

<<<<<<< HEAD
# Public Hosted Zones
- DNS Database (zone file) hosted by R53(Public Name Servers)
- Hostowana na 4 name serverach
- Używamy `NS Records` żeby nakierować domenę na te NSy
- Można używać domen kupionych na innych stronach i skierować ich DNS na Routowe NSy
- Zazwyczaj VPC ma skonfigurowany DNS Resolved na IP VPC+2 i używa go do komunikacji z R53 w celanch DNS
- R53 rejestruje domenę w TLD i potem TLD wie żeby pokierować traffic do naszych 4 NS

# Private Hosted Zones
- Podobne jak Public ale nie jest public
- Połączone z konkretnymi VPC i dostępne tylko dla tych VPC
- `Split-view` - można mieć dwie hosted zony, jedną private, jedną public, o tej samej nazwie
	- Wtedy private zone może mieć więcej np. sensitive informacji, a public zone będzie jej podzbiorem, zawierającym tylko publicznie dostępne informacje

# CNAME vs ALIAS
- CNAME służy do mapowania nazwy domeny na inną nazwę domeny
    np. `www.foo.com` -> `foo.com`

## Problem
- CNAME nie może mapować z "gołych" (apex) domen (bez `www.`), czyli:
    nie da sie zmapować `foo.com` na `bar.com`
- Elastic Load Balancer daje nam adres DNS a nie IP, więc nie możemy użyć CNAME żeby nakierować tam ruch np. z `foo.com`

## Rozwiązanie
- ALIAS record
- Mapuje domenę na zasób AWS
- **Nie jest częścią czystego DNS, to funkcja AWSowa**
- **EXAM** ALIAS może być użyty i dla normalnych i apex domen (z i bez `www.`)
- **EXAM** Jak mam nakierować DNS na zasób AWS to domyślnie wybrać ALIAS record
- Darmowe!
- **EXAM** ALIAS jest podtypem rekordu `A` lub `CNAME`. Używając ALIAS nalezy wybrać taki typ na jaki wskazujemy ALIASem. np. ELB wystawia nam rekord A (domena wskazująca na IP) więc mamy użyć ALIAS A


# Health Checks
- Health Checki są częscią R53 ale można ich używać do czekowania każdego publicznego IP
- HC są rozproszonymi, globalnymi procesami, trzeba mi dać dostęp do IP
- default co 30s, co 10s za $$$
- Typy:
    - Endpoint
    - state of CloudWatch Alarm
    - Checks of Checks

# Typy routingu: 

## Simple Routing
- typ rekordu: `A` 
- AWS dopuszcza 1 rekord per nazwę domeny
- Każdy rekord może wskazywać na wiele adresów IP
- **NIE WSPIERA HEALTHCZEKÓW**
- **EXAM** Simple Routing w R53 używa się kiedy chcemy przesłać traffic do jednego serwisu, np serwera webowego

## Failover Routing
- 2 nazwy domen per rekord
    1. Primary
    2. Secondary
- Jak HealthCheck primary jest `unhealthy` to przekierowuj traffic na secondary

## Multi Value Routing
- Można przypisać wiele wartości do jednego rekordu, każda na inny IP
- !! Można przypisać oddzielny healthcheck do każdego rekordu
	- Query zwróci max. 8 losowo wybranych rekordów które są _healthy_ i user wybierze z nich jeden losowo

## Weighted Routing
- **EXAM** Weighter Routing można użyć jako prosty load balancing lub do testowania nowych wersji aplikacji
- Można podpiąć wiele rekordów pod jedną domenę i nadać każdemu _wagę_
	- waga 0 = rekord nigdy nie jest wybierany
- waga/suma_wag = pradopodobieństwo wyboru rekordu
- Jezeli rekord jest unhealthy - wybierz następny

## Latency-Based Routing
- **EXAM** Użyć Latency-Based Routing kiedy potrzebna jest optymalizacja pod względem performance i user experience
- Rekord przechowuje tez informacje o regionie
	- 1 rekord o danej nazwie / region
- AWS przechowuje informacje o latencji z różnych miejsc do róznch regionów i wybiera taki rekord żeby klient miał najmniejszą latencję
	- więc nie jest to live latency, tylko statystyczna latencja przechowywana przez AWS
- Też obsługuje healthcheki 

## Geolocation Routing
- Podobne do latency
- Rekordy konfiguruje się dodatkowo podając państwo, kontynen, ISO kod państwa itp
- Rekord wybrany na podstawie (w kolejności):
	1. Stanu (USA)
	2. Kraju
	3. Kontynentu
	4. Default rekord (opcjonalnie)
		5. _NO ANSWER_
- **EXAM** Geolocation Routing może być użyte do regional restrictions, language specific content lub do loadbalancingu pomiędzy regionalnymi endpointami

## Geoproximity Routing
- Rekordy fizycznie najbliżej klienta 
	- Odlegość fizyczna + `Bias` 
	- Bias można ustawić na `+` lub `-` dla każdego regionu i to zmienia efektywy rozmiar tego regionu przy wybiorze rekordu
- Rekordy taguje się regionem AWS lub lat/lang

# Route53 Interoperability
- Używanie R53 z domeną zarejestrowaną lub hostowaną gdzie indziej
- Domanin Registrar i Domain Hosting to **dwie różne** funkcje R53!

1. R53 hostuje nameservery, domenę rejestrujemy gdzie indziej, nakierowujemy na nasze NS
2. R53 rejestruje domenę, nameservery mamy postawione zewnętrznie

# DNSSEC w Route53
- **EXAM** R53 DNSSEC używa KMS do stworzenia pary asym kluczy z ktorych potem tworzony jest public i private KSK (Key Signing Key). **TE KLUCZE MUSZĄ BYĆ W US-EAST-1**
- **EXAM** R53 DNSSEC tworzy i rotuje ZSK (Zone Signing Key) internalowo, bez użycia KMS
- DS - Delegated Signer to hash publicznej części KSK i służy do sprawdzenia czy się nie zmieniła
- **EXAM** Używając R53 DNSSEC trzeba stworzyć alarmy CloudWatch: `DNSSECInternalFailure` i `DNSSECKeySigningKeysNeedingAction`
- **EXAM** DNSSEC Validation może być włączone dla konkrentego VPC 

