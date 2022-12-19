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
	- Wspiera HTTP/HTTPS/WebSocket
	- Jeden LB może zarządząć kilkoma aplikacjami
		- w ramach Listener Configuration konfigurujemy SSL i hosta dla danego requestu 
2. NLB Network Load Balancer
	- TCP/TLS/UDP

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

## 
