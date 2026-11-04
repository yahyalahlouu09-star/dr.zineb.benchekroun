# Centre Benchekroun — site web (healthplaza-finale)

React + TypeScript + Tailwind + Framer Motion + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

- Coordonnées, examens et photos : `src/config.ts` (les champs `[À FOURNIR]` sont à remplir).
- Textes FR / AR / EN : `src/i18n.tsx` et `src/copy.ts`.
- Le backend (rendez-vous, assistant IA) se branche via `src/api.ts` et `VITE_API_URL` (voir `.env.example`). Sans backend, le site tourne en mode démo.
# dr.zineb.benchekroun
