# Backend — demandes de rendez-vous (PHP + MariaDB)

## Installation locale
1. **Base** : dans phpMyAdmin, crée une base `benchekroun` (utf8mb4_unicode_ci) puis importe `schema.sql`.
2. **Config** : copie `.env.example` en `.env` et mets tes identifiants MariaDB (MAMP : port 8889, root/root).
3. **Serveur** (dans ce dossier `backend/`) :
   ```bash
   php -S localhost:8000 -t public
   ```
   (avec MAMP, utilise le PHP de MAMP, ou `brew install php`)
4. **Compte admin** :
   ```bash
   php create_admin.php ton@email.com "un-mot-de-passe-long"
   ```
   Interface : http://localhost:8000/admin/
5. **Site React** : dans le `.env` à la racine du projet, mets `VITE_API_URL=http://localhost:8000/api` puis relance `npm run dev`.

## Production
- Le dossier web doit être `backend/public` (`.env`, `lib.php` et `storage/` restent hors accès public).
- HTTPS obligatoire. Change `APP_SALT`, `ALLOWED_ORIGINS` (domaine du site) et le mot de passe MariaDB.
- Les documents sont dans `storage/uploads/` (non public) et ne se téléchargent que via l'admin connecté.
- Données de santé : déclaration/autorisation CNDP (loi 09-08), politique de confidentialité, durée de conservation et sauvegardes chiffrées à valider avec le centre.

## Pas encore fait
Notifications e-mail / WhatsApp (point d'accroche dans `api/appointments.php`), disponibilités en temps réel, purge automatique.
