<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221208103539 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE genders (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE profiles ADD genders_id INT NOT NULL');
        $this->addSql('ALTER TABLE profiles ADD CONSTRAINT FK_8B308530477C57FD FOREIGN KEY (genders_id) REFERENCES genders (id)');
        $this->addSql('CREATE INDEX IDX_8B308530477C57FD ON profiles (genders_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE profiles DROP FOREIGN KEY FK_8B308530477C57FD');
        $this->addSql('DROP TABLE genders');
        $this->addSql('DROP INDEX IDX_8B308530477C57FD ON profiles');
        $this->addSql('ALTER TABLE profiles DROP genders_id');
    }
}
