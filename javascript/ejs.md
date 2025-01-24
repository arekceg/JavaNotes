# EJS

- Embedded JavaScript

## Tagi
- `<% %>` - Kod JavaScript
- `<%= %>` - Wyświetlanie wartości
    - np. `<%= nazwa_zmiennej %>` wyrendeuje wartość zmiennej podanej z kontrolera
- `<%- %>` - Renderowanie HTML
- `<%# %>` - Komentarz
- `<%% %>` - Literal tag
- `<%- include('nazwa_pliku') %>` - Wstawianie pliku

## Przekazywanie danych
- Jak odwołamy się do danych których nie ma to się wypierdoli, nawet jak będziemy próbować to obifować
- Trzeba użyć `locals.zmienna` wtedy `locals` zawsze istnieje więc się nie wypieprzy
