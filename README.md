# InvoiceForge — Front-only (React + Vite)

Cette application présente la **version front-only** d’InvoiceForge : toutes les pages et fonctionnalités V1 sont accessibles côté interface, tandis que les modules V2 sont visibles et marqués comme “bientôt disponibles”.

## Prérequis

- Node.js 18+
- npm (ou pnpm/yarn)

## Installation

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvrez ensuite [http://localhost:5173](http://localhost:5173) dans votre navigateur.

> Pour accéder au workspace, cliquez sur **Se connecter** : la connexion est simulée côté front.

## Build de production

```bash
npm run build
npm run preview
```

## Structure

- `src/App.tsx` : interface complète (dashboard, devis, factures, avoirs, clients, RGPD, modules V2).
- `src/App.css` : thème bleu/blanc avec accents gris/noir.
- `src/index.css` : styles globaux.
