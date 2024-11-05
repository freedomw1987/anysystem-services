-- AlterTable
ALTER TABLE `User` MODIFY `expiresAt` DATETIME(3) NULL,
    MODIFY `token` VARCHAR(191) NULL;
