import { useState, useEffect } from "react";

// Exercice 3.1 - Créer le hook useDebounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Exercice 3.2 - Créer le hook useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Exercice 4.2 - Ajouter l'état pour la pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const response = await fetch(
        `https://api.daaif.net/products?page=${page}&limit=10&delay=1000`
      );
      if (!response.ok) throw new Error("Erreur réseau");
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.total);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]); // Exercice 4.2 - Ajouter les dépendances pour la pagination

  // Exercice 4.1 - Ajouter la fonction de rechargement
  const reload = () => {
    fetchProducts();
  };

  // Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    products,
    loading,
    error,
    reload, // Exercice 4.1 - Retourner la fonction de rechargement
    page,
    totalPages,
    nextPage,
    prevPage, // Exercice 4.2 - Retourner les fonctions et états de pagination
  };
};

export { useDebounce, useLocalStorage, useProductSearch };