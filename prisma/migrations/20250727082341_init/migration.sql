/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `image`,
    ADD COLUMN `img` VARCHAR(191) NULL,
    ADD COLUMN `imgHeight` INTEGER NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `desc` VARCHAR(255) NULL;
