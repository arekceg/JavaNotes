# CLOUDTRAIL

- Regional Service
- Loguje działania API które zmieniają coś w koncie lub zasobach AWS
- Loguje je jako `CloudTrail Event`
	-	Management Events
	-	Data Events
	-	Insight Events
-	Domyślnie przetrzymuje je przez 90 dni
- **EXAM** CloudTrail NIE JEST REALTIME, eventy lądują w miejscu przechowywania w przeciągu 15 minut od wydarzenia

## Management Events
- Zawierają eventy związane z zarządzaniem kontem i zasobami, np. tworzenie EC2 albo Bucketa S3
- `Control Plane Operations`
- Domyślnie tylko Management Events są logowane

## Data Events
- Eventy związane z działaniami *na* lub *wewnątrz* zasobu
- np. upload zdjęć do S3
- Znacznie więcej ich jest niż Management Events, dlatego nie są logowane domyslnie
	- Trzeba wlączyć przy tworzeniu Trail

## Trail
- Sposób konfiguracji CloudTrail
- One Region lub All Regions (mimo ze CloudTrail jest regional service)
- Zazwyczaj serwis loguje eventy w regionie w którym jest
- **EXAM** **True Global Service (IAM, STS, CloudFront) logują swoje eventy do us-east-1**
	- **EXAM** `Global Service Events`
	-	**EXAM** Trail musi mieć to włączone żeby logować te eventy (jest domyślnie włączone)
- Trail może trzymać zalogowane eventy w buckecie S3
- Trail może zalogowane eventy wysyłać do CloudWatch Logs

### Organizational Trail
- Jeżeli Trail zostanie stworzony przez Management Account AWS Organization to taki Trail może zbierać eventy ze wszystkich kont z organizacji
- Minus: taki Trail może generować znaczne koszty bo oprócz przechowywania samych logów na S3 płacimy tez za każdy request od każdego konta żeby wrzucić coś do S3

### Tworzenie Traili
1. AWS CloudTrail 
2. Trails -> Create Trail
	- Konfiuracja bucketu S3 do trzymania logów
	- Logi będa trzymane w folderze `<bucket>/AWSLogs/<losowe id>/<losowe id>`

- Nawet jak nie ma Traili to mamy dostęp do `Event History` gdzie jest przez 90 dni za darmo przechowywana historia eventów CloudTrailowych

### Wyłączanie Traili
1. Wybierz Trail -> Wejdź w niego -> `Stop Logging`
