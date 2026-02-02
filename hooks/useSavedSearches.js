import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'propertyGenie_savedSearches';

const useSavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSavedSearches(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading saved searches:', error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever savedSearches changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSearches));
      } catch (error) {
        console.error('Error saving searches:', error);
      }
    }
  }, [savedSearches, isLoaded]);

  const saveSearch = useCallback((filters, name) => {
    const newSearch = {
      id: Date.now().toString(),
      name: name || `Search ${savedSearches.length + 1}`,
      filters,
      createdAt: new Date().toISOString(),
    };

    setSavedSearches((prev) => [newSearch, ...prev]);
    return newSearch;
  }, [savedSearches.length]);

  const deleteSearch = useCallback((id) => {
    setSavedSearches((prev) => prev.filter((search) => search.id !== id));
  }, []);

  const updateSearchName = useCallback((id, newName) => {
    setSavedSearches((prev) =>
      prev.map((search) =>
        search.id === id ? { ...search, name: newName } : search
      )
    );
  }, []);

  const clearAllSearches = useCallback(() => {
    setSavedSearches([]);
  }, []);

  return {
    savedSearches,
    isLoaded,
    saveSearch,
    deleteSearch,
    updateSearchName,
    clearAllSearches,
  };
};

export default useSavedSearches;
