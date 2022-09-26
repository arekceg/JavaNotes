## HASHING

- Pozwala zapisać duże dane (np. obrazek) w formie stringa liter i cyfr o ustalonej, stałej długości
- Hashowanie jest jednostronną operacją, nie da się przywrócić zahaszowanych danych 
- Może służyć np. do weryfikacji hasła
	-	na serwerze przechwujemy tylko hash hasła, więc nie można z niego odczytać hasła
	- Przy logowaniu sprawdzamy czy hash wpisanego hasła zgadza się z tym na serwerze
- Przy Md5 jest ryzyko kolizji, można manipulować danymi tak żeby dwie rózne dane generowały ten sam hash
-	SHA2-256 jest lepsze!
