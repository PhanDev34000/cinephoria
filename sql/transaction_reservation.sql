-- =====================================================================
-- Cinéphoria - Transaction de réservation (MySQL 8+)
-- Fichier : transaction_reservation.sql
-- But : réserver @p_nb_places places pour une séance :
--       - décrémente seances.places_disponibles si assez de stock
--       - insère la réservation avec le montant calculé
--       -> soit tout est fait (COMMIT), soit rien n'est fait (ROLLBACK)
-- =====================================================================

USE cinephoria;

-- Paramètres à ajuster si besoin avant d'exécuter
SET @p_utilisateur_id = 1;  -- un id existant dans 'utilisateurs'
SET @p_seance_id      = 1;  -- un id existant dans 'seances'
SET @p_nb_places      = 2;  -- nb de places demandées (>=1)

START TRANSACTION;

-- 1) Essayer de réserver le stock
UPDATE seances
SET places_disponibles = places_disponibles - @p_nb_places
WHERE id = @p_seance_id
  AND places_disponibles >= @p_nb_places;

SET @ok_update = ROW_COUNT();  -- 1 si décrément ok, 0 si pas assez de stock

-- 2) Insérer la réservation uniquement si l'update a réussi
INSERT INTO reservations (utilisateur_id, seance_id, nb_places, montant_total, statut)
SELECT @p_utilisateur_id,
       @p_seance_id,
       @p_nb_places,
       (@p_nb_places * s.prix_eur) AS montant_total,
       'confirmee'
FROM seances s
WHERE s.id = @p_seance_id
  AND @ok_update = 1;

SET @ok_insert = ROW_COUNT();  -- 1 si insert ok, sinon 0

-- 3) Décision finale : COMMIT ou ROLLBACK
--    MySQL n'autorise pas IF...THEN au top-level, on décide "à la main".
SELECT @ok_update AS ok_update, @ok_insert AS ok_insert;

-- 👉 Si les deux colonnes valent 1 / 1 :
-- COMMIT;

-- 👉 Sinon :
-- ROLLBACK;
