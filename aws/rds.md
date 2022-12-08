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
- **EXAM** `Primary` instancja RDS w jednej AZ będzie miała `Standby` instancję w innym AZ
- **EXAM** `Primary` instancje RDS syncują dane z `Standby` instancjami używając `Synchronous Replication` w momencie uzyskania danych przez Primary
- **EXAM** Instacje RDS `Read Only Replica` replikują sie asynchronicznie od Primary
- **EXAM** Każda instancja RDS może mieć wiele DB
- **EXAM** Każda instancja RDS ma dedykowany storage w EBS
- **EXAM** Backupy RDS sa tworzone w AWS-managed S3 bukecie i robione są z intancji `Standby` więc `Primary` nie odczuje tego performatowo

# Koszt RDS
- Podobnie jak EC2 - płacimy za alokację zasobów
1. Rozmiar i typ instancji $/s
2. Multi-AZ 
3. Typ i rozmiar stoarge
4. Transfer danych
5. Backupy i snapshotmonthlyy
