# Amazon Macie

- Data security/privacy service
- Automatycznie monitoruje i chroni dane w S3
- Uzywa Data Identifiers żeby indentyfikować dane które trzeba chronić
	-	Managed: uzywa ML i Patternsów żeby identyfikowac dane
	- Custom: zarządzane przez nas, używa Regexu
- Intergacja z Security Hub i wysyłanie eventów do EventBridge
- Discovery Joby latają na okreslonych bucketach i sprawdzają
- Macie wyłapuje nie tylko wrażliwe dane w obiektach ale tez zmiany w konfiguraji bucketa które obniżają jego bezpieczeństwo (Policy Findings)
- **EXAM** Jezeli exam mówi o classification, identification, discovery and reacting to sensitive data automatically in S3 to chodzi pewnie o Macie 
