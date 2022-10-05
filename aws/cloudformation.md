## CloudFormation

### TEMPLATKA
- Templatka tworzy `Stack` 
- `Stack` zawiera wszystkie poprawnie zdefiniowane przez templatkę zasoby (`Logical Resources`)
- Na podstawie Stacka CF tworzy 1:1 fizyczne zasoby (`Physical Resources`) AWSowe
- Przy zmianie templatki updejtuje się Stack i to triggeruje updejt fizycznych zasobów AWS

### Tworzenie
- `CloudFormation`->`Create Stack`
- Przy uploadowaniu templatki do CF tworzy się nowy bucket S3 w który jest wrzucana

### SKŁADOWE TEMPLATKI 

#### AWSTemplateFormatVersion

#### Description
- **EXAM** Description jest opcjonalne, ale jeżeli jest to musi być zaraz za `AWSTemplateFormatVersion`

#### Metadata
- Pozwala na dodatkowe ustawienia zasobów
- Parametry, grupy, labelki
- You define how UI presents the template

#### Parameters
- Definiujemy parametry które musi podać user templatki CF

Np: 
- `LatestAmiId`	
	- zwróci Id najnowszej wersji danego AMI (obrazu maszyny amazonowej)
- `KeyName`
	- nazwa pary kluczy do autentykacji połączenia z zasobem

#### Mappings
-	Lookup tables

#### Conditions
- Warunkowe tworzenie resurców
- Definiujemy warunki i potem używamy tych Conditions w Resources

#### Transform

#### Resources
- Jedyne wymagane pole
- Resource w CF sa nazywane `Logical Resources`

#### Output
- Określanie tego co wypluwa templatka


### CLOUD FORMATION FUNCTION (funkcje)

#### `!Ref`
Referencja do innej częci templatki

#### `!GetAtt`
Umożliwia pobranie konkretnej danej z zasobu, np
```
	Value: !GetAtt
	 - EC2Instance
	 - AvailabilityZone
```
Pobierze informacje o AZ z instacji EC2

