import React, { useState, useContext } from "react";
import { ThemeContext, LanguageContext } from "../App";
import { useDebounce } from "../hooks/useDebounce";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext); // Exercise 2.1 - Use LanguageContext
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Exercise 1.2 - Use the useDebounce hook

  const placeholderText =
    language === "fr" ? "Rechercher un produit..." : "Search for a product...";

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholderText}
        className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
      />
    </div>
  );
};

export default ProductSearch;