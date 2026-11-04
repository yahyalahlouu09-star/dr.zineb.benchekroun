-- À importer dans phpMyAdmin (base: benchekroun, interclassement utf8mb4_unicode_ci)
CREATE TABLE appointment_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ref CHAR(8) NOT NULL UNIQUE,
  status ENUM('pending','contacted','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(190) NULL,
  contact_lang ENUM('fr','ar','en') NOT NULL DEFAULT 'fr',
  exam VARCHAR(60) NOT NULL,
  case_text TEXT NOT NULL,
  has_prescription TINYINT(1) NOT NULL DEFAULT 0,
  had_before TINYINT(1) NOT NULL DEFAULT 0,
  pref_date DATE NULL,
  pref_time TIME NULL,
  comments TEXT NULL,
  file_stored VARCHAR(64) NULL,
  file_original VARCHAR(120) NULL,
  consent_at DATETIME NOT NULL,
  ip_hash CHAR(64) NOT NULL,
  staff_note TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status, created_at),
  INDEX idx_ip (ip_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admins (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
