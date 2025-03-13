# CSS React

## Raw CSS file
- Nie ma scope!
- Nawet jak ustawimy CSS w jakimś pliku i zaimportujemy go w jakimś komponencie to będzie to aktywne dla całej strony

## Inline
## className
## CSS Modules
- Pozwala na scoping
- Triggerujemy nazywając plik css `Foo.module.css` 
- Potem importujemy obiekt JS który będzie zawierał nazwy klas które "kompilator" przerobi na unikalne;

## Styled Components
- SC ma performance hit! raczej nie używać!
- npm package `styled-components`
- Syntax: `const container = styled.div`<<css>>`
- Takie funkcje można ofc exportować i reużywać
- To tworzy komponent JSX np. `<Container> TEST </Container>`
- SC przekazuje również do tego komponentu wszystkie propsy jakie podamy np. className
- żeby robić bardziej complex selecktory można używać `&` jako symbolu elementu "rodzica"
