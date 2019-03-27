CREATE DATABASE  IF NOT EXISTS `livvolleyball_database`;
GO;
USE `livvolleyball_database`;
GO;
 SET NAMES utf8;

DROP TABLE IF EXISTS `teams`;

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


LOCK TABLES `teams` WRITE;
INSERT INTO `teams` VALUES (1,'Bronco Bulls',1,'Sebastien de Villiers','Mike Keller','Stevey Wonder','Jeremy Briggs','Gorbachev','Dancer'),(2,'Standard Stallions',2,'Ronald Reagan','Mao Zeidong','Mikhail Gorbachev','Luis Fonso','the Villiage','Prancer'),(3,'Spike Spirit',3,'Rue Jones','Jessica Jones','Marc Webber','Leonardo di Crappio','Fred','Roberta'),(4,'Santas Sleigh',4,'Captain Rudolf','Dasher','Prancer','Donner','Vixen','Comet');
GO;

CREATE USER 'sdevilliers'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Fr!dg3s1';
GRANT ALL PRIVILEGES ON livvolleyball_database.* TO 'sdevilliers'@'localhost';
GO;
