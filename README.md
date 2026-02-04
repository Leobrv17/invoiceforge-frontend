# InvoiceForge — Démo front-only (React + Vite)

Cette application est une **démo front-only** : toutes les fonctionnalités V1 sont simulées côté interface, et les modules V2 sont affichés comme « bientôt disponibles ». Aucun backend n’est nécessaire.

## Prérequis

- Node.js 18+
- npm (ou pnpm/yarn)

## Installation

```bash
npm install
```

## Lancer la démo

```bash
npm run dev
```

Ouvrez ensuite [http://localhost:5173](http://localhost:5173) dans votre navigateur.

> Astuce : cliquez sur **Se connecter** pour simuler une connexion instantanée et accéder à tous les tableaux de bord.

## Build de production

```bash
npm run build
npm run preview
```

## Structure

- `src/App.tsx` : navigation simulée (dashboard, devis, factures, clients, exports RGPD, module TVA V2).
- `src/App.css` : thème bleu/blanc avec accents gris/noir.
- `src/index.css` : styles globaux.
