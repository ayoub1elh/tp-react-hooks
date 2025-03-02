# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks.git
cd tp-react-hooks
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

- [ ] 1.1 Modifier le composant ProductSearch pour utiliser la recherche
- [ ] 1.2 Implémenter le debounce sur la recherche
- [ ] 1.3 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_
```
1. Utilisation du useDebounce (Exercice 1.2)

Le hook useDebounce est utilisé pour retarder l’exécution de la recherche. Cela évite d’envoyer des requêtes à chaque frappe et améliore les performances.

const debouncedSearchTerm = useDebounce(searchTerm, 500);

Fonctionnement :

Lorsque l'utilisateur tape dans le champ de recherche, la valeur de searchTerm est mise à jour immédiatement.

Cependant, debouncedSearchTerm ne changera qu’après 500ms sans nouvelle saisie.

Cela permet d'attendre que l'utilisateur ait fini de taper avant d'exécuter une action, comme une requête API.
```

### Exercice 2 : Context et Internationalisation
#### Objectif : Gérer les préférences de langue

- [ ] 2.1 Créer le LanguageContext
- [ ] 2.2 Ajouter le sélecteur de langue
- [ ] 2.3 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_
### 🎯 Objectif :
Ajouter un sélecteur de langue permettant à l'utilisateur de choisir entre **Français** et **Anglais**.

### 🔹 Code ajouté :
```jsx
<select value={language} onChange={(e) => setLanguage(e.target.value)}> 
  {/* Exercice 2.2 - Ajouter le sélecteur de langue */}
  <option value="fr">Français</option>
  <option value="en">English</option>
</select>
```

✅ Explication :
value={language} : Définit la valeur du sélecteur en fonction de la langue actuellement sélectionnée.
onChange={(e) => setLanguage(e.target.value)} : Met à jour la langue lorsque l'utilisateur change la sélection.
Les <option> : Permettent de choisir entre Français (fr) et Anglais (en).

## Explication du code - Création du `LanguageContext`

### 🎯 Objectif :
Créer un **contexte React** permettant de gérer la langue de l'application.

### 🔹 Code ajouté :
```javascript
// Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();
```
✅ Explication :
createContext() : Crée un contexte React pour stocker la langue sélectionnée.
LanguageContext : Fournira l’état de la langue à tous les composants de l’application.

### Exercice 3 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

- [ ] 3.1 Créer le hook useDebounce
- [ ] 3.2 Créer le hook useLocalStorage
- [ ] 3.3 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_

Explication du code

1. Création du hook useDebounce (Exercice 3.1)

Ce hook permet de retarder la mise à jour d’une valeur après un certain délai. Cela est utile pour éviter d'exécuter des actions trop rapidement, par exemple lors d’une recherche.

Exemple :

Si un utilisateur tape dans un champ de recherche, la requête ne sera envoyée qu’après un court délai après la dernière frappe.
```javascript
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
```

2. Création du hook useLocalStorage (Exercice 3.2)

Ce hook permet de stocker une valeur dans le localStorage, afin que l’utilisateur retrouve ses données après avoir fermé ou rechargé la page.
```javascript
const useLocalStorage = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
```


### Exercice 4 : Gestion Asynchrone et Pagination
#### Objectif : Gérer le chargement et la pagination

- [ ] 4.1 Ajouter le bouton de rechargement
- [ ] 4.2 Implémenter la pagination
- [ ] 4.3 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_

3. Ajout de la pagination et rechargement des produits (Exercices 4.1 et 4.2)

Ajout des états pour la pagination :

J’ai ajouté page et pageSize pour gérer la pagination :

```javascript
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
```

Modification de l’URL pour inclure la pagination :

J’ai modifié l’URL de l’API pour prendre en compte page et limit :
```javascript
const response = await fetch(`https://api.daaif.net/products?delay=1000&page=${page}&limit=${pageSize}`);
```

Cela permet d’obtenir une liste paginée de produits en fonction de la page actuelle.

4. Ajout de la fonction de rechargement des données (Exercice 4.1)

J’ai ajouté une fonction reload qui recharge les données en réinitialisant l’état :

```javascript
const reload = () => {
  setLoading(true);
  fetchProducts();
};
```


5. Ajout des fonctions pour la pagination (Exercice 4.2)

Ces fonctions permettent à l’utilisateur de naviguer entre les pages :

```javascript
const goToNextPage = () => setPage(prevPage => prevPage + 1);
const goToPreviousPage = () => setPage(prevPage => prevPage - 1);
```


6. Retour des valeurs nécessaires depuis le hook

Le hook retourne maintenant toutes les valeurs et fonctions utiles :

```javascript
return {
  products,
  loading,
  error,
  reload,  // Fonction pour recharger les produits
  goToNextPage,  // Aller à la page suivante
  goToPreviousPage,  // Aller à la page précédente
  page,  // Numéro de la page actuelle
  pageSize  // Nombre de produits par page
};
```




## Rendu

- Ajoutez l'URL de votre dépôt Github dans  **Classroom** et envoyer la réponse dès le démarage de votre projet.
- Les push doivent se faire au fûr et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran. 
- Chaques exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.