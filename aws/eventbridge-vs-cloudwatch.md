# EventBridge vs CloudWatch Events

- EB zastępuje CloudWatch Events
- Ma wszystkie jego funkcje +++
- CWE ma jeden Event bud, EB może mieć ich wiele ale zawsze ma jeden Default Event Bus
- Zbierają eventy z serwisów i jeżeli pasują do danej Rule to są wysyłane do konkretnych miejsc
- Lub wysyłają eventy schedulowane używając crona
