-- DropForeignKey
ALTER TABLE `textcontent` DROP FOREIGN KEY `TextContent_language_code_fkey`;

-- AlterTable
ALTER TABLE `language` MODIFY `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `textcontent` MODIFY `language_code` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TextContent` ADD CONSTRAINT `TextContent_language_code_fkey` FOREIGN KEY (`language_code`) REFERENCES `Language`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
