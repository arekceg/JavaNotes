# CLOUDFRONT

- Content Delivery Network 
- Kaszuje kontent blisko odbiorcy
- **EXAM** Cloudfront (czytanie z kasz na edge locations) działa tylko na **read**, zapis leci prosto na origin
- **EXAM** Więcej `cache HIT` = mniejsze obiążenie Origina

# Pojęcia
1.  Origin
	- Source location of your content
	- S3 lub Custom Origin

2. Distribution
	- Unit of configuration within Cloudfront

3. Edge Locations
	- Miejsca kaszowania danych 

4. Regional edge cache
	- Większe niż zwykły edge
	- Dodatkowa wersja kaszowania
	- Mniej ich

4. Regional edge cache
	- Większe niż zwykły edge
	- Dodatkowa wersja kaszowania
	- Mniej ich

5. Behaviours
	- konfiguracja wewnątrz konfiguracji
	- uszczegółowia konfig
	- Podpięte pod `Origin`, siedzą pomiędzy `Origin` a `Distribution`


# Behaviours
- Są maczowane po `Path` requestu
- Można określić protokół który maczujemy, albo metodę HTTP
- **EXAM** Aby CF nie był zupełnie publiczny możemy `Restrict Viewer Access` na dwa sposoby:
	- Trusted key groups (recommnded)
	- Trusted signer (legacy)
- **EXAM** Ustawienia cachowania w CF są ustawiane per-behaviour

# TTL, Invalidations
- Kiedy object expiruje to CF odpytuje Origin o refresh danych i dostaje zwrotkę:
	- 304 `Not Modified` - dane sie nie zmieniły, odśwież isteniejące
	- 200 `OK` - dane się zmieniły, załączam nowe
- **EXAM** Cloudfront default TTL 24h
- TTL ma wartość Min i Max, bo samą wartość możemy zmieniać używając headerów. Wartości przekraczające te limity sprawią że zostanie użyta najbliższa wartość z wewnątrz limitu

## **EXAM** Headery CF do ustawiania TTL:
- `Cache-Control max-age` (sec)
- `Cache-Control s-maxage` (sec)
- `Expires` (date & time)
Headery te mogą być ustawiane na S3 lub custom Origins

## **EXAM** Cache Invalidation
- Wykonywane na poziomie `Distribution`
- Wykonywane na wszystkich `edge location` dla konkrentej Distribution
- Nie jest intantly, potrzebuje troche czasu
- Ivalidation nie jest darmowe, ale jego cena nie zależy od ilości zinvalidowanych obiektów
- Zamiast invalidacji można użyć `versioned file names` - np. `photo_v1` `photo_v2` i zmienić apkę żeby zwracała to nowe zdjęcie. **Versioned file name to bardzo cost-effective sposób** 

# CloudFront SSL
- SSL by default jeżeli używamy domeny `*.cloudfront.net`
- Aby mieć inną domenę trzeba użyć `Alternate Domian Names` (rekord CNAMES) i wrzucić do CF certyfikat potwierdzający to że to nasza domena
	- **EXAM** Aby CloudFront mógł użyć certyfikatu który wrzucamy musimy go wrzucić w region `us-east-1`
- Możemy skonfigurować CF:
	- dopuscza HTTP i HTTPS
	- Konwertuje HTTP na HTTPS
	- dopuszcza tylko HTTPS
- **EXAM** SSL przy CF składa się z dwóch połączeń: odbiorca-CF i CF-Origin
- **EXAM** SSL przy CF musi być podpisany **publicznymi** certyfikatami. Self-Signed nie zadziałają 
- **EXAM** Aby wspierać stare przeglądarki w CF musimy dopłacić 600$/msc żeby nasza strona miała dedykowany adres IP

# Origin / Origin Groups
- Originy można grupować w Origin Groups i zapinać na nie Behaviours

## Origin Types
- S3
	- Jeżeli na S3 postawimy statik website to CF będzie widział tę stronę jako Custom Origin
	- Można ustawić tak żeby do bucketu był dostęp tylko przez CF
- AWS Media Package Channel endpoints 
- AWS Media Store Container endpoints 
- Everything else (web servers) (custom origins)
	- **EXAM** Aby móc konfigurować porty HTTP/HTTPS, wersję SSL, protocol policy

# OAI Origin Access Identity
- Specjalny typ identity który jest przypisywany CloudFront Distribution
- OAI potem może być użyta np. w Bucket Policy S3 ograniczając dostęp do zasobów jedynie przez CF- OAI potem może być użyta np. w Bucket Policy S3 ograniczając dostęp do zasobów jedynie przez CF

# Cloud Front Security
1. SSL
2. Edge Locations CF mogą dodawać custom headery to requestów a my w Originie możemy sprawdzać czy ten header jest
3. Standardowo - firewall dookoła Origina który dopuszcza tylko IPki z zakresu edge locations CF

- **EXAM** Private Cloud Front Distributions wymagają signed Cookie lub Signed URL. Jest to definiowane na poziome behaviour
- **EXAM** LEGACY: Kiedyś aby podpisywać ciastka/url dla Cloud Front trzeba było stworzyć CloudFront Key używając Root Account. To konto potem można przypisać do behaviour jako `Trusted Signer` (zapamiętac termin Trusted Signer - jeżeli wystąpi na egzaminie to znaczy że w grę wchodzi private distribution/behaviour)
- **EXAM** Obecnie dla prywatnych behaviour CF tworzy się key group i przypisuje do signerów
- **EXAM** Signed Urls pozwalają na dostęp do jednego obiektu przez CF
- **EXAM** Signed Cookies pozwalają na dostęp do wielu obiektów przez CF

# Lambda@Edge
- Można odpalać lekkie lambdy na edge locations CF
- Tylko Node.js lub Python
- Brak dostępu do VPC (są w AWS Public space)
- Layers nie wspierane
- Inne limity vs zwykłe lambdy

## **EXAM** Typy Lambda@Edge
1. Viewer Request Lambda
	- Zanim request wejdzie do CF
2. Origin Request Lambda
	- Zanim request wejdzie do Origin
3. Viewer Response Lambda
	-	Po tym jak response wejdzie do CF
4. Origin Request Lambda
	- Przed tym jak response jest przekazany do klienta

## Limity Lambda@Edge
- Viewer-side:
	-	128MB
	-	5 sec exec
- Origin-side:
	- 30 sec exec

## **EXAM** Przykłady zastosowania Lambda@Edge
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-redirecting-examples

# AWS Global Accelerator
- Podobnie jak CF ale nie do końca
- Przyśpiesza globalny dostęp do naszych zasobów
- Wymaga 2x **anycast** IP
	- `Anycast` IP to pojedyncze IP któro może być w wielu miejsacach. Routing wybiera najbliższe
- **EXAM** Każdy edge location Global Acceleratora używa dwóch anycast IP 
- **EXAM** Request po wejściu do któregoś z Global Accelerator Edge Location jest przesyłany do 1+ celu używać AWS Global Network bardzo szybko
- **EXAM** Global Accelerator możemy używać do HTTP/S/TCP/UDP, a CloudFront tylko do HTTP/S
- **EXAM** Global Accelerator nie kaszuje! Ilość requetów do Origin się nie zmienia
