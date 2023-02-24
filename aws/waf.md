# Web Application Firewall WAF

- L7 Firewall
- **EXAM** Serwisy używające WAF: CloudFront, ALB, AppSync, API Gateway
- WAF konfigurowalny przez WEB ACL (Access Control Lists)
	- Może być tworzony globalnie lub w regionie
- Może chronić globalne i regionalne serwisy (zależy od tego jak bylo ACL skonfigurowane)
- Można zrobić system automatycznego updejtowania ACL na podstawie poznanych zagrożeń (lambdą)
- **EXAM** Architektura WAF może byc oparta o feedback loop gdzie na podstawie logów WAF lub informacji z aplikacji następuje automatyczny updejt Access Control List 

# WEB ACL
- Regional lub global (w zalezności czy zabezpieczamy regional czy global resource)
- Defautl akcja - full ALLOW lub DENY
- Rule i Rule Group procesowane w kolejności `order`
- Każdy rule ma jakiś compute cost i ACL ma limity na to - Web ACL Capacity Units WCU, def. 1500
- Jeden ACL może być podpięty pod wiele zasobów ale regional ACL nie może być zapięty na global resource

## WAF Rules
Składowe:
- Type
	- Regular
		- Maczują jak tylko coś wystąpi
	- Rate-based
		- Maczują jak cos występuję z jakąś częstotliwością
- Statement
	- matchowanie trafficu
	- może być wiele
	- WHAT to match, COUNT instances
- Action
	- co zrobić z maczem
	- Allow/Block
		- kończy obsługę requestu
	- Count/Captcha
		- obsługa kontynuowana
	- można określić custom header responsu (prefix `x-amxn-waf-`)
	- można dodać `Label` i potem inne rule mogą sprawdzać obecośc tej labelki (jak robimy Count lub Captcha i kontynuujemy processing)

## Rule Groups
- Agregat na Rule
- Managed (AWS, Marketplace), Nasze (sami definiujemy), Service Owned (eg. Shield, Firewall Manager)
- Mogą być reużywane w różnych ACL
- Tworząc definiujemy WCU capacity (def. max. 1500)

# Pricing
- Monthly/ACL (5$)
	- ACL mogą być reużywane
- Monthly/RULE (1$)
- Monthly/REQUESTS (0.60$ / 1 mil)
- Bot Control  monthly feee
- Captcha /1000 attempts
- Fraud Control / Account Takeover
- Marketplace Rule Groups
