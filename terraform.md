# TERRAFORM

- Instalacja i deploy infry - provisioning
- Provisioning Tools - __tylko__ konfiguracja infry, nie konfigurujemy apki nią
- Ansible np. służy typowo do konfigu apki, nie infry
- HCL - HashiCorp Configuration Language

-	Terraform nie umi YAML : o
- Terraform jest cloud-agnostic

- Terraform potrafi sam symulować zmiany które wprowadzamy
	- tworzy się plik stanu

- Komponenty
	- Binarki
		- pobieramy od Hashi
	- Pliki konfiguracyjne HCL
		- piszemy my
	- Pluginy
		- Providery
		- Przechowywane w rejestrach
		- ściągne on-demand
	-	Pliki ze statusem
		- plik stanu
		- przechowuje aktualny obraz środowiska 
		- nie powinno sie robić zmian ręcznie

- Terraform registry
	- dokumentacja, listy providerów

## Praktyka

- pliki TF maja rozszerzenie `.tf`
- `terraform`
- `init`
	- inicjalizacja środowiska
	- skanuje pliki, pobiera providerów 
- `plan`
	- sprawdza co sie stanie
	- można sprawdzić czy np. zapisany opis stanu zgadza się z tym co mamy
- `apply`
- `state`
- `state` - zarządzanie plikiem stanu
	- `state list` - lista zasobów
	- `state show` - szczegóły jedneo zasobu
	- `state rm` - usuń tymczasowo zasób z zarządania TF
- `destroy` - kasuje wszstkie zasoby
	

### Struktura skryptu
-	`resource` - definiujemy zasób 
- `local_file` 
	- `local` to provider
	- `file` to typ zasobu
- `abc` - nazwa zasobu
	- unikalnac
- po klamrze - atrybuty

- resurce TF są immutowalne!
- przy zmianie czegoś zasób jest usuwany i stawiany od nowa 








