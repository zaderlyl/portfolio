# Portfolio — Lilian Cornet

Site portfolio statique présentant mes projets de développement web et de design d'interfaces, réalisé en HTML, CSS et JavaScript vanilla (aucune dépendance, aucun build).

🔗 Pages principales : Index · Work · About · Contact

## Structure du projet

```
.
├── index.html              Page d'accueil
├── work.html                Liste des projets (avec filtres par catégorie)
├── about.html                Parcours & compétences
├── contact.html              Coordonnées & CV
├── work/                    Études de cas (une page par projet)
│   ├── halles-beziers.html
│   ├── musee-fabi.html
│   ├── gram.html
│   ├── promocards.html
│   ├── printemps-culture.html
│   └── dominos.html
└── assets/
    ├── css/style.css        Feuille de style commune à toutes les pages
    ├── js/case.js            Parallax + visionneuse (lightbox) des études de cas
    ├── images/                Captures d'écran et visuels des projets
    └── cv-lilian-cornet.pdf  CV téléchargeable
```

## Projets présentés

| Projet | Catégorie | Stack |
|---|---|---|
| [Halles de Béziers](work/halles-beziers.html) | Site vitrine | HTML/CSS/JS, visite 360° |
| [Musée FABI](work/musee-fabi.html) | Site fonctionnel | PHP, MySQL |
| [GRAM](work/gram.html) | Jeu vidéo | Phaser 3 |
| [PromoCards](work/promocards.html) | Site fonctionnel | PHP, SQLite |
| [Printemps de la Culture](work/printemps-culture.html) | Identité graphique | Affiche, brochure |
| [Domino's](work/dominos.html) | Identité graphique | Brand book |

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
