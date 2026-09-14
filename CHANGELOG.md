# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format suit les principes de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [Unreleased]

### Added
- `README.md` décrivant le projet, sa structure et son fonctionnement local.
- `CHANGELOG.md` (ce fichier).
- Suivi du projet sous git.

### Changed
- Réorganisation de l'arborescence : `style.css`, `case.js`, les images et le CV
  déplacés dans `assets/` (`css/`, `js/`, `images/`), et les 6 pages d'études de
  cas déplacées dans `work/`. Tous les liens relatifs ont été mis à jour en
  conséquence.

## [1.0.0] — 2026-07-09

### Added
- Page d'accueil (`index.html`), page Work avec filtres par catégorie,
  page About et page Contact.
- 6 études de cas : Halles de Béziers, Musée FABI, GRAM, PromoCards,
  Printemps de la Culture, Domino's.
- Script commun aux études de cas (`case.js`) : parallax au défilement et
  visionneuse plein écran (lightbox) des captures.
- Feuille de style commune (`style.css`).
