# 🛍️ E-Shop TL API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-FF6F61?style=for-the-badge&logo=nodemailer&logoColor=white)](https://nodemailer.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./package.json)

API RESTful e‑commerce développée avec Node.js, Express et MongoDB. Documentation du projet, endpoints et fichiers clés.

---

## Vue d'ensemble rapide

- Point d'entrée : [app.js](app.js)  
- Connexion BD : [`connectDB`](config/database.js) — [config/database.js](config/database.js)  
- Envoi d'e‑mails : [`sendEmail`](config/nodemail.js) — [config/nodemail.js](config/nodemail.js)  
- Erreurs personnalisées : [`AppError`](utils/AppError.js) — [utils/AppError.js](utils/AppError.js)  
- Logger : [`logger`](utils/logger.js) — [utils/logger.js](utils/logger.js)

---

## Structure & fichiers importants

- Configuration / démarrage
  - [app.js](app.js)
  - [package.json](package.json)
  - [.env](.env)

- Configuration
  - Database: [config/database.js](config/database.js) (`[`connectDB`](config/database.js)`)
  - Mail: [config/nodemail.js](config/nodemail.js) (`[`sendEmail`](config/nodemail.js)`)

- Routes
  - [routes/AuthRoute.js](routes/AuthRoute.js) -> [`AuthController.login`](controllers/AuthController.js)
  - [routes/UserRoute.js](routes/UserRoute.js) -> [`UserController.registerUser`](controllers/UserController.js), [`UserController.getAllUsers`](controllers/UserController.js)
  - [routes/ProductRoute.js](routes/ProductRoute.js) -> [`ProductController.getAllProducts`](controllers/ProductController.js)
  - [routes/CartRoute.js](routes/CartRoute.js) -> [`CartController.getCartByUserId`](controllers/CartController.js)
  - [routes/OrderRoute.js](routes/OrderRoute.js) -> [`OrderController.createOrder`](controllers/OrderController.js)
  - [routes/CategoryRoute.js](routes/CategoryRoute.js) -> [`CategoryController.createCategory`](controllers/CategoryController.js)
  - [routes/StatsRoute.js](routes/StatsRoute.js) -> [`StatsController.getOrderTotalPriceStats`](controllers/StatsController.js)

- Controllers (exemples)
  - [controllers/AuthController.js](controllers/AuthController.js) — [`AuthController.login`](controllers/AuthController.js)
  - [controllers/UserController.js](controllers/UserController.js) — [`UserController.registerUser`](controllers/UserController.js), [`UserController.getUserById`](controllers/UserController.js)
  - [controllers/ProductController.js](controllers/ProductController.js) — [`ProductController.createProduct`](controllers/ProductController.js)
  - [controllers/CartController.js](controllers/CartController.js) — [`CartController.addItemToCart`](controllers/CartController.js)
  - [controllers/OrderController.js](controllers/OrderController.js) — [`OrderController.createOrder`](controllers/OrderController.js)
  - [controllers/EmailController.js](controllers/EmailController.js) — email helpers

- Models
  - [models/UserModel.js](models/UserModel.js) — `User`
  - [models/ProductModel.js](models/ProductModel.js) — `Product`
  - [models/CartModel.js](models/CartModel.js) — `Cart`
  - [models/OrderModel.js](models/OrderModel.js) — `Order`
  - [models/CategoryModel.js](models/CategoryModel.js) — `Category`

- Middlewares
  - [middlewares/authMiddleware.js](middlewares/authMiddleware.js) — [`protect`](middlewares/authMiddleware.js), [`restrictTo`](middlewares/authMiddleware.js)
  - [middlewares/xssMiddleware.js](middlewares/xssMiddleware.js)
  - [middlewares/errorHandler.js](middlewares/errorHandler.js) — global error handler

- Docs / Roadmap
  - [docs/roadmap.md](docs/roadmap.md)

---

## Installation & démarrage

1. Cloner et installer :
```bash
git clone <repo>
cd e-shop-tl-api
npm install
```

2. Créer `.env` (voir [app.js](app.js) et [config/database.js](config/database.js)):
- PORT
- DB_HOST
- JWT_SECRET, JWT_EXPIRES_IN
- EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS

3. Lancer en dev :
```bash
npm run dev
```

---

## Scripts utiles

- npm run dev — démarre en dev via nodemon ([package.json](package.json))

---

## Endpoints principaux (résumé)

- Auth
  - POST /api/auth/login -> [`AuthController.login`](controllers/AuthController.js)

- Users
  - POST /api/users/register -> [`UserController.registerUser`](controllers/UserController.js)
  - GET /api/users -> [`UserController.getAllUsers`](controllers/UserController.js)

- Produits
  - GET /api/products -> [`ProductController.getAllProducts`](controllers/ProductController.js)
  - POST /api/products -> [`ProductController.createProduct`](controllers/ProductController.js)

- Panier
  - GET /api/carts/:userId -> [`CartController.getCartByUserId`](controllers/CartController.js)
  - POST /api/carts/:userId/:idItems -> [`CartController.addItemToCart`](controllers/CartController.js)

- Commandes
  - POST /api/orders -> [`OrderController.createOrder`](controllers/OrderController.js)
  - PUT /api/orders/:orderId/status -> [`OrderController.updateOrderStatus`](controllers/OrderController.js)

Consultez les fichiers dans [routes/](routes) pour la liste complète.

---

## Sécurité & bonnes pratiques

- Auth JWT via [`middlewares/authMiddleware.js`](middlewares/authMiddleware.js) (middleware [`protect`](middlewares/authMiddleware.js) + rôle via [`restrictTo`](middlewares/authMiddleware.js))
- Sanitization XSS via [middlewares/xssMiddleware.js](middlewares/xssMiddleware.js) et mongo sanitize dans [app.js](app.js)
- Erreurs centralisées via [`AppError`](utils/AppError.js) et [middlewares/errorHandler.js](middlewares/errorHandler.js)
- Envoi d'e‑mails centralisé : [`sendEmail`](config/nodemail.js) — [config/nodemail.js](config/nodemail.js)

---

## Débogage & logs

- En développement : `morgan` (voir [app.js](app.js))
- En production : `winston` via [utils/logger.js](utils/logger.js)

---

## Contribuer

1. Ouvrir une issue.
2. Branch feature.
3. PR avec description.

---

Fichiers à ouvrir en priorité :
- [app.js](app.js)
- [config/database.js](config/database.js)
- [config/nodemail.js](config/nodemail.js)
- [controllers/](controllers/)
- [models/](models/)
- [routes/](routes/)
- [middlewares/](middlewares/)
- [utils/AppError.js](utils/AppError.js)
- [utils/logger.js](utils/logger.js)
