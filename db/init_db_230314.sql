-- MySQL dump 10.13  Distrib 5.7.34, for osx10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: commet_sync
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_comet` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `discipline` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `type_club` varchar(45) DEFAULT NULL,
  `parent_club_id` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_club_index` (`id_comet`,`category`,`gender`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competition`
--

DROP TABLE IF EXISTS `competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_comet` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `nickname` varchar(200) DEFAULT NULL,
  `season` varchar(45) DEFAULT NULL,
  `type_competition` varchar(200) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `type_team` varchar(45) DEFAULT NULL,
  `discipline` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `parent_competition_comet` varchar(45) DEFAULT NULL,
  `clubs` int(11) DEFAULT NULL,
  `players` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_compe_comet_id` (`id_comet`,`parent_competition_comet`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition`
--

LOCK TABLES `competition` WRITE;
/*!40000 ALTER TABLE `competition` DISABLE KEYS */;
/*!40000 ALTER TABLE `competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_control_sync`
--

DROP TABLE IF EXISTS `main_control_sync`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_control_sync` (
  `id` int(11) NOT NULL,
  `table_name` varchar(45) NOT NULL,
  `comet_last_page` int(11) NOT NULL,
  `comet_total_items` int(11) NOT NULL,
  `date_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ind_table_name` (`table_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_control_sync`
--

LOCK TABLES `main_control_sync` WRITE;
/*!40000 ALTER TABLE `main_control_sync` DISABLE KEYS */;
INSERT INTO `main_control_sync` VALUES (1,'person',0,0,'2023-03-09 14:46:54'),(2,'competition',0,0,'2023-03-10 13:03:14'),(3,'club',0,0,'2023-03-10 19:05:48'),(4,'match',0,0,'2023-03-14 16:34:33'),(5,'match-player',0,0,'2023-03-14 18:34:27'),(6,'match-goalkeeper',0,0,'2023-03-14 20:09:37'),(7,'match-teamofficial',0,0,'2023-03-14 20:33:27'),(8,'match-official',9,900,'2023-03-14 21:00:44');
/*!40000 ALTER TABLE `main_control_sync` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_comet` int(11) NOT NULL,
  `date_match` date NOT NULL,
  `asociacion` varchar(200) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `id_comet_local_club` int(11) NOT NULL,
  `id_comet_visitante` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `competition_name` varchar(45) DEFAULT NULL,
  `jornada` int(11) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `unq_match_ind` (`id_comet`,`competition_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_goalkeeper`
--

DROP TABLE IF EXISTS `match_goalkeeper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_goalkeeper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_comet_match` int(11) NOT NULL,
  `id_comet_person` int(11) NOT NULL,
  `id_comet_club` int(11) NOT NULL,
  `shirt_number` int(11) DEFAULT NULL,
  `is_captain` tinyint(4) DEFAULT NULL,
  `is_starting_lineup` tinyint(4) DEFAULT NULL,
  `is_played` tinyint(4) DEFAULT NULL,
  `single_yellow_card` tinyint(1) DEFAULT NULL,
  `second_yellow_card` tinyint(1) DEFAULT NULL,
  `expulsion` tinyint(1) DEFAULT NULL,
  `goals` tinyint(4) DEFAULT NULL,
  `goals_conceded` tinyint(4) DEFAULT NULL,
  `minutes_played` tinyint(4) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_goalkeeper_match` (`id_comet_match`,`id_comet_person`,`id_comet_club`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_goalkeeper`
--

LOCK TABLES `match_goalkeeper` WRITE;
/*!40000 ALTER TABLE `match_goalkeeper` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_goalkeeper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_official`
--

DROP TABLE IF EXISTS `match_official`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_official` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_comet_match` int(11) NOT NULL,
  `id_comet_person` int(11) NOT NULL,
  `registry_type` varchar(45) NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_official_match` (`id_comet_match`,`id_comet_person`,`registry_type`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_official`
--

LOCK TABLES `match_official` WRITE;
/*!40000 ALTER TABLE `match_official` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_official` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_player`
--

DROP TABLE IF EXISTS `match_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_comet_match` int(11) NOT NULL,
  `id_comet_person` int(11) NOT NULL,
  `id_comet_club` int(11) NOT NULL,
  `shirt_number` int(11) DEFAULT NULL,
  `is_goalkepper` tinyint(4) DEFAULT NULL,
  `is_captain` tinyint(4) DEFAULT NULL,
  `is_starting_lineup` tinyint(4) DEFAULT NULL,
  `is_played` tinyint(4) DEFAULT NULL,
  `single_yellow_card` tinyint(1) DEFAULT NULL,
  `second_yellow_card` tinyint(1) DEFAULT NULL,
  `expulsion` tinyint(1) DEFAULT NULL,
  `goals` tinyint(4) DEFAULT NULL,
  `own_goals` tinyint(4) DEFAULT NULL,
  `minutes_played` tinyint(4) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_platyer_match` (`id_comet_match`,`id_comet_person`,`id_comet_club`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_player`
--

LOCK TABLES `match_player` WRITE;
/*!40000 ALTER TABLE `match_player` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_team_official`
--

DROP TABLE IF EXISTS `match_team_official`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_team_official` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_comet_match` int(11) NOT NULL,
  `id_comet_person` int(11) NOT NULL,
  `id_comet_club` int(11) NOT NULL,
  `registry_type` varchar(45) DEFAULT NULL,
  `single_yellow_card` tinyint(1) DEFAULT NULL,
  `second_yellow_card` tinyint(1) DEFAULT NULL,
  `expulsion` tinyint(1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_team_official_match` (`id_comet_match`,`id_comet_person`,`id_comet_club`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_team_official`
--

LOCK TABLES `match_team_official` WRITE;
/*!40000 ALTER TABLE `match_team_official` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_team_official` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_commet` varchar(45) NOT NULL,
  `dni` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `dob` varchar(45) NOT NULL,
  `nationality` varchar(45) NOT NULL,
  `passport` varchar(45) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `zipcode` varchar(100) DEFAULT NULL,
  `id_fifa` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `comet_status` varchar(45) NOT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `comet_rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_id_commet` (`id_commet`,`comet_rol`),
  UNIQUE KEY `unq_dni` (`dni`,`nationality`,`comet_rol`),
  UNIQUE KEY `unq_id_fifa` (`id_fifa`,`comet_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'commet_sync'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-14 17:06:04
