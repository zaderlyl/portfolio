# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format suit les principes de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [Unreleased]

### Added
- `README.md` décrivant le projet, sa structure et son fonctionnement local.
- `CHANGELOG.md` (ce fichier).
- Suivi du projet sous git.
- Animation au survol des liens du header : les crochets `[ ]` glissent et
  apparaissent au survol, plutôt que d'être réservés à la page active.

### Changed
- Réorganisation de l'arborescence : `style.css`, `case.js`, les images et le CV
  déplacés dans `assets/` (`css/`, `js/`, `images/`), et les 6 pages d'études de
  cas déplacées dans `work/`. Tous les liens relatifs ont été mis à jour en
  conséquence.

### Fixed
- Débordement horizontal de quelques pixels sur `work.html` : la liste de
  projets (`.rows-work`) héritait de `align-items: center` (posé sur
  `.work-center` pour centrer le titre et les filtres) et se redimensionnait
  à son contenu au lieu de remplir toute la largeur ; ajout de
  `align-self: stretch` pour la corriger.
- Marge de bord-à-bord de `.rows-work` recalculée à partir de `var(--pad)`
  plutôt que de `100vw`, qui inclut parfois la largeur de la scrollbar et
  provoquait un débordement horizontal selon les navigateurs.
- Titres de projets mal centrés verticalement dans `work.html` : la légende
  `.rmeta`, invisible au repos, restait dans le flux et ne réservait de
  l'espace qu'en dessous du titre. Elle est sortie du flux (position
  absolue) et le padding de `.rcontent` équilibré en conséquence.

## [1.0.0] — 2026-07-09

### Added
- Page d'accueil (`index.html`), page Work avec filtres par catégorie,
  page About et page Contact.
- 6 études de cas : Halles de Béziers, Musée FABI, GRAM, PromoCards,
  Printemps de la Culture, Domino's.
- Script commun aux études de cas (`case.js`) : parallax au défilement et
  visionneuse plein écran (lightbox) des captures.
- Feuille de style commune (`style.css`).
