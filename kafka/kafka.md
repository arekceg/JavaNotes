# KAFKA


## Arch
- Broker
    - dane kopiowane między brokerami
- Topic
    - replication-factor: ilość replik danych z danego topika, nie może być większa niż ilość partycji
    - z defaultu jak wysyłamy msg na topic który nie istnieje to zostanie utworzony z defaultowymi ustawieniami
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


