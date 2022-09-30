# Play-creative

- goal : animation with code that reproduce a [video preview](/public/playplay.mp4)
- techs : vue3+typescript+pixijs+animejs

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Goals

L'exercice est de reproduire le plus fidèlement ce [motion-design](/public/playplay.mp4) à destination du web.

### Project

- Compatibilité navigateurs : Chrome, Firefox, Edge
- Utilisation d'**anime.js** pour la gestion des animations
- Utilisation de **Pixi.js** pour le WebGL
- Execution rapide
- Rendu professionnel (alignements, framerate, antialiasing...)
- L'animation s'adapte au texte de l'utilisateur
- Utiliser TypeScript
- Utiliser Vue.js
- Interface simple pour gérer la timeline d'animation (play, pause, restart)

### Animations

- Les animations "aléatoires" doivent être contrôlées et avoir le même résultat à chaque exécution du code
- Animation du background
- Apparition du texte lettre par lettre
- Double du texte en mode shadow
- Texture "Papier" sur le texte
- Effet "Vague" saccadée sur le texte
