# KUBERNETES

- `K8S`
- Kubernetes pozwala na automatyczny deploy i load distribution na różnych serwerach
- K8S potrafi robić autoscaling
- Potrafi roibć monitoring, healthcheck i podmiana kontenerów które sie wywaliły


## STRUKTURA

### `POD`
- Najmniejsza jednostka w Kubenetesie
- Kontenery są stawiane _w_ Podach
- Pod może mieć jeden lub więcej kontenerów
- Kontenery w jednym podzie mają shared Volumes i shared IP Address
- Każdy Pod w Nodzie ma swój adres IP którego używa do komunikacji wewnątrz Node
	- Po śmierci i restarcie taki Pod dostaje __nowy__ adres IP

### `NODE`
- Odpowienik serwera
- Zbiornik na Pody
- K8S automatycznie deplojuje Pody na odpowiednie Nody
- Każdy Node ma w sobie procesy
	-	`kubelet` - służy do komunikacji między Worker Nodes a `API Server` w  Master Node
	-	`kube-proxy` - służy do komunikacji wewnątrz Nodów i miedzy Nodami
	-	`container runtime` - tu uruchamia się kontener

#### `MASTER NODE`
- Node który zajmuje się load balacingiem np
- w nim są tylko systemowe pody 
- Procesy:
	-	`API Server` - służy do komunikowania Worker Nodes ze światem zew
	-	`Scheduler` - zarządza load balancingiem między róznymi Nodami
	-	`Kube Conteroller Manager` - kontrouje wszystkie nody (??)
	-	`Cloud Controller Manager` - 

#### `WORKER NODE`
-	Node w którym deplojują się nasze pody

### `CLUSTER`
- Zbiornik na nody
- Obejmuje wiele serwerów

### `SERVICE`
- Zapewnia stały adres IP dla danego Poda
- Nawet jak Pod umrze to jego Service cały czas żyje więc Pod będzie miał stały adres
- Może być Internal lub External
	-	Internal - np. baza danych, nie chcemy żeby była dostępna z zew
	- External - np. apka z API, ma dostęp z zewnątrz
		żeby service był external:
		-	ustawić mu odpowiedni type, np `LoadBalancer`
		- dodać `nodePort` jest to port na którym serwis będzie dostępny zewnętrznie'
			`nodePort` ma limitowany zasięg - 30000:32767
- Domyślny adres serwisu to `http://<<adres-ip-NODA>>:<<port-serwisu>>`
- Wszystkie instancje danego Poda są podłączone do tego samego serwisu
- Internal i External service oba działają  jako __load balancer__

### `INGRESS`
-	Ingres służy do przechwytywania requestów z zewnątrz i przekazywaniu ich do serwisów
- taki DNS trochęęę, dzięki niemu strzelamy na `https://my-service.com` a nie goly IP:PORT

### `ConfigMap`
- Zexternalowana konfiguracja Noda, może zawierać np. URL do bazy
- jako `data` przechowuje pary key: value które przechowują konfigurację
- jeżeli chcemy tam wrzucić np url do bazy to wrzucamy tam __nazwę serwisu__ który wystawia baza a nie jakiś statyczny adres
- musimy najpierw go wrzucić w klaster żeby mozna go było używać 

### `Secret`
- Dane wrażliwe zakodowane do base64
- Musi być stworzony przed deploymentem żeby można go uzyć
- nie używamy plaintextu do kredek, powinny być enkodowane Base64

### `Volumes`
- Persystencja danych
- Jak pada Pod bazy danych to nie tracimy danych
- Może być lokalny lub remote
- K8s sam z siebie nie potrafi zarządzać danymi, trzeba to robić samemu

### `Deployment`
- Blueprint dla podów
- Definiujemy np. ile `replicas` czyli ile instancji poda chcemy mieć
- Dla podów __bezstanowych__
	- np. bazy danych nie możemy kontrolować
- Zarządza `ReplicaSet`
- wszystko co "pod" deploymentem (RepilcaSet, pody itd) jest zarządzane przez k8s a nie przez nas bezpośrednio

### `ReplicaSet`
- zasób kontrolujący ilość replik podów 
- nie pracujemy z nim bezpośrednio, replikik poda definiujemy przez `deployment`
- zarządza replikami podów 

### `StatefulSet`
- `Deployment` dla podów stanowych, np. baz danych
- Trudno sie to deplojuje zazwyczaj
- Często jednak bazy danych trzyma sie poza klastrem i klaster się z nimi komunikuje

## MASTER PROCESY

### `Api Server`
-	Gateway klastra

### `Scheduler`
- Opdowiedzialny za zlecenie tworzenia nowych podów 
- Sprawdza ile zaosób potrzebuje dany Pod i w którym nodzie sie może zmieścić
- Zleca stworzenie Poda w Nodzie i potem Kubelet tworzy ten pod

### `Controller manager`
- Nadzoruje zmiany stanu klastra
- Np jak jakiś pod padnie to CM komunikuje się ze Schedulerem żeby zlecić postawienie nowego

### `ETCD`
- "mózg" klastra
- przechowuje dane o stanie całego klastra
-	dane aplikacji ofc nie są tu przechowywane, tylko stan klastra

## WORKER PROCESY 

### `Kubelet`
- Interfejs między Nodem (maszyną) a Container Runtime
- Kubelet odpala pody z kontenerami i przydziela im zasoby
- Rejestruje Node w ApiServer



## minikube

- minikube pozwala na postawienie prostego 1-nodowego klastra lokalnie
- master i worker na jednym klastrze

- `minikube start` 
	- start klastra
- `minikube status` 
	-	status klastra
- `minikube service {{nazwa serwisu}}`
	- nada service lokalny adres IP 

## kubectl
- kubectl to narzędzie CLI do komunikacji z klastrem
- komunikacja z klastrem może się tez odbywać za pomocą API lub UI
- ale kubectl jest de best
- kubectl nie użwamy do tworzenia podów bezpośrednio
-	tworzymy `deploymenty`

- `kubectl get nodes/pods/services/replicaset`
	-	status nodów/podów/serwisów/replicaset
	-	pod ma nazwę `nazwa-{replica set hash}-{hash poda}`	
- `kubectl get ... -o wide`
	- get ale więcej info - IP adres
- `kubectl get ... -o yaml`
	- jeszcze więcej info, status itd
- `kubectl get ... -n {{namespace}}`
	-	zwraca jedynie zasoby przypisane do danego namespace
- `kubectl describe {{co}} {{nazwa tego czegoś}}`
	- opis poda/serwisa/noda itd
- `kubectl create deployment NAME --image=IMAGE`
	- tworzy domylśny, prosty deployment
	- deployment tworzy pody
- `kubectl edit deployment {{deployment name}}`
	- otwiera deployment do edycji
	- po zapisie zostanie on aktywowany
- `kubectl exec -it {{pod name}} -- bin/bash`
	- terminal kontenera
- `kubectl delete deployment {{name}}` 
	- usuwanie deploymentu i wszystkich jego podów itd 
- `kubectl logs {{pod}}`
	-	logi
- `kubectl apply  -f {{file.yaml}}` 
	- pozwala odpalić konfig deploymnetu

### CONFIG YAML

- Każdy plik konfiguracyjny ma 3 częsci:
	1.	Metadata
	2.	Specification
	3.	Status (automatycznie generowany i zarządzny przez status)
			dzięki temu K8S potrafi ocenić stan klastra i ewnetualnie go naprawić
			budowany na podstawie danych z etcd
- W jednym yamlu może być kilka komponentów skonfigurowanych
	- oddzielamy je `---`
```
	apiVersion: apps/v1
	kind: Deployment
	metadata:
		name: nginx-deployment
		labels:
			app: nginx
# specyfikacja deploymentu:
	spec:
		replicas: 2
		selector:
			matchLabels:
				app: nginx
		template:
# template do tworzenia podów
# template ma swój własny metadata
			metadata:
				labels:
					app: nginx
# blueprint podów:
			spec:
				containers:
				- name: nginx
					image: nginx:1.16
					ports:
					- containerPort: 8080
```

- Połączenia między komponentami projektujemy używając `labels` i `selectors`
	- `labels` mogą być dowolnymi parami klucz-wartość
- np. żeby serwis podłączyć do danego poda to np:
	pod:
		`labels: 
			app: test`
	service:
		`selector:
			app: test`
- Żeby komponenty mogły się komunikować musimy im skonfigurować też porty
	- w podzie konfigurujemy port na którym jest o deployowany wewnętrznie
		`spec: containers:
			...
			ports:
			-	containerPort: 8080`
	- i potem w service:
		`	spec:
				...
				ports:
				- protocol: TCP
					port: 80 # port na którym jest dostępny Service
					targetPort:8080 # port na którm jest Pod - Service zmapuje na niego port 80`

- Komponenty moga mieć różne typy, np `Secret` ma `type: Opaque` co oznacza że będzie to zwkyłe mapowanie key-value


## NAMESPACES

- 'klastry wewnątrz klastrów'
- Domyślnie są 4 namespacy:
	- `kube-system` : namespace systemowe
	- `kube-public`	:	namespace zwierający informacje o klastrze
			`kubectl cluster-info` pobiera informacje z niego
	-	`kube-node-lease`	:	przchowuje hearbeaty nodów
	-	`default`	:	domyślnie wszystkie zasoby które tworzymy lądują tutaj
- `kubectl create namespace {{name}}`
	- tworznie podstawowyego namespace
	- ale lepiej jednak stworzyć plik konfiguracyjny
- Namespacy służą do grupowania zasobów w logiczny sposób, żeby nie trzymać wszystkiego w jednym worku 
- W ramach dwóch namespace możemy mieć np. dwa Deploymenty o tej samej nazwie i nie będzie sie to gryzło 
- Możemy miec np. namespace `staging` i `development` które reprezentują dwa różne środowiska ale przez to że mamy je w jednym klastrze to mogą używać tej samej bazy danych 
	- Namespace nie mogą dzielić się np. ConfigMapami czy Secretami, ale mogą dzielić się Serwisami. Więc jak mamy serwis który udostępnia bazę danych to możemy go użyć w wielu Namespace
		Aby użyć serwisu z innego namespace musimy użyć jego adresu w taki sposób:
			`{{nazwa serwisu}}.{{nazwa namespace}}`
- Enkapsulacja odpowiedzialności - możemy np. ograniczyć dostęp jednemu zespołowi tylko do jednego namespace
- Możemy ograniczać zasoby każdemu Namespace oddzielnie

- `kubectl apply -f {{plik}} --namespace={{namespace}}`
	- tworzy zasób i przypisuje go do nowego namespace
- lepiej ofc w pliku konfiguracyjnym zasobu:
	```
	metadata:
	...
	namespace: {{name}}
	```
- potem przy querowaniu `kubectl get ... -n {{namespace}}`
- można użyć narzędzia `kubectx` żeby zmienić domyślny namespace po którym querujemy
	-	`kubenst {{namespace}}`
		i wtedy każde query będzie od razu querowało po tym namespace


## INGRES

- Istnieje miedzy konsumentem zewnętrznym a _internalowym_  serwisem poda
- konfigurajca ingresa odbywa sie przec specyfikację:
	```
	spec:
		rules:
# host powinien być zmapowany na IP noda który będzie wejściem do klastra
		- host: apka.com
			http:
				paths:
				- path: /
					pathType: Exact  
					backend:
						service:
							name: {{nazwa internalowego serwisu}}
							port: 
# port na którym nasłuchuje serwis
								number: 80
	```
- Ingres wymaga dodatkowego poda `Ingress Controller`
	- jest dużo różnych third-party implementacji kontrolera
	- K8S oferuje `Nginx Ingress Controller`

- żeby lokalnie móc bawić sie ingresem trzeba dodać Ingress Controller do minikuba
	`minikube addons enable ingress`
	`kubectl get pods -n ingress-nginx` - sprawdzenie czy wstał 

- Po tym jak ingress wstanie cały czas nie mamy zmapowanego go na domenę, trzeba w `hosts` to zrobić 
	- sprawdzamy IP ingressu `kubectl get ingress`
	- mapujemy w hostach `{{ip}}	{{adress}}`

- Ingress mam też domyślny backend, czyli miejsce gdzie poleci request jeżeli nie może być zresolwowany przez serwis podpięty pod ingress
	-	`kubectl describe ingress {{ingress}}` -> `Default backend`
- Domyślnie jest to jakiś zwykły error ale możemy skustomizować ten default backend tworząc serwis o nazwie `default-http-backend` i port 

- Ingress może mapować różne serwisy na różne ścieżki lub hosty

#### Konfiguracja TLS (HTTPS)

- Trzeba w Ingressowym `spec` dodać
	```
	tls:
	- host:
		- {{adres udostępniany przez ingress}}
			secretName: {{nazwa secreta w którym trzymamy dane certyfikatu}}
	```
	-	Secret do TLS musi mieć `type: kubernetes.io/tls`

	- Secret musi być w tym samym NameSpace co Ingress
	
## VOLUMES

- żeby określić folder w podzie w ktorym montujemy volume używamy `volumeMounts`

### PERSISTENT VOLUME
-	Jest w sumie tylko interfejsem pod który musimy podpiąć prawdziwy storage, np miejsce na dysku lub serwer nfs
- K8S wspiera różne typy persystencji i inaczej się je konfiguruje, trzeba googlować wg. potrzeb
- PV nie są namespacowane, są dostępne dla całego klastra
- PV powinny być już w klastrze kiedy stawiamy pody lub nody które potrzebują tej pamięci
- Najczęściej tworzone przez Adminów

### PERSISTENT VOLUME CLAIM 
-	To komponent K8S służacy do połączenia a poda z PV
- W PVC defniujemy wymagania dotyczące pamięci, np. typ zapisu, rozmiar i zostanie użyty pierwszy PVC który spełnia te warunki
- PVC musi istnieć w tym samym NS co Pod który z niego korzysta
- Tworzone przez developerów pracujących z klastrem

### ConfigMap, Secret
- To też są Volumes, tylko lokalne, niewspódzielone miedzy NS

### STORAGE CLASS
- Dynamicznie tworzy PV kiedy PVC tego wymaga
