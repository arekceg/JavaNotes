# AWS Site-to-Site VPN

- IPSec'owe połączenie między VPC a on-premem
- **EXAM** AWS VPN jest Full-HA **jeżeli go dobrze skonfigurujemy**

# Składowe AWS VPN:
- VPC
- Virtual Private Gateway VGW (podpięty pod VPC, cel route tables)
- Customer Gateway CGW (np. router on-prem)
- Połączenie VPN między VGW i CGW

# Architektura (Static VPN)
- VGW jest podłączony do VPN i tworzy fizyczne enpointy w każdym AZ
- Połączenie VPN jest podpięte do VGW i używa jego endpointów
- Każdy endpoint tworzy tunel do on-prem routera (CGW)
- Static VPN, więc musimy skonfigurować AWS i on-prem konkretnymi adresami IP każdej ze stron (AWS musi znać on-premowe IP i vice-versa)
- **Jeżeli mamy tylko jeden router on-prem (CGW) to nie jest to full-HA bo jak padnie ten CGW (router on-prem) to wszystko leży**

## FULL HA arch
- Jeżeli dołożymy dodatkowy CGW to stajemy się Full-HA
- Tworzymy nowe połączenie VPN
- Wtedy VGW tworzy dodakowe enpointy w kazdym HA które będą się komunikowac z tym CGW


# Static vs Dynamic VPN

## Static VPN
- Trzeba ręcznie wpisać konkretne, statyczne adresy IP sieci 
- Brak Load Balancingu
- Brak multi-connection-failover

## Dynamic VPN
- Używa BGP
- BGP jest skonfigurowany po stronie on-prem i AWS
- Traffic distribution, HA
- Route Propagation
	- Jeżeli włączone to wszystkie nowo dostępne dla VPN routy (wykryte przez BGP) są automatycznie dodawane do route tables

# **EXAM** Do egzaminu AWS VPN
- Max speed 1.25Gbps
- Inconsistent latency, public internet
- Szybko się stawia, kilka godzin, secure
