CREATE DATABASE  IF NOT EXISTS `medrx` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `medrx`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: medrx
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (15,'0001_01_01_000000_create_users_table',1),(16,'0001_01_01_000001_create_cache_table',1),(17,'0001_01_01_000002_create_jobs_table',1),(18,'2025_05_27_081732_create_prescriptions_table',1),(19,'2025_05_27_081840_create_quotations_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `images` json NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_slot` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prescriptions_user_id_foreign` (`user_id`),
  CONSTRAINT `prescriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (1,1,'\"[\\\"prescriptions\\\\/KFbX7dfDe3VBSISVvBFItSlNeOk9IVnb6DeCicMs.jpg\\\"]\"','hdhdh','regrege','08:00 - 10:00','pending','2025-05-27 12:38:07','2025-05-27 12:38:07'),(2,1,'\"[\\\"prescriptions\\\\/Zp8UWomBFSPWVhlUkMB2Yq94rCQehZppYRN4FjdL.jpg\\\"]\"','ghsdhg','shgfh','08:00 - 10:00','pending','2025-05-27 12:38:17','2025-05-27 12:38:17'),(3,1,'\"[\\\"prescriptions\\\\/YjUconCiN1jQi0Y2VHgEuCBMJonUH7N46is5CMio.png\\\"]\"','sghgfhfs','gshg','08:00 - 10:00','pending','2025-05-27 12:38:48','2025-05-27 12:38:48'),(4,1,'\"[\\\"prescriptions\\\\/wn3L0DNlqb9ZDKxaFaesclHgJWtY9i5eSnjdAcwa.jpg\\\"]\"','rgerg','ger','08:00 - 10:00','pending','2025-05-27 13:30:46','2025-05-27 13:30:46'),(5,1,'\"[\\\"prescriptions\\\\/pr8UI5K0V7tMZUCBVItn5Z5bmeh34CqyvzuKzGQ9.png\\\"]\"','fgbfdgfd','fdgsdgd','10:00 - 12:00','pending','2025-05-27 23:57:07','2025-05-27 23:57:07'),(6,1,'\"[\\\"prescriptions\\\\/qlGYS8Fx52E0mqQMGwyz45lNN6AtX6NpCXtMLP2J.jpg\\\",\\\"prescriptions\\\\/S4nLsNVkxn5Y6LQfuT2mLAaDh5vRbd8zZtLwNQyJ.jpg\\\"]\"','rgrgw','rrgr','08:00 - 10:00','pending','2025-05-28 06:36:36','2025-05-28 06:36:36'),(7,1,'\"[\\\"prescriptions\\\\/dpOvi405XRvRyKG6OTjMcbisCQwKH0aXBkFLnQig.jpg\\\"]\"','sggsfgsfgsfgsf','20/ sfsdfsdf','08:00 - 10:00','pending','2025-05-28 07:00:15','2025-05-28 07:00:15'),(8,3,'\"[\\\"prescriptions\\\\/hCCpCx3EgBqGQCTmPNy9baissCb4LnZvvoRQ0Zii.jpg\\\"]\"','thytrhwrthw','ghtwht','10:00 - 12:00','pending','2025-05-28 07:05:14','2025-05-28 07:05:14'),(9,3,'\"[\\\"prescriptions\\\\/ZYUrLvvsEV1hsfqoEeHdkHukAMxdrmknD9zyf6Fe.jpg\\\",\\\"prescriptions\\\\/01BEAur0Ty8GZq8rVJwwY9qpCpGNAUrkD7qRfM5M.jpg\\\"]\"','fgfgdfg','fdgfdsh','08:00 - 10:00','pending','2025-05-28 07:05:32','2025-05-28 07:05:32'),(10,4,'\"[\\\"prescriptions\\\\/5EkRR4udSNrgWLYr3lNxh5wfZvKXtRA4IM8xgCSh.jpg\\\"]\"','gergerg','20/hdghtdshtshnf, jhfjnhftj','10:00 - 12:00','pending','2025-05-28 07:12:00','2025-05-28 07:12:00'),(11,4,'\"[\\\"prescriptions\\\\/XwSBIjzOrx9Y2v2cQQldNMa6Vdim67Fft7k6KSwM.jpg\\\"]\"','gfgrergrg','rterterg','08:00 - 10:00','pending','2025-05-28 07:12:12','2025-05-28 07:12:12');
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotations`
--

DROP TABLE IF EXISTS `quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `prescription_id` bigint unsigned NOT NULL,
  `items` json NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` enum('quoted','accepted','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'quoted',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quotations_prescription_id_status_index` (`prescription_id`,`status`),
  CONSTRAINT `quotations_prescription_id_foreign` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotations`
--

LOCK TABLES `quotations` WRITE;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
INSERT INTO `quotations` VALUES (1,5,'\"[{\\\"drug\\\":\\\"dfsd\\\",\\\"qty\\\":3,\\\"unit_price\\\":3,\\\"amount\\\":9}]\"',9.00,'quoted','2025-05-28 00:14:29','2025-05-28 06:58:47'),(2,4,'\"[{\\\"drug\\\":\\\"fgfgjf\\\",\\\"qty\\\":4,\\\"unit_price\\\":3,\\\"amount\\\":12},{\\\"drug\\\":\\\"fgfjf\\\",\\\"qty\\\":2,\\\"unit_price\\\":4.98,\\\"amount\\\":9.96},{\\\"drug\\\":\\\"fgjhv\\\",\\\"qty\\\":8,\\\"unit_price\\\":1,\\\"amount\\\":8}]\"',29.96,'accepted','2025-05-28 00:43:27','2025-05-28 02:58:15'),(3,2,'\"[{\\\"drug\\\":\\\"geger\\\",\\\"qty\\\":34,\\\"unit_price\\\":3.98,\\\"amount\\\":135.32},{\\\"drug\\\":\\\"egerge\\\",\\\"qty\\\":3,\\\"unit_price\\\":435,\\\"amount\\\":1305},{\\\"drug\\\":\\\"gerg\\\",\\\"qty\\\":3,\\\"unit_price\\\":2.98,\\\"amount\\\":8.94}]\"',1449.26,'accepted','2025-05-28 03:01:03','2025-05-28 03:21:05'),(4,3,'\"[{\\\"drug\\\":\\\"ssd\\\",\\\"qty\\\":1,\\\"unit_price\\\":1.99,\\\"amount\\\":1.99},{\\\"drug\\\":\\\"fdgfdg\\\",\\\"qty\\\":1,\\\"unit_price\\\":1.98,\\\"amount\\\":1.98}]\"',3.97,'rejected','2025-05-28 04:16:29','2025-05-28 06:22:24'),(5,6,'\"[{\\\"drug\\\":\\\"dsf\\\",\\\"qty\\\":3,\\\"unit_price\\\":0.99,\\\"amount\\\":2.9699999999999998}]\"',2.97,'quoted','2025-05-28 06:41:04','2025-05-28 06:41:04'),(6,1,'\"[{\\\"drug\\\":\\\"fsdfs\\\",\\\"qty\\\":1,\\\"unit_price\\\":0.98,\\\"amount\\\":0.98},{\\\"drug\\\":\\\"dfdsf\\\",\\\"qty\\\":1,\\\"unit_price\\\":2,\\\"amount\\\":2}]\"',2.98,'rejected','2025-05-28 06:55:40','2025-05-28 07:02:08'),(7,7,'\"[{\\\"drug\\\":\\\"sgsfgsf\\\",\\\"qty\\\":1,\\\"unit_price\\\":5,\\\"amount\\\":5},{\\\"drug\\\":\\\"fgfgfsg\\\",\\\"qty\\\":2,\\\"unit_price\\\":75,\\\"amount\\\":150}]\"',155.00,'accepted','2025-05-28 07:01:07','2025-05-28 07:01:57'),(8,8,'\"[{\\\"drug\\\":\\\"fsagfdg\\\",\\\"qty\\\":23,\\\"unit_price\\\":3.99,\\\"amount\\\":91.77000000000001},{\\\"drug\\\":\\\"gsfgsf\\\",\\\"qty\\\":2,\\\"unit_price\\\":44,\\\"amount\\\":88}]\"',179.77,'accepted','2025-05-28 07:06:08','2025-05-28 07:06:43'),(9,10,'\"[{\\\"drug\\\":\\\"rgreg\\\",\\\"qty\\\":3,\\\"unit_price\\\":4.99,\\\"amount\\\":14.97},{\\\"drug\\\":\\\"fgdfgsd\\\",\\\"qty\\\":2,\\\"unit_price\\\":445,\\\"amount\\\":890}]\"',904.97,'rejected','2025-05-28 07:12:53','2025-05-28 07:14:29'),(10,11,'\"[{\\\"drug\\\":\\\"rgerger\\\",\\\"qty\\\":3,\\\"unit_price\\\":34,\\\"amount\\\":102}]\"',102.00,'accepted','2025-05-28 07:13:29','2025-05-28 07:14:41');
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('wuPZVilm9d5hjjx7ZRpD1FXZt4I7fCEt64OBq4ex',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiU2JlVFg5NlVERWh3bGxXMTFMOGZqN21BR2lCR3FjZ2pWU0daWG5UYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==',1748436330),('XNtDBUaEsNGNPGkaub8BsTSXzBYKzdzqe63tLKbb',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUXNaMGwxc2x0YURSVzYwY3Fibk1BSFV1aDZGQlB5NVJLMkdnVHpJSCI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvbG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1748435533);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','testuser@example.com','123 Main St, City','0123456789','1990-01-01','user','2025-05-27 12:22:14','$2y$12$4UwNFJoSCc50.enf3PW/GucjN.mMxgtLIrGUS7zOj1JkVeqPH.5DW','xpcOLC1bWog83ROdd8y2zCn0jBkX73Ji0MCuqLeFxphkkkhFzm6ZDcW1TnP9','2025-05-27 12:22:15','2025-05-27 12:22:15'),(2,'Pharmacy User','pharmacy@example.com','456 Pharmacy Rd, City','0987654321','1985-05-15','pharmacy','2025-05-27 12:22:15','$2y$12$aVPrPRVfagLbsKR380/Maux4tKXp3EqOiBzALcHvRj9bAc1FoLA4e','7fuLPIneMQotBKMCVwcofkN1L1YOS17gE1gcUymLAYRrTPtYaweet4Ij5a1a','2025-05-27 12:22:15','2025-05-27 12:22:15'),(3,'pabasara','pabasara.sewwendi@gmail.com','440/E1, Iven De Silva Rd, Kadawala, katana','0766272966','2006-01-31','user',NULL,'$2y$12$tpJENKhs6gS86r3UpkIrY.pNEYm/MD1filCoLgyu1TElaV0LWAv7m',NULL,'2025-05-28 07:04:56','2025-05-28 07:04:56'),(4,'Paba','paba@gmail.com','440/E1, Iven De Silva Rd, Kadawala, katana','0766272966','2007-01-01','user',NULL,'$2y$12$wGH7BcmDwlAwuZIUThQQWOtCHgfu.s4/izG2RWbLpbEsOovx19w6O',NULL,'2025-05-28 07:11:36','2025-05-28 07:11:36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-28 18:50:28
