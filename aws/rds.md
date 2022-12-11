# RDS

# ACID, BASE

- CAP Theorem
- ACID = consistency
- BASE = availibility 

## ACID

- Atomic
    - albo cała transakcja przechodzi, albo żadna jej część nie przechodzi
- Consistent
    - transakcje transformują dane z jednego _valid_ stanu w drugi, nic pomiędzy
- Isolated
    - każda współbieżna transakcja jest odizolowana od innej
- Durable
    - po tym jak transakcja jest zcommitowana to jej efekt jest stały, zapisuje sie na stałe w pamięci db
- **EXAM** Jeżeli ACID jest wspomniany na examie to najczęsciej dotyczy RDS
- **EXAM** Jeżeli ACID jest wspomniany w konteście DynamoDB i noSQL na examie to najczęsciej dotyczy `DynamoDB Transactions`

## BASE

- Basiclly Available
    - Read & Write są dostępne _tak często jak to możliwe_ ale ogólnie to może tak może nie 
- Soft State
    - DB nie narzuca _consistency_. To nalezy do odpowiedzialności uzytkownika
- Eventually Consistent
    - _Consistency_ będzie ostatecznie, kiedyś osiągnięta
- **EXAM** Jeżeli BASE jest wspomniany na examie to najczęsciej dotyczy DynamoDB

# Bazy danych na EC2 (**BAD IDEA**)

- Albo aplikacja + db w jednym AZ albo w dwóch
- Jak w dwóch to:
    - trzeba zapewnić stabilne połączenie między apką a DB
    - przesyłanie danych między AZ kosztuje!

## Dlaczego DB na EC2?
Kiedy potrzeba:
1. **Na 100% bardzo** potrzebujemy dostępu do OS na którym jest odpalona DB 
2. Zaawansowane tuningowanie DB wymagające DBROOT
3. DB lub wersji DB której AWS nie ma  
4. Konkrene combo OS/DB
5. Konkretna architektura której AWS ni ma

## Dlaczego **NIE**
- Admin overhead (zarządznie EC2)
- Manualne bakapowanie i DR (disaster recovery) management
- EC2 istnieje w **jednej AZ**
- AWSowe DB mają w huj fajnych ficzerów
- EC2 jest _on_ lub _off_ - nie ma serverless, nie ma łatwego scalingu
- Replication 
- Perfomance

# Architektura RDS
- **DBSaaS** - DB Server as a Service
- Dostajemy serwer DB, na jednym serwerze możemy mieć wiele baz danych 
- **EXAM** Amazon Aurora to inny produkt niż RDS
- **EXAM** RDA domyślnie nie daje dostępu do OS albo SSH. Trzeba użyć RDS Custom

## RDS Subnet Group
- **EXAM** RDS Subnet Group to lista subnetów których RDS może użyć dla instancji DB
- **EXAM** Każda instancja RDS może mieć wiele DB
- **EXAM** Każda instancja RDS ma dedykowany storage w EBS

# Koszt RDS
- Podobnie jak EC2 - płacimy za alokację zasobów
1. Rozmiar i typ instancji $/s
2. Multi-AZ 
3. Typ i rozmiar stoarge
4. Transfer danych
5. Backupy i snapshotmonthlyy

# Multi AZ

## Multi AZ - Instance
- **EXAM** Komunikacja z Multi AZ Instance RDS jest zawsze do `Primary` instancji!
- **EXAM** `Primary` instancja RDS w jednej AZ będzie miała `Standby` instancję w innym AZ (ten sam region). Jest tylko jedna `StandBy` replica i nie można jej bezpośrednio używać do R/W
- **EXAM** `Primary` instancje RDS syncują dane z `Standby` instancjami używając `Synchronous Replication` w momencie uzyskania danych przez Primary, nawet przed tym jak dane do Primary są commited
- **EXAM** Backupy RDS sa tworzone w AWS-managed S3 bukecie i robione są z intancji `Standby` więc `Primary` nie odczuje tego performatowo

## Multi AZ - Cluster
- **EXAM** Multi AZ Cluster RDS ma jedną instację `Writer` i dwie instancje `Reader`. Każda w róznym AZ. Readery syncują się **synchronicznie** z Writerem
- **EXAM** Multi AZ Cluster RDS `Writer` może być użyty do R/W, `Reader` tylko do R
- **EXAM** Multi AZ Cluster RDS dane zapisywane do `Writer` sa uznawane za zacommitowane kiedy przynajmniej jeden `Reader` potwierdzi że je zapisał 
- **EXAM** Multi AZ Cluster RDS ma Cluster Endpoint który wskauzuje na Writera i używany jest do R/W
- **EXAM** Multi AZ Cluster RDS ma Reader Endpoint który przekazuje requesty R do dowolnego z wolnych Readerów
- **EXAM** Multi AZ Cluster RDS ma Instance Endpoints które wskazują na konkretną instancję RDS
- **EXAM** Multi AZ Cluster RDS działa na szybszym hardawarze niż MultiAZ Instance
- **EXAM** Multi AZ Cluster RDS replikuje się używając Transaction Logs, dzięki temu failover zamiast 60-120 sec (Instance) trwa ~35 sec


# RDS Backups
- Auto Backups
- Snapshots
- **EXAM** Backupy i Snapshoty RDS używają bucketów S3, ale te buckety są zarządzane przez AWS więc nie mamy do nich w ogóle dostępuo
- Można replikowc backupy i snapshoty do innych regionów ale to kosztuje

## Snapshoty
- Nieautomatyczne
- Inkrementalne
- Stan **całej** instancji - wszystkich baz danych na niej

## Backups
- Inkrementalne
- Codziennie
- Jakby automatyczne Snapshoty
- 5 minutowe DB Transaction Logs są zapisywane do S3
- Retencja 0 do 35 dni
- Przy usuwaniu RDS można zachować backupy ale i tak zostaną usunięte po okresie retencji
- **EXAM** Auto bakapy RDS można skonfigurować żeby sie replikowały między regionami ale to kosztuje

## Backup/Snapshot restore
- **EXAM** Backap/Snapshot RDS restore tworzy **nową** instanjcę RDS. Trzeba apki przepiąć na tę instacnję
- **EXAM** Backap restore bierze **ostatniego** Snapshota i używając Transaction Logs podbija go do wybranego przez nas momentu (DOBRE RPO)
- **EXAM** Restorowanie jest **powolne** - kiepsko RTO

# RDS RR Read Replicas
- **EXAM** Instacje RDS `Read Only Replica` replikują sie **asynchronicznie** od Primary
- **EXAM** Read Only Replica może być w tym samym lub **innym** regionie niż Primary
- **EXAM** Do jednej instancji DB może istniec max. 5 Read Only Replica
- **EXAM** Skalowanie read performance bazy danych 
- **EXAM** Read Replica może mieć swoje Read Replica ale przez zapis asynchroniczny lag dodawania danych jest prawdziwym problemem
- **EXAM** Read Replica jest super na poprawę RPO i RTO - bo jest zawsze aktualną kopią Primary bazy i można szybko ją awansować od głównej bazy
- **EXAM** Read Replica nada się do recovery tylko w przypadku gdy nie nastapiła korupcja danych
- **EXAM** Read Replica jest read-only dopóki nie zostanie ustawiona jako Primary baza

# RDS Security
- Authentication
- Authorization
- Encryption

## IAM Authentication & Authorization
- Policy przypisana do Roli lub IAM Usera która mapuje to Identity na lokalnego usera bazodanowego w RDS
- Taka identity używa `generate-db-auth-token` żeby uzyskać token którego użyje zamiast hasła do DB
- **EXAM** IAM w RDS służy tylko do autentykacji, autoryzacja jest już po stronie DB która tworzy lokalnego usera z odpowiednimi uprwanieniami

## Encryption
- **EXAM** SSL/TLS for RDS (encryption in transit)  może być ustwaione jako _mandatory_ dla każdego usera z osobna
- **EXAM** RDS Encryption at rest - zakodowywane przez KMS na volumie EBS. Snapshoty itd tez są kodowane tym samym kluczem
- **EXAM** RDS Encryption at rest **NIE DA SIĘ USUNĄĆ/WYŁĄCZYĆ** po włączeniu
- **EXAM** RDS MSQL i Oracle wspiera TDE - Transparent Data Encryption. Jest to funkcja silnika bazodanowego
- **EXAM** RDS Oracle wspiera CloudHSM (bardzo secure)

# RDS Custom
- RDS hostowany przez AWS, ale mamy więcej opcji kustomizacji, coś pomiędzy czystym RDS a ręcznym hostowaniem DB na EC2
- Przez SSH, RDP lub Session Manager mamy dostęp do systemu operacyjnego i silnika DB
- Tylko dla MSSQL i Oracle

# AWS Aurora
- Używa klastra domyślnie
- 1 primary instancja + max. 15 replik (`Single-Master`)
    - Dane są synchronicznie replikowane od Primary do replik 
    - Synchronizacja nie wpływa na performans DB bo dzieje się na poziomie storage
    - Primary instance może czytać i zapisywać dane, Repliki moga czytać
- Każda instancja nie ma dedykowanej sobie volume na storage - jest współdzielony `cluser volume`

## Cluster Volume
- High performance, SSD-based, High IOPS, low latency
- Płacimy tylko za ilość storage którą maksymalnie używaliśmy - **High Water Mark**
    - Jeżeli używaliśmy przez chwilę 50GB a potem cały czas 40GB to i tak płacimy za to 50GB cały czas

## Endpointy
- Cluser endpoint
    - Primary instance
- Reader endpoint
    - Load balanced wśród Replik

## Backupy
- Darmowe backupy
    - Jak nasz klaster zajmuje 100GB to dostajemy 100GB za darmo na bakapy
- Backupy działają tak jak przy RDS, ale sa dodatkowe zaawansowane funkcje

### Backtrack
- Można rollbackować cluster do miejsca w czasie przed wystąpieniem awarii

### Fast clones
- Kopia bazy danych ale nie kopiuje bit po bicie tylko referencuje oryginalne dane i przechowuje tylko różnicę między klonem a klonowaną DB

## Aurora Serverless
- Duża skalowalność
- Używa ACU Aurota Capacity Units żeby kontrolować i skalować rozmiar DB w zależności od obciązenia 
    - ACU może zejść do 0 i wtedy DB jest zapauzowana
    - Płacimy tylko za te zasoby które są używane
- To samo resilience co zwykła Aurora
- Klient komunikuje się a ACU przez proxy przechowywane w `Proxy Fleet`, nigdy bezpośrednio z ACU
    - Dzieki temu możemy sie transparentnia dla klienta skalować
- Use cases:
    - Infrequent usages
    - Nowe apki kiedy nie jesteśmy pewni obciążenia i rozmiaru danych
    - Variable/Unpredictable workloads (łatwa skalowalność)
    - Dev i test DB

## Autora Global Database
- Replikacja z DB w jednym regionie (master region) do max. 5 innych regionów 
    - Replikacja zajmuje ~1s
    - Replikacja nie wpływa na performans DB bo dzieje się na poziomie storage
- Repliki z innych regionach są Read-Only i jest max. 16 / region
    - Mogą być promowane do R/W
- BDB bo:
    - Cross-region Disaster Recovery i Business Continuity
    - Global Read Scaling

## Aurora Multi-Master
- Nie ma endpointu `Cluster`, strzelamy zawsze bezpośrednio do konkretnych instancji
- Write Request z jednej instancji jest wysyłany do wszystkich nodów storagowych 
    - Node może odrzucić request jeżeli koliduje z innymi danymi które akurat leca do niego
    - Jeżeli Writer uzyska `quorum` nodes to wtedy dane są zapisywane do wszytkich node
    - Po zapisie do storage updatowane są in-memory kasze innych master-instancji

# RDS Proxy
- **EXAM** RDS Proxy zarządza zbiorem trwałych połączeń do bazy który używają inne zasoby. Połączenia te są reużywane przez różnych klientów
- **EXAM** Użycie RDS Proxy jest o wiele wydajniejsze niż wołanie za każdym razem bazy danych  
- **EXAM** Klient RDS Proxy nie jest świadomy failów DB ani failoverów, Proxy to chowa przed nim
- **EXAM** Połączenie Klient -> RDS Proxy jest ustanowione i czeka na dostępne połączenie z bazą
- **EXAM** Fakty o RDS Proxy do zapamięania:
    - Auto scalign, high availiblity
    - Fully managed DB Proxy for RDS/Aurora
    - Connection pooling
    - Dostępne tylko **z wewnątrz VPC**
    - Klient używa enpodintu proxy
    - Umożliwia SSL/TLS
- **EXAM** Kiedy użyć RDS Proxy?
    - Przy błędach `too many connections`
    - Używając mniejszych T2/T3 burstable instancji
    - Używając Lambd osczędzamy czas na łączenie z bazą i autentykację
    - Long-runnign apps (SAAS) - low latency
    - Resilience to DB failure
    - Reduce time to failover (over 60%) and make it transparent to the consumer


# Database Migration Service DMS
- Używa `replication instance` latającej na EC2 a na niej latają `replication tasks`
- Te taski łączą się z bazami endpointami
- Jedna z baz danych musi być na AWS!

## Typy migracji
1. Full load
    - Kopiuje wszsytkei dane z jednej DB do drugiej
2. Full load + CDC
    - Full load + wszystkie zmiany jakie się w trakcie migracji pojawią
3. CDC
    - Jeżeli używamy zewnętrznego narzędzia do kopiowania całości danych, a AWS używamny tylko do migracji zmian które nastąpiły w trakcie migracji

## SCT Schema Conversion Tool 
- **EXAM** SCT słuzy do modyfikacji schemy przy migracji z jednego silnika DB na inny
    - np. on-premise MS SQL -> AWS MySQL
- **EXAM** SCT **nie służy** do migracji między dwoma kompatybilnymi silinkami DB

## DMS + Snowball
- Snowball to urządzenie któro AWS wysyła do nas zeby trasferować dużo danych offline
1. Uzywamy SCT żeby wgrać dane ze swojej bazy na snowball
2. Wysyłamy snowball do AWS
3. AWS wgrywa snowball na S3
4. Używamy DMS żeby zmigrować dane z S3 na RDS
