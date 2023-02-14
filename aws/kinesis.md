# KINESIS DATA STREAMS

- Public service
- Region resillient
- Scalable steraming service
- Defaultowe okno dostępu do danych - 24h, max 365dni
- **EXAM** Pytania egzaminacyjne o `ingestion of data` -> AWS Kinesis

# Architektura
- Kinesis skaluje się przez Shardy
- Każdy Shard zapewnia 1MB/s Ingestion 2MB/s Consumption
- Dane przechowywane jako `Kinesis Data Records` - max 1MB/record

# SQS vs Kinesis
- SQS:
	- 1 produciton group, 1 consumption group
	- brak persistency

- Kinesis:
	- Multiple production, multiple consumers
	- Rolling window w którym dane są dostępne
	- Data ingestions, analytics, monitoring, app clicks

# Kinesis Data Firehose
- Pozwala na odkładanie danych ze streamu Kinesis do persystentego miejsca
- Serverless, Auto Scaling, Resilient
- **EXAM** Kinesis Data Firehouse jest `Near Real Time` produketm - zbiera albo 1MB albo 60sec danych przed wysyłką dalej
- Można transformowac dane on-the-fly (używając Lambd)
- Pay-as-you-go

## **EXAM** Firehose Desinations
1. endpointy HTTP
2. splunk
3. Redshift
4. ES
5. S3

# Kinesis Data Analytics
- Real-time processing danych ze streamów Kinesis lub Firehose i wysłanie ich do Firehose/Lambda/Kinesis Data Stream
- SQL do modyfikacji danych 
- **EXAM** Kinesis Data Analytics - real-time skomplikowane operacje na danych, leaderboardy, elections, real-time metryki

# Kinesis Video Streams
- Ingest live video from producers
- Video konsumowane frame-by-frame lub as needed
- **EXAM** Dane Kinesis Video Streams nie są dostępne bezpośrednio w EFS/EBS/S3, tylko przez API Servicu
- **EXAM** Jeżeli egzamin mówi o analizie video, GStreamer, RTSP - trzeba użyć Kinesis Videa Streams
