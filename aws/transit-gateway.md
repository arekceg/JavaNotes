# AWS Transit Gateway TGW

- Hub służący do połączeń VPC z on-premami
- Pojedyczny obiekt networkowy - HA i skalowalny
- Działa na zasadznie Attachments. 
- Attachments:
	-	VPC
		- określamy subnet w którym ma być założony attachment, coś jak VPC Interface Endpoint
	- Site-to-Site VPN
	- Direct Connect Gateway

- Transit Gateway służy jako hub, np łączący 4 VPC i 2 CGW. Dzięki niemu nie musimy definiować VPC Peeringu między każdym VPC oraz tuneli IPSec do klienta z każdego VPC.
- **EXAM** Transit Gateway może być peerowany z innymi TG, w innych regionach czy kontach AWS
- TG wspiera _transitive routing_! (jeżeli dobrze skonfigurujemy route tables)
