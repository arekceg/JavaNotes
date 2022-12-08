# DNS

- Wielka baza danych która pozwala na konwertowanie adresów HTTP na adresy IP, np `netflix.com` -> `44.240.158.19`
- `dig foo.com` - sprawdzewnie DNS danej domeny

## DNS ZONE
A DNS zone is a portion of the DNS namespace that is managed by a specific organization or administrator.

A common mistake is to associate a DNS zone with a domain name or a single DNS server. In fact, a DNS zone can contain multiple subdomains and multiple zones can exist on the same server. DNS zones are not necessarily physically separated from one another, zones are strictly used for delegating control.

## DNS ZoneFile
Plik przetrzymujący jedną DNS Zone

## DNS NameServer (NS)
Serwer DNS przechowujący jedną lub więcej Zone (jako jedno lub więcej ZoneFile)

## Authorative
Oznaczenie serwera który jest źródłem poprawnych, aktualnych danych w danej strefie

## Non-Authorative / Cached
Kopie Authorative serwerów które służa przyśpieszeniu requestów DNS

## Hierarchical Design

### DNS Root
- Specjalny DNS Zone na specjalnym DNS NameServerze
- Jest 13 adresów IP przypisanych do takich swerwerów
- Każdy klient DNS zna te DNS Rooty i ufa im
- DNS Root przechowuje namiary na TLD (Top Level Domain) Registries

### TLD (Top Level Design) Registries
- Takie Registry to np. `.com` registry, `.org` registry
- Przechwoują high-level informacje o domenach
- Przekierowują do Name Server którze przechowują konkretne informacje o danej domenie

### Authoritative Name Servers
- Name Servery które przechowują konkretne dane o domenie
- Przechowują Zone i Zone File danej domeny


## Rejestrowanie domeny
1.	Domain Registrar
	-	Umożliwia nam kupno konkretnej nazwy domeny
	- Rejestruje domenę w TLD
2.	DNS Hosting Provider
	-	Hostuje Name Server, Zone i Zone File naszej domeny
3.	TLD Registry
	- Po wykupieniu domey i Name Servera, Registrar daje znać TLD że powstała nowa domena i TLD rejestruje tę domenę w opdowiedniej Zone, np `.com`

Ostatecznie żeby wszystko działało to TLD musi kierować na NS który hostuję zonę z naszą domeną

# DNSSEC
- Rozszerzenie protokołu DNS wzmacniające jego bezpieczeństwo
- __rozszerza__ DNS, nie zastępuje go
	- urządzenia nie obsługujące DNSSEC będą obsługiwały requesty jako normalne requesty DNS

Dodaje:
- Data Origin Authentication
	-	czy dane które dostaliśmy pochodzą na pewno z poprawnej Zony
- Data Integrity Protection
	-	czy dane które otrzymaliśmy nie zostały zmodyfikowane w tranzycie

- Tworzy `DNS Chain of Trust` od roota aż do rekordów DNS.
- Request jest wysyłany jak zwykły request DNS, ale zwrotka zawiera już dodakowe dane DNSSEC służace do weryfikacji autentyczności otrzymanych danyc

## RRSET Resource Record Set
- Zbiór tych rekordów tego samego typu i nazwy
- DNSSEC waliduje te zbiory, a nie pojedyncze rekordy

## RRSIG (Resource Record Signature) & ZSK (Zone Signing Key)
- RRSET jest podpisywany użwywając klucza prywatnego przetrzymywanego offline przez serwer DNS
- Uzywając klucza publicznego DNSKEY możemy zwreryfikować podpis RRSETu

### DNSKEY
- Publiczny klucz służacy do werfyikacji RRSETów 
- DNSKEY ma flagę integerową
	- `256` oznacza że jest to ZSK (Zone Signing Key)
	- `257` oznacza KSK (Key Signing Key)
- ZSK jest używany do podpisywania RRSETów
	- istenieje tylko w konteście zony
	- może być zmieniany
- KSK jest używany do podpisywania ZSK
	- Publiczny KSK jest tzymany wewnątrz zony, ale jest połączony z Parentem (np. TLD .org) więc możemy mu ufać 

## DS (Delegated Signer) Record
- Są to rekordy w Parent Zone które przechowują oczekiwane hashe publicznych KSK z Zon niższych, dzięki czemu wiemy czy publiczny KSK został zmieniony
- Potem taki RRSET tych DSów jest podpisywany ZSK Parent Zony i publiczny ZSK Parent Zony jest podpisywany KSK, temu KSK możemy zaufać bo jest połączony z Parent Zoną Parent Zony (czyli Root Zone najczęściej) poprzez jej DS Recordy
- Kluczom w Root Zofe ufamy bezpośrednio

# Pozostałe typy DNS Records

## NS (Nameserver) Records
- Wpisy w danej Zone kierujące do konkretnych serwerów poniższej Zone
	- np. wpisy w zonie `.com` dla domeny `foo.com` kierujące do nameserwerów hostowanych przez właściciela domeny `foo.com` gdzie następuje odpowiednie przekierowanie do domeny

## A i AAAA
- Te rekordy mapują domenę na konkretny adres IP
- Rożnica jest taka że 
	- A mapuje na IPv4
	- AAAA mapuje na IPv6

## CNAME
-	Umożliwiają mapowanie kilku adresów domen do jednego hosta, np. `ftp.foo.com` `mail.foo.com` `www.foo.com` będą wszystkie wskazywały na jeden adres IP
- **EXAM** CNAME nie mogą wskazywać bezpośrednio na adres IP, tylko na inny host

## MX
- Rekordy służące do emaili
- Dzięki nim można znaleźc serwer mailowy danej domeny (SMTP)
- Każdy rekord ma Priority i Adres
	- Im niższa cyfra `Priority` ten adres będzie użyty najpierw
	- Jeżeli adres ma kropke `.` na końcy to znaczy że jest to konkretny adres domeny
	- Jeżeli nie ma to jest częścią głownej domeny
	-	np dla domeny `foo.com`:
		`mail.incoming` oznacza adres `mail.incoming.foo.com`
		`mail.incoming.` oznacza adres `mail.incoming`

## TXT
- Można dodać dowolny tekst
- Może służyć np. do potwierdzenia właścicielstwa domeny
	- np. jakiś agent może nas poprosić żebyśmy dodali TXT `foo bar` 
	- dodajemy `foo bar`
	- agent sprawdza i wie że to my bo dodaliśmy `foo bar`

# DNS TTL (Time To Live)
- Informuje nas jak długo będą cachowane rezultaty naszego DNS query
- Po tym czasie znów będziemy musieli przejść drzewo DNS od roota do nameservera z domena której potrzebujemy
- Jeżeli planujemy zmieniać coś w rekordach DNS to wskazane jest obniżyć wartość TTL żeby klienci nie strzelali na nieaktulane, zkaszowane, adresy


