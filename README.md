# 🛍️ E-Shop TL API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

> API RESTful e-commerce développée avec **Node.js**, **Express** et **MongoDB**.  
> Elle permet la gestion des utilisateurs, produits, paniers et commandes, avec un système d’authentification sécurisé par **JWT**.

---

## ⚙️ Fonctionnalités principales

- 🔐 Authentification JWT (inscription / connexion)
- 👤 CRUD complet des utilisateurs
- 🛒 Gestion des paniers (cart)
- 📦 CRUD des produits
- 📦 Création et suivi des commandes
- 🧑‍💼 Gestion des rôles (admin / user)
- 🛡️ Sécurité (bcrypt, dotenv, CORS, Helmet)
- 🧩 Architecture MVC modulaire et claire

---

## 🗂️ Structure du projet

```
e-shop-tl-api/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── UserController.js
│   ├── ProductController.js
│   ├── CartController.js
│   ├── OrderController.js  
|   └── AuthController.js  
│
├── models/
│   ├── UserModel.js
│   ├── ProductModel.js
│   ├── CartModel.js
│   └── OrderModel.js
│
├── routes/
│   ├── UserRoute.js
│   ├── ProductRoute.js
│   ├── CartRoute.js
│   └── OrderRoute.js
|
|── tools/
│    ├── randomNumber.js
|
├── middlewares/
│   ├── authMiddleware.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## 🧩 Installation & Configuration

```bash
git clone https://github.com/LenyBl/e-shop-tl-api.git
cd e-shop-tl-api
npm install
```

Créer un fichier `.env` :
```
PORT=3000
DB_HOST=mongodb://127.0.0.1:27017/tl-shop
JWT_SECRET=ton_secret_jwt_ultra_secure
```

Lancer le serveur :
```bash
npm run dev
```

---

## 📬 API Endpoints

### 👤 Utilisateurs
| Méthode | Endpoint | Description |
|----------|-----------|-------------|
| POST | /api/users/register | Inscription utilisateur |
| POST | /api/users/login | Connexion utilisateur |
| GET | /api/users/:id | Récupérer un utilisateur |
| PUT | /api/users/:id | Mettre à jour un utilisateur |
| DELETE | /api/users/:id | Supprimer un utilisateur |

### 🛍️ Produits
| Méthode | Endpoint | Description |
|----------|-----------|-------------|
| POST | /api/products | Créer un produit |
| GET | /api/products | Lister tous les produits |
| GET | /api/products/:id | Obtenir un produit |
| PUT | /api/products/:id | Modifier un produit |
| DELETE | /api/products/:id | Supprimer un produit |

### 🛒 Panier
| Méthode | Endpoint | Description |
|----------|-----------|-------------|
| GET | /api/carts/:userId | Récupérer le panier |
| POST | /api/carts/:userId/items | Ajouter un article |
| PUT | /api/carts/:userId/items/:itemId | Modifier la quantité |
| DELETE | /api/carts/:userId/items/:itemId | Supprimer un article |
| DELETE | /api/carts/:userId/clear | Vider le panier |

---

## 🔐 Authentification JWT

Header requis :
```
Authorization: Bearer <token>
```

---

## 👨‍💻 Auteur

**Leny BLEE**  
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LenyBl)

---

🧾 *Projet pédagogique — e-commerce API backend Node.js/MongoDB.*
