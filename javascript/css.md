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

## Font family
- Można ściągać wrzucając fonta w linki

## Boxy

- Border
- Padding 
- Margin

## DIV
- Content Division Element
- Niewidzialny element który słuzy do grupowania innych elementów
