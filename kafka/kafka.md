# KAFKA


## Arch
- Broker
    - dane kopiowane między brokerami
- Topic
    - `replication-factor`: ilość replik danych z danego topika, nie może być większa niż ilość partycji
    - z defaultu jak wysyłamy msg na topic który nie istnieje to zostanie utworzony z defaultowymi ustawieniami
    - `min.insync.replicas` - ile replik musi potwierdzić zapisanie eventu
- Partition
    - trzyma eventy
    - wiele partition w ramach jednego topiku pozwala na równoległe procesowanie danych
    - Partycja jest określana na podstawie klucza eventu
    - bez klucza trafi do "którejś" partycji
        - dane czytane równolegle więc wtedy nie mamy zapewnionej kolejności procesowania
    - Podanie klucza zapewni kolejność procesowania bo dane trafią do jednej partycji
    - Każda partycja ma *swojego* Leader Broker i Follower Brokers
- Offset
    - index eventu w partition
    - event jest dodawany zawsze na końcu

* Event wewnątrz partycji jest immutowalny!
* Default retention 7 day

## Message
- Key
- Event value
- Timestamp
- Headers

## Docker compose
- Tak jak ja robiłem już mniej więcej
- Trzeba wygenerować wczesniej cluster id używając `kafka-storage.sh random-uuid` i podać jako `KAFKA_KRAFT_CLUSTER_ID`
- Jak chcemy zrobić klaster 
    - Trzeba dodać brokerów w `KAFKA_CFG_CONTROLLER_QUORUM_VOTERS`, np `1@kafka-1:9091,2@kafka-2:9091,3@kafka-3:9091`
        - cyfra przed @ to node id brokera
    - Muszą mieć to samo `KAFKA_KRAFT_CLUSTER_ID`

## Producer
- `acks` - ile brokerów musi potwierdzić zapisanie eventu
    - 0 - nie czeka na potwierdzenie
    - 1 - czeka na potwierdzenie od leadera
    - all - czeka na potwierdzenie od wszystkich replik
- `linger.ms`
    - czas batchowania wiadomości przed wysłaniem
- idempotencja
    - `enable.idempotence = true`
    - zapewnia że wiadomości są wysyłane tylko raz
    - wrapper na inne propertisy, wymaga:
        - `acks=all`
        - `retries=MAX_INT`
        - `max.in.flight.requests.per.connection=5`
- jak chcemy wysyłać wiadomości z kluczem z cli to trzeba ustawić propwery `parse.key=true` i `key.separator=:"`
- JsonSerializer jak chcemy żeby producent automatycznie serializował obiekty

### Retries
- by default producer powtarza wysyłanie 2147483647 razy, przez 2 minuty
    - timeout ustawia się `spring.kafka.producer.properties.delivery.timeout.ms`
    - `timeout.ms` >= `request.timeout.ms` + `linger.ms`
    - `timeout.ms` oznacza całkowity czas procesownania wiadomoośći, `request.timeout.ms` ty timeout czekania na ACK jednej wiadomości

## Consumer
- Wiele instancji konsumera (w jednej consume grupie) - każda czyta z jednej partycji
    - Jeśli liczba konsumentów jest równa liczbie partycji, każdy konsument będzie miał przypisaną dokładnie jedną partycję. 
    - Jeśli konsumentów jest mniej niż partycji, niektórzy konsumenci będą konsumować z więcej niż jednej partycji. 
    - Jeśli konsumentów jest więcej niż partycji, niektórzy z nich nie będą przypisani do żadnej partycji i będą bezczynni, ponieważ jedna partycja może być konsumowana tylko przez jednego konsumenta w grupie.

### Deserializacja
#### JsonDeserializer 
- jak chcemy żeby konsumer automatycznie deserializował obiekty
- Możemy użyć `@KafkaListener` nad klasą i potem każdą metodę w klasie oznaczyć `@KafkaHandler` i jako argument podać typ messaga

#### ErrorHandlingDeserializer
- Deserializer który potrafi obsłużyć błędy deserializacji
- Można ustawić `spring.kafka.consumer.value-deserializer` na `ErrorHandlingDeserializer` i podać mu dodatkowo klasę której ma używać do właściwej deserializacji
- Bez tego apka będzie w nieskończoność pobierała błędą wiadomość i kupsko będzie

#### Dead Letter Topic
- Przy konfiguracji producenta trzeba dodać `new DeadletterPublishingRecoverer(kafkaTemplate)` w konstruktorze `DefaultErrorHandler`

### Error handling
- w konstruktorze `DefaultErrorHandler` Można podać jakie wyjątki są retryable a jakie nie
- w wypadku wystąpienia retryable wyjątku konsumer będzie powtarzał próby konsumowania wiadomości
- ErrorHandler połyka `NonRetryable` wyjąki i nie widać ich w logach nawet
- Konstruktor przymuje tez np. konfigurację Backoffa

## Tranzakcyjność
- `producer.transaction-id-prefix`
    - prefix dla transakcji
    - powoduje utworzenie beanów transaction managerów
    - MUSI BYĆ UNIKALNY MIĘDZY INSTANCJAMI TEGO SAMEGO SERWIUSU (dodać `${random.value}`)
