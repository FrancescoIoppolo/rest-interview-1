# REST API: Interview 1

Write an HTTP GET method to retrieve information from an articles database. The query response is paginated and can be further accessed by appending to the query string &page=num where num is the page number.

Given a string of author, your solution must perform the following tasks:

1. Query <https://jsonmock.hackerrank.com/api/articles?author=>authorName&page=num (replace authorName and num).
2. Initialize the titles array to store a list of string elements.
3. Store the name of each article returned in the data field to the titles array using the following logic:
    * If title is not null, use title as the name.
    * If title is null, and story title is not null, use story_title as the name.
    * If both title and story_title are null, ignore the article.
4. Based on the total_pages count, fetch all the data (pagination) and perform step 3 for each.
5. Return the array of titles.
6. Cache the results to avoid further requests being made to the API.

The query response from the website is a JSON response with the following five fields:

* page: The current page.
* per_page: The maximum number of results per page.
* total: The total number of records in the search result.
* total_pages: The total number of pages that must be queried to get all the results.
* data: An array of JSON objects containing article information

## Conditions

* Write your code following the TDD approach.
* Do not use web frameworks (e.g. Flask, Django, etc.).

## Instructions

1. Fork this repository.
2. Write your solution.
3. Commit and push your changes.

## Evaluation Criteria

* Code quality (clean, readable, maintainable).
* Test quality (coverage, assertions, etc.).
* Solution completeness.
* Performance.
* Architecture (design, separation of concerns, etc.).


# REST API: Interview 1 - Solution

Dopo aver analizzato i risultati delle chiamate API, ho deciso di realizzare un componente React.js con l'obiettivo di mostrare gli articoli filtrati per autore e per pagine. L'idea principale è stata quella di ridurre al minimo le chiamate API. Per questo motivo, ho deciso di chiamare l'API la prima volta per mostrare i risultati della prima pagina e poi ogni volta che si cambia pagina. Inoltre, ogni volta che viene effettuata una chiamata, i dati della pagina vengono salvati nel localStorage per evitare ulteriori chiamate rispetto al numero totale delle pagine. È inoltre possibile filtrare gli autori attraverso un campo di input. Ho voluto integrare Tailwind CSS nel progetto per poter utilizzare alcune classi di base e stilare il componente. Il componente potrebbe essere implementato con ulteriori controlli e messaggi di errore.

