## ENCRYPTION

### Encryption At Rest
- Dane są przechowywane zakodowane
- Np laptop zakodowany hasłem 
- Używan najczęściej przy jednym agencie

### Encryption In Transit
- Dane są zakodowywane do przesyłu i rozkodowane przez konsumenta
- Używane gdy zaangażowanych jest wielu agentów

### Koncepty
- Plaintext
	- niezakodowane dane, niekocziecznie text!
- Ciphertext 
	- dane przepuszczone przez algorytm kodujący 

### Symmetric Encryption
- Producent zakodowuje dane używając prywatnego klucza
- Ten sam klucz jest potem używany do dekodowania danych
- Problematyczne przy wymianie danych bo konsument też musi znać ten tajny klucz
- Najczęściej używane przy kodowaniu lokalnych danych

### Assymetric Encryption
- Public i Private key
- Oba klucze są generowane przez konsumenta danych
- Konsument wysyła publiczny klucz, który jest używany przez producenta do zakodowania danych
- Po otrzymaniu danych konsument używa prywatnego klucza aby rozkodowac dane
- Czasami Async Encrypt jest używana do wymiany prywatnych kluczy do Symm Encrypt

### Signint / Certificates
-	Encryption does not prove identity
- Producent podpisuje dane używając swojego prywatnego klucza
- Konsument używa publicznego klucza żeby potwierdzić że dane zostały na pewno wysłane przez tego konkretnego producenta


