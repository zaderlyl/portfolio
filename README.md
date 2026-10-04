# Portfolio — Lilian Cornet

Site portfolio statique présentant mes projets de développement web et de design d'interfaces, réalisé en HTML, CSS et JavaScript vanilla (aucune dépendance, aucun build).

🔗 Pages principales : Index · Production · About · Contact

## Structure du projet

```
.
├── index.html              Page d'accueil
├── work.html               Page « Production » : liste des projets (filtres par domaine et type)
├── about.html              Parcours & compétences
├── contact.html            Coordonnées, CV et carrousel des projets
├── 404.html                Page d'erreur (servie par l'hébergeur pour toute URL introuvable)
├── work/                   Études de cas (une page par projet)
│   ├── halles-beziers.html
│   ├── musee-fabi.html
│   ├── gram.html
│   ├── promocards.html
│   ├── printemps-culture.html
│   ├── dominos.html
│   ├── contribution-board.html
│   └── lyrics-overlay.html
└── assets/
    ├── css/style.css       Feuille de style commune à toutes les pages
    ├── js/case.js          Parallax + visionneuse (lightbox) des études de cas
    ├── fonts/              Un dossier par font, avec sa licence
    │   ├── titan-one/      Titan One (titres) — licence OFL, sous-ensemble latin
    │   └── itim/           Itim (texte) — licence OFL, sous-ensemble latin
    ├── dev/                Outil de test des polices (font-tester.js + polices candidates), invisible par défaut
    ├── icons/              Favicon et icône tactile (« LC »)
    ├── images/             og-image.png (aperçu de partage) et visuels, un dossier par projet (même nom que la page d'étude de cas)
    │   ├── halles-beziers/
    │   ├── musee-fabi/
    │   ├── gram/
    │   ├── promocards/
    │   ├── printemps-culture/
    │   ├── dominos/
    │   ├── contribution-board/
    │   └── lyrics-overlay/
    └── cv-lilian-cornet.pdf  CV téléchargeable
```

## Tester des polices en direct

Ajouter `?fonts` à n'importe quelle URL (ex. `http://localhost:8080/work.html?fonts`) ou appuyer sur **Shift+F** affiche un panneau pour changer la police des titres et du texte, la taille des titres et la casse, en temps réel. Le choix est gardé d'une page à l'autre. `?fonts=off` (ou ✕, ou Shift+F) le désactive : les visiteurs ne le voient jamais et rien n'est chargé tant qu'il est éteint.

## Projets présentés

| Projet | Catégorie | Stack |
|---|---|---|
| [Halles de Béziers](work/halles-beziers.html) | Site vitrine | HTML/CSS/JS, visite 360° |
| [Musée FABI](work/musee-fabi.html) | Site fonctionnel | PHP, MySQL |
| [GRAM](work/gram.html) | Jeu vidéo | Phaser 3 |
| [PromoCards](work/promocards.html) | Site fonctionnel | PHP, SQLite |
| [Printemps de la Culture](work/printemps-culture.html) | Identité graphique | Affiche, brochure |
| [Domino's](work/dominos.html) | Identité graphique | Brand book |
| [Contribution Board](work/contribution-board.html) | Outil (GitHub Action) | Node.js, SVG animé |
| [Lyrics Overlay](work/lyrics-overlay.html) | Outil (app de bureau) | Electron, API Spotify |

## Développement local

Le site est statique, aucun serveur applicatif n'est requis. Pour le prévisualiser en local avec des chemins relatifs corrects :

```bash
python3 -m http.server 8080
```

puis ouvrir [http://localhost:8080](http://localhost:8080).

L'extension VS Code Live Server fonctionne aussi (port configuré dans `.vscode/settings.json`).

## Déploiement

Le site n'a aucune étape de build : il suffit de publier le contenu du dépôt tel quel sur un hébergeur statique (GitHub Pages, Netlify, etc.), `index.html` servant de page racine.

## Contact

- Email : [lcornet38@gmail.com](mailto:lcornet38@gmail.com)
- LinkedIn : [linkedin.com/in/liliancornet](https://www.linkedin.com/in/liliancornet)
- GitHub : [github.com/zaderlyl](https://github.com/zaderlyl)

## Changelog

Voir [CHANGELOG.md](CHANGELOG.md).
