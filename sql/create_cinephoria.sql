-- =====================================================================
-- Cinéphoria - Création de la base + données d'exemple (MySQL 8+)
-- Fichier : create_cinephoria.sql
-- =====================================================================

DROP DATABASE IF EXISTS cinephoria;
CREATE DATABASE cinephoria
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE cinephoria;

CREATE TABLE utilisateurs (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nom           VARCHAR(100) NOT NULL,
  prenom        VARCHAR(100) NOT NULL,
  email         VARCHAR(190) NOT NULL UNIQUE,
  nom_utilisateur VARCHAR(100) NOT NULL UNIQUE,
  mot_de_passe  VARCHAR(255) NOT NULL,
  role          ENUM('visiteur','employe','admin') NOT NULL DEFAULT 'visiteur',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE villes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nom       VARCHAR(120) NOT NULL,
  UNIQUE KEY uq_ville_nom (nom)
) ENGINE=InnoDB;

CREATE TABLE cinemas (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nom       VARCHAR(150) NOT NULL,
  ville_id  INT NOT NULL,
  adresse   VARCHAR(255),
  FOREIGN KEY (ville_id) REFERENCES villes(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE salles (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  cinema_id  INT NOT NULL,
  nom        VARCHAR(100) NOT NULL,
  capacite   INT NOT NULL CHECK (capacite > 0),
  FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY uq_salle_nom_par_cinema (cinema_id, nom)
) ENGINE=InnoDB;

CREATE TABLE films (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titre       VARCHAR(200) NOT NULL,
  duree_min   INT NOT NULL CHECK (duree_min > 0),
  classification VARCHAR(10),
  affiche_url VARCHAR(255),
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE seances (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  film_id     INT NOT NULL,
  salle_id    INT NOT NULL,
  jour        DATE NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin   TIME NOT NULL,
  prix_eur    DECIMAL(6,2) NOT NULL CHECK (prix_eur >= 0),
  places_disponibles INT NOT NULL CHECK (places_disponibles >= 0),
  FOREIGN KEY (film_id) REFERENCES films(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (salle_id) REFERENCES salles(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_seances_film (film_id),
  INDEX idx_seances_salle (salle_id),
  UNIQUE KEY uq_seance_unique (salle_id, jour, heure_debut)
) ENGINE=InnoDB;

CREATE TABLE reservations (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL,
  seance_id    INT NOT NULL,
  nb_places    INT NOT NULL CHECK (nb_places > 0),
  montant_total DECIMAL(7,2) NOT NULL CHECK (montant_total >= 0),
  statut       ENUM('en_attente','confirmee','annulee') NOT NULL DEFAULT 'en_attente',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (seance_id) REFERENCES seances(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_resa_user (utilisateur_id),
  INDEX idx_resa_seance (seance_id)
) ENGINE=InnoDB;

CREATE TABLE avis (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL,
  film_id       INT NOT NULL,
  note          TINYINT NOT NULL CHECK (note BETWEEN 1 AND 5),
  commentaire   VARCHAR(500),
  valide        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (film_id) REFERENCES films(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY uq_avis_user_film (utilisateur_id, film_id)
) ENGINE=InnoDB;


-- Utilisateurs
INSERT INTO utilisateurs (nom, prenom, email, nom_utilisateur, mot_de_passe, role) VALUES
('Corbin','Max','max@corbin.com','maxc','Max!1234','visiteur'),
('Doe','Jane','jane.doe@cinephoria.com','jane_employe','Secret!1','employe'),
('Admin','Root','admin@cinephoria.com','root_admin','Admin!123','admin');

-- Villes
INSERT INTO villes (nom) VALUES ('Paris'), ('Lyon');

-- Cinémas
INSERT INTO cinemas (nom, ville_id, adresse) VALUES
('Cinéphoria Opéra', 1, '12 Rue de l''Opéra, 75002 Paris'),
('Cinéphoria Part-Dieu', 2, '5 Bd Vivier-Merle, 69003 Lyon');

-- Salles
INSERT INTO salles (cinema_id, nom, capacite) VALUES
(1, 'Salle 1', 120),
(1, 'Salle 2', 80),
(2, 'Grande Salle', 200);

-- Films
INSERT INTO films (titre, duree_min, classification, affiche_url) VALUES
('Le Parrain', 175, '16', 'assets/affiches/parrain.png'),
('Inception', 148, '12', 'assets/affiches/inception.jpg');

-- Séances (exemples)
INSERT INTO seances (film_id, salle_id, jour, heure_debut, heure_fin, prix_eur, places_disponibles) VALUES
(1, 1, '2025-08-21', '18:00', '21:00', 9.50, 120),
(1, 2, '2025-08-22', '20:00', '23:00', 9.50, 80),
(2, 3, '2025-08-21', '19:30', '22:00', 10.00, 200);

-- Réservation 
INSERT INTO reservations (utilisateur_id, seance_id, nb_places, montant_total, statut) VALUES
(1, 1, 2, 19.00, 'confirmee');

-- Avis 
INSERT INTO avis (utilisateur_id, film_id, note, commentaire, valide) VALUES
(1, 1, 5, 'Chef-d''œuvre intemporel.', TRUE);
