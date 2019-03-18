# Refactor

## Todo
### Javascript
* klare Struktur schaffen: Pages, Components, Modules -> Ordner erstellen
* viel code duplications: mehr Abstraktion schaffen
* auskommentierten Code entfernen
* Code Duplikation: in Funktionen auslagern (zB. ListsPage)
* DOM Manipulation ist teuer, immer am Ende gebündelt

###### Funktionen
* Templating verwenden: kein document.createElement('label') -> sehr unlesbar
* ES6 Template Funktionen verwenden: map, filter, reduce, find, ...
* FunctionsToDo: createToDoList -> zu komplex, in Funktionen splitten, Templating! 
* mehr als 3 Argumente -> Objekt als Parameter

###### Variablen:
* FunctionsToDo: Naming: checkLenght -> alertEmpty
* konsistentes Namin

### CSS
* Reihenfolge Lade: Reset vor anderen Regeln
* CSS System
* Probleme mit Specificity: Simplify
* keine !importants

### General
remove code cuplications, find them with `npx jscpd src`


## Done