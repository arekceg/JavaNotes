# Application (L7) Firewalls

**Firewall nie rozumie nic powyżej swojej warstwy** 

- L3 i L4 Firewall
	-	Request i response to dwa różne tunele które defniuje sie oddzielnie w FW
- L5 (session) Firewall
	- Request i response są traktowane jako część jednej sesji
	- pozwala na bardziej `contextual` security

## L7 Firewall
- Rozumie protokoły L7, np. HTTP i potrafi reagować na przesyłane dane 
- **EXAM** Tunel HTTPS jest przerywany w L7 Firewall i potem budowany na nowo
- **EXAM** L7 FW potrafi podglądać, blokować, podmieniac i tagować dane które przez niego przechodzą
- **EXAM** L7 FW potrafi identyfikować i blokować komunikację z konkretnymi apliackaji np. FB
