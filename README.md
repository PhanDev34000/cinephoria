 ![Angular](https://img.shields.io/badge/Angular-16-red)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

 
                                        README

# Cinéphoria - Application Web
Bienvenue dans le dépôt de l'application web Cinéphoria.
Ce projet a été réalisé dans le cadre de la formation Développeur Angular (Studi).

## Objectif
Proposer une plateforme web de réservation de séances de cinéma, avec gestion des films, des séances, des utilisateurs et des rôles (admin, employé, utilisateur).

## Stack technique
•	Angular 16 (standalone components)
•	TypeScript / HTML / CSS (avec Bootstrap)
•	Routing Angular
•	localStorage pour la simulation des données utilisateurs
•	Backend Node.js et MongoDB
•	Trello pour la gestion de projet
•	Git + GitHub pour le versionning

    Lancer le projet en local
        1.	Cloner le dépôt :
        git clone https://github.com/PhanDev34000/cinephoria.git
        2.	Accéder au projet :
        cd cinephoria/cinephoria-web
        3.	Installer les dépendances :
        npm install
        4.	Lancer le serveur de développement :
        ng serve
        5.	Accéder à l'application :
        http://localhost:4200

## Organisation du projet Angular
src/app/
├── pages/             # Composants des pages (accueil, films, admin, etc.)
├── components/        # Composants réutilisables (header, footer...)
├── models/            # Interfaces TypeScript (Film, Seance, etc.)
├── data/              # Données simulées (films.data.ts, salles.data.ts...)
└── app.routes.ts      # Fichier de routing principal


## Fonctionnalités principales
•	Visualisation des films et filtres (par cinéma, genre, jour)
•	Réservation de séances avec sélection du cinéma, film, siège
•	Création de compte utilisateur
•	Connexion multi-rôles (utilisateur, employé, admin)
•	Espace admin (films, séances, salles, comptes)
•	Espace employé (gestion et modération)
•	Espace utilisateur (commandes, notation)

## Backend Node.js + MongoDB
Le projet est désormais connecté à une base de données MongoDB Atlas via un serveur Node.js/Express.
•	Les données sont persistées dans MongoDB (films, réservations, avis, utilisateurs).
•	API REST en Express : /api/films, /api/reservations, /api/users, /api/avis...
•	Schémas créés avec Mongoose.
•	Middleware : express.json(), cors, dotenv.
•	Le build Angular est servi automatiquement via le backend sur le port 3000.
	
    Lancer le projet complet
        Dans un terminal
            cd cinephoria-web
            npm install
            ng build

        Dans un autre terminal
            node server.js
        Accès : http://localhost:3000 (site complet, BDD incluse)

## Organisation du backend (Node.js)
root/
├── server.js               # Point d'entrée principal
├── routes/                 # Routes Express (/films, /users, etc.)
├── models/                 # Schémas Mongoose (Film, Reservation, Avis...)
├── .env                    # Variables d'environnement (non versionné)

## Tests réalisés :
•	Tests unitaires sur 12 User Stories (US1 à US12)
•	Tests fonctionnels du parcours visiteur (connexion, réservation, affichage, mon espace...)
•	Test end-to-end (E2E) complet du parcours visiteur 
    Comptes de test
    •	Utilisateur : user@cinephoria.fr / User123!
    •	Employé : employe@cinephoria.fr / Employe123!
    •	Admin : admin@cinephoria.fr / Admin123!

## NB : Le fichier .env contenant les identifiants de connexion a été supprimé du dépôt pour respecter les bonnes pratiques de sécurité, même dans un contexte fictif.

# Auteurs
Projet réalisé par PhanDev34000 dans le cadre du parcours Angular chez Studi.
________________________________________
Ce projet est une simulation de cinéma à but pédagogique. Aucune donnée réelle n'est stockée ni traitée.

