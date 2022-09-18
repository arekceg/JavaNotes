## CLOUD COMPUTING

**EXAM** Które częsci AWS i komunikacji z nim pasują do 5 punktów definicji cloud
**EXAM** Przy examie zastanawiać się czy wybrana odpowiedź nie koliduje z definicją cloud

- Definicja `cloud`:
	https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf

### On-Demand Self-Service
```
 A consumer can unilaterally provision computing capabilities, such as
 server time and network storage, as needed automatically without requiring human
 interaction with each service provider
```
- User can provision capabilities as needed __without requiring human interaction__
- Można zarządzać zasobami bez kontaktu z ludźmi, używając API, CLI, GUI
- Musi być __on demand__ czyli mogę to zrobić kiedy chcę

### Broad Network Access
```
 Capabilities are available over the network and accessed through standard
 mechanisms that promote use by heterogeneous thin or thick client platforms (e.g.,
 mobile phones, tablets, laptops, and workstations).
 ```
 - Capabilities are available over the __network__ and accessed through __standard mechanisms__
 - Oznacza to że nie musimy jechać do datacenter grzebać przy dyskach jeżeli chcemy zarządzać naszą infrastrukturą

### Resource Pooling
```
The provider’s computing resources are pooled to serve multiple consumers
using a multi-tenant model, with different physical and virtual resources dynamically
assigned and reassigned according to consumer demand. There is a sense of location
independence in that the customer generally has no control or knowledge over the exact
location of the provided resources but may be able to specify location at a higher level of
abstraction (e.g., country, state, or datacenter). Examples of resources include storage,
processing, memory, and network bandwidth.
```
- There is a sense of __location independence - no control or knowledege over the exact location of the resources__
	- Możemy powiedzieć AWSowi że chcemy EC2 w us-east-1 ale nie mamy kontroli nad tym w ktorym datacenter i jaki dokładnie hardware zostanie użyty
- Resources are __pooled__ to serve multiple consumers in a __multi-tenant model__
	- Nie dostajemy stricte __naszej__ przestrzeni, __naszego__ serwera, dostajemy pool zasobu który jest dostępny dopóki z niego korzystamy a potem zwracany do ogólnego poola
	-	Dostajemy zasoby z szerokiego poolu zasobów, dzięki temu łatwiej można to skalować, jest więcej miejsca na wzrost

### Rapid Elasticity
```
Capabilities can be elastically provisioned and released, in some cases
automatically, to scale rapidly outward and inward commensurate with demand. To the
consumer, the capabilities available for provisioning often appear to be unlimited and can
be appropriated in any quantity at any time.
```
- Capabilities can be __elastically provisioned and released__, to scale __rapidly__ outward and inward commensurate with demand.
	-	Skalowanie następuje automatycznie w odpowiedzi na zwiększone/zmniejszone obciążenie

- To the consumer, the capabilities available for provisioning often __appear to be unlimited__.

### Mesured Service
```
 Cloud systems automatically control and optimize resource use by leveraging
 a metering capability1 at some level of abstraction appropriate to the type of service (e.g.,
 storage, processing, bandwidth, and active user accounts). Resource usage can be
 monitored, controlled, and reported, providing transparency for both the provider and
 consumer of the utilized service
```

- Resource usage can be monitored, controller, reported __and billed__
	- Przed chmurą płaciło się za infrę z góry, a jak nie wykorzystałeś całości to płaciłeś za puste serwery


### Public vs Private vs Hybrid vs Multi Cloud
**EXAM** Public vs Private vs Hybrid vs Multi Cloud

#### Public Cloud
-	Musi spełniać 5 warunków definicji cloud
- Musi być dostępna dla general public

#### Multi Cloud
- Używa się na raz wielu dostawców chmury
- Jeżeli hostujemy częśc systemu na AWS, część na Azure to mamy	`cloud provider level resilience`
	- Nawet jak system padnie na jednej chmurze to część na drugiej chmurze będzie cały czas działało

#### Private Cloud
- __Prawdziwa__ chmura hostowana on-prem
	- AWS Outposts, Azure Stack, GCP Anthos
- Musi spełniać 5 warunków

#### Hybrid Cloud
- Używanie public i private cloud jednocześnie

#### Hybrid Environment/Hybrid Networking
- Używanie cloud z czysto on-premowymi rozwiązaniami

### Cloud Service Models

- `X` as a Service
- `Infrastructure Stack` - zestaw komponentów potrzebnych do odpalenia i zarządzania aplikacją
	-	 częścią zarządza użytkownik, częscią vendor infrastruktury
-	`Unit of Consumption` - częsc systemu od którego my zarządzamy infrastrukturą
	-	np. jak kupujemy VMkę to zarządzamy nią od poziomu systemu opreacyjnego do aplikacji, a hardwarem na którym jest odpalana zarządza vendor

