# CloudFormation

# TEMPLATE
- Templatka tworzy `Stack` 
- `Stack` zawiera wszystkie poprawnie zdefiniowane przez templatkę zasoby (`Logical Resources`)
- Na podstawie Stacka CF tworzy 1:1 fizyczne zasoby (`Physical Resources`) AWSowe
- Przy zmianie templatki updejtuje się Stack i to triggeruje updejt fizycznych zasobów AWS
- **EXAM** Resources in a CloudFormation stack share a lifecycle

# Tworzenie
- `CloudFormation`->`Create Stack`
- Przy uploadowaniu templatki do CF tworzy się nowy bucket S3 w który jest wrzucana

# SKŁADOWE TEMPLATKI 

## AWSTemplateFormatVersion

## Description
- **EXAM** Description jest opcjonalne, ale jeżeli jest to musi być zaraz za `AWSTemplateFormatVersion`

## Metadata
- Pozwala na dodatkowe ustawienia zasobów
- Parametry, grupy, labelki
- You define how UI presents the template

## Template Parameters
- Definiujemy parametry które musi podać user templatki CF

Np: 
- `LatestAmiId`	
	- zwróci Id najnowszej wersji danego AMI (obrazu maszyny amazonowej)
- `KeyName`
	- nazwa pary kluczy do autentykacji połączenia z zasobem

### Pseudo Parameters
- Parametry wypełniane przez AWS, np. AWS::Region

## Mappings
-	Lookup tables
- Mapy k-v
- Użycie np. pobranie AMI dla danego regionu i danej architektury
- !FindInMap - znajdywanie w mapie

## Conditions
- Warunkowe tworzenie resurców
- Definiujemy warunki i potem używamy tych Conditions w Resources

## Transform

## Resources
- Jedyne wymagane pole
- Resource w CF sa nazywane `Logical Resources`

## Output
- Określanie tego co wypluwa templatka
- **EXAM** Output CloudFormation jest dostępny dla parent stacka kiedy nestujemy templatki
- **EXAM** Output CloudFormation można exportować i referncować w innych templatkach używając `Description`

# Intrinsic Functions
- Templatka może dynamicznie reagować na to co się poda w parametrach
- Pobieranie wartości np. ID stworzonej instancji, IFowanie itd

## `!Ref`
Referencja do innej częci templatki

## `!GetAtt`
Umożliwia pobranie konkretnej danej z zasobu, np
```
	Value: !GetAtt
	 - EC2Instance
	 - AvailabilityZone
```
Pobierze informacje o AZ z instacji EC2

# cfn-init
- `cfn-init` to skrypt który jest obceny w każdej instacnji EC2
- Przy User Data definiujemy krok po kroku co ma być zrobione przy inicjalizacji instancji, `cfn-init` definiujemy __stan__ instancji na koniec inicjalizacji
- Denifowane w specjalnym bloku każdego logicznego zasobu w CFN
- `cfn-init` może śledzić zmiany w metadanych templatki i w razie zmian ponownie sie odpalić, User Data odpala się tylko raz

# CreationPolicy
- `CreationPolicy` to częsc templatki CFN, podpięta pod konkretny zasób
- Zazwyczaj CF twierdzi że instancja powstała poprawnie nawet jak się wypierdoli inicjalizacja configu.
- Używając `cfn-singal` (program w instancji EC2) i `CreationPolicy` możemy sprawić że instacja będzie na zielono dopiero jak cały config przejdzie ok

# WaitConditions
- Podobne do CreationPolicy
- Jest to osobny resource, więc może zależeć od innych zasobów i inne zasoby mogą zależeć od niego
- Oparty na `WaitHandle` i strzale na presigned url
- Uzywająć !GetAtt można z WaitCondition pobrać nawet dane z body strzału na ten presigned url

## WaitHandle
- Specjalny zasób podpinany pod WaitCondition
- Generuje pre-signed URL na który się strzela żeby potwierdzić że coś się zadziało

# DependsOn
- Można uzależnić explicite zasoby od siebie
- CloudFormation rozumie implicit zależności, np. jak jak Tworzymy VPC i w tym VPC subnet i w tym subnecie EC2 to CF zrobi to po kolei
- **EXAM** ElasticIP wymaga w VPC **Attached** Internet Gateway, ale CloudFormation nie ma tutaj implicit zależności więc nie ogarnie tego automatycznie. Trzeba użyć `DependsOn` żeby zbudować odpowiedni ciąg zależności

# Nested Stacks
- Root Stack: początkowy stack 
- Parent Stack: każdy stack który ma pod sobą kolejne nested stacki 
- Nested Stack używa sie jako Resource `AWS::CloudFormation::Stack`
