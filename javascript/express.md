# Express

- Framework do requestów http

## Middlewares
- Libki które są wywoływane przed obsługą requestu
- Można je wykorzystać do logowania, autoryzacji, walidacji, itp.

### Przykłady
- body-parser
  - parsuje body requestu i dodaje do obiektu req jakko req.body
- morgan
    - loguje requesty

### Customowe middlewares
- Coś jak filtry w servletach
- Funkcje które przyjmują 3 argumenty: req, res, next
- next() przechodzi do kolejnego middleware
- np. `app.use((req, res, next) => { console.log('middleware'); next(); })`

