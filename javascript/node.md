# NODE

Wyciągneli silinik JSowy z Chromium (V8 engine) i dzięki temu mogą teraz używać JSa w swoich aplikacjach. Wszystko jest zrobione w JSie, a niektóre elementy są w C++.

## Biblioteki
Standardowe:
- https://nodejs.org/docs/latest/api/

### Ładowanie
#### ESM
- `import dns from 'node:dns';`

#### CommonJS
- `const dns = require('dns');`


## NPM
- Package manager dla JS
- https://www.npmjs.com/
- coś jak maven? ale tylko paczkami zarządza

### Komendy

#### Inicjalizacja
- `npm init` - inicjalizacja projektu
    - tworzy plik `package.json`

#### Instalacja paczek 
- Zainstalowane paczki lądują w `node_modules`
- `npm install` - instaluje paczki z pliku `package.json`
- `npm install <package>` - instaluje paczkę, umieszcza w `package.json`





