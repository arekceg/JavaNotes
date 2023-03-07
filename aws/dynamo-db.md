# DynamoDB

- NoSQL DBaaS
- **EXAM** Na egzaminie jak wspominają o NoSQL to prawdpodobodnie odpowiedź będzie DynamoDB :D
- **EXAM** Na egzaminie jak wspominają o Key/Value DB to prawdpodobodnie odpowiedź będzie DynamoDB :D
- **EXAM** Dostęp do DynamoDB jest prze CLI, GUI, API, NIE OBSŁUGUJE SQL (duh)
- Wide columen, Key/Value & Document
- Dobry scaling
	- Manual
	- Automatic
	- On-Demand
- HA
	- Instacja w każdej AZ
	- Leader Storage Node + Storage Nodes
- Single-digit ms IO
- Prędkość zależna od `Capacity`
	- Capacity ustawiana per Table
	- **EXAM** DynamoDB 1 WCU (Write Capacity Unit) = 1kB/s
	- **EXAM** DynamoDB 1 RCU (Read Capacity Unit) - 4kB/s (Strongly Consistent) 2kB/s (Eventually Consistent)
	- **EXAM** Każda operacja DynamoDB konsumuje **minimum 1 RCU/WCU**
	- Każda tabela ma 300sec RCU i WCU burst pool
	- **EXAM** DynamoDB płacimy za RCU, WCU, Storage i dodatkowe usługi
	- **EXAM** Jeżeli pytanie egzaminacyjne z DynamoDB będzie mówiło np. o 60 zapisach na minutę to zawsze trzeba to przeliczyć na zapisy/sec bo tak Dynamo charguje. Przyklad niżej:
		- Oblicz WCU 10 itemów x 2.5kb / sec
		- 2.5kb/item => 3 WCU/item (1WCU = 1kb/s)
		- 10item/sec => 30 WCU

# Tables
- Zbiór obiektów o tym samym `Primary Key`
- Typy PK:
	- Simple: Partition Key
	- Composite: Partition Key + Sort Key
- Każdy item musi mieć unikalny Primary Key
- Dalsze atrybuty są dowolne, nie ma ustalonej sztywnej schemy
- Item size max 400kb

# Backupy
1. On-Demand
	- Pełna kopia tabeli istniejąca dopóki jej nie ręcznie nie usuniemy
	- Ręcznie robimy backup i ręcznie zarządzamy tym backupem
	- Restore możliwy cross-region
2. PTR Point-in-time recovery
	- Per Table
	- Disabled by default
	- Continous stream of backup
	- Okno 35dni
	- 1 sec granularność

# R/W Performance
1. On-Demand
	- Low admin, płacimy za RCU i WCU zużyte przez tabelę
2. Provisioned
	- RCU i WCU ustalone per tabela

# Operacje
1. Query
	- **EXAM** Query DynamoDB zawsze wymaga jednej wartości PK i opcjonalnie zakresu SK
	- Mało flexible, można Querowac tylko po PK i SK ale szybkie
2. Scan
	- Mało efficient ale bardzo flexible
	- Przeczesuje **całą tabele** w poszukiwaniu rezultatów
	- **Płacimy za każdy przeszukany row (całą tabelę), nie tylko za pobrane dane**

# Consistency Model
1. Eventually Consistent
	- Write to Leaders
	- Leader updejtuje Storage Nody
	- Zajmuje to kilka ms
	- Read jest losowo z któregoś Noda w którymś AZ
2. Immediately (strongly) Consistent
	- Zawsze czyta z leadera

# Indexes
- Tworzenie dodatkowego _widoku_ tabeli
- Można wybrać jakie atrybuty tabeli dany indeks będzie zwracał
- Dwa sposoby tworzenia indeksów:
- **EXAM** AWS radzi używać Global Secondary Index by default, Local tylko kiedy explicite potrzebujemy _strong consistency_
- **EXAM** Indexy dynamoDB pozwalają na _alternative access patterns_ np wiele teamów ma dostęp do tej samej tabeli ale widzi dane inaczej, dopasowane do swoich wymagań

## Local Secondary Index
	- **EXAM** Local Secondary Index jest tworzony wraz z tabelą DynamoDB, nie można go później dodać
	- **EXAM** Local Secondary Index współdzielą RCU i WCU z Table
	- **EXAM** Local Secondary Index pozwala na stworzenie jakby dodatkowego SK w tablicy (cały czas ten sam Partition Key)
	- 5 LSI / Table

## Global Secondary Index
	- **EXAM** Global Secondary Index może być tworozny po stworzeniu tabeli
	- **EXAM** Global Secondary Index limit 20 /tabele
	- **EXAM** Global Secondary Index mają swoje własne RCU i WCU
	- **EXAM** Global Secondary Index używają alternatywnych PK i SK
	- **EXAM** Global Secondary Index sa **eventually consistent** - są asynchronicznie updejtowane z głównej tabeli

# DynamoDB Stream
- "Time ordered list of **item changes** in a table"
- Disabled by default
- 24h rolling window
- Rejestruje INSERT, UPDATE, DELETE
- View Types:
	1. KEYS_ONLY
		- notuje tylko SK i PK zmienianych danych
	2. NEW_IMAGE
		- notuje nowy stan danych
	3. OLD_IMAGE
		- notuje stary stan danych
	4. NEW_AND_OLD_IMAGES
		- notuje nowy i stary stan danych

# Triggers
- Oprte o streamy
- Zmiana danych generuje event 
- Event zawiera dane określone przez View Type streamu
- Event można załapć w lambdę potem
- Zamiast czytać dane z Dynamo można je pobrać z eventu mówiącego o ich zmianie xD

# Global Tables
- Multi-master cross-region replication
	- multi-master znaczy że na każdej tabeli możemy robić READ i WRITE
- Sieć tabel rozsianych po regionach posiadających te same dane
- `Global table` to abstrakcyjna entity z której każda połączona tabela replikuje dane
- Sub-second replication między regionami
- Async replikacja więc globalnie mamy eventual consistency
	- jeżeli robimy READ z tego samego regionu co WRITE to mamy strong consistency
- **LAST WRITER WINS** w razie konfliktów

# DynamoDB Accelerator (DAX)
- in-memory Cache dla DDB 
- Less complexity, less overhead, tighter integration
- Deployowany do konkretnych VPC
- **EXAM** DAX to cluster service, w jednym VPC Primary i w reszcie Replicas
- Cashe hit -> resp in microseconds
- Cashe miss -> resp in milliseconds
- Write-through caching
	- Jeżeli zapisujemy dane do DDB to są one od razu zapisywane nie tylko do DDB ale też do DAX
- Jeżeli mamy write-heavy apkę która wymaga strong consistency to DAX moze nie byc idealny do tego

# TTL
- **EXAM** DynamoDB TTL ustala timestamp automatycznego usuwania itemów z tabeli
- TTL to dodatkowy atrybut itemów tabeli, w sekundach od Epoch 
- Dla każdego Parition Key tabeli istnieje proces który sprawdza czy któryś item nie powinien być Expired i Deleted
- Drugi proces expiruje i usuwa je



	
