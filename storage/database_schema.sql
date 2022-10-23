CREATE DATABASE IF NOT EXISTS `characters-api`;

USE `characters-api`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` VARCHAR(35) NOT NULL,
    `username` VARCHAR(35) NOT NULL,
    `name` VARCHAR(35) NOT NULL,
    `points` BIGINT NOT NULL,
    `rank` BIGINT NOT NULL,
    `badge` VARCHAR(20) NOT NULL,
    Primary Key (`id`,`username`)
);

CREATE TABLE IF NOT EXISTS `auth` (
    `id` VARCHAR (35) NOT NULL,
    `username` VARCHAR (35) NOT NULL,
    `password` VARCHAR (40) NOT NULL,
    Constraint fk_auth1 Foreign Key (`id`) References `characters-api`.`user` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `posts` (
    `id` VARCHAR(35) NOT NULL,
    `timestamp` BIGINT NOT NULL,
    `userid` VARCHAR (35) NOT NULL,
    `likes` BIGINT NOT NULL DEFAULT 0,
    `coments` BIGINT NOT NULL DEFAULT 0,
    `title` TINYTEXT NOT NULL,
    `desc` TINYTEXT NOT NULL,
    Primary Key (`id`),
    Foreign Key (`userid`) References `user` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

