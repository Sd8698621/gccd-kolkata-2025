CREATE DATABASE gccd_kolkata_db;
USE gccd_kolkata_db;
CREATE TABLE gccdkolkata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100),
    codemudle_url VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
