# cafe-du-coin

## Installation

### Installation des paquets
Dans le répertoire *website/cafe-du-coin* lancer la commande
> npm install

Dans le répertoire *server* lancer la commande
> npm install


### Creation du site web
Dans le répertoire *website/cafe-du-coin* lancer la commande
> npm run build


## Lancement des services

A la racine lancer la commande
> docker-compose up

Cette commande va créer 3 images
- un server postgres avec une base pré-chargée
- un server apache avec le site CAFE DU COIN
- un server API


## Utilisation

Le site web est accessible à l'adresse
> http://localhost:8080
Il contient une page de login pour se connecter aux API, et une page avec la liste des jeux et leur historique.
Pour se connecter un utilisateur existe dans la base:
> Nom: john smith (en minuscule avec l'espace)
> Mot de passe: mypassword

Le server d'API est accessible à l'adresse
> http://localhost:3000
Il permet l'authentification, et la gestion des jeux (liste, historique, emprunter/rendre)

Une documentation de l'API est accessible à l'adresse
> http://localhost:3000/doc/v1

Le server Postgresql est accessible à l'adresse
> http://localhost:5432
Trois tables sont pré-chargées dans le schéma **cafeducoin**


#### users
Avec les colonnes:
- id SERIAL id de l'utilisateur
- firstname STRING prénom de l'utilisateur
- lastname STRING nom de l'utilisateur
- email STRING email de l'utilisateur
- pwd STRING mot de passe encodé
- username STRING nom utilisé pour la connexion

#### games
Avec les colonnes:
- id SERIAL id du jeu
- title STRING titre du jeu
- returned BOOL true si le jeu est revenu et disponible, false si il a été emprunté

#### history
Avec les colonnes:
- id SERIAL id de l'évènement
- id_game INT id du jeu
- id_user INT id de l'utilisateur
- borrow_date DATE date d'emprunt
- return_date DATE date de retour
