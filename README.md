# Backend du site "Arcadia"

## Description

Cette application est la partie backend du site "Arcadia". Elle utilise le framework [NestJS](https://nestjs.com/) et s'appuie sur MySQL et MongoDB pour la gestion des données.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les prérequis suivants installés sur votre machine :

- Node.js
- MySQL
- MongoDB (ou utilisez une instance MongoDB hébergée)

## Installation et Configuration

### Étape 1 : Cloner le projet

Clonez le projet sur votre machine locale.

### Étape 2 : Installation des dépendances

- Accédez au répertoire du projet.
- Exécutez la commande suivante pour installer les modules nécessaires :

```bash
$ npm install
```

### Étape 3 : Création de la base de données MySQL

Créez une base de données pour l'application en exécutant la commande suivante dans votre terminal MySQL :

```bash
CREATE DATABASE <nom_de_la_base>;
```

### Étape 4 : Initialisation des tables et insertion des données

Importez les tables et les données depuis le fichier .sql disponible dans le dossier data :

```bash
$ mysql -u <username> -p<password> <nom_de_la_base> < ./data/arcadia.sql
```

### Étape 5 : Configuration de la base de données NoSQL MongoDB

- Installez MongoDB sur votre machine ou utilisez une instance MongoDB hébergée (par exemple, MongoDB Atlas).
- Assurez-vous d'obtenir l'URL de connexion MongoDB, qui ressemble à ceci :

```bash
mongodb://<username>:<password>@<host>:<port>/<database>
```

### Étape 6 : Configuration des variables d'environnement

Créez un fichier .env à la racine du projet et configurez les variables suivantes :

```bash
# Port de l'application
PORT=

# Adresse du serveur de base de données
DB_HOST=
# Port du serveur MySQL (par défaut, MySQL utilise le port 3306)
DB_PORT=
# Nom d'utilisateur pour se connecter à la base de données
DB_USERNAME=
# Mot de passe pour se connecter à la base de données
DB_PASSWORD=
# Nom de la base de données à utiliser
DB_NAME=

# URI de connexion à la base de données MongoDB, qui contient l'adresse du serveur, le port, les informations d'authentification et le nom de la base de données à utiliser
MONGODB_URI=

# Hôte du serveur SMTP pour l'envoi des emails
SMTP_HOST=
# Port utilisé par le serveur SMTP
SMTP_PORT=
# Nom d'utilisateur pour se connecter au serveur SMTP
SMTP_USER=
# Mot de passe pour se connecter au serveur SMTP
SMTP_PASS=

# Adresse e-mail pour les messages "Contactez-nous"
CONTACT_US_EMAIL=

# URL de la page de connexion du site Arcadia
LOGIN_PAGE_URL=
```

## Démarrage de l'Application

Pour démarrer l'application, utilisez l'une des commandes suivantes :

```bash
# Mode développement
$ npm run start

# Mode veille (watch mode)
$ npm run start:dev

# Mode production
$ npm run start:prod
```

## Documentation et Utilisation des API

Une fois l'application démarrée, vous pouvez consulter la documentation des API sur Swagger via l'URL suivante :
http://localhost:3000/api

**Remarque** : Remplacez le port 3000 par le port configuré dans le fichier .env.

Sur cette page, vous pourrez non seulement visualiser la documentation détaillée des API, groupées par module, mais également tester directement chaque endpoint en envoyant des requêtes depuis l'interface Swagger.
