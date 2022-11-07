# KMS Key Management Service
- Regional and Public Service
    - Czyli istnieje w konteście danego regionu
    - Istnieje w AWS Public Space
- Tworzy, przechowuje i zarządza kluczami
    - Symetryczne / Asymetryczne
- Potrafi zakodowywać i odkodowywac dane
- **EXAM** Klucze przechowwywane przez KMS nigdy go nie opuszczają
- **EXAM** KMS spełnia standard FIPS 140-2 (Level 2)

## KMS Keys, CMK 
- `Customer Master Key`
    - ta nazwa jest już trochę depracated, teraz się używa `KMS Key`
- Podstawowa jednostka przechowywania kluczy w KMS
- KMS Key to jednostka logiczna, wrapper na dane:
    - ID
    - Data
    - Resource Policy
    - Description
    - State
- Pod KMS Key jest podpięty fizyczny klucz który jest używany do kodowania i dekodowania danych 
- **EXAM** KMS Keys mogą być używane do kodowania/dekodowania danych do 4KB
- KMS Keys są przechowywane **zakodowane**
- **EXAM** KMS Keys są domyślnie przechowywane w ramach konkretnego regionu i nigdy go nie opuszczają
- **EXAM** Istnieją Multi-Region KMS Keys
- KMS Keys dzielą się na:
    - AWS Owned
        - Zakładane automatycznie przez AWS
        - Bez możliwości customizacji
        - Rotacja dzieje się automatycznie co rok
    - Customer Owned
        - Tworzone explicite przez userów
        - Duże możliwości customizacji
        - Rotacja jest opcjonalna, wyłączona by default
- Przy rotacji kluczy poprzednie klucze są zostawiane dla backwards compatibility

## DEK Data Encryption Key
- Używając `KMS Key` można stworzyc `DEK` i użyć go do zakodowywania danych > 4KB
    - operacja nazywa się `GenerateDataKey`
- **EXAM** Data Encryption Key DEK nie jest nigdzie przechowywany. KMS generuje go, przesyła do seriwsu lub usera który go potrzebuje i potem się go pozbywa
- Od KMS dostajemy klucz w dwóch formach:
    - Plaintext - możemy od razu użyć
    - Ciphertext - DEK zakodowany przez KMS Key

### Standardowy flow DEK
1. Używamy Plaintextowego DEK żeby zakodować dane
2. Usuwamy plaintextowy DEK
3. Przechowujemy zakodowany DEK wraz z danymi
4. Kiedy musimy rozkodować dane rozkodowujemy najpierw DEK używając KMS Key który służył do zakodowania DEK
5. Rozkodowujemy dane używając rozkodowanego DEK


## KMS Permissions
- KMS ma bardzo rozgranularyzowane uprawnienia
    - np. można mieć dostęp do kodowanie ale nie do dekodowania danych
- Każdy KMS Key ma przydzielone `Key Policy`
- Domyślnie KMS Key stworozny przez konto Foo nie ufa kontu Foo, trzeba mu explicte to dodać do Key Policy
    - Samo Key Policy pozwala jedynie na tworzenie Identity Policy 
    - Bez odpowiedniej Key Policy nie będzie można stworzyć działającej Identity Policy która nada uprawnienia do klucza
        - https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default-allow-root-enable-iam

## Przykład komendy do kodowania encrypt
```
    aws kms encrypt \
    --key-id alias/foo \
    --plaintext fileb://bar.txt \
    --output text \
    --query CiphertextBlob \
    | base64 --decode > encrypted-bar.enc
```
1. Zakodj plik `bar.txt` używając klucza o aliasie `foo` 
2. Komenda zwóci zakodowany plik w formie Base64 więc trzeba to jeszce rozkodować z Bejsa

## Przykład komendy do odkodowania decrypt

```
    aws kms decrypt \
    --ciphertext-blob fileb://encrypted-bar.enc \
    --output text \
    --query Plaintext |
    base64 --decode > decrypted-bar.txt
```

