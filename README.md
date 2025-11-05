# 🧺 WashManager

Application web moderne de gestion de laverie automatique développée avec Next.js et React.

## 📋 Description

WashManager est une solution complète pour gérer efficacement une laverie automatique. L'application permet de suivre en temps réel l'état des machines (lave-linge et sèche-linge), d'ajouter de nouvelles machines, de modifier leur statut et de gérer l'ensemble du parc de machines via une interface intuitive et élégante.

## ✨ Fonctionnalités

- **Affichage en vignettes** : Visualisation claire de toutes les machines sous forme de cartes élégantes
- **Gestion des machines** : Ajout, modification et suppression de machines
- **Suivi des statuts** : 
  - 🟢 Disponible
  - 🟡 En cours d'utilisation
  - 🔵 En maintenance
  - 🔴 Hors service
- **Types de machines** : Support des lave-linge et sèche-linge avec images distinctes
- **Interface responsive** : Adaptation automatique aux écrans mobiles, tablettes et desktop
- **Design moderne** : Interface avec dégradés, animations fluides et effets visuels élégants

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **Axios** - Client HTTP pour les appels API
- **CSS3** - Styling personnalisé avec variables CSS et animations

### Backend (requis)
- **Django REST Framework** - API REST (non inclus dans ce repository)

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Backend Django configuré et en cours d'exécution

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/HamCam203/WashManager.git
cd WashManager
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

4. **Lancer l'application en mode développement**
```bash
npm run dev
# ou
yarn dev
```

Le backend sera accessible sur [http://localhost:8000](http://localhost:8000)
Le frontend sera accessible sur [http://localhost:5173](http://localhost:5173)


## 🚀 Déploiement

### Build de production
```bash
npm run build
npm start
```

## 📁 Structure du projet

```
frontend/
├── node_modules/
├── public/
├── src/
│ ├── assets/
│ │ ├── Dryer.jpeg
│ │ ├── react.svg
│ │ └── Washer.jpeg
│ │
│ ├── components/
│ │ ├── Form.jsx
│ │ ├── LoadingIndicator.jsx
│ │ ├── Machines.jsx
│ │ └── ProtectedRoute.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── NotFound.jsx
│ │ └── Register.jsx
│ │
│ ├── styles/
│ │ ├── Form.css
│ │ ├── Home.css
│ │ ├── LoadingIndicator.css
│ │ └── Machines.css
│ │
│ ├── api.js
│ ├── App.jsx
│ ├── constants.js
│ └── main.jsx

backend/
├── api/
│ ├── pycache/
│ ├── migrations/
│ │ └── init.py
│ ├── init.py
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── serializers.py
│ ├── tests.py
│ ├── urls.py
│ └── views.py
│
├── backend/
│ ├── pycache/
│ ├── init.py
│ ├── asgi.py
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
│
├── db.sqlite3
├── manage.py
└── requirements.txt
```
## 🔌 API Backend

L'application communique avec une API Django REST Framework. Endpoints requis :

### Machines
- `GET /api/washing-machines/` - Liste toutes les machines
- `POST /api/washing-machines/` - Crée une nouvelle machine
- `PATCH /api/washing-machines/{id}/` - Met à jour une machine
- `DELETE /api/washing-machines/delete/{id}/` - Supprime une machine
- `UPDATE /api/washing-machines/update/{id}/` - Supprime une machine

### Modèle de données
```json
{
  "id": 1,
  "name": "Machine A1",
  "status": "available",
  "machine_type": "washer",
  "capacity_kg": 8,
  "price_per_cycle": 3.50
}
```

### Valeurs possibles
- **status** : `available`, `in_use`, `maintenance`, `out_of_order`
- **machine_type** : `washer`, `dryer`

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `styles/Home.css` et `styles/Machines.css` via des variables CSS :

```css
--primary-blue: #0ea5e9
--accent-teal: #14b8a6
--bg-light: #f8fafc
```

### Images
Remplacez les images dans le dossier `assets/` pour personnaliser l'apparence des machines.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**HamCam203**

- GitHub: [@HamCam203](https://github.com/HamCam203)

## 🙏 Remerciements

- Design inspiré des interfaces modernes de gestion
- Icônes et images de machines professionnelles
- Communauté Next.js et React

---

Développé avec ❤️ pour simplifier la gestion des laveries automatiques
