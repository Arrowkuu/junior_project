# Wstęp do projektu "junior_project"

Aplikacja wykonana na potrzeby rekrutacji na stanowisko Junior Node.js Developer, według wytycznych przedstawionych w otrzymanym pliku `junior-nodejs-task.pdf`.

#### Wykorzystane frameworki i technologie:

-   Node.js + Express
-   Typescript
-   MySQL

## Instrukcja instalacji

> Przed instalacją wymagane jest zainstalowanie serwera baz danych MySQL, który jest wykorzystywany przez aplikację.

1. Pobierz pliki z repozytorium, następnie wykonaj instalację potrzebnych bibliotek używając komendy `npm install`
2. Utwórz w głównym katalogu aplikacji plik o nazwie `.env` następnie umieść w nim następujące zmienne środowiskowe:

```diff
# Server status and port
NODE_ENV=development
PORT=2000

# Database configuration
DB_PREFIX=jr_
DB_HOST=localhost
DB_USER=root
DB_NAME=junior_db
DB_PASSWORD=
```

3. Skonfiguruj plik `.env`, aby poprawnie uzyskać dostęp do bazy danych.
4. Uruchom aplikację w trybie developerskim używając `npm run dev` lub wykonaj build produkcyjny:

```diff
npm build
```

```diff
npm start
```

## Dokumentacja API

API posiada 5 endpointów obsługujących produkty. Do wykonania testów API zaleca się korzystanie z narzędzia `Postman`

### Schemat encji w tabeli produkty

```js
Product {
  Id: number;
  Name: string;
  Price: number;
  UpdateDate: Date;
}
```

# -

### Tworzenie nowego produktu

![](https://img.shields.io/static/v1?label=&message=Endpoint&color=green)
![](https://img.shields.io/static/v1?label=&message=PUT&color=blue)

```diff
/api/products/create
```

![](https://img.shields.io/static/v1?label=&message=Parametry&color=red)

```js
{
    Name: string;
    Price: number;
}
```

-   **Name** - nazwa produktu, parametr wymagany, maksymalna ilość znaków 100.
-   **Price** - cena produktu, parametr wymagany.

![](https://img.shields.io/static/v1?label=&message=Response&color=blue)

```json
{
    "status": 200,
    "message": "Successfully created new product.",
    "result": {
        "Name": "Test",
        "Price": 2.5,
        "id": 2
    }
}
```

# -

### Aktualizowanie istniejącego produktu

![](https://img.shields.io/static/v1?label=&message=Endpoint&color=green)
![](https://img.shields.io/static/v1?label=&message=POST&color=blue)

```diff
/api/products/update
```

![](https://img.shields.io/static/v1?label=&message=Parametry&color=red)

```js
{
    Id: number;
    Name: string;
    Price: number;
}
```

-   **Id** - numer identyfikacyjny produktu, parametr wymagany.
-   **Name** - nazwa produktu, parametr wymagany, maksymalna ilość znaków 100.
-   **Price** - cena produktu, parametr wymagany.

![](https://img.shields.io/static/v1?label=&message=Response&color=blue)

```json
{
    "status": 200,
    "message": "Successfully updated product data.",
    "result": {
        "Name": "TestRenamed",
        "Price": "5.50",
        "UpdateDate": "2022-11-10T10:04:32.000Z",
        "Id": 2
    }
}
```

# -

### Pobieranie listy produktów

![](https://img.shields.io/static/v1?label=&message=Endpoint&color=green)
![](https://img.shields.io/static/v1?label=&message=GET&color=blue)

```diff
/api/products
```

![](https://img.shields.io/static/v1?label=&message=Parametry&color=red)

```js
Brak;
```

![](https://img.shields.io/static/v1?label=&message=Response&color=blue)

```json
{
    "status": 200,
    "message": null,
    "result": [
        {
            "Id": 1,
            "Name": "Test",
            "Price": "2.50",
            "UpdateDate": null
        },
        {
            "Id": 2,
            "Name": "TestRenamed",
            "Price": "5.50",
            "UpdateDate": "2022-11-10T10:04:32.000Z"
        },
        {
            "Id": 3,
            "Name": "Test2",
            "Price": "10.20",
            "UpdateDate": null
        }
    ]
}
```

# -

### Pobieranie szczegółów wybranego produktu

![](https://img.shields.io/static/v1?label=&message=Endpoint&color=green)
![](https://img.shields.io/static/v1?label=&message=GET&color=blue)

```diff
/api/products/:id
```

![](https://img.shields.io/static/v1?label=&message=Parametry&color=red)

```js

```

**:id** - identyfiaktor produktu, parametr wymagany.

![](https://img.shields.io/static/v1?label=&message=Response&color=blue)

```json
{
    "status": 200,
    "message": null,
    "result": {
        "Id": 1,
        "Name": "Test",
        "Price": "2.50",
        "UpdateDate": null
    }
}
```

# -

### Usuwanie wybranego produktu

![](https://img.shields.io/static/v1?label=&message=Endpoint&color=green)
![](https://img.shields.io/static/v1?label=&message=DELETE&color=blue)

```diff
/api/products/delete/:id
```

![](https://img.shields.io/static/v1?label=&message=Parametry&color=red)

```js

```

**:id** - identyfiaktor produktu, parametr wymagany.

![](https://img.shields.io/static/v1?label=&message=Response&color=blue)

```json
{
    "status": 200,
    "message": "Successfully deleted product with Id: 1",
    "result": null
}
```
