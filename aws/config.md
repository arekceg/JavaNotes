# AWS Config

- **Record configuration changes over time on resources**
- Każda zmiana konfiguracji w AWS powoduje powstanie Configuration Itemu który przechowuje informacje o tej zmianie
- Pozwalana na audyt zmian i potiwerdzanie że są zgodne z okreslonymi standardami
- **EXAM** AWS Config nie pozwala na blokowanie zmian, jedynie ich audyt i porównanie do standardów
- Regional service, wspiera cross-region i cross-account aggreation
- Zmiany konfigów moga generować eventy EventBridge z informacją o zmianie i compliance/non-compliance
- Trzeba go włączyć żeby działał 
