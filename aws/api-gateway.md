# API GATEWAY

- Pomiędzy apką (integrations) a klientami 
- Direct integration z wieloma serwisami AWS
- Autoryzuje, Waliduje i Transformuje request
- Transformuje, Przygotowuje i Zwraca respons

# Autentykacja/Autoryzacja
- Cognito
lub
- Przekazywanie zwykłego Berer tokena w headerze i oddzielna autentykacja i autoryzaja np. Lambdą

# Typy endpointów 
- Edge-optimized
	- Traffic przekzywany do najbliższego CloudFront POP
- Regional
	- Klienci w tym samym regionie
- Private
	- Dostepne tylko w VPC używająć interface endpoint

# Stages
- API sa przypisywane do `Stages` (np. dev, prod)
- Do każdej stage można oddzielnie deployować 

## Canary deployemnts
- Deployment na dany Stage może tak naprawdę być deployowany do sub-stage, `canary stage` i być odizolowany od reszty  
- Można ustawić jaki % traficu leci do canary

# **EXAM** API Gateway Errors
- Standardowe błędy HTTP
- 429 - Too Many Requests - API Gateway Throttling
- 502 - Bad Gateway - zły output zwrócony przez bakend 
- 504 - TImeout/Integration Failure - 29s limit

# Caching
- **EXAM** API Gateway Caching odbywa sie per-stage
- **EXAM** API Gateway Cache może być zakodowana
- TTL default 300s, min 0, max 3600
- Size min 500mb, max 237gb


