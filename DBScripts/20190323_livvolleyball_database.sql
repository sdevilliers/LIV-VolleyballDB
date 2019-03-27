CREATE DATABASE  IF NOT EXISTS `livvolleyball_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `livvolleyball_database`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: livvolleyball_database
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teams` (
  `TeamsID` int(11) NOT NULL AUTO_INCREMENT,
  `TeamName` varchar(45) NOT NULL,
  `Seed` int(11) NOT NULL,
  `captian` varchar(45) NOT NULL,
  `playerTwo` varchar(45) DEFAULT NULL,
  `playerThree` varchar(45) DEFAULT NULL,
  `playerFour` varchar(45) DEFAULT NULL,
  `playerFive` varchar(45) DEFAULT NULL,
  `playerSix` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`TeamsID`),
  UNIQUE KEY `Seed` (`Seed`),
  UNIQUE KEY `TeamName_UNIQUE` (`TeamName`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Bronco Bulls',1,'Sebastien de Villiers','Mike Keller','Stevey Wonder','Jeremy Briggs','Gorbachev','Dancer'),(2,'Standard Stallions',2,'Ronald Reagan','Mao Zeidong','Mikhail Gorbachev','Luis Fonso','the Villiage','Prancer'),(3,'Spike Spirit',3,'Rue Jones','Jessica Jones','Marc Webber','Leonardo di Crappio','Fred','Roberta'),(4,'Santa\'s Sleigh',4,'Captain Rudolf','Dasher','Prancer','Donner','Vixen','Comet');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-23 15:04:34

CREATE USER 'sdevilliers'@'localhost' IDENTIFIED BY 'Fr!dg3s1';
GRANT ALL PRIVILEGES ON livvolleyball_database.* TO 'sdevilliers'@'localhost';
