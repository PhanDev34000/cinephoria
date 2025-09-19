Démo Cinephoria (Docker)

Prérequis : 

Docker Desktop installé et démarré (Engine Running).
Ports libres : 3000 (API), 4200 (Front web), 8100 (Mobile).

Lancer le projet (3 commandes) : 

Cloner le dépôt : git clone https://github.com/PhanDev34000/cinephoria.git

Entrer dans le dossier du projet : cd cinephoria

Construire et lancer les conteneurs : docker compose up -d --build

Attendez ~30–60s le temps que MongoDB et l’API soient prêts.

Accès aux applications : 

Front Web (Angular) : http://localhost:4200

Mobile (Ionic build web) : http://localhost:8100

API (Express) : http://localhost:3000/api/films
 (JSON attendu)

Astuce : si une page semble “attendre” juste après le lancement, actualisez après quelques secondes (initialisation DB/API).

Ce que fait la stack : 

mongo : base locale persistée (volume mongo_data).

cine-api : lit MONGO_URI si fourni ; sinon fallback sur mongodb://mongo:27017/cinephoria.

cine-front : build Angular servi par Nginx.

cine-mobile : build Angular/Ionic servi par Nginx (styles OK, assets inclus).

(Optionnel) Utiliser MongoDB Atlas

Tests rapides : 

API : ouvrir http://localhost:3000/api/films
 → JSON OK.

Front : se connecter avec un compte existant → navigation OK.

Mobile : http://localhost:8100
 → connexion, page Réservations → affiches visibles.

Dépannage express : 

Docker Engine non lancé
→ Ouvrir Docker Desktop, attendre “Engine Running”.

Conflit de noms de conteneurs
docker rm -f cine-mongo cine-api cine-front cine-mobile
docker compose up -d --build


Ports occupés
→ Modifier les mappages dans docker-compose.yml (ex. 4201:80, 8101:80, 3001:3000) puis relancer.

Page mobile sans styles
→ Vérifier que cine-mobile n’a pas de volumes qui écrasent /usr/share/nginx/html. (Le compose fourni est correct.)

Images d’affiches manquantes
→ Les fichiers doivent exister sous cinephoria-mobile/src/assets/affiches/ (respect de la casse).
→ Accès direct : http://localhost:8100/assets/affiches/<nom_fichier>.

CORS
→ L’API autorise http://localhost:4200 et http://localhost:8100.
→ Si vous changez de ports, ajustez l’origin côté API.

Voir les logs : 

docker compose logs -f cine-api
docker compose logs -f cine-front
docker compose logs -f cine-mobile

Arrêter / nettoyer : 
docker compose down


(Les données Mongo locales restent dans le volume mongo_data.)
