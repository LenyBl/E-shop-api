# 🧭 E-Shop Backend Roadmap

## 🎯 Objectif
Créer un backend e-commerce complet, sécurisé et maintenable, avec toutes les fonctionnalités d’une application pro (auth, paiements, mails, statistiques, automatisation, etc.).

---

## ✅ État actuel
- [x] Authentification JWT
- [x] Users / Products / Orders / Cart
- [x] Helmet, CORS, XSS
- [x] Routes protégées (`protect`, `restrictTo`)
- [x] Base MongoDB connectée

---

## 🗓️ Semaine 1 — Fiabilisation & Base technique
> 🎯 Stabiliser le backend et uniformiser les erreurs / validations.

- [x] Création de la collection `category`
- [x] CRUD de la collection `category`
- [ ] Décommenter et tester `mongoSanitize()`
- [ ] Créer un middleware global `errorHandler.js`
- [ ] Créer une classe `AppError` personnalisée
- [ ] Ajouter la validation des données (`express-validator`)
- [ ] Vérifier les statuts HTTP cohérents
- [ ] Configurer `morgan` en dev / `winston` en prod

---

## 🗓️ Semaine 2 — Système d’e-mails
> 🎯 Ajouter des notifications automatiques pour les utilisateurs.

- [ ] Installer `nodemailer`
- [ ] Créer `emailService.js`
- [ ] Envoyer un mail de bienvenue à l’inscription
- [ ] Envoyer un mail de confirmation de commande
- [ ] Implémenter "mot de passe oublié" avec token
- [ ] (Optionnel) Mail de livraison / expédition

---

## 🗓️ Semaine 3 — Paiements & Facturation
> 🎯 Automatiser les paiements et générer des factures.

- [ ] Intégrer **Stripe** (mode test)
- [ ] Créer `/api/payments/create` et `/api/payments/webhook`
- [ ] Mettre à jour le statut de commande après paiement
- [ ] Générer une **facture PDF** avec `pdfkit` ou `pdfmake`
- [ ] Ajouter `/api/orders/:id/invoice` pour téléchargement

---

## 🗓️ Semaine 4 — Notifications & Temps réel
> 🎯 Dynamiser l’expérience côté admin et utilisateur.

- [ ] Installer **Socket.io**
- [ ] Notifier l’admin en temps réel lorsqu’une commande est passée
- [ ] Notifier l’utilisateur quand le statut de commande change
- [ ] (Optionnel) Notifications push navigateur
- [ ] Créer un tableau de bord admin en live

---

## 🗓️ Semaine 5 — Statistiques & Analytics
> 🎯 Ajouter une couche “business intelligence”.

- [ ] Créer `/api/dashboard/stats`
  - Total commandes / revenus par mois
  - Produits les plus vendus
  - Utilisateurs les plus actifs
- [ ] Implémenter **MongoDB Aggregation Pipeline**
- [ ] (Optionnel) Cache avec **Redis**
- [ ] Ajouter un dashboard admin côté front

---

## 🗓️ Semaine 6 — Sécurité avancée & rôles
> 🎯 Renforcer la structure des utilisateurs et les accès.

- [ ] Ajouter rôles : `user`, `manager`, `admin`
- [ ] Créer middleware `restrictTo(['admin', 'manager'])`
- [ ] (Optionnel) Ajouter 2FA (Two-Factor Auth) avec `speakeasy`
- [ ] Ajouter un **audit log** (connexions / actions sensibles)
- [ ] Bloquer les comptes inactifs (CRON job)

---

## 🗓️ Semaine 7 — Automatisations & CRON Jobs
> 🎯 Automatiser les tâches récurrentes.

- [ ] Installer `node-cron` ou `agenda`
- [ ] Supprimer les paniers expirés (>48h)
- [ ] Envoyer un mail de relance panier
- [ ] Nettoyer les commandes incomplètes
- [ ] Sauvegarde automatique MongoDB

---

## 🗓️ Semaine 8 — Documentation & Déploiement
> 🎯 Rendre le backend public, propre et documenté.

- [ ] Installer **Swagger UI** (`swagger-ui-express`, `swagger-jsdoc`)
- [ ] Documenter toutes les routes (inputs / outputs / auth)
- [ ] Rédiger un `README.md` complet
- [ ] Déployer sur Render / Railway / VPS (PM2)
- [ ] Ajouter monitoring (Sentry, Datadog, `express-status-monitor`)

---

## 🧩 Bonus Features (optionnelles)
> Pour un backend e-commerce encore plus complet.

- [ ] Système de **coupons / réductions**
- [ ] **Wishlist** utilisateur
- [ ] **Avis / notations produits** avec modération
- [ ] **Support client** (tickets, messagerie)
- [ ] **Multi-langue (i18n)** avec `i18next`
- [ ] **Facturation avancée** (TVA, adresses multiples)
- [ ] **Mode test / maintenance** activable via `.env`

---

## 🏁 Résultat attendu
À la fin de la roadmap :
- Un **backend e-commerce complet, robuste et sécurisé**
- Gestion automatisée des commandes, paiements, mails et statistiques
- Infrastructure prête pour la production et scalable
- Documentation claire pour les futurs développeurs

---

> 💡 Conseil :  
> Utilise cette roadmap comme tableau de suivi GitHub (Issues ou Projects).  
> Chaque tâche peut devenir une issue détaillée avec “Done / In Progress / To Do”.
