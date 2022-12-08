<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221208102746 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE profiles DROP FOREIGN KEY FK_8B308530708A0E0');
        $this->addSql('DROP TABLE genders');
        $this->addSql('DROP INDEX UNIQ_8B308530708A0E0 ON profiles');
        $this->addSql('ALTER TABLE profiles DROP gender_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE genders (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(200) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE profiles ADD gender_id INT NOT NULL');
        $this->addSql('ALTER TABLE profiles ADD CONSTRAINT FK_8B308530708A0E0 FOREIGN KEY (gender_id) REFERENCES genders (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8B308530708A0E0 ON profiles (gender_id)');
    }
}
