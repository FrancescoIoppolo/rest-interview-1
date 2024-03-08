import React, { useState, useEffect } from 'react';

function Articoli() {

  const [articoli, setArticoli] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroAutore, setFiltroAutore] = useState('');
  const [paginaCorrente, setPaginaCorrente] = useState(1);
  const [pagineTotali, setPagineTotali] = useState(0);
  const storageArticoli = JSON.parse(localStorage.getItem('articoli')) || {};

useEffect(() => {
  if (storageArticoli && storageArticoli[paginaCorrente]) {
    setArticoli(applyAuthorFilter(storageArticoli[paginaCorrente], filtroAutore));
    setPagineTotali(storageArticoli.totalPages);
    setIsLoading(false);
  } else {
    fetchData(paginaCorrente);
  }
}, [paginaCorrente, filtroAutore]);

// Chiamo l'API e filtro gli articoli per verificare se è presente un titolo e un autore e li aggiungo al localStorage,
// successivamente applico la funziona per filtrare l'autore.
const fetchData = async (page = 1) => {
  try {
    const response = await fetch(`https://jsonmock.hackerrank.com/api/articles?page=${page}`);
    const { total_pages, data } = await response.json();
    setPagineTotali(total_pages);
    
    // filtro gli articoli
    const filteredData = data.filter(article => (article.title && article.title !== '') || (article.story_title && article.story_title !== '')
    );

    // Crea un nuovo array di oggetti contenente solo le proprietà desiderate (author - title)
    const newData = filteredData.length > 0
  ? filteredData.map(article => ({
      autore: article.author,
      titolo: article.title || article.story_title
    }))
  : [];

    storageArticoli[page] = newData;
    storageArticoli.totalPages = total_pages;

    localStorage.setItem('articoli', JSON.stringify(storageArticoli));

      const filteredArticles = applyAuthorFilter(newData, filtroAutore);
      setArticoli(filteredArticles);
      setIsLoading(false);

  } catch (error) {
    console.error('Errore durante il recupero dei dati:', error);
    setIsLoading(false);
  }
};

// Funzione per gestire il cambio di pagina
const handlePageChange = async page => {
  setPaginaCorrente(page);
  if (storageArticoli && storageArticoli[page]) {
    const filteredArticles = applyAuthorFilter(storageArticoli[page], filtroAutore);
    setArticoli(filteredArticles);
  } else {
    await fetchData(page);
  }
};

// Funzione per gestire il filtro dell'autore
const handleFiltroAutoreChange = event => {
  const value = event.target.value;
  setFiltroAutore(value);
  const storageArticoli = JSON.parse(localStorage.getItem('articoli'));
  if (storageArticoli && storageArticoli[paginaCorrente]) {
    const filteredArticles = applyAuthorFilter(storageArticoli[paginaCorrente], value);
    setArticoli(filteredArticles);
  }
};

// Funzione per applicare il filtro
const applyAuthorFilter = (articoli, filtro) => {
  return filtro
    ? articoli.filter(articolo =>
        (articolo.autore && articolo.autore.toLowerCase().startsWith(filtro.toLowerCase()))
      )
    : articoli;
};

  return (
    <div className="p-4">
    <h1 className="text-4xl font-bold mb-5">Elenco Articoli</h1>
    <input
      type="text"
      placeholder="Filtra per autore..."
      className="px-3 py-2 border rounded-md w-full mb-5"
      value={filtroAutore}
      onChange={handleFiltroAutoreChange}
    />
    {isLoading ? (
      <p>Caricamento...</p>
    ) : (
      <>
        <p>Pagina corrente: <span className="font-bold">{paginaCorrente}</span></p>
        <ul className="list-disc list-inside mb-5">
          {articoli.map((articolo, index) => (
            <li key={index} className="mt-2">
              <span className="font-semibold">{index + 1}</span> - <strong>{articolo.titolo}</strong> - {articolo.autore}
            </li>
          ))}
        </ul>
        {Array.from({ length: pagineTotali }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => handlePageChange(page)} className="px-3 py-1 mr-2 bg-blue-500 text-white rounded-md">{page}</button>
          ))}
      </>
    )}
  </div>
  );
}

export default Articoli;