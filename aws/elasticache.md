# Elasticache

- **EXAM** Elasticache może być postawione albo na Redis albo na Memcached
	- Memchaed:
		- proste stuktury danych
		- brak cross-az replikacji
		- **EXAM** Memcached ma brak backupów, więc jak pytanie exam mówi o restorowaniu cachy do chodzi o Redisa
		- multi-threaded by design
- **EXAM** Elasticache zapewnia sub-milisecond dostęp do danych
- **EXAM** Elasticache jest cost-effective dla READ HEAVY aplikacji
- **EXAM** Elasticache może być użyte do przechowywania Session Data (Stateless Servers). Dzięki temu jak padnie np. instancja apki to możemy kontynuowac sesję usera na innej instancji 
- **EXAM** Elasticache wymaga zmian w kodzie aplikacji (apka musi wiedzieć żeby używac kaszy)
