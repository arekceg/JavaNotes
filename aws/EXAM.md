ACM.md:- **EXAM** Certyfikaty generowane przez ACM są automatycznie odnawiane

ACM.md:- **EXAM** Certyfikaty importowane do ACM nie są automatycznie odnawiane

ACM.md:- **EXAM** ACM może udostępniać cerfytikaty tylko konkretnym, wspieranym serwisom AWS (głównie CloudFront i Application Load Balancery)

ACM.md:- **EXAM** Certyfikaty w ACM są region-bound, **Certyfikat i serwis które mają go użyć muszą być w tym samy regionie!!**

ACM.md:- **EXAM** WAŻNY WYJĄTEK - dla CloudFront ACM trzeba traktować jakby był odpalony w `us-east-1`

api-gateway.md:# **EXAM** API Gateway Errors

api-gateway.md:- **EXAM** API Gateway Caching odbywa sie per-stage

api-gateway.md:- **EXAM** API Gateway Cache może być zakodowana

athena.md:- **EXAM** Amazon Athena natywnie wspiera AWS Service Logs

aws-vpc.md:- **EXAM** AWS VPN jest Full-HA **jeżeli go dobrze skonfigurujemy**

aws-vpc.md:# **EXAM** Do egzaminu AWS VPN

cloud-computing.md:**EXAM** Które częsci AWS i komunikacji z nim pasują do 5 punktów definicji cloud

cloud-computing.md:**EXAM** Przy examie zastanawiać się czy wybrana odpowiedź nie koliduje z definicją cloud

cloud-computing.md:abstraction (e.g., country, state, or datacenter). Examples of resources include storage,

cloud-computing.md:**EXAM** Public vs Private vs Hybrid vs Multi Cloud

cloudformation.md:- **EXAM** Resources in a CloudFormation stack share a lifecycle

cloudformation.md:- **EXAM** Description jest opcjonalne, ale jeżeli jest to musi być zaraz za `AWSTemplateFormatVersion`

cloudformation.md:- **EXAM** Output CloudFormation jest dostępny dla parent stacka kiedy nestujemy templatki

cloudformation.md:- **EXAM** Output CloudFormation można exportować i referncować w innych templatkach używając `Description`

cloudformation.md:- **EXAM** ElasticIP wymaga w VPC **Attached** Internet Gateway, ale CloudFormation nie ma tutaj implicit zależności więc nie ogarnie tego automatycznie. Trzeba użyć `DependsOn` żeby zbudować odpowiedni ciąg zależności

cloudformation.md:- **EXAM** Templatki CF możemy gdzieś uploadować i potem używać ich przy nestowaniu templatek

cloudformation.md:- **EXAM** Nested stacks are usen when stacks _form part of one solution_ **lifecycle linked**

cloudformation.md:- **EXAM** Nested stacks są używane żeby przekraczać limit 500 resurców na jeden stack 

cloudformation.md:- **EXAM** Outputy stacków mogą być _exportowane_ i dzięki temu widoczne dla innych stacków

cloudformation.md:- **EXAM** Exportowane outputy stacków CF muszą być unikalne per konto per region

cloudformation.md:- **EXAM** Używamy funkcji `Fn::ImportValue` żeby importować exportowane outputy stacków CF

cloudformation.md:- **EXAM** Cross-Stack KEYWORDS **Service-Orientated** **different lifecycles** **STACK reuse**

cloudformation.md:- **EXAM** Concurrent Accounts - przy StackSetach CF określami ile kont jednocześnie może generować stacki 

cloudformation.md:- **EXAM** Failure Tolerance - ilość poszczególnych stacków które mogą się wysypać żeby wysypać cały StackSet sie wysypał 

cloudformation.md:- **EXAM** Retain Stacks - defaultowo usuwanie Stack Intances ze StackSet usuwa też konkretne stacki, ale można ustwaić żeby nie usuwało

cloudformation.md:- **EXAM** CloudFormation domyślnie do tworzenia zasobów uzywa permissions identity która triggeruje tworzenie stacka. 

cloudformation.md:- **EXAM** Dzięki Stack Roles możemy konkretnie ustalić jaką rolę ma przybrać CF do tworzenia zasobów. Dzięki temu identity wywołująca tworzenie stacku nie musi mieć uprawnień do tworzenia zasobów

cloudformation.md:- **EXAM** CF Custom Resources pozwalają na integrację CF z rzeczami których nie wspiera natywnie

cloudformation.md:- **EXAM** CF Custom Resources wysyła dane na konkretny endpoint (Lambda lub SNS Topic) i może dostać respons na wystawiany przez siebie ResponseURL

cloudfront.md:- **EXAM** Cloudfront (czytanie z kasz na edge locations) działa tylko na **read**, zapis leci prosto na origin

cloudfront.md:- **EXAM** Więcej `cache HIT` = mniejsze obiążenie Origina

cloudfront.md:- **EXAM** Aby CF nie był zupełnie publiczny możemy `Restrict Viewer Access` na dwa sposoby:

cloudfront.md:- **EXAM** Ustawienia cachowania w CF są ustawiane per-behaviour

cloudfront.md:- **EXAM** Cloudfront default TTL 24h

cloudfront.md:## **EXAM** Headery CF do ustawiania TTL:

cloudfront.md:## **EXAM** Cache Invalidation

cloudfront.md:	- **EXAM** Aby CloudFront mógł użyć certyfikatu który wrzucamy musimy go wrzucić w region `us-east-1`

cloudfront.md:- **EXAM** SSL przy CF składa się z dwóch połączeń: odbiorca-CF i CF-Origin

cloudfront.md:- **EXAM** SSL przy CF musi być podpisany **publicznymi** certyfikatami. Self-Signed nie zadziałają 

cloudfront.md:- **EXAM** Aby wspierać stare przeglądarki w CF musimy dopłacić 600$/msc żeby nasza strona miała dedykowany adres IP

cloudfront.md:	- **EXAM** Aby móc konfigurować porty HTTP/HTTPS, wersję SSL, protocol policy

cloudfront.md:- **EXAM** Private Cloud Front Distributions wymagają signed Cookie lub Signed URL. Jest to definiowane na poziome behaviour

cloudfront.md:- **EXAM** LEGACY: Kiedyś aby podpisywać ciastka/url dla Cloud Front trzeba było stworzyć CloudFront Key używając Root Account. To konto potem można przypisać do behaviour jako `Trusted Signer` (zapamiętac termin Trusted Signer - jeżeli wystąpi na egzaminie to znaczy że w grę wchodzi private distribution/behaviour)

cloudfront.md:- **EXAM** Obecnie dla prywatnych behaviour CF tworzy się key group i przypisuje do signerów

cloudfront.md:- **EXAM** Signed Urls pozwalają na dostęp do jednego obiektu przez CF

cloudfront.md:- **EXAM** Signed Cookies pozwalają na dostęp do wielu obiektów przez CF

cloudfront.md:## **EXAM** Typy Lambda@Edge

cloudfront.md:## **EXAM** Przykłady zastosowania Lambda@Edge

cloudfront.md:- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-redirecting-examples

cloudfront.md:- **EXAM** Każdy edge location Global Acceleratora używa dwóch anycast IP 

cloudfront.md:- **EXAM** Request po wejściu do któregoś z Global Accelerator Edge Location jest przesyłany do 1+ celu używać AWS Global Network bardzo szybko

cloudfront.md:- **EXAM** Global Accelerator możemy używać do HTTP/S/TCP/UDP, a CloudFront tylko do HTTP/S

cloudfront.md:- **EXAM** Global Accelerator nie kaszuje! Ilość requetów do Origin się nie zmienia

cloudhsm.md:- **EXAM** CloudHSM to true **Single Tenant** Hardware Security Module

cloudhsm.md:- **EXAM** CloudHSM jest zgodny ze standardem _FIPS 140-2 Level 3_ (KMS jest głównie L2).

cloudhsm.md:- **EXAM** Jeżeli wymagamy standardu FIPS 140-2 L3 to albo CloudHSM albo zarządzane samodzielnie urządzenie on-prem urządzenie HSM

cloudhsm.md:- **EXAMM** Dostęp do CloudHSM jest tylko używając industry-standard APIs. np. _PKCS#11_, Java Cryptography Exentsions _JCE_, M$ _CryptoNG_

cloudhsm.md:- **EXAM** CloudHSM nie integruje się natywnie z innymi produktami AWS, np nie można go użyć do Server-Side-Encryption S3

cloudhsm.md:- **EXAM** CloudHSM może robić procesowanie SSL/TLS dla Web Serverów

cloudhsm.md:- **EXAM** CloudHSM może być użyty żeby robić Transparent Data Encrytpion dla Oracle DB

cloudhsm.md:- **EXAM** CloudHSM może być użyty żeby przechowywać private keye dla Issuing Certificate Authority CA

cloudtrail.md:- **EXAM** CloudTrail NIE JEST REALTIME, eventy lądują w miejscu przechowywania w przeciągu 15 minut od wydarzenia

cloudtrail.md:- **EXAM** **True Global Service (IAM, STS, CloudFront) logują swoje eventy do us-east-1**

cloudtrail.md:	- **EXAM** `Global Service Events`

cloudtrail.md:	-	**EXAM** Trail musi mieć to włączone żeby logować te eventy (jest domyślnie włączone)

config.md:- **EXAM** AWS Config nie pozwala na blokowanie zmian, jedynie ich audyt i porównanie do standardów

congnito.md:- **EXAM** Wymiana External Identity na temp. kredki AWS to **Web Identity Federation**

course-resources/aws-sa-associate-saac03/0700-SIMPLE_STORAGE_SERVICE(S3)/s3_versioning/bucket_policy.json:        "Resource":["arn:aws:s3:::examplebucket/*"]

course-resources/aws-sa-associate-saac03/0700-SIMPLE_STORAGE_SERVICE(S3)/static_website_hosting/bucket_policy.json:        "Resource":["arn:aws:s3:::examplebucket/*"]

direct-connect.md:- **EXAM** DX Location nie jest budynkiem zarządzanym przez AWS. Jest to część dużych lokalnych datacenter w których AWS wynajmuje przestrzeń

direct-connect.md:- **EXAM** Jeżeli my nie mamy wykupionej przestrzeni w DX Location (Customer DX Router) to są Communication Partnerzy którzy mają i z których usług możemy skorzystać (Parnter DX Rounter). Taki partner dociągnie nam wtedy światłowód DX do biura

direct-connect.md:- **EXAM** AWS Direct Connect zapewania niska i consistent latencja + high speed

dns.md:- **EXAM** CNAME nie mogą wskazywać bezpośrednio na adres IP, tylko na inny host

dynamo-db.md:- **EXAM** Na egzaminie jak wspominają o NoSQL to prawdpodobodnie odpowiedź będzie DynamoDB :D

dynamo-db.md:- **EXAM** Na egzaminie jak wspominają o Key/Value DB to prawdpodobodnie odpowiedź będzie DynamoDB :D

dynamo-db.md:- **EXAM** Dostęp do DynamoDB jest prze CLI, GUI, API, NIE OBSŁUGUJE SQL (duh)

dynamo-db.md:	- **EXAM** DynamoDB 1 WCU (Write Capacity Unit) = 1kB/s

dynamo-db.md:	- **EXAM** DynamoDB 1 RCU (Read Capacity Unit) - 4kB/s (Strongly Consistent) 2kB/s (Eventually Consistent)

dynamo-db.md:	- **EXAM** Każda operacja DynamoDB konsumuje **minimum 1 RCU/WCU**

dynamo-db.md:	- **EXAM** DynamoDB płacimy za RCU, WCU, Storage i dodatkowe usługi

dynamo-db.md:	- **EXAM** Jeżeli pytanie egzaminacyjne z DynamoDB będzie mówiło np. o 60 zapisach na minutę to zawsze trzeba to przeliczyć na zapisy/sec bo tak Dynamo charguje. Przyklad niżej:

dynamo-db.md:	- **EXAM** Query DynamoDB zawsze wymaga jednej wartości PK i opcjonalnie zakresu SK

dynamo-db.md:- **EXAM** AWS radzi używać Global Secondary Index by default, Local tylko kiedy explicite potrzebujemy _strong consistency_

dynamo-db.md:- **EXAM** Indexy dynamoDB pozwalają na _alternative access patterns_ np wiele teamów ma dostęp do tej samej tabeli ale widzi dane inaczej, dopasowane do swoich wymagań

dynamo-db.md:	- **EXAM** Local Secondary Index jest tworzony wraz z tabelą DynamoDB, nie można go później dodać

dynamo-db.md:	- **EXAM** Local Secondary Index współdzielą RCU i WCU z Table

dynamo-db.md:	- **EXAM** Local Secondary Index pozwala na stworzenie jakby dodatkowego SK w tablicy (cały czas ten sam Partition Key)

dynamo-db.md:	- **EXAM** Global Secondary Index może być tworozny po stworzeniu tabeli

dynamo-db.md:	- **EXAM** Global Secondary Index limit 20 /tabele

dynamo-db.md:	- **EXAM** Global Secondary Index mają swoje własne RCU i WCU

dynamo-db.md:	- **EXAM** Global Secondary Index używają alternatywnych PK i SK

dynamo-db.md:	- **EXAM** Global Secondary Index sa **eventually consistent** - są asynchronicznie updejtowane z głównej tabeli

dynamo-db.md:- **EXAM** DAX to cluster service, w jednym VPC Primary i w reszcie Replicas

dynamo-db.md:- **EXAM** DynamoDB TTL ustala timestamp automatycznego usuwania itemów z tabeli

ec2.md:	- **EXAM** w związku z tym EC2 jest `AZ Resilient`

ec2.md:        - **EXAM** EBS istnieje jak jak EC2 - w kontekście jednej AZ

ec2.md:## **EXAM** Kiedy EC2?

ec2.md:	- **EXAM** Jak EC2 jest Stopped to płacimy tylko za storage

ec2.md:	 **EXAM** KeyName to nazwa KeyPair 

ec2.md:## **EXAM** Typy instancji EC2

ec2.md:    - **EXAM** Instance Store to przykład Ephemeral pamięci

ec2.md:    - **EXAM** EBS zapewnia Persistent Storage

ec2.md:- **EXAM** EBS może być zakodowany KMSem

ec2.md:- **EXAM** **EBS JEST AZ RESILIENT**

ec2.md:- **EXAM** EBS jest persistent, nie jest związane z lifecycle aplikacji

ec2.md:- **EXAM** EBS GP2 może mieć pojemność od 1GB to 16TB

ec2.md:- **EXAM** EBS GP2 jest dobre dla boot partycji, apek interaktywnych, środowisk dev i test

ec2.md:#### **EXAM** Architektura EBS, IO Credits

ec2.md:- **EXAM** EBS GP3 jest dobre dla VMek, średnich instancji DB, dev, test, boot

ec2.md:- **EXAM** Per Instance Perfomance Limit. Performance EBS Provisoned IOPS dla jednej EC2 jest limitowana. io1: 260000IOPS 7500MB/s, io2: 160000IOPS 4750Mb/s - kilka volume musi być podpiętych do jednej instancji EC2 żeby to osiągnąć

ec2.md:- **EXAM** Provisioned IOPS SSD dobre dla high performacne low latecy środowisk, high performanc nierelacyjne i relacyjne bazy danych

ec2.md:- **EXAM** Instance Store Volumes są dołączane do EC2 przy tworzeniu instancji, nie można ich dodać więcej

ec2.md:- **EXAM** Wszystkie Instance Store Volumes trzeba traktować jako ephemeral - tymczasowe. Jeżlei instancja EC2 np. zmieni host to tracimy dane na tym volumie

ec2.md:## **EXAM** Wybór typu storage EC2

ec2.md:## **EXAM** Wybór typu EBS

ec2.md:- **EXAM** Bez FSR EC2 Volume restorowane ze snapshotu jest restorowane lazy, zajmie trochę czasu zanim osiągnie pełen performans level

ec2.md:- **EXAM** Fast Snaphot Restore ustawia się na snapshocie i jest on instantly restorowany do volume. Koszuje piniądze

ec2.md:- **EXAM** Można mieć max 50 FSR ustawionych na region

ec2.md:- **EXAM** Snapshot zakodowanych EBS jest też zakodowany tym samym DEK

ec2.md:- **EXAM** AWS Account może być ustawione tak żeby z defaultu kodowała EBS

ec2.md:- **EXAM** Każdy EBS Volume na swój własny DEK, chyba że jest tworzony ze snapshota - wtedy dziedziczy DEK po Volume z którego był zrobiony snapshot

ec2.md:- **EXAM** Nie da się wyłączyć enkrypcji na EBS Volume, jak już go raz zakodujemy to zostaje zakodowane.

ec2.md:- **EXAM** OS na EC2 nie jest w ogóle świadomy zakodowania danych, zakodowanie i dekodowanie dzieje się poza OSem, OS dostaje dane plaintext. **No performance lost**

ec2.md:- **EXAM** EBS jest zakodowane AES-256

ec2.md:- **EXAM** SG podpięta pod EC2 jest tak naprawde podpięta pod Elastic Network Interface podpięty pod to EC2 i działa na wszystkie IP skonfigurowane w tym ENI

ec2.md:- **EXAM** Kiedy przypisujemy EC2 Elastic IP to traci ona wcześniej podpięty publiczny IPv4 i nie da sie go już odzyskać. Jak usuniemy Elastic IP to EC2 dostanie nowy publiczny IPv4

ec2.md:- **EXAM** Niektóre programy wydają licencje oparte o adres MAC, więc możemy zarejestrować soft na MAC danego ENI a potem ten ENI odpiąć i podpiąć po inny EC2

ec2.md:- **EXAM** Różne ENI podpięte pod jeden EC2 mogą być w róznych subnetach wewnątrz tej samej AZ

ec2.md:- **EXAM** OS EC2 nigdy nie widzi publicznego IPv4, publiczny IP jest zarządzany przez IGW

ec2.md:- **EXAM** Jeżeli zastopuje EC2 i odpalę znowu to dostanie nowy IPv4. Restartowanie tego nie triggeruje

ec2.md:- **EXAM** Publiczny DNS który jest nadany EC2 będzie wkazywał na **primary private** IPv4 jeżeli odpytamy go z wewnątrz VPC, i na **publiczny** jeżeli z zewnątrz

ec2.md:- **EXAM** AMI są region-bound, AMI o danym ID isteniej tylko w tym jednym regionie

ec2.md:- **EXAM** AMI Baking - tworzenie AMI z w pełni skonfigurowanej instancji + apki na EC2

ec2.md:- **EXAM** AMI nie można edytować!!

ec2.md:- **EXAM** AMI można kopiować między regionami

ec2.md:- **EXAM** Domyślnie do AMI ma dostęp tylko konto któro je tworzyło. AMI może być private, public lub z nadanymi konkretnymi dostępami

ec2.md:- **EXAM** Regional Reservation nie rezerwuje capcity w konkretnym AZ, ma niższy priorytet w przydziale capacity niż Zonal Reservation

ec2.md:- **EXAM** Jeżeli chcemy przenieść architekturę opartą na EC2 na rozkonteneryzowane, serwerlessowe EKSy czy Lambdy to warto rozważyć General Compute Savings Plan w celach oszczędności

ec2.md:- **EXAM** A recovered EC2 instance is identical to the original instance, including the instance ID, private IP addresses, Elastic IP addresses, and all instance metadata. If the impaired instance has a public IPv4 address, the instance retains the public IPv4 address after recovery.

ec2.md:- **EXAM** **BARDZO WAŻNE** EC2 Instance Metadata jest dostępne dla każdej instancji na http://169.254.169.254/latest/meta-data

ec2.md:- **EXAM** EC2 Instance Metadata servcie jest nieautentykowany i nie ma enkrypcji

ec2.md:- **EXAM** EC2 Bootstraping to automatyzacja **inicjalizacji** instancji. 

ec2.md:- **EXAM** EC2 Boostraping Używa **EC2 User Data**. Ten sam IP co metadata, ale inny url: `http://169.254.169.254/latest/user-data`, max 16kb

ec2.md:- **EXAM** EC2 User Data nie jest kodowany ani zabezpieczony, każdy z dostępem do OS może pobrac to user data

ec2.md:- **EXAM** Aby poprawić Boot-Time-To-Service-Time instancji EC2 najepiej połączyć AMI Baking i EC2 Bootstraping

ec2.md:    - **EXAM** Cluster Placement Group zajmuje pojedyncza AZ - ta AZ gdzie postawimy pierwszą instację, ta AZ będzie powiązana z Placement Group

ec2.md:- **EXAM** Launch Configuration i Launch Template nie można edytować! LT ma wersje, ale nie można edytoać ich po stworzeniu

efs.md:- **EXAM** Żeby zapewnić HA dla EFS powinien istnieć `mount target` w każdym subnecie danej VPC

efs.md:- **EXAM** EFS działa tylko pod Linuxem

efs.md:- **EXAM** EFS ma dwa tryby - General Purpose i Max I/O

efs.md:- **EXAM** EFS ma dwa tryby throughputu - Bursting i Provisoned. Przy provisoned określamy wymagania odnośnie throughputu oddzielnie od wymagań odnośnie ilości storage

efs.md:- **EXAM** EFS ma dwie klasy dostępu - Standard i Infrequent Access (IA)

efs.md:- **EXAM** EFS ma, jak S3, Lifecycle Policies któro może zautomatyzować przenoszenie danych między klasami

elasticache.md:- **EXAM** Elasticache może być postawione albo na Redis albo na Memcached

elasticache.md:		- **EXAM** Memcached ma brak backupów, więc jak pytanie exam mówi o restorowaniu cachy do chodzi o Redisa

elasticache.md:- **EXAM** Elasticache zapewnia sub-milisecond dostęp do danych

elasticache.md:- **EXAM** Elasticache jest cost-effective dla READ HEAVY aplikacji

elasticache.md:- **EXAM** Elasticache może być użyte do przechowywania Session Data (Stateless Servers). Dzięki temu jak padnie np. instancja apki to możemy kontynuowac sesję usera na innej instancji 

elasticache.md:- **EXAM** Elasticache wymaga zmian w kodzie aplikacji (apka musi wiedzieć żeby używac kaszy)

exam-notes.md:# Exam notes

exam-tech.md:# Exam Tips and Techniques

fsx.md:- **EXAM** Jeżeli pytanie mówi coś o `native Windows file systems`, `active directory integration` itp to możliwe że chodzi o FSx

fsx.md:**EXAM** Keywordy które wskazują na FSx

fsx.md:- **EXAM** Lustre to filesystem zaprojektowany specjalnie pod High Performance Computing (Linux clients + **POSIX style permissions**)

glue.md:	- **EXAM** Jezeli pytanie egzaminacyjne mówi o _ad-hoc, serverless, cost-effective_ trzeba wybrać Glue zamiast DataPipelie

ha-scaling.md:- **EXAM** Nigdy z defaultu nie wybieać Classic Load Balancer CLB 

ha-scaling.md:	- **EXAM** ALB nie potrafi utrzymywać enkrypcji SSL od klienta aż do apki. Połączenie SSL z klientem jest zrywane i nowe połączenie jest tworzone od ALB do apki

ha-scaling.md:	- **EXAM** ALB są wolniiejsze niż NLB bo jest więcej networkingowych rzeczy do załatwienia

ha-scaling.md:	- **EXAM** ALB przez to że jest L7 może odpytać aplikację o jej zdrowie

ha-scaling.md:	- **EXAM** NLB są bardzo bardzo szybkie

ha-scaling.md:	- **EXAM** Do load balancowania połączeń nie HTTP/HTTPS dobrze jest defaultować NLB

ha-scaling.md:	- **EXAM** NLB mogą mieć przydzielony statyczny IP - przydatne do whitelistowania

ha-scaling.md:	- **EXAM** NLB przekazują TCP prosto do apki, nie przerywaja enkrypcji 

ha-scaling.md:	- **EXAM** NLB używają private link i mogą byc używane przez inne VPC

ha-scaling.md:- **EXAM** Przy tworzeniu ELB wybieramy subnety (po **jednym** w każdej AZ którą chcemy zloadbalansować), w kazdym subnecie ELB tworzy `Load Balancer Node`

ha-scaling.md:	- **EXAM** ELB potrzebuje 8 wolnych adresów IP w subnecie w którym tworzy Node

ha-scaling.md:	- **EXAM** AWS zaleca do ELB subnet przynajmniej /27 żeby ELB miał mijesce na skalowanie, ale taki serio min. subnet do by był /28

ha-scaling.md:- **EXAM** Każdy ELB tworzony jest z jednym wpisem DNS wskazującym an **wszystkie** dostępne nody ELB

ha-scaling.md:- **EXAM** Nody ELB konfiguruje się używając Listener Configuration

ha-scaling.md:	- **EXAM** Internet-Facing ELB może sie łączyć i z prywatnymi i z publicznymi instancjami EC2

ha-scaling.md:	- **EXAM** Internal ELB może służyć do skalowania tylko pewnych tierów aplikacji

ha-scaling.md:### **EXAM** Cross-Zone Load Balancing

ha-scaling.md:- **EXAM** Auto Scaling Groups Self Healing - kiedy padnie jedna instacja ASG może to wykryć i postawić następną

ha-scaling.md:- **EXAM** Auto Sclaing Groups są darmowe - płacimy tylko za stworzone zasoby

ha-scaling.md:- **EXAM** Przy ASG warto używać cooldownów żeby zapobiec gwałtownemu tworzeniu/terminacji instancji

ha-scaling.md:- **EXAM** Lepiej miec więcej małych instancji niż mało duzych - bardziej cost-effective

ha-scaling.md:- **EXAM** ASG + Load Balancer tworzą elasticity i abstraktują cały proces od klienta

ha-scaling.md:- **EXAM** ASG Health Check Grace Period (def. 300s) - opóźnienie zanim zaczniemy sprawdząc healthczkea znowu (np. na ładowanie systemu, start apki)

iam.md:- **EXAM** `Globally resilient service` - any data is always secure across all AWS regions

iam.md:- **EXAM** `Global Service` - baza danych IAM jest wspólna dla wszystich regionów itd dla danego konta AWS

iam.md:- **EXAM**  IAM ma trzy główne zadania: 

iam.md:- **EXAM** Jeżeli mamy dać dostęp do konta **jednej, konkretnej** rzeczy którą potrafimy nazwać to w 99% przypadków chodzi o identity IAM User

iam.md:- **EXAM** Konto może mieć max 5000 IAM Userów (per konto, nie per region)

iam.md:- **EXAM** Jeżeli musimy dać dostęp do konta dużej ilości użytkowników lub pozwolić na rejestrację się z internetu to nie wolno używać IAM User bo wyczerpiemy to 5000 szybko

iam.md:- **EXAM** IAM User może byc członkiem maksymalnie 10 grup

iam.md:- **EXAM** Nie da się zalogować do IAM Group, jest to tylko kontener na IAM Users

iam.md:- **EXAM** Jeden IAM User może być członkiem wielu (max 10) IAM Group

iam.md:- **EXAM** Domyślnie nie istnieje jedna _all users_ IAM Group która zawiera wszystkich IAM Userów

iam.md:- **EXAM** IAM Groupy nie są nestowalne, nie można mieć grupy w grupie

iam.md:- **EXAM** Konto domyślnie może mieć max 300 IAM Groups, ale można to zwiększyć support tiketem

iam.md:- **EXAM** IAM Group is **not** a `true identity` and cannot be referenced as a `principal` in a policy - do roli czy do usera mozemy dostać konkretny ARN, a do grupy **nie**. W związku z tym IAM Policy przypięte do jakiegos zasobu (Resource Policy) nie będzie w stanie odnieść się do konkretnej IAM Group (bo odnosi się do IAM Identity po ARN)

iam.md:- **EXAM** IAM Role służy do szczegółowego nadawania uprawnień dla **nieznanej** ilości principali

iam.md:- **EXAM** IAM Role to **real identity** czyli może być referncowana przez ARN

iam.md:- **EXAM** Nie można się logowąć na IAM Role

iam.md:- **EXAM** Inny typ Policy to Resource Policy - nadawane zasobom o okreslające kto ma jakie uprawnienia do pracy z nimi

iam.md:- **EXAM** Customer Managed Policy to każda IAM Policy którą tworzymy my jako klient AWSa

iam.md:- **EXAM** Customer Managed Policy to każda IAM Policy która jest tworzona przez AWS

iam-pytania.md:Applications must sign their API requests with AWS credentials. Therefore, if you are an application developer, you need a strategy for managing credentials for your applications that run on EC2 instances. For example, you can securely distribute your AWS credentials to the instances, enabling the applications on those instances to use your credentials to sign requests, while protecting your credentials from other users. However, it’s challenging to securely distribute credentials to each instance, especially those that AWS creates on your behalf, such as Spot Instances or instances in Auto Scaling groups. You must also be able to update the credentials on each instance when you rotate your AWS credentials.

iam-pytania.md:Tags enable you to categorize your AWS resources in different ways, for example, by purpose, owner, or environment. This is useful when you have many resources of the same type — you can quickly identify a specific resource based on the tags you’ve assigned to it. Each tag consists of a key and an optional value, both of which you define. For example, you could define a set of tags for your account’s Amazon EC2 instances that helps you track each instance’s owner and stack level. We recommend that you devise a set of tag keys that meets your needs for each resource type. Using a consistent set of tag keys makes it easier for you to manage your resources. You can search and filter the resources based on the tags you add.

iam-pytania.md:Applications must sign their API requests with AWS credentials. Therefore, if you are an application developer, you need a strategy for managing credentials for your applications that run on EC2 instances. For example, you can securely distribute your AWS credentials to the instances, enabling the applications on those instances to use your credentials to sign requests, while protecting your credentials from other users. However, it’s challenging to securely distribute credentials to each instance, especially those that AWS creates on your behalf, such as Spot Instances or instances in Auto Scaling groups. You must also be able to update the credentials on each instance when you rotate your AWS credentials.

infrastructure.md:## **EXAM** Shared Responsibility Model

inspector.md:- **EXAM** Amazon Inspector skanuje EC2 i ich OS oraz kontenery i urządzenia sieciowe w poszukiwaniu vulerabilities i odstępst od best practice

inspector.md:- **EXAM** Amazon Inspector generuje _Security Report_ na podstawie tego co znalazł

inspector.md:- **EXAM** Amazon Inspector: Network Assessment (**Network Reachability**) - Agentletss; Network & Host Assessment - Wymaga Agenta

inspector.md:- **EXAM** Amazon Inspector packages:

kinesis.md:- **EXAM** Pytania egzaminacyjne o `ingestion of data` -> AWS Kinesis

kinesis.md:- **EXAM** Kinesis Data Firehouse jest `Near Real Time` produketm - zbiera albo 1MB albo 60sec danych przed wysyłką dalej

kinesis.md:## **EXAM** Firehose Desinations

kinesis.md:- **EXAM** Kinesis Data Analytics - real-time skomplikowane operacje na danych, leaderboardy, elections, real-time metryki

kinesis.md:- **EXAM** Dane Kinesis Video Streams nie są dostępne bezpośrednio w EFS/EBS/S3, tylko przez API Servicu

kinesis.md:- **EXAM** Jeżeli egzamin mówi o analizie video, GStreamer, RTSP - trzeba użyć Kinesis Videa Streams

kms.md:- **EXAM** Klucze przechowwywane przez KMS nigdy go nie opuszczają

kms.md:- **EXAM** KMS spełnia standard FIPS 140-2 (Level 2)

kms.md:- **EXAM** KMS Keys mogą być używane do kodowania/dekodowania danych do 4KB

kms.md:- **EXAM** KMS Keys są domyślnie przechowywane w ramach konkretnego regionu i nigdy go nie opuszczają

kms.md:- **EXAM** Istnieją Multi-Region KMS Keys

kms.md:- **EXAM** Data Encryption Key DEK nie jest nigdzie przechowywany. KMS generuje go, przesyła do seriwsu lub usera który go potrzebuje i potem się go pozbywa

l7-firewalls.md:- **EXAM** Tunel HTTPS jest przerywany w L7 Firewall i potem budowany na nowo

l7-firewalls.md:- **EXAM** L7 FW potrafi podglądać, blokować, podmieniac i tagować dane które przez niego przechodzą

l7-firewalls.md:- **EXAM** L7 FW potrafi identyfikować i blokować komunikację z konkretnymi apliackaji np. FB

lambda.md:- **EXAM** Docker to anty-pattern dla Lambdy, jeżeli w egzaminie będzie powiedziane że cośam Docker to nie chodzi o Labdy

lambda.md:- **EXAM** Lambda może mieć przydzzielone od 128MB do 10240MB RAM, ale vCPU nie można dobrać ręcznie, jest dobierane do pamięci

lambda.md:- **EXAM** Lambda może mieć od 512mb do 10240mb storage jako /tmp

lambda.md:- **EXAM** Pojedyncze wykonanie Lambdy ma timeout 15min (900s)!!!

lambda.md:- **EXAM** Lambda przyjmuje ExecutionRole

lambda.md:# **EXAM** Lambda networking

lambda.md:	- **EXAM** Żeby Lambda mogła logować do CWLogs to musi mieć odpowidnie uprawnienia w Execution Role

lambda.md:	- **EXAM** Żeby resty async Lambdy działało poprawnie to funkcja musi być IDEMPOTENTNA

lambda.md:- **EXAM** Async Lambda może mieć ustawione `Destination` - czyli gdzie dalej posłać event - SQS, SNS, EventBridge

lambda.md:- **EXAM** Event Source Mapping używa Execution Role Lambdy żeby pobierać dane ze streamu

lambda.md:- **EXAM** Nieprzeprocesowane event batche mogą być wrzucane do DLQ i potem SNS/SQS w celu analizy

lambda.md:	- **EXAM** Jeżeli następne wywołanie lambdy nastąpi niedługo po poprzednim to lambda użyje tego samego środowiska

lambda.md:	- **EXAM** Jeżeli lambdy są wywoływane równolegle to zawsze stawiane jest nowe środowisko 

lambda.md:	- **EXAM** Zasoby tworzone poza głównym Lambda Function Handler będą dostępne dla każdej Lambdy używającej tego samego środowiska

lambda.md:## **EXAM** Provisioned Concurrenty

local-zones.md:- **EXAM** Local Zony mają private networking z Parent Regionem

local-zones.md:- **EXAM** Local Zone nie mają wbudowanej resillience, 1 zona to 1 zona

local-zones.md:- **EXAM** Local Zones dają highest performance przez bliskość geograficzną

machine-learning.md:- **EXAM** Amazon Lex służy do tworzenia tekstowych lub głosowych interfejsów (czatbotów)

machine-learning.md:- **EXAM** Amazon Lex rozumie **intent** usera

machine-learning.md:- **EXAM** Amazon Lex musim umieć spełnić intent, np lambdą

macie.md:- **EXAM** Jezeli exam mówi o classification, identification, discovery and reacting to sensitive data automatically in S3 to chodzi pewnie o Macie 

mq.md:- **EXAM** Amazon MQ nie potrafi out-of-the-box łączyć się z serwisami AWS, więc nie będziemy mogli korzystać z logowanie, encrytpion itd)

mq.md:- **EXAM** Amazon MQ - dobry wybór do migracji istaniejącego systemu msg z minimalnymi zmianami w aplikacji

mq.md:- **EXAM** Amazon MQ - kiedy potrzebujemy użyć protokołów AMQP, MQTT, OpenWire, STOMP

mq.md:- **EXAM** Amazon MQ wymaga odpowiedniej konfiuracji **prywatnego** networkingu

rds.md:- **EXAM** Jeżeli ACID jest wspomniany na examie to najczęsciej dotyczy RDS

rds.md:- **EXAM** Jeżeli ACID jest wspomniany w konteście DynamoDB i noSQL na examie to najczęsciej dotyczy `DynamoDB Transactions`

rds.md:- **EXAM** Jeżeli BASE jest wspomniany na examie to najczęsciej dotyczy DynamoDB

rds.md:- **EXAM** Amazon Aurora to inny produkt niż RDS

rds.md:- **EXAM** RDA domyślnie nie daje dostępu do OS albo SSH. Trzeba użyć RDS Custom

rds.md:- **EXAM** RDS Subnet Group to lista subnetów których RDS może użyć dla instancji DB

rds.md:- **EXAM** Każda instancja RDS może mieć wiele DB

rds.md:- **EXAM** Każda instancja RDS ma dedykowany storage w EBS

rds.md:- **EXAM** Komunikacja z Multi AZ Instance RDS jest zawsze do `Primary` instancji!

rds.md:- **EXAM** `Primary` instancja RDS w jednej AZ będzie miała `Standby` instancję w innym AZ (ten sam region). Jest tylko jedna `StandBy` replica i nie można jej bezpośrednio używać do R/W

rds.md:- **EXAM** `Primary` instancje RDS syncują dane z `Standby` instancjami używając `Synchronous Replication` w momencie uzyskania danych przez Primary, nawet przed tym jak dane do Primary są commited

rds.md:- **EXAM** Backupy RDS sa tworzone w AWS-managed S3 bukecie i robione są z intancji `Standby` więc `Primary` nie odczuje tego performatowo

rds.md:- **EXAM** Multi AZ Cluster RDS ma jedną instację `Writer` i dwie instancje `Reader`. Każda w róznym AZ. Readery syncują się **synchronicznie** z Writerem

rds.md:- **EXAM** Multi AZ Cluster RDS `Writer` może być użyty do R/W, `Reader` tylko do R

rds.md:- **EXAM** Multi AZ Cluster RDS dane zapisywane do `Writer` sa uznawane za zacommitowane kiedy przynajmniej jeden `Reader` potwierdzi że je zapisał 

rds.md:- **EXAM** Multi AZ Cluster RDS ma Cluster Endpoint który wskauzuje na Writera i używany jest do R/W

rds.md:- **EXAM** Multi AZ Cluster RDS ma Reader Endpoint który przekazuje requesty R do dowolnego z wolnych Readerów

rds.md:- **EXAM** Multi AZ Cluster RDS ma Instance Endpoints które wskazują na konkretną instancję RDS

rds.md:- **EXAM** Multi AZ Cluster RDS działa na szybszym hardawarze niż MultiAZ Instance

rds.md:- **EXAM** Multi AZ Cluster RDS replikuje się używając Transaction Logs, dzięki temu failover zamiast 60-120 sec (Instance) trwa ~35 sec

rds.md:- **EXAM** Backupy i Snapshoty RDS używają bucketów S3, ale te buckety są zarządzane przez AWS więc nie mamy do nich w ogóle dostępuo

rds.md:- **EXAM** Auto bakapy RDS można skonfigurować żeby sie replikowały między regionami ale to kosztuje

rds.md:- **EXAM** Backap/Snapshot RDS restore tworzy **nową** instanjcę RDS. Trzeba apki przepiąć na tę instacnję

rds.md:- **EXAM** Backap restore bierze **ostatniego** Snapshota i używając Transaction Logs podbija go do wybranego przez nas momentu (DOBRE RPO)

rds.md:- **EXAM** Restorowanie jest **powolne** - kiepsko RTO

rds.md:- **EXAM** Instacje RDS `Read Only Replica` replikują sie **asynchronicznie** od Primary

rds.md:- **EXAM** Read Only Replica może być w tym samym lub **innym** regionie niż Primary

rds.md:- **EXAM** Do jednej instancji DB może istniec max. 5 Read Only Replica

rds.md:- **EXAM** Skalowanie read performance bazy danych 

rds.md:- **EXAM** Read Replica może mieć swoje Read Replica ale przez zapis asynchroniczny lag dodawania danych jest prawdziwym problemem

rds.md:- **EXAM** Read Replica jest super na poprawę RPO i RTO - bo jest zawsze aktualną kopią Primary bazy i można szybko ją awansować od głównej bazy

rds.md:- **EXAM** Read Replica nada się do recovery tylko w przypadku gdy nie nastapiła korupcja danych

rds.md:- **EXAM** Read Replica jest read-only dopóki nie zostanie ustawiona jako Primary baza

rds.md:- **EXAM** IAM w RDS służy tylko do autentykacji, autoryzacja jest już po stronie DB która tworzy lokalnego usera z odpowiednimi uprwanieniami

rds.md:- **EXAM** SSL/TLS for RDS (encryption in transit)  może być ustwaione jako _mandatory_ dla każdego usera z osobna

rds.md:- **EXAM** RDS Encryption at rest - zakodowywane przez KMS na volumie EBS. Snapshoty itd tez są kodowane tym samym kluczem

rds.md:- **EXAM** RDS Encryption at rest **NIE DA SIĘ USUNĄĆ/WYŁĄCZYĆ** po włączeniu

rds.md:- **EXAM** RDS MSQL i Oracle wspiera TDE - Transparent Data Encryption. Jest to funkcja silnika bazodanowego

rds.md:- **EXAM** RDS Oracle wspiera CloudHSM (bardzo secure)

rds.md:- **EXAM** RDS Proxy zarządza zbiorem trwałych połączeń do bazy który używają inne zasoby. Połączenia te są reużywane przez różnych klientów

rds.md:- **EXAM** Użycie RDS Proxy jest o wiele wydajniejsze niż wołanie za każdym razem bazy danych  

rds.md:- **EXAM** Klient RDS Proxy nie jest świadomy failów DB ani failoverów, Proxy to chowa przed nim

rds.md:- **EXAM** Połączenie Klient -> RDS Proxy jest ustanowione i czeka na dostępne połączenie z bazą

rds.md:- **EXAM** Fakty o RDS Proxy do zapamięania:

rds.md:- **EXAM** Kiedy użyć RDS Proxy?

rds.md:- **EXAM** SCT słuzy do modyfikacji schemy przy migracji z jednego silnika DB na inny

rds.md:- **EXAM** SCT **nie służy** do migracji między dwoma kompatybilnymi silinkami DB

redshift.md:- **EXAM** Redshift to OLAP db - Online Analitycial Processing (Column-based)

redshift.md:- **EXAM** Redshift zazwyczaj ładuje dane publicznymi routami, ale możemy mu włączyć Enchanced VPC Routing. Wtedy Redshift będzie używał naszej konfiguracji VPC, czyli nasze SG, NACL, VPC Gatewaye. Jeżeli musimy spełnić customowe wymagania konfiguracji networkingy przy Redshift to musimy włączyć Enchanced VPC Routing

redshift.md:- **EXAM** Dane do Redshift mogą być ładowane przez:

route53.md:- **EXAM** ALIAS może być użyty i dla normalnych i apex domen (z i bez `www.`)

route53.md:- **EXAM** Jak mam nakierować DNS na zasób AWS to domyślnie wybrać ALIAS record

route53.md:- **EXAM** ALIAS jest podtypem rekordu `A` lub `CNAME`. Używając ALIAS nalezy wybrać taki typ na jaki wskazujemy ALIASem. np. ELB wystawia nam rekord A (domena wskazująca na IP) więc mamy użyć ALIAS A

route53.md:- **EXAM** Simple Routing w R53 używa się kiedy chcemy przesłać traffic do jednego serwisu, np serwera webowego

route53.md:- **EXAM** Weighter Routing można użyć jako prosty load balancing lub do testowania nowych wersji aplikacji

route53.md:- **EXAM** Użyć Latency-Based Routing kiedy potrzebna jest optymalizacja pod względem performance i user experience

route53.md:- **EXAM** Geolocation Routing może być użyte do regional restrictions, language specific content lub do loadbalancingu pomiędzy regionalnymi endpointami

route53.md:- **EXAM** R53 DNSSEC używa KMS do stworzenia pary asym kluczy z ktorych potem tworzony jest public i private KSK (Key Signing Key). **TE KLUCZE MUSZĄ BYĆ W US-EAST-1**

route53.md:- **EXAM** R53 DNSSEC tworzy i rotuje ZSK (Zone Signing Key) internalowo, bez użycia KMS

route53.md:- **EXAM** Używając R53 DNSSEC trzeba stworzyć alarmy CloudWatch: `DNSSECInternalFailure` i `DNSSECKeySigningKeysNeedingAction`

route53.md:- **EXAM** DNSSEC Validation może być włączone dla konkrentego VPC 

s3.md:- **EXAM** S3 jest **Private by default**

s3.md:- **EXAM** Obiekt S3 może mieć od __zera__ bajtów do __5TB__

s3.md:- **EXAM** Obiekt ma główne dwie częsci - key i value

s3.md:	- **EXAM** Nazwa Bucketu S3 musi być globalnie unique

s3.md:	- **EXAM** Nazwy Bucketów S3 muszą mieć 3-63 znaki, lowercase, bez podłóg

s3.md:	- **EXAM** Nazwy Bucketów S3 muszą zaczynać się od małej litery lub cyfry

s3.md:	- **EXAM** Nazwy Bucketów S3 nie mogą byc formatowane jak adresy IP

s3.md:- **EXAM** Konto ma soft limit do 100 Bucketów S3 i hard limit do 1000 (via support tickets)

s3.md:- **EXAM** Bucket Versioning często jest na egzaminie

s3.md:- **EXAM** Raz włączonego Bucket Versioning nie można już wyłączyć!!

s3.md:- **EXAM** Object Versionig można przestawić w `SUSpended`

s3.md:- **EXAM** Suspended mozna przestawić ponownie w `Enabled`

s3.md:- **EXAM** MFA Delete jest często na examie

s3.md:- **EXAM** To nie bukckety S3 są encryptowane, to poszczególne obiekty i dla każdego obiektu możemy wybrać inną formę enkrypcji

s3.md:- **EXAM** Można ustawić default encryption na poziomie bucketu i wtedy obiekty **które nie mają wybranej enkrypcji** będą miały tę ustawioną

s3.md:- **EXAM** SSE-S3 używa algorytmu AES-256

s3.md:- **EXAM** Jezeli uda się dane przechować durable w S3 to w zwrotce dostaniemy HTTP/1.1 200 OK 

s3.md:    - **EXAM** S3 Standard ma first byte latency = millis

s3.md:- **EXAM** S3 Standard-IA powinno być używane kiedy przechowujemy o długiej dacie ważności, potrzebne dane z których nieczęsto korzystamy

s3.md:- **EXAM** S3 Standard-IA ma first byte latency = millis

s3.md:- **EXAM** S3 OneZone-IA dane są przechowywane w **jednej Availibility Zone**

s3.md:- **EXAM** S3 OneZone-IA powinno być używane kiedy przechowujemy o długiej dacie ważności, ale niekrytyczne i takie które łatwo podmienić

s3.md:- **EXAM** S3 OneZone-IA ma first byte latency = millis

s3.md:- **EXAM** S3 Glacier-Instant ma first byte latency = millis

s3.md:- **EXAM** Dane przechowywane w S3 Glacier-Flexible są **cold objects** czyli nie są od ręki gotowe do pobrania i nie mogą być publicznie dostępne!

s3.md:- **EXAM** S3 Glacier-Flexible ma first byte latency = minutes or hours

s3.md:- **EXAM** Dane przechowywane w S3 Glacier Deep Archive są **cold objects** czyli nie są od ręki gotowe do pobrania i nie mogą być publicznie dostępne!

s3.md:- **EXAM** S3 Glacier Deep Archive ma first byte latency = hours

s3.md:- **EXAM** S3 Lifecycle konfiguruje się jako zasadę lub grupę zasad które dotyczą Bucketu lub grupy obiektów. Zasady składają się z akcji. Pozwalają na automatyczne zarządzanie Storage Class obiektu lub usuwanie go po jakimś casie od uploadu.

s3.md:- **EXAM** S3 Lifecycle nie potrafi zarządzać obiektami w zależności od tego kiedy ostatni raz były użyte. Do tego służy S3 Intelligent Tiering

s3.md:- **EXAM** S3 Lifecycle nie może przenieśc obiektu z S3 Standard jeżeli obiekt jest tam < 30dni

s3.md:- **EXAM** S3 Lifecycle nie może przenieśc obiektu z S3 Standard-IA lub One Zone-IA do Glacierów jeżeli był w IA < 30 dni

s3.md:- **EXAM** S3 Replication pozwala na automatyczne, asynchroniczne kopiowanie obiektów między bucketami S3.

s3.md:- **EXAM** Jeżeli replikujemy bucket S3 cross-account to domyślnie docelowe konto nie ufa roli którą zdefiniowaliśmy do replikacji na koncie źródłowym. Żeby to zadziałało trzeba na buckecie docelowym stworzyć Bucket Policy takie któro dopuszcza replikację lub zapis _do_ tego bucketu naszej Roli

s3.md:    - **EXAM** Dzięki RTC Replication Time Control możemy sie upewnić że S3 Replication przebiegnie w ciągu najbliższych 15 minut

s3.md:- **EXAM** S3 Replication nie jest retroaktywne - w momencie aktywacji syncuje tylko nowe obiekty a nie te już isteniejące

s3.md:- **EXAM** S3 Replication wymaga włączonego Bucket Versioning na źródłowym i docelowym buckecie

s3.md:- **EXAM** S3 Replication jest jednokierunkowy - tylko **od** źródłowego **do** docelowego

s3.md:- **EXAM** S3 Replication potrafi kopiować pliki niezakodowane, zakodowane SSE-S3, SSE-KMS (KMS wymaga dodatkowej konfiguracji). **Nie potrafi** replikować obiektów zakodowanych używając SCE

s3.md:- **EXAM** S3 Replication może zreplikować tylko te pliki do których dostęp ma właściciel konta triggerującego replikację

s3.md:- **EXAM** S3 Replication nie potrafi replikować `system events` czyli np. automatycznego przejścia między Storage Class przez S3 Lifecycle

s3.md:- **EXAM** S3 Replication nie potrafi replikować obiektów z Glacier lub Glacier Deep Archive

s3.md:- **EXAM** S3 Replication **domyślnie** nie replikuje usuwania obiektów (tworzenia Delete Markers), ale można to włączyć

s3.md:### 12.4.	**EXAM** SSR Use Cases

s3.md:### 12.5.	**EXAM** CSR Use Cases

s3.md:### 13.1. **EXAM** S3 Presigned URLs wazne do egzaminu

s3-pytania.md:Transition actions – In which you define when the objects transition to another storage class. For example, you may choose to transition objects to the STANDARD_IA (IA, for infrequent access) storage class 30 days after creation, or archive objects to the GLACIER storage class one year after creation.

s3-pytania.md:For example, suppose that you have a few objects that are very popular. Amazon CloudFront fetches those objects from Amazon S3 and caches them. Amazon CloudFront can then serve future requests for the objects from its cache, reducing the number of GET requests it sends to Amazon S3.

secrets-manager.md:- **EXAM** AWS Secrets Manager służy do przechowywania wrażliwych sekretów, **PASSWORDS, API KEYS**

secrets-manager.md:- **EXAM** AWS SM wspiera automatyczne rotowanie sekretów (lambdami)

secrets-manager.md:- **EXAM** AWS SM bezpośrednio integruje się z niektórymi produktami AWS np. RDS

secrets-manager.md:- **EXAM** Jeżeli pytanie exam wspomina o explicite sekretach, ich rotacji, integracji z RDS i innymi serwisami AWS to często chodzi o AWS Secrets Manager

ses.md:- **EXAM** SES zaczyna pracę w trybie `sandbox` - każdy adres email musi być indywitualnie weryfikowany

snowball.md:- **EXAM** Kiedy i dlaczego używać Snowball i pochodnych

snowball.md:- **EXAM** Żeby sie snowball opłacił trzeba trasnportować między 10TB a 10PB danych. Każdy Snowball ma 50 lub 80TB pojemności i każdy z zamówionych możemy wysłać gdzie indziej po dane. Jak egzamin mówi o backupie dużej ilości danych z multiple devices / multiple premises to może chodzić o Snowball

snowball.md:- **EXAM** Urządzenie Snowball ma tylko storage, nic więcej

snowball.md:- **EXAM** Urządzenie Snowball Edge zapewnia i storage i compute

snowball.md:- **EXAM** Jezeli musimy zrobić jakiś processing na danych wrzucanych lub pobieranych ze Snowball to warto wybrać Snowball Edge

snowball.md:- **EXAM** Snowmobile realistycznie opłaca sie kiedy mamy >>10PB danych i kiedy przenosimy dane z _jednego_ miejsca do _jednego_ miejsca

sqs.md:- **EXAM** Po pobraniu z kolejki SQS msg defaultowo nie znika z kolejki ale jest ukryty na pewien czas (*Visibility Timetout*) 

sqs.md:- **EXAM** Fanout architecture - wiele kolejek subuje jeden topic 

sqs.md:	- **EXAM** SQS queue policy może dać dostęp do kolejki z innego konta AWS

sqs.md:- **EXAM** Pytania na egzaminie o `worker pools, decoupling, async` - AWS SQS

sqs.md:	- **EXAM** FIFO queue musi mieć suffix `-fifo`

sqs.md:- **EXAM** Przeniesienie do DLQ nie odświeża retencji wiadomości. Jak kolejka DLQ mają retencję 2 dni i po 1 dniu przeniesiemy ją do DLQ to zostanie w DLQ 1 dzień

storage-gateway.md:- **EXAM** Kiedy używać jakiego trybu Storage Gatway

storage-gateway.md:- **EXAM** Storage Gateway może służyć do: 

storage-gateway.md:- **EXAM** Klasycznie na on-premie mamy serwery i jakieś NASy. NASy używają najczęsciej protokołu iSCSI i serwery widzą je jako raw block storage gdzie można utworzyć partycje i trzymać dane

storage-gateway.md:- **EXAM** Jeżeli pytanie mówi o Storage Gateway w konteście volumes - odpowiedż pewnie to Volume Store. Taśmy - VTL, Pliki - File Mode

storage-gateway.md:- **EXAM** Jeżeli używamy Storage Gateway w trybie Volume Stored to wszystkie dane są przechowywane lokalnie i asynchronicznie kopiowane do AWS jako EBS Snapshoty

storage-gateway.md:- **EXAM** Volume Stored Mode jest dobre do:

storage-gateway.md:- **EXAM** Volume Stored Mode **nie powiększa capacity naszego datacenter** bo i tak wszystkie dane sa przechowywane lokalnie a na AWS leci tylko ich kopia

storage-gateway.md:- **EXAM** Volume Cached Mode - bardzo podobne jak Stored Mode ale trzon danych jest trzymany na **AWS MANAGED** S3 a lokalnie jest tylko kasza. 

storage-gateway.md:- **EXAM** Volume Cached Mode pozwala na _datacenter extension_. Przez to że lokalnie przechowujemy tylko kasżę to na S3 mozemy trzymać TB danych które nie zajmują nam miejsca lokalnie

storage-gateway.md:- **EXAM** przy File Mode Storage Gateway przechowuje trzon danych na S3, lokalnie tylko kasza

transit-gateway.md:- **EXAM** Transit Gateway może być peerowany z innymi TG, w innych regionach czy kontach AWS

vpc.md:- **EXAM** VPC są Regionally Resilient i związane z konkretnym regionem

vpc.md:		- **EXAM** Może istnieć tylko 1 Default VPC per region

vpc.md:- **EXAM** VPC Subnet nie może nachodzić na inne subnety

vpc.md:- **EXAM** `enableDnsHostnames` po włączeniu wszystkie zasoby mające publiczny dostęp w VPC będa miały przydzielony Host Name

vpc.md:- **EXAM** `enableDnsSupport` włączenie / wyłączenie DNS dla VPC

vpc.md:- **EXAM** VPC Router musi mieć tylko jedną route table podpiętą, ale jedna route table może być podpięta 0 lub więcej subnetów

vpc.md:- **EXAM** Im wyższy prefix adresu w route table tym większy priorytet ma:

vpc.md:- **EXAM** Internet Gateway jest `Regionally Resilient` więc nie trzeba instancji IGW w każdym AZ, jedna instancja IGW zapewni funkcjonalność dla wszystkich AZ w regionie

vpc.md:- **EXAM** IGW działa z poziomu AWS Public Zone, rozsyła traffic między VPC a Internetem lub serwisami z AWS Public Zone (np. S3, SQS)

vpc.md:- **EXAM** Kiedy przypisujemy zasobowi w VPC publiczny adres IP to w IGW pojawia się wpis mapujący prywatny adres IP zasobu na adres publiczny. **Konfiguracja publicznego adresu IP nie dotyka nawet zasobu** - wszystko się dzieje w IGW. np. instancja EC2 z publicznym adresem IP nie wie o tym adresie i `ipconfig` wewnątrz instancji będzie pokazywał tylko prywatny IP

vpc.md:- **EXAM** IGW podmienia prywatny IP w `Source Address` każdej paczki danych na publiczny adres IP. Kiedy paczka wraca to jako `Destination` ma ten public IP który wskazuje na IGW. IGW mapuje ten adres na prywany adres zasobu i wysyła go wgłąb VPC

vpc.md:- **EXAM** dla IPv6 IGW tylko przekazuje traffic do VPC bo wszystkei adresy IPv6 zasobów wewnątrz VPC to adresy publiczne

vpc.md:- **EXAM** NACL pozwalają na explicit allow i explicit deny komunikac

vpc.md:- **EXAM** Rules są procesowane w kolejności, od najniższego `Rule Number`

vpc.md:- **EXAM** Domyślnie VPC są tworzone z defaultowym NACL który ma implicit DENY na wszystko i explicit ALLOW na wszystko. Domyślnie więc cała komunikacja jest otwarta

vpc.md:- **EXAM** Każdy **customowy** NACL zaczyna z implicit DENY na wszystko - cała komunikacja jest zamknięta

vpc.md:- **EXAM** NACLe nie wiedzą nic o logicznych zasobach AWS, tylko IP, CIDRY, porty i protokoły

vpc.md:- **EXAM** NACL do zabraniania komunikacji, Security Group dla otwierania komunikacji

vpc.md:- **EXAM** Każdy subnet ma jeden NACL, każdy NACL może mieć wiele subnetów

vpc.md:- **EXAM** Nie pozwala na **explicic deny**, pozwala tylko na implicit deny i explicit allow. Nie można blokować dostępu dla konkretnych IP używając SG

vpc.md:- **EXAM** SG operują na IP/CIDR ale też potrafią odnosić się do konkretnych logicznych zasobów AWS, innych SG albo nawet __samego siebie__. Referencowanie samego siebie pozwoli na komunikację między różnymi instancjami tej samej apki w ramach tej samej VPC

vpc.md:- **EXAM** SG nie są podpięte bezpośrednio pod instacje zasobów logicznych, ani pod subnety, są podpięte pod ENI Elastic Network Interfaces. **SG są zawsze podpięte pod network interfaces**

vpc.md:- **EXAM** NAT Gateway musi istniec w **publicznym subnecie** i mieć przydzielony publiczny adres IP

vpc.md:- **EXAM** NAT Gateway jest **AZ resilient**

vpc.md:    - **EXAM** Żeby NAT Gateway był region resilient to trzebaby stworzyć NATG w każdym AZ i dla każego prywatnego subentu w każdym AZ stworzyć Route Table kierujące na ten NATG

vpc.md:- **EXAM** NAT Gateway używa Elastic IP

vpc.md:- **EXAM** Przed NAT Gateway były NAT Instances działające na instancjach EC2. EC2 domyślnie blokuje traffic który jako source lub destination nie ma tego EC2. Żeby EC2 mogło działać jako NAT Instnace trzeba **wyłączyć Source/Destination Checks** 

vpc.md:- **EXAM** W większości pytań egzaminowych NAT Gateway >> NAT Instance, ale NAT Instance może być tańszy 

vpc.md:- **EXAM** Nie można podpiąć Security Group pod NAT Gateway, tylko NACL

vpc.md:- **EXAM** NAT Instance jest normalną instancją EC2 więc może mieć przypisaną Security Group, być multitaskowana jako bastion czy używana do post forwardów, NAT Gateway nie. 

vpc.md:- **EXAM** IPv6 nie wymaga NAT, wszystkie adresy IPv6 mogą być po prostu publiczne. Wystarczy zrobić route od `::/0` do IGW

vpc.md:- **EXAM** VPC Gateway Endpoint jest HA na wszystkich AZ w danym regionie, nie przypisujemy go do konkretnego subnetu, przypisujemy do VPC i wybieramy które subnety ma obsługiwać

vpc.md:- **EXAM** VPC Gateway Endpoint jest accesible jedynie z VPC do którego został przypisany

vpc.md:- **EXAM** Endpoint Policy służy do definiowania zachowania Gateway i Interface Endpointów

vpc.md:- **EXAM** Gateway Endpoints używają prefix list i route tables do zarządzania trafficiem

vpc.md:- **EXAM** VPC Interface Endpoints sa dodawane do konkretnego Elastic Network Inteface w danym subnecie wewnątrz VPC, nie są HA by default

vpc.md:- **EXAM** Private DNS pozwala nadpisać defaultowy URL serwisu tak żeby wskazywał na prytwany IP naszego Interface Endpointu

vpc.md:- **EXAM** VPS Perring to direct encrypted link between **two VPCs**

vpc.md:- **EXAM** VPC Peering nie jest _transitive_ czyli nie można ich chainować. VPC A -> VBC B -> VBC C nie oznacza połączenia VPC A -> VPC C

vpc.md:- **EXAM** VPC Peering nie może być użyte kiedy mamy konflikt w CIDR dwóch VPC

waf.md:- **EXAM** Serwisy używające WAF: CloudFront, ALB, AppSync, API Gateway

waf.md:- **EXAM** Architektura WAF może byc oparta o feedback loop gdzie na podstawie logów WAF lub informacji z aplikacji następuje automatyczny updejt Access Control List 

