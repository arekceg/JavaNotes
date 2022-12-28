# LAMBDA

- Faas - Function as a Service
- Lambda to tak naprawdę `deployment package` - kod + zasoby
- W momencie wywołania lambdy package jest pobierana i odpalana w danym runtime env
- **EXAM** Docker to anty-pattern dla Lambdy, jeżeli w egzaminie będzie powiedziane że cośam Docker to nie chodzi o Labdy
- **EXAM** Lambda może mieć przydzzielone od 128MB do 10240MB RAM, ale vCPU nie można dobrać ręcznie, jest dobierane do pamięci
- **EXAM** Lambda może mieć od 512mb do 10240mb storage jako /tmp
- **EXAM** Pojedyncze wykonanie Lambdy ma timeout 15min (900s)!!!
- **EXAM** Lambda przyjmuje ExecutionRole

# **EXAM** Lambda networking

## Public
- Domyślanie Lambdy mają dostęp do publicznego networkingu
- Dobry performance bo Lambdy mogą się wtedy stawiać na dowolnym hardware i networku, nie biorąc w ogóle pod uwagę wymagań VPC
- Publiczne Lambdy nie będą miały dostępu do serwisów w VPC, chyba że wystawimy te serwisy publicznie

## VPC
- Lambdy odpalone _jakby_ z wewnątrz VPC są objęte takimi samymi regułami jak wszystkie inne serwisy w tym VPC
	- VPC Lambdy tak naprawde nie odpalają sie z wewnątrz tego VPC, tylko ze specjalnego Lambda Service VPC 
	- Dla każdego unikalnego połączenia `subnet + SG` dla Lambd jest tworzony jeden Elastic Network Interface w docelowym VPC
- Lambdy VPC mają dostęp do zasobów VPC, ale dostęp do zasobów z poza VPC wymaga dodatkowej konfiguracji, np:
	- NATGW + IGW
	lub 
	- VPC Endpoint

# Lambda Security

## Execution Role
- Rola którą przyjmuje Lambda w momencie wykonanania
- Określa do czego Lambda ma dostęp

## Resource Policy
- Definiuje kto i co może wywoływać lambdę
	- np. zewnętrzne konta, SNS/SQS
- Można ustawiać tylko przez CLI/API

# Logowanie
- CloudWatch, CloudWatch Logs i X-Ray
- Logi z wykonania lambdy -> CloudWatchLogs
	- **EXAM** Żeby Lambda mogła logować do CWLogs to musi mieć odpowidnie uprawnienia w Execution Role
- Metryki lambdy -> CloudWatch
- Distributed tracing -> X-Ray 

# Wykonanie Lambdy (Lambda Invocation)
## Sync
- Wywołanie przez CLI/API/API Gateway
- Response jest zwracany w ramach requestu
- Błędy i retry muszą być zarządzane przez klienta

## Async
- Eventy, wydarzenia
- Przy async wywołaniu Lambda potrafi się sama retryować max. 2 razy w przypadku błędów w runtime funkcji
	- **EXAM** Żeby resty async Lambdy działało poprawnie to funkcja musi być IDEMPOTENTNA
- **EXAM** Async Lambda może mieć ustawione `Destination` - czyli gdzie dalej posłać event - SQS, SNS, EventBridge

## Event Source mappings
- Streamy, Kolejki które nie generują eventów - Kinesis, DynamoDB, SQS
- Event Source Mapping bierze dane ze streamu, batchuje w pakiety `Event Batch` i wysyła jako pakiety do Lamby 
- **EXAM** Event Source Mapping używa Execution Role Lambdy żeby pobierać dane ze streamu
- **EXAM** Nieprzeprocesowane event batche mogą być wrzucane do DLQ i potem SNS/SQS w celu analizy

# Lambda Versions
- Kod + konfiguracja lambdy = wersja
- Każda wersja Lambdy jest **immutable**
- `$Latest` wskazuje na najnowszą wersję lambdy
- Każda wersja może mieć alias (np. `DEV`, `PROD`) i te aliasy są mutowalne

# Start lambdy
1. Cold Start
	- Przy każdym wywołwaniu lambdy środowisko i kontekst wstaja od zera
2. Warm start
	- **EXAM** Jeżeli następne wywołanie lambdy nastąpi niedługo po poprzednim to lambda użyje tego samego środowiska
	- **EXAM** Jeżeli lambdy są wywoływane równolegle to zawsze stawiane jest nowe środowisko 
	- **EXAM** Zasoby tworzone poza głównym Lambda Function Handler będą dostępne dla każdej Lambdy używającej tego samego środowiska

## **EXAM** Provisioned Concurrenty
- Można zapłacić AWS za trzymanie `N` kontekstów `warm` żeby szybciej sie lambdy wywoływały

