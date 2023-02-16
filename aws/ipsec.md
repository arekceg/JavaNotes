# IPSEC VPN

- Secure i encrypted tunele w ramach nie-secure sieci
- Tunele powstają dynamicznie w ramach pojawienia się kontentu który trzeba zakodować 

# Fazy IPSEC
1. IKE Phase 1
	- tu się dzieje async ecryption żeby wymienić klucze do późniejszej komunikacji
	- Obie strony tunelu tworzą **Diffie-Hellman (DH) PRIVATE KEY** oraz public key służący do zakodowania danych
	- Używając private i publicz klucza obie strony tworzą **DH KEY**
	- Na postawie tego klucza i dodatkowych danych obie strony tworzą klucz potrzebny do symetrycznej komunikacji potem
	- ta faza tworzy IKE SA (Security Association) - Phase 1 tunnel
2. IKE Phase 2
	- używa kluczy wymienionych w Phase 1 do synch encryption
	- tworzy IPSEC SA

Po użyciu IPSEC SA może zostać usunięte jezeli nie będzie już potrzebne, ale IKE SA zostanie bo założenie go na nowo to duzo pracy

# Typy VPN, jak wybierają `interesting traffic`

## Policy-based VPN
- Ustalane są konkretne zasady wg których klasyfikowany jest traffic
- W zalezności od zasady tworzony jest nowy Phase 2 Tunnel

## Route-based VPN
- Na bazie celu trafficu, np wsyzstko co do 10.12.0.1/24 to ma przechodzić przez VPN
- dwa tunele P2 (jeden w jedną drugi w drugą stronę) na całą komunikację

