-- CreateTable
CREATE TABLE `tbl_user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` CHAR(36) NULL,
    `name` VARCHAR(200) NULL,
    `email` VARCHAR(200) NULL,
    `password` VARCHAR(100) NULL,
    `birthAt` DATE NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
