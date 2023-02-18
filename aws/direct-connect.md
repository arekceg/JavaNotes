# AWS Direct Connect

- Bezpośrednie **fizyczne** połączenie między on-prem a AWS Region
	- on-prem -> DX Location -> AWS Region
- Kupujemy **port** w DX Location do którego potem musimy sie fizycznie wpiąć światłowodem (Cross Connect) 
- **EXAM** DX Location nie jest budynkiem zarządzanym przez AWS. Jest to część dużych lokalnych datacenter w których AWS wynajmuje przestrzeń
- **EXAM** Jeżeli my nie mamy wykupionej przestrzeni w DX Location (Customer DX Router) to są Communication Partnerzy którzy mają i z których usług możemy skorzystać (Parnter DX Rounter). Taki partner dociągnie nam wtedy światłowód DX do biura
- **EXAM** AWS Direct Connect zapewania niska i consistent latencja + high speed
- Niskie resillience! Fizyczny kabel wpięty w port
- Umożliwia połączenie z VPC i z publicznymi serwisami AWS ale nie z publicznym internetm
- 

# DX Resilience

## Chujowo
- 1 DX router w 1 DX location podłączony do 1 Customer Routera

## Dobrze
- 2 DX routery w 1 DX Location podłączone do 2 Customer Routerów

## Lepiej
- 2 DX routery w 2 DX Location podłączone do 2 Customer Routerów w 2 różnych budynkach

## Najlepiej
- 4 DX routery po 2 w 2 DX Location podłączone do 2 Customer Routerów w DX Location i potem dopiero do 2 routerów  w 2 różnych budynkach klienta
