# STEP FUNCTIONS

- Step Functions pozwalają na projektowanie ciągów procesów Severless używajć State Machines 

# State Machines
- Coś jak _workflow_ 
- START -> STATES -> END
	- STATES to rzeczy które się dzieją
- Max duration = **1 year** :o
- Standard 
	- defautl, 1 year limit 
- Express
	- max. 5 min
- Odpalane przez API Gateway, IOT, EventBridge, Lambda itp
- IAM Role do permissions
- Są różne STATE, np. WAIT, CHOICE, PARALLEL, i one kontrolują flow czynności
- TASK STATE wywołuje akcję, np Lambdę
