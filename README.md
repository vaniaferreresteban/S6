# S6: Pressupostos amb Angular (ITAcademy)

Aquest projecte és una aplicació web interactiva desenvolupada amb Angular per a la creació i gestió de pressupostos de serveis digitals. Permet als usuaris seleccionar serveis, personalitzar quantitats i obtenir un cost total en temps real, a més de poder guardar i compartir els resultats.

## Taula de Continguts
- [Sobre el Projecte](#sobre-el-projecte)
- [Característiques](#característiques)
- [Demostració Visual](#demostració-visual)
- [Tecnologies Utilitzades](#tecnologies-utilitzades)
- [Instal·lació](#installació)
- [Ús](#ús)
- [Llicència](#llicència)
- [Contacte](#contacte)

## Sobre el Projecte

L'aplicació "Pressupostos amb Angular" ha estat dissenyada per oferir una experiència d'usuari guiada i eficient per a la configuració de pressupostos. El seu objectiu principal és facilitar un càlcul transparent i dinàmic dels costos, permetent alhora una gestió senzilla dels pressupostos generats. La interfície és neta, intuïtiva i se centra a proporcionar a l'usuari un control total sobre les seves seleccions.

## Característiques

* **Càlcul Dinàmic:** El preu total del pressupost s'actualitza a l'instant amb cada canvi que fa l'usuari.
* **Serveis Personalitzables:** Permet ajustar detalls específics com el nombre de pàgines o idiomes mitjançant un panell interactiu.
* **Gestió de Pressupostos:**
    * Capacitat per desar pressupostos assignant-los un nom de client.
    * Llistat dels pressupostos guardats amb opcions d'ordenació (alfabètica, data).
    * Cercador per filtrar pressupostos existents.
* **Compartir via URL:** L'estat del pressupost actual es codifica en els paràmetres de la URL, facilitant la compartició de configuracions específiques.
* **Basat en Components:** Estructura modular que facilita el manteniment i l'escalabilitat del codi.

## Demostració Visual

Aquí pots veure un exemple de les pantalles principals de l'aplicació.

<img src="https://i.imgur.com/eCtw0YC.png" width="800">
<img src="https://i.imgur.com/gC6aWGB.png" width="800">

## Tecnologies Utilitzades

Aquest projecte ha estat desenvolupat utilitzant les següents tecnologies:

* **[Angular](https://angular.dev/)** - v20.0.5 
* **[TypeScript](https://www.typescriptlang.org/)** - v5.8.2 
* **[Node.js](https://nodejs.org/)** (Requerit per Angular CLI)
* **HTML5**
* **SCSS** (Sass)

## Instal·lació

Per configurar i executar aquest projecte localment, segueix els següents passos:

### Prerequisits

Assegura't de tenir instal·lat Node.js

* **Node.js**: Descarrega'l i instal·la'l des de [nodejs.org](https://nodejs.org/). Es recomana una versió LTS.
* **Angular CLI**: Instal·la el CLI d'Angular globalment si encara no el tens (la versió del projecte és 20.0.5):
    ```bash
    npm install -g @angular/cli
    ```

### Passos d'Instal·lació

1.  **Clona el repositori:**
    ```bash
    git clone [https://github.com/vaniaferreresteban/S6-Pressupostos-Angular.git](https://github.com/vaniaferreresteban/S6-Pressupostos-Angular.git)
    ```
2.  **Navega al directori del projecte:**
    ```bash
    cd S6-Pressupostos-Angular
    ```
3.  **Instal·la les dependències de Node:**
    ```bash
    npm install
    ```

## Ús

Una vegada que hagis instal·lat les dependències, pots executar l'aplicació en un servidor de desenvolupament local o construir-la per a producció.

### Executar en Mode de Desenvolupament

Per iniciar l'aplicació en mode de desenvolupament amb recàrrega en viu:

```bash
ng serve
```

Obre el teu navegador i navega a http://localhost:4200/. L'aplicació es recarregarà automàticament si realitzes canvis als arxius font.

### Construir per a Producció

Per construir el projecte per a desplegament en un entorn de producció:

```Bash
ng build
```

Els artefactes de construcció s'emmagatzemaran al directori dist/.

##Executar Proves

Per executar les proves unitàries:

```Bash
ng test
```
## Llicència

This project is open-source and available under the MIT License.

## Contacte

Per a qualsevol pregunta o comentari, pots contactar amb la mantenidora del projecte:

Vania Ferrer Esteban
GitHub: vaniaferreresteban
