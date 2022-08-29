# HELM

- Package manager dla K8S
-	Można ściągać i reużywać pakiety gotowych YAMLi K8Sowych 
- Taki pakiet nazywa się `Helm Chart`


## TEMPLATKI

- Helm pozwala tworzyć Templates które zamiast konkretnych wartości mają placeholdery eg.
	`name: {{ .Values.name }}`
	- Ta wartość będzie pobrana z pliku `values.yaml` lub z innego pliku:
		`helm install --values=values-new.yaml {{chart name}}`
		- wartości z tego pliku będą overwritować odpowiadające im wartości z głownego `values.yaml` ale nie nadpisują __całego__ pliku by default
	- Można tez je ustawiać bezpośrednio przez CLI
		`helm install --set klucz=wartosc`
	- dzięki temu możem np. w zależności od środowiska dynamicznie podmieniać wartości w deploymentach 

## CHART

- Struktura folderów: 
	```
	mychart/
		Chart.yaml # meta informacje o Charcie
		values.yaml # domyślne wartości do wstrzykiwania do templatek
		charts/ # zależności 
		templates/ # templatki
		...
	```

## RELEASE MANAGEMENT

### HELM 2

- CLI wysyła request do Tillera (serwer helmowy odpalony w klastrze K8S) i Tiller stawia wtedy komponenty wewnątrz klastra
- Tiller przechowuje historię wszystkich odpalonych Chartów, dzięki czemu mamy dobrą kontrolę nad wersjami Charta i ewnetualnym np rollbackiem
	- `helm upgrade {{chartname}}` 
	- `helm rollback {{chartname}}` 
- Problem: Tiller ma bardzo duże uprawnienia wewnątrz klastra, więc w Helmie 3 zrezygnowano z niego

### HELM 3
- Ni mo tillera
- Prosta binarka Helmowa
