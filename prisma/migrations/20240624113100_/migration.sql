-- CreateTable
CREATE TABLE `SignUp` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SignUp_email_key`(`email`),
    UNIQUE INDEX `SignUp_userName_key`(`userName`),
    UNIQUE INDEX `SignUp_password_key`(`password`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Login` (
    `email` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Login_email_key`(`email`),
    UNIQUE INDEX `Login_userName_key`(`userName`),
    UNIQUE INDEX `Login_password_key`(`password`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wordleEnglish` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(5) NOT NULL DEFAULT '',

    UNIQUE INDEX `word`(`word`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wordleGerman` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(5) NOT NULL DEFAULT '',

    UNIQUE INDEX `word`(`word`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wordleSpanish` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(5) NOT NULL DEFAULT '',

    UNIQUE INDEX `word`(`word`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `R6Siege` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `characterName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `R6Siege_characterName_key`(`characterName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoL` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `characterName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LoL_characterName_key`(`characterName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HellDivers` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `monsterName` VARCHAR(191) NOT NULL,
    `stratagemName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HellDivers_monsterName_key`(`monsterName`),
    UNIQUE INDEX `HellDivers_stratagemName_key`(`stratagemName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Halo` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `characterName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Halo_characterName_key`(`characterName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hades` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `characterName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Hades_characterName_key`(`characterName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Games` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `gameName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Games_gameName_key`(`gameName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DBD` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `characterName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DBD_characterName_key`(`characterName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Body` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `bodypartName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Body_bodypartName_key`(`bodypartName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BG3` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `characterName` VARCHAR(191) NOT NULL,
    `characterPortraitURL` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BG3_characterName_key`(`characterName`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
