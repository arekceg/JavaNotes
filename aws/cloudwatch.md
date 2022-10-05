## CLOUDWATCH

- Public service

### METRICS
- Obserwacja danych dotyczących isntacji zasobów AWS
- Dużo metricsów jest natywnie zapewniana przez zasoby AWS
	- Inne wymagają `CloudWatch Agent`
	- Program do agregacji metry np z innych cloudów czy onpremów
- `Time ordered set of Data Points`
- Metricsy nie są rozdzielone per-serwis, np. metric `CPU Utilization` dotyczy __wszystkich__ instancji EC2

#### DATAPOINT
- Byt Cloudwatchowy który przechowuje 
	1. Datę pomiaru (YYYY-MM-DDTHH:MM:SSZ)
	2. Wartość pomiaru

#### DIMENSION
- Serwisy wysyłają do CloudWatcha nie tylko Datapointy ale też `Dimensions`
- Dimensions pozwalają podzielić datapointy wewnątrz jednej metryki
-	Pary `name`-`value`
- Np przy wysyłaniu metryk EC2 AWS wysyła też Dimensions:
	-	`Name=InstanceId Value=foo`
	-	`Name=InstanceType Value=bar`
- Dzięki temu możey podglądać metryki np. dla konkretnej instacji EC2

#### ALARMY
- Na podstawie metryk możemy wysyłać Alarmy
- Alaram może mieć dwa stany
	-	OK
	- ALARM
	- INSUFFICIENT_DATA (alarm dopiero zbiera dane i nie jest w stanie stwierdzić w jakim stanie jest)

### LOGS
- Logi aplikacji i zasobów AWS
- Jeżeli chcemy agregować logi z zewnątrz - potrzeba Agenta

### EVENTS
- Wysyłanie eventów informujących o stanie zasobów
- Wysyłanie eventów o danej treści o danej godzinie lub co ileś czasu

### CLOUDWATCH NAMESPACE
- Kontener na monitorowane dane
- Namespace może mieć różne imiona
	- Ale wszystkie dane AWS lecą do namespace `AWS`
		Namespace ten nazywa się `AWS/nazwa-serwisu`
	- Dlatego nie możemy naszych namespace nazywać `AWS/foo`
