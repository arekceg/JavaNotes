## NETWORKING

### OSI 7-Layer Model

- Dwie grupy warstw
- Urządzenie Layer X rozumie X i wszystkie warstwy poniżej X 

#### Media Layers (1-3)
1. Physical
2. Data Link
3. Network

#### Host Layers (4-7)
4. Transport
5. Session
6. Presentation
7. Application

### Layer 1 : Physical Layer

- np. kabel RJ45
-	Standardy komunikacji są definiowane w celu ustalenia sposobu przekazywania surowych bitów danych między konsumentem a producentem
	- definiujemy napięcia, interwały, modulacje itd
	- prąąądd
- Hub RJ45 wysyła na wszystkie porty to co otrzyma na jednym porcie
- Na Layer 1 nie na adresowania urządzeń w ogóle, urządzenie A wysyła dane po kablu i wszystko podłączone do tego kabla te dane dostanie
	- Urządzenie A nie może wysłać danych po prostu do urządzenia B
- Jeżeli wielu producentów współdzieli np. jeden kabel to może nastąpić kolizja danych (jak n producentów wysyła na raz dane)
	-	kolizja doprowadza do uszkodzenia wsyzstkich przesyłanych danych
- Przez to kiepsko sie skaluje xd

### Layer 2 : Data Link Layer
- CSMA/CD
- Super ważneee
- Działa na wierzchu Layer 1
- Wprowadza konkretny adres dla każdego urządzenia - adres MAC
	- jest to adres **fizyczny** urządzenia, przypisany konkretnie do hardware
- Dane sa wysyłane jako Frame (Ethernet Frame)
	- CarBoxFrame ;P 
	-	Frame to kontener na dane o ustalonej strukturze
		1. PREAMBLE
		2. MAC HEADER
		3. PAYLOAD
		4. CHECK SEQUENCE
- Layer 2 ma bardziej zaawansowany sposób komunikacji
	- można wysyłać dane na konkretne adresy
	- potrafi czekać na pusty kanał Layer 1, unikamy kolizji
	- jeżeli kolizja jednak nastąpi to mamy Collision Detection (CD)
		-	jezeli nastąpi kolizja wysyłany jest Jamming Signal który przerywa komunikację
		-	po losowym (dla każdego urządzenia) okresie `backoff` transmisja jest wznawiana
- Layer 2 __enkapsuluje__ czyste bity w Frame
- `Switch` to jak `Hub` tylko dla Layer 2
- Layer 2 to sieć urządzeń połączonych switchami

### Layer 3 : Network
-	Sieć sieci Layer 2
- Internetworking
-	Layer 3 dodaje adresy IP które służą do komunikacji między sieciami LAN bez konieczności użycia P2P (point 2 point)
- Layer 3 wprowadzani `IP Packets` - pakiety danych wysyłanych przez Layer 3
- `Router` to urządzenie Layeru 3 które wyciągają Packety z frejmów i opakowują je w nowe frejmy przy każdej nowej sieci LAN
- Adresy IP są przypisywane albo manualnie przez ludzi albo używajć DHCP

#### IP PACKET
- Packety są przechowywane we Frejmach Layeru 2
	- za każdym razem kiedy taki Packet wpadnie do jakiejś sieci jest przepakowywany w nowy frejm na potrzeby obencej sieci
	-	packety __zazwyczaj__ nie zmieniają się przez całą swoją podróż
- Każdy Packet przechowuje:
	-	Source IP Address i Destination IP Address
	- Porotocol służący do komunikacji
	- TTL Time To Live (tylko IP v4)
		ustala ile skoków między sieciami może wykonać pakiet
		dzięki temu pakiety nie latają w sieci w nieskończoność
	- Hop Limit (tylko v6) - TTL dla IP v6
	- DANE
		z Layer 4

#### Struktura adresu IP
- v4 np: 133.33.3.7
- Najpierw jest Network Part
	- np. `/16 prefix` - pierwsze 16 bitów informuje nas o sieci
	- informuje o sieci w której znajduje sie ten adres IP
	- dwa adresy IP o tych samych pierwszych liczbach przynależą do tej samej sieci
- Potem jest Host Part
	- konkretny namiar na hosta w tej sieci

#####  Konwersja IP na Binary
-	Bardzo ważna rzecz do operowania w sieciach, subnetach itd
- Każdy decimalowy nr w adresie IP jest między 0 a 255
-	Pozycja	1		2		3		4		5		6		7		8
- Wartość	128	64	32	16	8		4		2		1

#### Subnet Masks
-	Default Gateway to adres IP do którego są wysyłane pakiety które jako cel mają nie-lokalny adres IP
- Subnest Mask pozwala hostowi na określenie czy adres IP z którym musi się skomunikowac jest lokalny czy remote
-	Subnet Mask określa ile bitów adresu IP będzie informować o tym z jakiej sieci pochodzi adres
- np. mask `255.255.0.0` = `/16` prefix
	- działa to tak że jak zapiszemy Subnet Mask binarnie to __każda `1` to Network Part, każde `0` to Host Part`__
- dzięki temu możemy policzyć zakres adresów IP danej sieci
	-	Zaczyna się od tego gdzie Host Part wszędzie ma 0
	- Kończy sie tam gdzie Host Part wszędzie ma 1

#### Route Tables & Routes
-	Route Table to tabela przechowująca pary `Destination`/`Next Hop/Target`
	- `Destination` jest zapisana w takiej formie np. `52.217.13.3/24` gdzie `/24` to prefix, czyli ile bitów stanowi Network Part
- Dzięki temu router wie gdzie dalej przekazać packiet
- `Default Route` - `0.0.0.0/0` czyli łapiemy wszystkie adresy IP
	- Default route jest wybierane kiedy żaden inny route nie pasuje

#### Address Resolution Protocol (ARP)
- Przez to że L3 używa L2 to przesyłania pakietów zapakowanych we frejmy - musi znać adres MAC urządzenia na które wysyła dane, a znamy tylko IP
-	ARP to protokół działający między L3 a L2
- Jak L3 chce wysłać pakiet do adresu IP X.X.X.X ARP używając L2 odpytuje sieć o ten adres IP.
- Agent o tym adresie IP odpowiada też ARPem wysyłając swój adres MAC

#### Problemy z L3
- Pakiety mogą dojść w rożnej kolejności
- Niektóre pakiety mogą zaginąć po drodze
- Routing pakietów może trwać bardzo długo
- W czystym L3 nie istnieją kanały komunikacji - pakiet leci po prostu od adresu A do adresu B więc nie możemy mieć dwóch aplikacji na jednym adresie 
	- każdy pakiet wygląda tak samo dla każdej aplikacji
- Brak `Flow Control`
	-	jeżeli nadawca wysyła pakiety szybciej niż konsument jest w stanie je przerobić może to doprowadzić do przesycenia konsumenta i dropnięcia pakietów

### Layer 4 : Transport
- Dodaje TCP Transmission Control Protocol i UDP User Datagram Protocol

#### UDP
- Szybsze, mniej reliable

#### TCP
- Jest wolniejsze ale bardziej reliable
- Używane przez HTTP, HTTPS, SSH 
- Potrzebuje ustanowionego bi-kierunkowego połączenia między dwoma urządzeniami
	- każdy z tych kiernuków to inny `channel`
	- każdy z tych `channeli` to tak naprawdę ciąg segmentów
	- więc ostatecznie do komunikacji między dwoma agentami potrzebujemy dwóch ciągów segmentów
- Pozwala na komunikację po portach
- TCP używa losowego portu na producencie i konkretnego na konsumencie
	- port na producencie to `Ephemeral Port` / `High Port`
	- port na konsumencie to `Well Known Port`

#### Segmenty TCP
- Kontenery na dane
- Enkapsulowane __wewnątrz__ pakietów IP
- Przechowują m.in.: 
	-	informacje o source i destination __portach__
	-	sequence number 
		pozwala na poorderowanie pakietów 
	- acknowledegement
		pozwala na potwierdzenie otrzymania obiektów o danym sequence number
	- window
	- flags'n'things
	- dane

#### Three-way handshake
1. Client wysyła do servera segment `SYN`
	-	Sequence Number ustawiony na losowy number (ISN)
	- Inicjalizuje komunikację z serwerem
2. Server odpowiada segmentem `SYN-ACK`
	- Wybiera swój własny sequence number (losowo)
	- Jako acknowledegement zwraca otrzymany od Clienta number + 1
	- Akcpetuje komnunikację
3. Client wysyła do serwera `ACK`
	- Client pobija swój sequence number o 1 
	- Client podbija acknowledege + 1
		- co informuje serwer że client odczytał jego dane
- Dzięki temu client i serwer są zsynchronizowane
- Doczytać??

#### Sessions and State

##### Stateless firewall (ACL na AWS)
- Przez to że mamy dwa strumienie segmentów taki firewall wymaga dwóch zasad
- `Outbound`- z ephemeral portu klienta do known portu serwera
- `Inbound` - z well known portu serwa to ephemeral portu klienta

##### Stateful firewall (Security Group na AWS)
- Ten firewall rozumie oba strumienie segmetnów jako jedą rzecz - sesję TCP (to już Layer 5)
- Wymaga jednej reguły
	- na `Outbound` dla klienta
	- na `Inbound` dla serwera

### NAT Network Address Transaltion
- Swtoworzny by zwalczyć niedobory adresów IPv4
	- niepotrzebny przy IPv6 (bardzo dużo adresów jest dostępnych)
- Tłumaczy Prywatne adresy IP (np. 10.X.X.X) na publiczne 

#### Static NAT (AWS Internet Gateway)
- 1 prywatny na sztywno do 1 publicznego
- Router przechowuje `NAT Table` mapującą PrivateIP na PublicIP
- Kiedy pakiet przechodzi przez urządzenie z NAT Table, prywatny source IP z tego pakietu jest tłumaczony na publiczny IP na podstawie tabeli

#### Dynamic NAT
- 1 prywatny do pierwszego dostępnego publicznego
- Przydzielane tymczasowo
- Wiele prywatnych adresów może używąc jednego publicznego, tylko nie w tym samym momencie

#### PAT Port Address Transaltion (AWS NATGateway)
- Wiele prywatnych do jednego publiczegno
- np. sieć domowa, wiele urządzeń podpina się pod jeden publiczny IP (routera)
- Różne IP prywatnej sieci zapinają się na jeden publiczny IP ale na różne porty
	-	Porty publiczne są przydzielane w momencie translacji
	- wydane porty odnotowywane są w NAT Table

### Subnetting
- Różne zakresy adresów IP były historycznie przypisywane różnej wielkości firmom
-	Dla adresów prywatnych przeznaczone są różne zakresy:
	-	`10.0.0.0 - 10.255.255.255` 
		- 1 x Class A Network
	-	`172.16.0.0 - 172.31.255.255`
		- 16 x Class B Network
	- `192.168.0.0 - 192.168.255.255` (certified hood classic adresów IP)
		-	256 x Class C Network
	- potem te adresy są tłumaczone na publiczny używąć NAT

Przykład subnettingu:
- Mamy sieć `10.16.0.0/16` 
	- zakres `10.16.0.0` - `10.16.255.255`
- Jak podbijemy prefix do `/17` tworzą nam sie dwie sieci
	1.	`10.16.0.0` - `10.16.127.255`
	2.	`10.16.128.0` - `10.16.128.255`
	- Wtedy z sieci tworzą się dwie podsieci, jedna z `1` a druga z `0` w dodatkowym bicie prefixu (subnet bit)

- Network ID - __pierwszy__ adres z danego subnetu
- Broadcast ID - __ostatni__ adres z danego subnetu
- Więc dla hostów zostaje mniej o 2 adresy do podziału

### IPv6
- 340 sekstylionów adresów xD

### DDOS
- Application Layer attack - HTTP Flood
	- dużo requestów HTTP z róznych miejsc
- Protocol Attack - SYN Flood
	- Podanie fałszywego adresu trzy three-way handshake z serwerem przy TCP
	- Serwer nie może namierzyć adresu podanego przy hendszejku
- Volumetric Attack - DNS Amplification
	- zapytania DNS o fałszywy adres IP
	- wykorzystuje fakt że zapytanie DNS jest tanie i małe ale może zwracać bardzo dużo danych
	- nie atakuje bezpośrednio serwerów aplikacji a serwery DNS

### Secure Sockets Layer SSL, Transport Layer Security TLS

- TLS używa asymetrycznej enkrypcji do wymiany kluczy prywatnych i potem SSL używa symetrycznej do autentykacji
- TLS używa już otwartego kanału TCP
- TLC pozwala określić prawdziwość serwera z którym się komunikuje
- Trzy fazy:
	1.	Cipher Suites
	2.	Authentication
	3.	Key Exchange

#### Cipher Suites
1.	Klient wysyła `Client HALLO`
	- lista wspieranych Cipher Suites, wersja SSL/TLS, SessionId
	-	Jeżeli serwer nie wspiera żadnego z wysłanych przez klienta Cipher Suites - połączenie jest zamykane
2.	Serwer zwraca `Server HALLO`
	- w nim certyfikat serwera zwierający publiczny klucz

#### Authentication
- Ustalamy czy serwer jest tym za kogo się podaje 
1.	Klient sprawdza czy certyfikat który otrzymał:
	-	jest podpisany przez Public Certificate Authority
	- nie jest expired
	- nie był revoked
	- sprawdza czy nazwa domeny serwera zgadza się z domeną na certyfikacie
2.	Klient używa public key serwera do zakodowania jakichś danych i upewnia sie że serwer może je odkodować 

- jeżeli wszystko się zgadza to wiemy że serwer jest tym za kogo sie podaje

#### Key Exchange
1.	Klient zakodowuje public kluczem serwera nowy klucz prywatny `Pre-Master Key` i wysyła go do serwera
2.	Serwer odkodowuje ten klucz
3.	Serwer i klient używając tego samego Cypher Suite generują z Pre-Master Key `Master Secret` 
4.	Używając Master Secret generowane są `Session Keys` które są następnie używane do zakodowywania danych
