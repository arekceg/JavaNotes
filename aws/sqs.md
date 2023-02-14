# SQS Simple Queue Service

- Public service
- max msg size: 256kb
- **EXAM** Po pobraniu z kolejki SQS msg defaultowo nie znika z kolejki ale jest ukryty na pewien czas (*Visibility Timetout*) 
	- Po przeprocesowaniu przez apkę MSG jest usuwany z kolejki
	- Jak przeprocesowanie sie nie uda - msg wraca na kolejkę
- Na rozmiar kolejki SQS można zapiąć np Auto Scaling Group i będziemy dodawać lub odejmować instancje w zalezności od ilości msg na kolejce
- **EXAM** Fanout architecture - wiele kolejek subuje jeden topic 
- Wspiera KMS, ecryption-at-rest bo msg może leżeć na kolejce nawet 14 dni
- Dostęp kontroluje identity policy lub queue policy
	- **EXAM** SQS queue policy może dać dostęp do kolejki z innego konta AWS
- **EXAM** Pytania na egzaminie o `worker pools, decoupling, async` - AWS SQS


# Typy kolejek
- Kolejki SQS mogą być albo `Standard` albo `FIFO` (First In First Out)

- Standard:
	- Delivery - at-lest-once
	- Nie zachowuje kolejności
	- Basicly nieskończona skalowalność

- FIFO:
	- Delivery - exactly-once
	- Zachowuje kolejność
	- 3000 msg/s z batchowaniem
	- 300 msg/s bez
	- **EXAM** FIFO queue musi mieć suffix `-fifo`

- `Delay Queue`
	- Standard kolejce możemy ustawić > 0 `DelaySeconds` < 15min
	- wiadomości w kolejce są niewidoczne przez `DelaySeconds`
	- Nie działa dla FIFO!

# Billing
- Billed **on request** 
	- 1 request do SQS = 1-10msg

# Polling
- Short 
	- Strzał requestem i zwrotka 0-10msg 
	- Każdy taki strzał może zwrócić 0 msg i każdy kosztuje $$$
- Long
	- `waitTimeSeconds` max 20sec
	- Czeka na msg tyle ile `waitTimeSeconds` ustawimy
	- max 10msg lub 64kb

# DLQ
- Każde procesowanie msg podbija `ReceiveCount` i jak dojdzie do okreslonej wartości `maxReceiveCount` to msg jest przesuwany do DLQ
- `redrive policy` : określa z jakiej kolejki, do jakiej i jaki max count
- **EXAM** Przeniesienie do DLQ nie odświeża retencji wiadomości. Jak kolejka DLQ mają retencję 2 dni i po 1 dniu przeniesiemy ją do DLQ to zostanie w DLQ 1 dzień
