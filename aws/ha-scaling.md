# HA & Scaling

# Regional vs Global AWS Architecture

## Global
- DNS używany do globalnego service discovery, healthczekowania regionow i request routingu
- CDN cachuje kontent globalnie, tak blisko end-usera jak to możliwe

## Regional
1. Web Tier
	- Load balancery, API gatewaye
	- Punkt wejścid dla end-usera, ukrywa przed userem skalowanie i faile instancji
2. Compute Tier
	- EC2, ECS, Lambdy itd
3. Storage
	- S3, EFS
4. DB Caching
5. DB Tier 
6. APP Services
	- SQS, SNS

# ELB Elastic Load Balancer
- Słuzy do rozdystrybuowania requestów userów do różnych instancji wewnątrz apki
- 3 typy rozdzielone między dwie wersje: v1(legacy), v2 

## V1:
- CLB Classic Load Balancer
- **EXAM** Nigdy z defaultu nie wybieać Classic Load Balancer CLB 
- 1 per aplikacja, 1 może zarządzać tylko 1 certyfikatem SSL

## V2:
1. ALB Application Load Balancer
	- Layer 7 Load Balancer
	- Wspiera HTTP/HTTPS/WebSocket
	- Jeden LB może zarządząć kilkoma aplikacjami
		- w ramach Listener Configuration konfigurujemy SSL i hosta dla danego requestu 
	- **EXAM** ALB nie potrafi utrzymywać enkrypcji SSL od klienta aż do apki. Połączenie SSL z klientem jest zrywane i nowe połączenie jest tworzone od ALB do apki
	- **EXAM** ALB są wolniiejsze niż NLB bo jest więcej networkingowych rzeczy do załatwienia
	- **EXAM** ALB przez to że jest L7 może odpytać aplikację o jej zdrowie
	- Rules zarządzają komunikacją która przechodzi przez ALB. Są procesowane wg. ustawionego priorytetu
2. NLB Network Load Balancer
	- TCP/TLS/UDP
	- Layer 4 Load Balancer TCP/TLS/UDP itd
	- Nie jest świadomy headerów, kukisów, sesji, HTTP/HTTPS
	- **EXAM** NLB są bardzo bardzo szybkie
	- **EXAM** Do load balancowania połączeń nie HTTP/HTTPS dobrze jest defaultować NLB
	- **EXAM** NLB mogą mieć przydzielony statyczny IP - przydatne do whitelistowania
	- **EXAM** NLB przekazują TCP prosto do apki, nie przerywaja enkrypcji 
	- **EXAM** NLB używają private link i mogą byc używane przez inne VPC


## Architektura ELB
- Albo tylko IPv4 albo `double stack` - IPv4 i 6 
- **EXAM** Przy tworzeniu ELB wybieramy subnety (po **jednym** w każdej AZ którą chcemy zloadbalansować), w kazdym subnecie ELB tworzy `Load Balancer Node`
	- **EXAM** ELB potrzebuje 8 wolnych adresów IP w subnecie w którym tworzy Node
	- **EXAM** AWS zaleca do ELB subnet przynajmniej /27 żeby ELB miał mijesce na skalowanie, ale taki serio min. subnet do by był /28
- **EXAM** Każdy ELB tworzony jest z jednym wpisem DNS wskazującym an **wszystkie** dostępne nody ELB
- Nody skalują się i wstają na nowo po failu
- **EXAM** Nody ELB konfiguruje się używając Listener Configuration
	- konfigurujemy porty, protokoły 

### ELB internet-facing vs private
- Przy internet-facing nody mają i prywatny i publiczny IP
	- **EXAM** Internet-Facing ELB może sie łączyć i z prywatnymi i z publicznymi instancjami EC2
- Przy private ELB nody mają tylko prywatny IP
	- **EXAM** Internal ELB może służyć do skalowania tylko pewnych tierów aplikacji

### **EXAM** Cross-Zone Load Balancing
- Kiedyś Nody LB mogły przekazywać traffic tylko do instnacji w swojej AZ
- Dzięki CZLB każdy node może przekazać traffic do instancji w dowolnym AZ

# Auto Scaling Groups
- Używa Launch Templates / Launch Configurations żeby automatycznie skalować EC2 podnosząc nowe instancje
- Min : Desired : Max (np. 1:2:4)
- ASG są połączone z VPC i subnetami wewnątrz tej VPC
- Instancje startowane przez ASG są w miarę możliwości rozłożnoe po równo między AZ
- **EXAM** Auto Scaling Groups Self Healing - kiedy padnie jedna instacja ASG może to wykryć i postawić następną
- **EXAM** Auto Sclaing Groups są darmowe - płacimy tylko za stworzone zasoby
- **EXAM** Przy ASG warto używać cooldownów żeby zapobiec gwałtownemu tworzeniu/terminacji instancji
- **EXAM** Lepiej miec więcej małych instancji niż mało duzych - bardziej cost-effective
- **EXAM** ASG + Load Balancer tworzą elasticity i abstraktują cały proces od klienta

## Scaling Policies
1. Manual
	- Ręczne ustawianie `desired`
	- Dobre do testów / urgent sytiacji
2. Scheduled
	- Skalowanie zaplanowane
3. Dynamic 
	3.1. Simple 
		- Scale up rule
		- Scale in rule
		- Rule oparte na metrykach 
	3.2. Stepper
		- Skalowanie na podstawie odhyłki metryk od normy
	3.3. Target Tracking
		- Definiujemy konkretną żądaną wartość metryki 
	3.4. Scaling based on SQS
		- ApproximateNumberOfMessagesVisible
		- Skalowanie konsumentów kolejki jak dużo msg
4. Cooldown Period
	- Jak długo czekać po skalowaniu na nastepne

- ASG nie potrzebują SP, moga mieć statycznie ustawione min:desired:max

## Scaling Processes
- Procesy  którymi można dokonfigurowywać ASG
- Nie ma sensu przepisywac wszsytkiego:
https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-suspend-resume-processes.html

## ASG + Load Balancers
- Instancje ASG są automatycznie dodawane i usuwane z Target Group LB 
- ASG może użyć healthczeków Load Balancera (ALB ma zaawansowane healthczeki po HTTP/S) zamiast prostych hc EC2 - *Application Awarnes*

## ASH Lifecycle Hooks
- Customowe akcje które moga sie odpalać przy odpalaniu lub terminacji instancji 
- Przerywa proces skalowania, wykonuje akcje, resumuj skalowanie (woła CompleteLifecycleAction)
	- A jak będzie timeout (default 3600sec) to robi CONTINUE albo ABANDON
- Da się spiąć z EventBridge albo SNS

## ASG Health Checks 
1. EC2 (default)
	- Na bazie statusu intnacji EC2
2. ELB 
	- na bazie _aplication aware_ health czeków po HTTP/S
3. Custom	
	- kustomowy healthczek 

- **EXAM** ASG Health Check Grace Period (def. 300s) - opóźnienie zanim zaczniemy sprawdząc healthczkea znowu (np. na ładowanie systemu, start apki)

# SSL Offload 

Typy utrzymania secure connection przez ELB:

## Bridging
- Terminacja SSL w ELB, utworznie nowego połączenia SSL od ELB do instancji
- ELB musi przechowywać certyfikat SSL, kiepsko z punktu widzenia security
- Load Balancer widzi zawartosc HTTP i może podejmowac decyzje na tego bazie (ALB)

## Pass-through
- Load Balancer (NLB) po prostu przekazuje połącznie SSL prosto do instancji
- Nasłuchuje na TCP a nie HTTP!

## Offload
- Podobnie jak Bridging, **ale** po terminacji SSL dane nie są już kodowane! Od ELB do instancji dane lecą po HTTP
- Lepszy performans niż Bridging bo instancje nie musze rozkodowywać danych 

# Connection Stickiness
- Jezeli mamy stateful serwery to jak load balancer przerzuca traficc między instancją a instancją to klient traci dane i sesję
- W Target Group Load Balancera (Zakładka Attributes -> Edit)  można włączyć `Session Stickiness`
	- Przy pierwszym kontakcie z LB LB generuje dla klienta cookie `AWSALB` duration 1s -> 7days
	- Minus - klient obciąża tylko jeden serwer cały czas (a klient może być wymagający)

# Gateway Load Balancer (GWLB)
- Skalowanie 3rd party security appliances
- `Inbound and outbount *transparent* traffic inspection or protection`
- Przepuszcza traffic do aplikacji security 
- Składowe:
	1. GWLB Endpoints 
		- wpuszczają/wypuszczają traffic
		- ingress route table w IGW przepuszcza traffic do tych endpointów   
	2. GWLB 
		- właściwy load balancing
	3. Protokół `GENEVE`
		- Protokół tunelowania pakietów 

- Traffic leci do endpointów,
- potem do LB, 
- LB wysyła do security apps, 
- validacja, 
- traffic wraca do LB, 
- do Endpointów
- jest wysyłany do docelowgo celu
	


