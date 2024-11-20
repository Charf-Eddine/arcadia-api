SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Structure de la table `alimentation_quotidienne`
--

DROP TABLE IF EXISTS `alimentation_quotidienne`;
CREATE TABLE IF NOT EXISTS `alimentation_quotidienne` (
  `id` char(36) NOT NULL,
  `utilisateur_id` char(36) NOT NULL,
  `animal_id` char(36) NOT NULL,
  `date_passage` datetime NOT NULL,
  `nourriture` varchar(50) NOT NULL,
  `grammage_nourriture` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur_ibfk1_idx` (`utilisateur_id`),
  KEY `animal_ibfk2_idx` (`animal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `alimentation_quotidienne`
--

INSERT INTO `alimentation_quotidienne` (`id`, `utilisateur_id`, `animal_id`, `date_passage`, `nourriture`, `grammage_nourriture`) VALUES
('adc8315b-a59c-11ef-8388-02888dd07685', '7893a4d9-a5af-11ef-8388-02888dd07685', 'ea6f8398-a59c-11ef-8388-02888dd07685', '2024-10-27 21:33:00', 'Viande', 7000),
('adc834fb-a59c-11ef-8388-02888dd07685', '7893a4d9-a5af-11ef-8388-02888dd07685', 'ea6f8398-a59c-11ef-8388-02888dd07685', '2024-10-28 11:13:00', 'Viande', 5000),
('adc83972-a59c-11ef-8388-02888dd07685', '7893a4d9-a5af-11ef-8388-02888dd07685', 'ea6f7fe5-a59c-11ef-8388-02888dd07685', '2024-10-28 11:18:00', 'Feuillage ', 30000);

-- --------------------------------------------------------

--
-- Structure de la table `animal`
--

DROP TABLE IF EXISTS `animal`;
CREATE TABLE IF NOT EXISTS `animal` (
  `id` char(36) NOT NULL,
  `race_id` char(36) NOT NULL,
  `habitat_id` char(36) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_animal_race_id_idx` (`race_id`),
  KEY `fk_animal_habitat_id` (`habitat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `animal`
--

INSERT INTO `animal` (`id`, `race_id`, `habitat_id`, `prenom`, `date_creation`) VALUES
('ba1917ca-f24f-48ad-be08-ecf0e6f5488b', 'c7c8014e-a59c-11ef-8388-02888dd07685', 'd7a6d94a-a59c-11ef-8388-02888dd07685', 'Éléphant', '2024-11-20 15:29:24'),
('ea6f7fe5-a59c-11ef-8388-02888dd07685', 'c7c8014e-a59c-11ef-8388-02888dd07685', 'd7a6d94a-a59c-11ef-8388-02888dd07685', 'Girafe', '2024-11-20 15:13:14'),
('ea6f8398-a59c-11ef-8388-02888dd07685', 'c7c8014e-a59c-11ef-8388-02888dd07685', 'd7a6ddc1-a59c-11ef-8388-02888dd07685', 'Tigre', '2024-11-18 16:33:23'),
('ea6f84a4-a59c-11ef-8388-02888dd07685', 'c7c8014e-a59c-11ef-8388-02888dd07685', 'd7a6ddc1-a59c-11ef-8388-02888dd07685', 'Singe', '2024-11-01 13:42:57'),
('ea6f85af-a59c-11ef-8388-02888dd07685', 'c7c8014e-a59c-11ef-8388-02888dd07685', 'd7a6d94a-a59c-11ef-8388-02888dd07685', 'Zèbre', '2024-11-10 15:13:14'),
('ea6f86a0-a59c-11ef-8388-02888dd07685', 'c7c8014e-a59c-11ef-8388-02888dd07685', 'd7a6d94a-a59c-11ef-8388-02888dd07685', 'Lion', '2024-11-19 16:32:54'),
('ea6f8798-a59c-11ef-8388-02888dd07685', 'c7c80482-a59c-11ef-8388-02888dd07685', 'd7a6dc36-a59c-11ef-8388-02888dd07685', 'Crocodile', '2024-11-03 15:13:14'),
('ea6f8872-a59c-11ef-8388-02888dd07685', 'c7c8060c-a59c-11ef-8388-02888dd07685', 'd7a6dc36-a59c-11ef-8388-02888dd07685', 'Flamant rose', '2024-11-07 15:13:14');

-- --------------------------------------------------------

--
-- Structure de la table `avis_veterinaire`
--

DROP TABLE IF EXISTS `avis_veterinaire`;
CREATE TABLE IF NOT EXISTS `avis_veterinaire` (
  `id` char(36) NOT NULL,
  `utilisateur_id` char(36) NOT NULL,
  `habitat_id` char(36) NOT NULL,
  `date` datetime NOT NULL,
  `commentaire` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `f1_avis_veterinaire_utilisateur_id_idx` (`utilisateur_id`),
  KEY `f2_avis_veterinaire_habitat_id_idx` (`habitat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `avis_veterinaire`
--

INSERT INTO `avis_veterinaire` (`id`, `utilisateur_id`, `habitat_id`, `date`, `commentaire`) VALUES
('9eda164a-a59c-11ef-8388-02888dd07685', '7893a55a-a5af-11ef-8388-02888dd07685', 'd7a6d94a-a59c-11ef-8388-02888dd07685', '2024-11-11 16:04:34', 'L\'habitat offre un espace spacieux et adapté aux animaux, avec des zones ombragées et des points d\'eau bien répartis. Les structures d\'enrichissement permettent de stimuler les comportements naturels et de maintenir le bien-être des espèces. Un entretien régulier des végétaux et une surveillance des interactions entre les animaux sont néanmoins conseillés pour garantir un environnement optimal.'),
('9eda199d-a59c-11ef-8388-02888dd07685', '7893a55a-a5af-11ef-8388-02888dd07685', 'd7a6ddc1-a59c-11ef-8388-02888dd07685', '2024-11-05 09:53:26', 'L\'habitat recrée un environnement naturel propice aux espèces tropicales, avec une végétation dense et des zones humides adaptées.');

-- --------------------------------------------------------

--
-- Structure de la table `avis_visiteur`
--

DROP TABLE IF EXISTS `avis_visiteur`;
CREATE TABLE IF NOT EXISTS `avis_visiteur` (
  `id` char(36) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `commentaire` text NOT NULL,
  `is_visible` tinyint NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `avis_visiteur`
--

INSERT INTO `avis_visiteur` (`id`, `pseudo`, `commentaire`, `is_visible`, `date`) VALUES
('977a05e4-a59c-11ef-8388-02888dd07685', 'Zoé', 'J\'ai aimé le calme et la propreté du parc.', 1, '2024-10-01 14:26:55'),
('977a08cb-a59c-11ef-8388-02888dd07685', 'Quentin', 'Les animaux semblent heureux, ça fait plaisir à voir.', 1, '2024-11-03 21:09:22'),
('977a0984-a59c-11ef-8388-02888dd07685', 'Pauline', 'Le safari en petit train est génial pour les enfants.', 1, '2024-10-24 18:27:51'),
('977a0a0b-a59c-11ef-8388-02888dd07685', 'Olivier', 'Les espaces sont bien aménagés pour les animaux.', 1, '2024-11-02 20:38:49'),
('977a0a92-a59c-11ef-8388-02888dd07685', 'Nicolas', 'Les singes sont trop mignons !', 1, '2024-10-29 15:09:42'),
('977a0b08-a59c-11ef-8388-02888dd07685', 'Mélanie', 'Le parc est magnifique, surtout le jardin tropical.', 1, '2024-11-13 14:31:27'),
('977a0b74-a59c-11ef-8388-02888dd07685', 'Stéphane', 'Beaucoup d\'animaux à découvrir, super pour les enfants.', 1, '2024-11-15 11:51:36'),
('977a0bf2-a59c-11ef-8388-02888dd07685', 'Karine', 'J\'ai adoré le spectacle des otaries.', 1, '2024-10-30 16:28:54'),
('977a0c5b-a59c-11ef-8388-02888dd07685', 'Jules', 'Un zoo propre et bien entretenu, bravo !', 1, '2024-11-16 20:36:54'),
('977a0ccf-a59c-11ef-8388-02888dd07685', 'Inès', 'Les explications des soigneurs étaient très enrichissantes.', 1, '2024-11-12 17:18:28'),
('977a0d35-a59c-11ef-8388-02888dd07685', 'Hugo', 'Les oiseaux exotiques sont fascinants !', 1, '2024-11-03 19:35:09'),
('977a0db2-a59c-11ef-8388-02888dd07685', 'Yasmine', 'Une sortie mémorable, surtout le nourrissage des otaries.', 1, '2024-10-29 14:26:55'),
('977a0f25-a59c-11ef-8388-02888dd07685', 'Sandrine', 'Une journée magique en famille, je reviendrai !', 1, '2024-11-16 16:40:26'),
('977a0fc4-a59c-11ef-8388-02888dd07685', 'Florian', 'La restauration pourrait être améliorée.', 0, '2024-11-05 18:26:38'),
('977a1035-a59c-11ef-8388-02888dd07685', 'Laura', 'Une expérience incroyable, le personnel est très accueillant.', 1, '2024-11-15 11:45:50'),
('977a10ae-a59c-11ef-8388-02888dd07685', 'Grégory', 'Les tigres étaient magnifiques !', 1, '2024-11-13 13:28:34'),
('977a1112-a59c-11ef-8388-02888dd07685', 'Chloé', 'Un peu cher mais les animaux sont bien traités.', 0, '2024-11-07 20:15:23'),
('977a1178-a59c-11ef-8388-02888dd07685', 'Dominique', 'Très éducatif et bien organisé, je recommande.', 1, '2024-11-01 19:07:46'),
('977a11e5-a59c-11ef-8388-02888dd07685', 'Sophie', 'Un super endroit pour les enfants, j\'ai adoré les lions !', 1, '2024-11-14 19:16:14'),
('977a125b-a59c-11ef-8388-02888dd07685', 'Xavier', 'Les aires de jeux pour enfants sont bien pensées.', 1, '2024-10-29 15:18:12'),
('977a1eba-a59c-11ef-8388-02888dd07685', 'William', 'Les girafes sont impressionnantes à voir de près.', 1, '2024-10-29 23:01:01'),
('977a1f6c-a59c-11ef-8388-02888dd07685', 'Valérie', 'J\'aurais aimé voir plus de panneaux explicatifs.', 0, '2024-11-03 19:35:09'),
('977a1fe7-a59c-11ef-8388-02888dd07685', 'Morgane', 'Une belle découverte, parfait pour une sortie en famille.', 1, '2024-11-14 10:42:36'),
('977a2053-a59c-11ef-8388-02888dd07685', 'Thomas', 'Les enclos sont spacieux, ce qui est rassurant.', 1, '2024-11-03 19:35:44'),
('977a20f2-a59c-11ef-8388-02888dd07685', 'Clara', 'Le personnel est très gentil et répond à toutes les questions.', 1, '2024-11-12 19:05:44'),
('977a2166-a59c-11ef-8388-02888dd07685', 'Roxane', 'Un peu de monde, mais la visite reste agréable.', 0, '2024-11-03 14:53:50');

-- --------------------------------------------------------

--
-- Structure de la table `habitat`
--

DROP TABLE IF EXISTS `habitat`;
CREATE TABLE IF NOT EXISTS `habitat` (
  `id` char(36) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `habitat`
--

INSERT INTO `habitat` (`id`, `nom`, `description`, `date_creation`) VALUES
('d7a6d94a-a59c-11ef-8388-02888dd07685', 'Savane', 'Cet habitat recrée les vastes plaines de l\'Afrique, avec des herbes hautes et quelques arbres épars pour offrir de l\'ombre. On y trouve des animaux emblématiques comme les lions, les girafes, les zèbres et les éléphants, qui partagent cet environnement ouvert et lumineux.', '2024-11-20 15:14:02'),
('d7a6dc36-a59c-11ef-8388-02888dd07685', 'Marais', 'Cet habitat recrée un environnement tropical où cohabitent crocodiles et flamants roses. Une étendue d’eau bordée de végétation permet aux crocodiles de se prélasser au soleil, tandis que les flamants roses évoluent gracieusement, ajoutant une touche de couleur vive.', '2024-11-19 15:14:02'),
('d7a6ddc1-a59c-11ef-8388-02888dd07685', 'Jungle', 'Plongée dans la verdure luxuriante et humide, cette zone abrite des animaux exotiques tels que les jaguars, les singes, et une variété d\'oiseaux colorés comme les perroquets. Les visiteurs peuvent observer ces animaux dans un environnement dense et ombragé, avec des cascades et des plantes tropicales.', '2024-11-18 16:42:20');

-- --------------------------------------------------------

--
-- Structure de la table `horaire`
--

DROP TABLE IF EXISTS `horaire`;
CREATE TABLE IF NOT EXISTS `horaire` (
  `jour_semaine` enum('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ordre` int NOT NULL,
  `ouverture` time DEFAULT NULL,
  `fermeture` time DEFAULT NULL,
  PRIMARY KEY (`jour_semaine`),
  UNIQUE KEY `jour_semaine` (`jour_semaine`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `horaire`
--

INSERT INTO `horaire` (`jour_semaine`, `ordre`, `ouverture`, `fermeture`) VALUES
('Lundi', 1, NULL, NULL),
('Mardi', 2, '10:00:00', '19:30:00'),
('Mercredi', 3, '10:00:00', '19:30:00'),
('Jeudi', 4, '10:00:00', '19:30:00'),
('Vendredi', 5, '10:00:00', '19:30:00'),
('Samedi', 6, '10:00:00', '19:30:00'),
('Dimanche', 7, '10:00:00', '19:30:00');

-- --------------------------------------------------------

--
-- Structure de la table `image_animal`
--

DROP TABLE IF EXISTS `image_animal`;
CREATE TABLE IF NOT EXISTS `image_animal` (
  `id` char(36) NOT NULL,
  `animal_id` char(36) NOT NULL,
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_animal_image_id_idx` (`animal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image_animal`
--

INSERT INTO `image_animal` (`id`, `animal_id`, `filename`) VALUES
('33e9d1a1-27de-4494-973d-33164e9caed4', 'ea6f84a4-a59c-11ef-8388-02888dd07685', '4dfaac55-5284-4614-9963-2e80abb23fd3.jpg'),
('3e9e6f0d-104f-4d45-99a2-9681fa56aa60', 'ba1917ca-f24f-48ad-be08-ecf0e6f5488b', '1c58b5c5-2502-4e8c-b5f3-21afff1411f0.jpg'),
('462ca597-5bf2-474a-a6b0-7cac143e73da', 'ea6f85af-a59c-11ef-8388-02888dd07685', 'df89cbbb-82ad-4e8d-9caf-1ffa2aab6aea.jpg'),
('699a2f4d-9242-49d1-9e49-bcac8159aa5b', 'ea6f8398-a59c-11ef-8388-02888dd07685', '1b758eb4-d2ae-488d-a898-4f93b5967235.jpeg'),
('76035dfa-9958-4351-8052-3ebbaceee238', 'ea6f86a0-a59c-11ef-8388-02888dd07685', '061ca054-7791-4659-8a21-f1326abed2f3.jpg'),
('aac64bc3-64c2-4e8c-869e-38459c10b5b3', 'ea6f7fe5-a59c-11ef-8388-02888dd07685', '84dfe882-9068-47d8-b711-6e94c41f5c8a.jpg'),
('cb680875-b3ab-4856-be34-771a98c80525', 'ea6f8872-a59c-11ef-8388-02888dd07685', '6819ba5f-5e01-47e1-8527-133021795ae6.jpg'),
('d778096e-6440-47eb-b2f5-0c3a1cde44d5', 'ea6f8798-a59c-11ef-8388-02888dd07685', '3dc3a036-4c97-453a-a9c9-a43cf5d8a887.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `image_habitat`
--

DROP TABLE IF EXISTS `image_habitat`;
CREATE TABLE IF NOT EXISTS `image_habitat` (
  `id` char(36) NOT NULL,
  `habitat_id` char(36) NOT NULL,
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_habitat_image_id` (`habitat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image_habitat`
--

INSERT INTO `image_habitat` (`id`, `habitat_id`, `filename`) VALUES
('50650cef-5c90-4959-9c49-6ae11af48110', 'd7a6d94a-a59c-11ef-8388-02888dd07685', 'fbb90ce3-7b0d-4b1e-9cc0-13973335edbb.jpg'),
('8c2fa0ec-ae8c-4955-a243-7d210b18f492', 'd7a6ddc1-a59c-11ef-8388-02888dd07685', '062a2569-e44d-4f10-b780-dc44f432bdc3.jpeg'),
('d8b97e04-7dbb-458c-bad1-0111d77b248f', 'd7a6dc36-a59c-11ef-8388-02888dd07685', '9639aec6-e5d3-4c39-9a4c-efcf2d0ca6c7.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `race`
--

DROP TABLE IF EXISTS `race`;
CREATE TABLE IF NOT EXISTS `race` (
  `id` char(36) NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `race`
--

INSERT INTO `race` (`id`, `nom`) VALUES
('c7c8014e-a59c-11ef-8388-02888dd07685', 'Mammifères'),
('c7c80482-a59c-11ef-8388-02888dd07685', 'Reptiles'),
('c7c8060c-a59c-11ef-8388-02888dd07685', 'Oiseaux');

-- --------------------------------------------------------

--
-- Structure de la table `rapport_veterinaire`
--

DROP TABLE IF EXISTS `rapport_veterinaire`;
CREATE TABLE IF NOT EXISTS `rapport_veterinaire` (
  `id` char(36) NOT NULL,
  `utilisateur_id` char(36) NOT NULL,
  `animal_id` char(36) NOT NULL,
  `date_passage` datetime NOT NULL,
  `etat` varchar(50) NOT NULL,
  `nourriture` varchar(50) NOT NULL,
  `grammage_nourriture` float NOT NULL,
  `detail_etat` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur_ibfk1_idx` (`utilisateur_id`),
  KEY `animal_ibfk2_idx` (`animal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `rapport_veterinaire`
--

INSERT INTO `rapport_veterinaire` (`id`, `utilisateur_id`, `animal_id`, `date_passage`, `etat`, `nourriture`, `grammage_nourriture`, `detail_etat`) VALUES
('a68468c6-a59c-11ef-8388-02888dd07685', '7893a55a-a5af-11ef-8388-02888dd07685', 'ea6f8398-a59c-11ef-8388-02888dd07685', '2024-10-28 14:45:00', 'En excellente santé', 'Viande', 5000, 'Le tigre est en bonne forme physique, avec une peau saine et un pelage dense. Aucun signe de maladie ou de blessure n\'a été observé lors des derniers examens vétérinaires. Son poids et son état physique sont conformes aux attentes, ce qui confirme son bien-être général.'),
('a6846ca0-a59c-11ef-8388-02888dd07685', '7893a55a-a5af-11ef-8388-02888dd07685', 'ea6f7fe5-a59c-11ef-8388-02888dd07685', '2024-10-27 15:00:00', 'Bonne santé', 'Complément minéral', 100, 'La girafe est en bonne santé, mais elle a récemment montré des signes de légère boiterie sur la patte avant gauche, probablement due à une petite entorse.');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `id` char(36) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `nom`, `description`, `date_creation`) VALUES
('8de532ec-a59c-11ef-8388-02888dd07685', 'Restauration', 'Profitez d\'une pause gourmande dans nos espaces de restauration variés. Que vous ayez envie d\'un snack rapide ou d\'un repas complet, nos restaurants et stands proposent une gamme de plats savoureux et adaptés à tous les goûts. Dégustez des produits frais et locaux tout en admirant la vue sur la nature environnante.', '2024-11-20 15:16:02'),
('8de5369c-a59c-11ef-8388-02888dd07685', 'Visite des habitats avec  un guide (gratuit)', 'Découvrez les secrets des habitats de nos animaux en compagnie de nos guides passionnés. Au cours de cette visite gratuite, vous apprendrez tout sur les espèces que nous abritons, leurs comportements, et les efforts de conservation déployés pour les protéger. Une occasion unique d\'enrichir votre visite et d\'observer de plus près la vie sauvage.', '2024-11-20 15:16:02'),
('8de53884-a59c-11ef-8388-02888dd07685', 'Visite du zoo en petit train', 'Montez à bord de notre petit train et partez pour un voyage ludique à travers le zoo ! Confortablement installés, vous pourrez admirer les différents habitats tout en vous laissant guider à travers des paysages spectaculaires. Une manière agréable et amusante de découvrir le zoo, idéale pour les familles avec enfants ou pour ceux qui souhaitent explorer sans trop marcher.', '2024-11-20 15:16:02');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` char(36) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','employee','veterinarian') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `password`, `nom`, `prenom`, `email`, `role`, `date_creation`) VALUES
('7893a466-a5af-11ef-8388-02888dd07685', '$2b$10$NN6ar6i22U0WmqIsaQJ27.68Yp2./SJaGRyOtxeAzjI0u9qOLr1ja', 'DUPONT', 'José', 'jose-dupont@zoo-arcadia.fr', 'admin', '2024-11-01 15:17:00'),
('7893a4d9-a5af-11ef-8388-02888dd07685', '$2b$10$9kuzk36E2xdKHPltRqLj5eAACOQupi4W2GQKV5DfHwvHckJ0dOhgu', 'LEFEVRE', 'Julien', 'julien-lefevre@zoo-arcadia.fr', 'employee', '2024-11-05 16:31:28'),
('7893a55a-a5af-11ef-8388-02888dd07685', '$2b$10$uQOnjEWgXgdfEHPZtZB5dei6oBRsSEJUzo8m3mlWcNoFwfoP6vVAS', 'DUBOIS', 'Sandrine', 'sandrine-dubois@zoo-arcadia.fr', 'veterinarian', '2024-11-03 11:23:54');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `alimentation_quotidienne`
--
ALTER TABLE `alimentation_quotidienne`
  ADD CONSTRAINT `fk1_alimentation_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk2_alimentation_animal_id` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `fk_animal_habitat_id` FOREIGN KEY (`habitat_id`) REFERENCES `habitat` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_animal_race_id` FOREIGN KEY (`race_id`) REFERENCES `race` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `avis_veterinaire`
--
ALTER TABLE `avis_veterinaire`
  ADD CONSTRAINT `fk1_avis_veterinaire_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk2_avis_veterinaire_habitat_id` FOREIGN KEY (`habitat_id`) REFERENCES `habitat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `image_animal`
--
ALTER TABLE `image_animal`
  ADD CONSTRAINT `fk_animal_image_id` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `image_habitat`
--
ALTER TABLE `image_habitat`
  ADD CONSTRAINT `fk_habitat_image_id` FOREIGN KEY (`habitat_id`) REFERENCES `habitat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `rapport_veterinaire`
--
ALTER TABLE `rapport_veterinaire`
  ADD CONSTRAINT `fk1_rapport_veterinaire_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk2_rapport_veterinaire_animal_id` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;