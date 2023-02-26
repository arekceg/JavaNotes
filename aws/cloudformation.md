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

# cfn-hup
- daemon który obserwuje zmiany w metadanych zasobu
- cnf-init odpala sie tylko _raz_, cfn-hup można użyć żeby jeszcze raz odpalić skrypty inicjalizacyjne w momencie zmianu metadanych instancji (np. kiedy robimy UpdateStack)

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
- **EXAM** Templatki CF możemy gdzieś uploadować i potem używać ich przy nestowaniu templatek
- Nestując stacki nie referencujemy **konkretnego** stacku, tylko jest tworzony nowy używając zreferencowanej templatki
- **EXAM** Nested stacks are usen when stacks _form part of one solution_ **lifecycle linked**
- **EXAM** Nested stacks są używane żeby przekraczać limit 500 resurców na jeden stack 

# Cross-Stack Reference 
- **EXAM** Outputy stacków mogą być _exportowane_ i dzięki temu widoczne dla innych stacków
- **EXAM** Exportowane outputy stacków CF muszą być unikalne per konto per region
- **EXAM** Używamy funkcji `Fn::ImportValue` żeby importować exportowane outputy stacków CF
- **EXAM** Cross-Stack KEYWORDS **Service-Orientated** **different lifecycles** **STACK reuse**

# StackSets
- Pozwalają na deployowanie stacków CF w wielu kontach i regionach jednocześnie
- StackSet jest tworzony w `admin account` i potem stacki są tworzone w `target accounts`
- Agregaty na `stack instances`. Stack instance to referencja do jednej instancji stacku. Nawet jeżeli stack sie nie stworzyl to stack instance się tworzy i przechowuje info czemu stack się nie stworzył 
- CF przyjmuje IAM Role żeby móc tworzyć zasoby w innych kontach
	- Self-managed role lub Service-Managed role (AWS Organizations)
- **EXAM** Concurrent Accounts - przy StackSetach CF określami ile kont jednocześnie może generować stacki 
- **EXAM** Failure Tolerance - ilość poszczególnych stacków które mogą się wysypać żeby wysypać cały StackSet sie wysypał 
- **EXAM** Retain Stacks - defaultowo usuwanie Stack Intances ze StackSet usuwa też konkretne stacki, ale można ustwaić żeby nie usuwało

# DeletionPolicy
- Delete
	- CF usuwa phys resource jeżeli logical resource jest usunięty
- Retain
	- CF nie usuwa phys resource jeżeli logical resource jest usunięty
- Snapshot
	- CF zrob snapshot pamięci zasobu przed usunięciem
	- Snapshot jest dostępny tylko na wybranych zaosób (np. RDS, EBS **nie dla EC2**)

# Stack Roles
- **EXAM** CloudFormation domyślnie do tworzenia zasobów uzywa permissions identity która triggeruje tworzenie stacka. 
- **EXAM** Dzięki Stack Roles możemy konkretnie ustalić jaką rolę ma przybrać CF do tworzenia zasobów. Dzięki temu identity wywołująca tworzenie stacku nie musi mieć uprawnień do tworzenia zasobów

# Change Sets
- Pozwalają zrobić podgląd skutków zmian które wprowadzamy do stacka i zdecydować czy chcemy ja wprowadzić

# Custom Resources
- **EXAM** CF Custom Resources pozwalają na integrację CF z rzeczami których nie wspiera natywnie
- **EXAM** CF Custom Resources wysyła dane na konkretny endpoint (Lambda lub SNS Topic) i może dostać respons na wystawiany przez siebie ResponseURL
