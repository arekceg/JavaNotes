# Storage Gateway

- **EXAM** Kiedy używać jakiego trybu Storage Gatway
- Bridge między on-prem storage i AWS
- **EXAM** Storage Gateway może służyć do: 
	- migracji danych z on-prem do aws
	- extentions of datacenter data to AWS
	- storage tiering
	- DR
	- zastępuje klasyczne tape-based backup systemy 
- **EXAM** Klasycznie na on-premie mamy serwery i jakieś NASy. NASy używają najczęsciej protokołu iSCSI i serwery widzą je jako raw block storage gdzie można utworzyć partycje i trzymać dane
- **EXAM** Jeżeli pytanie mówi o Storage Gateway w konteście volumes - odpowiedż pewnie to Volume Store. Taśmy - VTL, Pliki - File Mode

## Volume Stored Mode
- Podobnie jak NASy, używa protokołu iSCSI i serwery widzą te zasoby jako block storage gdzie można stworzyć systemy plików
- **EXAM** Jeżeli używamy Storage Gateway w trybie Volume Stored to wszystkie dane są przechowywane lokalnie i asynchronicznie kopiowane do AWS jako EBS Snapshoty
- **EXAM** Volume Stored Mode jest dobre do:
	- `full disk` backups of servers
	- DR bo EBS snapshoty mogą byc używane do tworzenia nowych EBS Volumes
	- low-latency dostep do danych (bo sa przechowywane lokalnie)
- **EXAM** Volume Stored Mode **nie powiększa capacity naszego datacenter** bo i tak wszystkie dane sa przechowywane lokalnie a na AWS leci tylko ich kopia

## Volume Cached Mode
- **EXAM** Volume Cached Mode - bardzo podobne jak Stored Mode ale trzon danych jest trzymany na **AWS MANAGED** S3 a lokalnie jest tylko kasza. 
- Dane na S3 są trzymanie w formie raw volume data a nie plików
- **EXAM** Volume Cached Mode pozwala na _datacenter extension_. Przez to że lokalnie przechowujemy tylko kasżę to na S3 mozemy trzymać TB danych które nie zajmują nam miejsca lokalnie

## Tape Mode VTL mode (Virtual Tape Library)
- Udaje backup taśmowy
- Używa S3 i Glaciera
	- w glacierze mamy praktycznie unlimited storage
- Komunikuje się po iSCSI i daje dostęp do wirtualnych Tape Drives i Media Changers
- VTL też ma Upload Buffer i Local Cache jak Volume Cached Mode.

## File Mode
- Łączy lokalnie przechowywane **pliki** z S3
- Mount pointy używające protokołu NFS lub SMB mapujące sie na bucket S3. Każdy plik wrzucony do takiego mount pointu ląduje na S3 
- Read and Write cache
- **EXAM** przy File Mode Storage Gateway przechowuje trzon danych na S3, lokalnie tylko kasza
- Coś wrzuconego na S3 nie wyląduje od razu na naszym mouncie, trzeba odświeżyć ręcznie
	- SG potrafi wysyłać eventy pojawi sie nowy plik na S3 - `NotifyWhenUploaded`
- SG File Mode nie potrafi lockować obiektów więc możliwe że jeden upload nadpisze drugi
- Możemy korzystać ze wszelkich dobrodziejstw S3:
	- Lifecycle Management
	- Cross Region Replication

