-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  `password` VARCHAR(70) NOT NULL,
  `photo` MEDIUMBLOB NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Contact` (
  `user_id1` VARCHAR(36) NOT NULL,
  `user_id2` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`user_id1`, `user_id2`),
  INDEX `fk_User_has_User_User2_idx` (`user_id2` ASC),
  INDEX `fk_User_has_User_User1_idx` (`user_id1` ASC),
  CONSTRAINT `fk_User_has_User_User1`
    FOREIGN KEY (`user_id1`)
    REFERENCES `User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_User_User2`
    FOREIGN KEY (`user_id2`)
    REFERENCES `User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Chat` (
  `id` VARCHAR(36) NOT NULL,
  `user_id1` VARCHAR(36) NOT NULL,
  `user_id2` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Chat_Contact1_idx` (`user_id1` ASC, `user_id2` ASC),
  CONSTRAINT `fk_Chat_Contact1`
    FOREIGN KEY (`user_id1` , `user_id2`)
    REFERENCES `Contact` (`user_id1` , `user_id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Message` (
  `id` VARCHAR(36) NOT NULL,
  `text` MEDIUMTEXT NULL,
  `image` MEDIUMBLOB NULL,
  `isStarry` TINYINT NOT NULL,
  `wasReceived` TINYINT NOT NULL,
  `dispatchTimestamp` DATETIME NOT NULL,
  `lastEditionTimestamp` DATETIME NULL,
  `author_id` VARCHAR(36) NOT NULL,
  `chat_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Message_User1_idx` (`author_id` ASC),
  INDEX `fk_Message_Chat1_idx` (`chat_id` ASC),
  CONSTRAINT `fk_Message_User1`
    FOREIGN KEY (`author_id`)
    REFERENCES `User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_Chat1`
    FOREIGN KEY (`chat_id`)
    REFERENCES `Chat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;