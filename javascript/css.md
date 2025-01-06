# CSS

- Cascading Style Sheets

Sposoby injectowania w html:
1. Inline
2. Internal
3. External

## Inline
<html style="background:blue"></html>
- nie używane za bardzo, tylko do testów itd bo trzeba by dublować konfigurację przy każdym elemencie

## Internal
- dodawanie w 
<style>
    html {
        backound: red;
    }
</style>

'html' to selector - tu mozemy wybierać co będzie stylowane

- minus: dotyczy tylko jednego pliku

## External
<head>
    <link
        rel="stylesheet" # mówi o tym co importujemy
        href="./styles.css" # wskazujemy na plik do importu
    />
</head>


## Selektory

- np. h1, a, h2
- Klasy:
    `.class-name {...}`
- Id: (id jest unikalne na stornie html)
    `#id {...}`
- Attirubte selector:
    `p[draggable="false"]{...}` # wybierze wszystkie `paragraph draggable="false"` obiekty
- Universal selector:
    `*: {...}`

## Font size
- px: pixel
- pt: point (trochę większy pixel)
- 2em: 200% parent font size
- 2rem: 200% root font size

## Div / container size
- 100%: 100% parent size
- 100vh: 100% viewport height
- 100vw: 100% viewport width

## Font family
- Można ściągać wrzucając fonta w linki

## Boxy

- Border
- Padding 
- Margin

## DIV
- Content Division Element
- Niewidzialny element który słuzy do grupowania innych elementów

## Cascade
1. Position
    - bottom-to-top
2. Specificity
    - id selector
    - attribute selector
    - class selector
    - element selector
3. Type
    - Inline
    - Internal
    - External
4. Importance
    - `!important`
        - oznacza że dany styl jest najważniejszy
        - overrideuje inne style

## Combining selectors
- `selector, selector {...}`
    - wybierze oba selektory
- `selector selector {...}`
    - wybierze wszystkie selektory wewnątrz selector, eg. `.box p {...}` wybierze wszystkie `p` wewnątrz klasy `box`
- `selector > selector {...}`
    - wybierze children selector, eg. `.box > p {...}` wybierze wszystkie `p` które są bezpośrednimi dziećmi klasy `box`
- `selectorselector {...}`
    - chaining
    - wybierze wszystkie elementy które spełniają oba selektory
- Można łączyć te kombinacje
    - `.box > p, .box > a {...}`

## Positioning
- static
    - po prostu elementy są ustawiane jeden pod drugim
- relative
    - element jest przesuwany względem swojej default pozycji
- absolute
    - element jest przesuwany względem "nearest positioned ancestor"
    - lub górnego lewego rogu body jeśli nie ma takiego elementu

### Z-Index
- określa który element jest na wierzchu
- higher on top

## Display
- `block`
    - element zajmuje całą szerokość dostępną
- `inline`
    - element zajmuje tyle miejsca ile potrzebuje w jednej linii
- `inline-block`
    - element zajmuje tyle miejsca ile potrzebuje w jednej linii ale można mu nadawać szerokość i wysokość

## Float
- Pozwala na otaczanie jedengo elementu drugim, np teksetm
- `float: left` 
    - element jest przesuwany w lewo, otaczany po prawej
- `float: right ` 
    - element jest przesuwany w prawo, otaczany po lewej

### Clear
- `clear: both`
    - element będzie olewał wcześniej zdefiniowane floaty
    - np. footer który ma być na dole strony mimo float obrazów


## Responsive design

### Media Query
- Pozwala na zmianę stylów w zależności od wielkości ekranu
- `@media (max-width: 600px) {...}`
    - zmieni style gdy szerokość ekranu będzie mniejsza niż 600px
- można łączyć media query
    - `@media (max-width: 600px) and (min-width: 400px) {...}`

### Flexbox
- Pozwala na łatwe ustawianie elementów w kontenerze
- `display: flex`
    - ustawia kontener jako flexbox zajmujący całą szerokość ekranu
- `display: inline-flex`
    - ustawia kontener jako flexbox ale zajmuje tyle ile portzebuje

#### Flexbox layout
- `gap: 10px`
    - odstęp między elementami
- `flex-direction: row | row-reverse | column | column-reverse`
    - ustawia 'main axis' flexboxa
    - 'cross axis' jest zawsze prostopadły do 'main axis'
- `flex-wrap: nowrap | wrap | wrap-reverse`
    - ustawia czy elementy mają być zawijane czy nie
- `flex-flow: row wrap`
    - skrót dla `flex-direction` i `flex-wrap`
- `justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly`
    - parent
    - ustawia jak elementy mają być rozłożone wzdłuż 'main axis'
- `align-items: stretch | flex-start | flex-end | center | baseline`
    - parent
    - ustawia jak elementy mają być rozłożone wzdłuż 'cross axis'
- `align-self: auto | flex-start | flex-end | center | baseline | stretch`
    - child
    - ustawia jak element ma być rozłożony wzdłuż 'cross axis'

#### Flexbox sizing
- `flex-basis: auto | 100px`
    - ustawia bazową szerokość elementu
- `flex-grow: 1`
    - ustawia jak element ma się rozszerzać w stosunku do innych elementów
- `flex-shrink: 1`
    - ustawia jak element ma się kurczyć w stosunku do innych elementów
- `flex: 1 1 100px`
    - skrót dla `flex-grow`, `flex-shrink`, `flex-basis`
- `flex: 2`
    - skrót dla `flex-grow: 2`, `flex-shrink: 2`, `flex-basis: 0`
    - element będzie się rozszerzał i kurczył ale nie będzie miał bazowej szerokości
    - dzięki temu można szybko ustawiać proporcje elementów


### CSS Grid
- O ile flexbox jest dobry do jednowymiarowych layoutów, to CSS Grid jest dobry do dwuwymiarowych


#### Grid layout
- `display: grid`
    - ustawia kontener jako grid
- `grid-template-columns: 1fr 100px auto`
    - ustawia ilość kolumn i ich szerokość
- `grid-template-rows: 1fr 1fr 100px`
    - ustawia ilość wierszy i ich wysokość
- `grid-template: 1fr 1fr / 1fr 100px 1fr`
    - skrót dla `grid-template-rows` i `grid-template-columns`
- `auto`
    - dla kolumn ustawia szerokość tak żeby zająć pełen dostępny obszar
    - dla wierszy ustawia wysokość na wysokość najwyższego elementu
- `fr`
    - ustawia szerokość/wysokość w stosunku do innych elementów
- `minmax(100px, 1fr)`
    - ustawia szerokość/wysokość na minimum 100px i maksimum 1fr
- `repeat(3, 1fr)`
    - powtarza 3 razy 1fr

#### Grid placement
- `grid-column: span 2`
    - ustawia ile kolumn ma zajmować element
- `grid-row: 1 / 3`
    - ustawia od którego wiersza do którego ma zajmować element
- `grid-area: 1 / 1 / 3 / 3`
    - skrót dla `grid-row-start`, `grid-column-start`, `grid-row-end`, `grid-column-end`


### Bootstrap
- Framework do CSS
- Zawiera dużo gotowych klas i elementów do CSS
- Używa się wstrzykując gotowy stylesheet do tagu html

#### Boostastrap layout
- Konterner który ma w sobie rzędy i kolumny
- Każdy rząd ma 12 kolumn
- Każda kolumna ma zdefiniowaną szerokość w zależności od wielkości ekranu
    - ten wymiar dotyczy ekranu o wybranej i większej szerokości

- `container`
    - ustawia kontener na środku strony
    - containter ma różne gotowe rozmiary w zależności od wielkości ekranu
- `row`
    - ustawia wiersz
- `col`
    - ustawia kolumnę
    - można ustawiać szerokość kolumny w zależności od wielkości ekranu
    - np. `col-md-6` oznacza że na ekranach o szerokości 768px i większej szerokości kolumna będzie zajmować 6 kolumn
    - dla mniejszego ekranu kolumna będzie zajmować masywniejszą ilość kolumn
    - `col-12` - 12 kolumn
    - `col-9` - 9 kolumn
    - `col-md-6` - 6 kolumn na średnich i większych ekranach
    - `col-md-8 col-lg-4` - 8 kolumn na średnich i 4 kolumny na dużych ekranach

#### Bootstrap components
- Gotowe komponenty do użycia
- Dużo w dokumentacji

#### Bootstrap spacing
- maring, padding
- np. `m-1` - margin 1,  `my-1 m-md-2 m-lg-3` - margin 1 na małych ekranach dla prawej i lewej krawędzi, 2 na średnich, 3 na dużych



