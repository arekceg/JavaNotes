# PRODUKTY ML

# Amazon Comprehend
- Natural Language Processing
- Input = Document
- Output = frazy, język, osoby, adresy, firmy itd
- Real-time dla małych plików
- Async joby dla dużych 
- Usage: API, CLI, GUI

# Amazon Kendra
- Intelligent Search Service
- Mimic interacting with a human expert
- Zadajemy pytania
	- Factoid: Who What Where
	- Descriptive: Pytanie opisowe (np, why)
	- Keyword: zrozumienie intentu słów, kiedy mamy keyword mający kilka znaczeń
- Kendra to produkt backendowy, musi być używany przez coś innego przez API

## Składowe Amazon Kendra:
- Index
	- "searchable adata organisec in an efficient way"
- Data Source
	- np. S3, Conflu, RDS
- Documents
	- Structured
	- Unstructured

# Amazon Lex
- Interactive chatbots
- Serwis backendowy, konsumowany przez apki po API
- **EXAM** Amazon Lex służy do tworzenia tekstowych lub głosowych interfejsów (czatbotów)
- **EXAM** Amazon Lex rozumie **intent** usera
- **EXAM** Amazon Lex musim umieć spełnić intent, np lambdą
- Backend Alexy
- Pozwala na rozpoznawanie tekstu i mowy przez naszą apkę

# Amazon Polly
- Text to lifelike speech 
- Nie tłumaczy, język tekstu to będzie język mowy
- Integruje się z innymi serwisami AWS, lub z apkami po API

# Amazon Rekognition
- Deep Learningowe analiza obrazów i video
- Potrafi wykrywać osoby, wykrywać, analizować i porównywać twarze
- Pay-as-use
- Event-driven
- Analiza live video używająć Kinesis Video Stream

# Amazon Textract
- Detect and analize text in documents (w skanach dokumentów, obrazach)
- Detection of text and relationship between texts
- np. faktury
- Robi analizę podobną jak Comprehend
- Pay-per-use

# Amazon Transcribe
- ASR Automatic Speech Recognition 
- Inputs audio -> Outputs text
- Meeting notes, subtitles, captions & transcritps

# Amazon Translate
- Tłumaczenie tekstów z języka na język 
- Potrafi tłumacyzć dane z S3, RDS, DDB
- Integruje się z innymi serwisami AWS

# Amazon Forecast
- Forecast for time-series data
- Analiza danych i prognozy
- CLI, API, Python SDK

# Amazon Fraud Detector
- Fully managed fraud detection
- Wyszukiwanie oszustw na podstawie danych historycznych
- Podejrzenia fraudów są punktowane i możemy tworzyć rulki w których defniiujemy co zrobić na jakim poziomie punktowania

# Amazon Sage Maker
- Kolekcja produktów mających na celu zapewnić fully managed machine learning lifcycle
- Sam w sobie nic nie kosztuje, ale wszystkie zasoby ktorych uzywa już tak

# SageMaker Studio
- IDE do modelów ML

# SageMaker Domain
- Kontener na projekt SageMakerowy

# SageMaker Containers
- Kontenery dockerowe przeznaczone konkretnie pod ML

