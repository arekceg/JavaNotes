# AMAZON MQ

- Private service!
- Open-source message broker, implementacja Apache ActiveMQ
- Kolejki i Topiki uzwayając otwartych standardów
- Dzięki temu można łatwiej migrować istniejące już systemy async do AWS, bo migracja do SQS/SNS wymaga zmian w aplikacji
- Działa na instancjach
	- Single Instance (dev, test - cheap)
	- HA Pair (Active/Standby)
- **EXAM** Amazon MQ nie potrafi out-of-the-box łączyć się z serwisami AWS, więc nie będziemy mogli korzystać z logowanie, encrytpion itd)
- **EXAM** Amazon MQ - dobry wybór do migracji istaniejącego systemu msg z minimalnymi zmianami w aplikacji
- **EXAM** Amazon MQ - kiedy potrzebujemy użyć protokołów AMQP, MQTT, OpenWire, STOMP
- **EXAM** Amazon MQ wymaga odpowiedniej konfiuracji **prywatnego** networkingu
