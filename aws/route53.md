# ROUTE 53

- Global service, single database
-	Globally resilient
- Służy do:
	1.	Rejestrowania domen
	2.	Hostowania Zones, ZoneFiles na Name Serverach
- Może być Public lub Private
	- Private będzie dostępna tylko dla określonych VPC

1.	R53 tworzy ZoneFile (w R53 to się nazywa `Hosted Zone`)
2.	Hostuje ją na (standardowo) 4 name serverach
3.	Komunikuje się z TLD zarządzającą odpowiednim rejestrem (.com, .org itd)
4.	TLD dodaje do swojej strefy Name Server Records wskazujące na Name Servery R53

## Rejestracja domeny
1.	R53
2.	Registered Domains
3.	Register domain
4.	Adres, TLD, cena
5.	Rejestracja osób
	- Zazwyczaj rejestracja domeny wymaga 3 różnych osób
6. Domena ląduje w `Pending Requests` i czekamy aż zostanie zarejestrowana w TLD

- R53 tworzy NameServery ale nic nie stoi na przeszkodzie żeby użyć Name Serverów zewnętrznych
- Te Name Servery są rejestrowane w TLD i ich użyje DNS żeby odnaleźć naszą domenę

## Konfiuracja routingu do bucektu S3
Jeżeli hostujemy static website w S3 to możemy uzyć R53 żeby stworzyć dla tego bucketu domenę.
**Bucket musi mieć DNS name takie jak domena**
1.	R53 -> Hosted zones -> wybrać jakąś zonę
2.	Create Record -> Simple Routing -> Define Simple Record
	-	Record Type: A
	-	Value/Route traffic to: Alias to S3 Website Endpoint
