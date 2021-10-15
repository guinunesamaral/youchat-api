-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema youchat
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema youchat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `youchat` DEFAULT CHARACTER SET utf8 ;
USE `youchat` ;

-- -----------------------------------------------------
-- Table `youchat`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `youchat`.`User` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `email` LONGTEXT NOT NULL,
  `photo` MEDIUMBLOB NULL,
  `contact_user_id` VARCHAR(36) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_User1_idx` (`contact_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_User1`
    FOREIGN KEY (`contact_user_id`)
    REFERENCES `youchat`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `youchat`.`Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `youchat`.`Chat` (
  `id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `youchat`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `youchat`.`Message` (
  `id` VARCHAR(36) NOT NULL,
  `text` LONGTEXT NULL,
  `image` MEDIUMBLOB NULL,
  `isStarry` TINYINT NOT NULL,
  `wasReceived` TINYINT NOT NULL,
  `dispatchTimestamp` DATETIME NOT NULL,
  `lastEditionTimestamp` DATETIME NULL,
  `author_id` VARCHAR(36) NOT NULL,
  `chat_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Message_User1_idx` (`author_id` ASC) VISIBLE,
  INDEX `fk_Message_Chat1_idx` (`chat_id` ASC) VISIBLE,
  CONSTRAINT `fk_Message_User1`
    FOREIGN KEY (`author_id`)
    REFERENCES `youchat`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_Chat1`
    FOREIGN KEY (`chat_id`)
    REFERENCES `youchat`.`Chat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `youchat`.`ChatUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `youchat`.`ChatUser` (
  `Chat_id` VARCHAR(36) NOT NULL,
  `User_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`Chat_id`, `User_id`),
  INDEX `fk_Chat_has_User_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Chat_has_User_Chat1_idx` (`Chat_id` ASC) VISIBLE,
  CONSTRAINT `fk_Chat_has_User_Chat1`
    FOREIGN KEY (`Chat_id`)
    REFERENCES `youchat`.`Chat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chat_has_User_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `youchat`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
