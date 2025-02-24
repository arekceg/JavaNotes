# JAVASCRIPT

## Styling:
https://github.com/rwaldron/idiomatic.js/


## Arrays
- .length()
- .push()
    - dodaje element na koniec tablicy
- .pop()
    - usuwa ostatni element z tablicy


## Sposoby dodawania skryptów do strony
- <body onload="alert('Hello World!')">
- <script> alert('Hello World!') </script>
- <script src="script.js"></script>


## DOM - Document Object Model

- document
    - zawiera całą stronę
    
- Obiekty w DOM mogą mieć:
    - properties
        - właściwości obiektu
        - odwołujemy się np `car.color`
    - methods
        - metody obiektu
        - wywołujemy np `car.start()`

### Pobieranie elementów z DOM
- document.getElementById('id')
- document.getElementsByClassName('class')
- document.getElementsByTagName('tag')
- document.querySelector('css selector')
- document.querySelectorAll('css selector')

Najlepiej używać querySelector i querySelectorAll, bo są bardziej elastyczne.


### Modyfikacja stylu

- element.style.color = 'red'
- element.classList.add('class')
- element.classList.remove('class')
- element.classList.toggle('class')

## JQuery

- `$(<<selector>>)`
    - pobiera z DOM wszystkie elementy spełniające selektor

### Modyfikacja stylu
- `$(<<selector>>).css('color', 'red')`
- `$(<<selector>>).addClass('class')`
- `$(<<selector>>).removeClass('class')`
- `$(<<selector>>).toggleClass('class')`

### Ukrywanie i pokazywanie elementów
- `$(<<selector>>).hide()`
- `$(<<selector>>).show()`
- `$(<<selector>>).toggle()`

#### Animacje: 
- `$(<<selector>>).fadeIn()`
- `$(<<selector>>).fadeOut()`
Animować można również inne właściwości, np. szerokość.
Animować można **tylko** właściwości numeryczne.
- `$(<<selector>>).animate({width: '200px'}, 1000)`

Dużo więcej animacji: https://api.jquery.com/category/effects/


### Modyfikacja parametrów
- `$(<<selector>>).attr('src', 'new.jpg')`
- `$(<<selector>>).val('new value')`

### Eventy
- `$(<<selector>>).click(function() { alert('Hello World!') })`
- `$(<<selector>>).on('click', function() { alert('Hello World!') })`

### Dodawanie elementów HTLM
- `$(<<selector>>).append('new text')`
    - dodaje element na końcu kontentu elementu, wewnątrz tagów
- `$(<<selector>>).prepend('new text')`
    - dodaje element na początku kontentu elementu, wewnątrz tagów
- `$(<<selector>>).after('new text')`
    - dodaje element po zamykającym tagu
- `$(<<selector>>).before('new text')`
    - dodaje element przed otwierającym tagiem


## ES6

- Expressions vs statements??

### Destructuring

