-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: healthq-db
-- Generation Time: Mar 21, 2026 at 05:25 PM
-- Server version: 9.6.0
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HealthQ`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL COMMENT 'รหัสผู้ใช้งาน (คนที่กดจองคิว)',
  `doctor_id` int UNSIGNED NOT NULL COMMENT 'รหัสหมอที่จะนัดเจอ',
  `appointment_date` date NOT NULL COMMENT 'วันที่นัดหมาย',
  `appointment_time` time NOT NULL COMMENT 'เวลานัดหมาย',
  `symptom` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'อาการป่วยเบื้องต้น',
  `files` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'ไฟล์หรือรูปภาพประกอบ (Base64 or Filenames)',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'หมายเหตุเพิ่มเติม (เหตุผลการยกเลิก/เลื่อน)',
  `specialty_id` int UNSIGNED DEFAULT NULL COMMENT 'รหัสแผนก',
  `hospital_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'รหัสโรงพยาบาล',
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending' COMMENT 'สถานะคิว (เช่น pending, confirmed, cancelled)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bts_stations`
--

CREATE TABLE `bts_stations` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lat` decimal(10,6) NOT NULL,
  `lng` decimal(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bts_stations`
--

INSERT INTO `bts_stations` (`id`, `name`, `lat`, `lng`) VALUES
(1, 'คูคต', 13.966700, 100.655800),
(2, 'แยก คปอ.', 13.960000, 100.640200),
(3, 'พิพิธภัณฑ์กองทัพอากาศ', 13.953500, 100.630000),
(4, 'โรงพยาบาลภูมิพลอดุลยเดช', 13.945000, 100.620000),
(5, 'สะพานใหม่', 13.936000, 100.610500),
(6, 'สายหยุด', 13.929000, 100.602000),
(7, 'พหลโยธิน 59', 13.921500, 100.593500),
(8, 'วัดพระศรีมหาธาตุ', 13.914000, 100.585000),
(9, 'กรมทหารราบที่ 11', 13.906000, 100.574000),
(10, 'บางบัว', 13.896000, 100.564000),
(11, 'ศรีปทุม', 13.887000, 100.556000),
(12, 'มหาวิทยาลัยเกษตรศาสตร์', 13.878000, 100.553000),
(13, 'เสนานิคม', 13.869000, 100.557000),
(14, 'รัชโยธิน', 13.849000, 100.562000),
(15, 'พหลโยธิน 24', 13.837500, 100.562500),
(16, 'ห้าแยกลาดพร้าว', 13.818000, 100.564000),
(17, 'หมอชิต', 13.803000, 100.555000),
(18, 'สะพานควาย', 13.791000, 100.550000),
(19, 'อารีย์', 13.780000, 100.547000),
(20, 'สนามเป้า', 13.772500, 100.543000),
(21, 'อนุสาวรีย์ชัยสมรภูมิ', 13.765600, 100.537900),
(22, 'พญาไท', 13.757000, 100.534000),
(23, 'ราชเทวี', 13.754000, 100.530000),
(24, 'สยาม', 13.746000, 100.534000),
(25, 'ชิดลม', 13.746500, 100.545000),
(26, 'เพลินจิต', 13.742000, 100.553000),
(27, 'นานา', 13.738000, 100.558000),
(28, 'อโศก', 13.737000, 100.560000),
(29, 'พร้อมพงษ์', 13.731100, 100.570000),
(30, 'ทองหล่อ', 13.725900, 100.580000),
(31, 'เอกมัย', 13.719600, 100.588000),
(32, 'พระโขนง', 13.714000, 100.594000),
(33, 'อ่อนนุช', 13.708800, 100.601000),
(34, 'บางจาก', 13.702000, 100.606500),
(35, 'ปุณณวิถี', 13.696000, 100.615000),
(36, 'อุดมสุข', 13.689000, 100.621000),
(37, 'บางนา', 13.682000, 100.630000),
(38, 'แบริ่ง', 13.674000, 100.639000),
(39, 'สำโรง', 13.659000, 100.612000),
(40, 'ปู่เจ้า', 13.649000, 100.578000),
(41, 'ช้างเอราวัณ', 13.640000, 100.565000),
(42, 'โรงเรียนนายเรือ', 13.630000, 100.555000),
(43, 'ปากน้ำ', 13.623000, 100.548000),
(44, 'ศรีนครินทร์', 13.616000, 100.536000),
(45, 'การเคหะฯ', 13.590000, 100.528000),
(46, 'เคหะฯ', 13.561000, 100.571000),
(47, 'สนามกีฬาแห่งชาติ', 13.746000, 100.528000),
(48, 'ราชดำริ', 13.739000, 100.540000),
(49, 'ศาลาแดง', 13.730000, 100.537000),
(50, 'ช่องนนทรี', 13.726000, 100.534000),
(51, 'สุรศักดิ์', 13.725000, 100.521000),
(52, 'สะพานตากสิน', 13.722600, 100.514000),
(53, 'กรุงธนบุรี', 13.727000, 100.496000),
(54, 'วงเวียนใหญ่', 13.731000, 100.485000),
(55, 'โพธิ์นิมิตร', 13.727000, 100.480000),
(56, 'ตลาดพลู', 13.724000, 100.468000),
(57, 'วุฒากาศ', 13.714000, 100.449000),
(58, 'บางหว้า', 13.717000, 100.440000);

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int UNSIGNED NOT NULL,
  `hospital_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specialty_id` int UNSIGNED NOT NULL COMMENT 'รหัสความเชี่ยวชาญ',
  `specialization` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prefix` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'คำนำหน้าชื่อ (เช่น นพ., พญ.)',
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ชื่อจริง',
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'นามสกุล'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `hospital_id`, `specialty_id`, `specialization`, `prefix`, `first_name`, `last_name`) VALUES
(111, 'BKK004', 1, NULL, NULL, 'ธนกฤต', 'มิตรภาพ'),
(112, 'BKK004', 1, NULL, NULL, 'วิมลวรรณ', 'สุขกาย'),
(113, 'BKK004', 2, NULL, NULL, 'ปกรณ์', 'มือหนึ่ง'),
(114, 'BKK004', 3, NULL, NULL, 'หรรษา', 'ร่าเริง'),
(115, 'BKK004', 4, NULL, NULL, 'แพรวพรรณ', 'งามตา'),
(116, 'BKK012', 1, NULL, NULL, 'อดิศักดิ์', 'ศรีสุข'),
(117, 'BKK012', 1, NULL, NULL, 'วราภรณ์', 'ใจดี'),
(118, 'BKK012', 2, NULL, NULL, 'ธนพล', 'สุขสวัสดิ์'),
(119, 'BKK012', 3, NULL, NULL, 'ศุภชัย', 'ใจกว้าง'),
(120, 'BKK012', 4, NULL, NULL, 'สมชัย', 'สายสุข'),
(121, 'CHM001', 1, NULL, NULL, 'กฤษดา', 'รักษาดี'),
(122, 'CHM001', 1, NULL, NULL, 'นภัสสร', 'วงศ์คำ'),
(123, 'CHM001', 2, NULL, NULL, 'วิชัย', 'เมืองเหนือ'),
(124, 'CHM001', 3, NULL, NULL, 'สมศรี', 'รักเด็ก'),
(125, 'CHM001', 4, NULL, NULL, 'กุลสตรี', 'ศรีเชียงใหม่'),
(126, 'BKK001', 1, NULL, NULL, 'สมชาย', 'ใจดี'),
(127, 'BKK001', 1, NULL, NULL, 'สมหญิง', 'แพทย์ดี'),
(128, 'BKK001', 2, NULL, NULL, 'วิศิษฐ์', 'แข็งแรง'),
(129, 'BKK001', 3, NULL, NULL, 'ดารารัตน์', 'เด็กดี'),
(130, 'BKK001', 4, NULL, NULL, 'นลินี', 'สายอ่อน'),
(131, 'SGK002', 1, NULL, NULL, 'สันติสุข', 'แดนใต้'),
(132, 'SGK002', 1, NULL, NULL, 'บุปผา', 'มาลา'),
(133, 'SGK002', 2, NULL, NULL, 'คมสันต์', 'มั่นคง'),
(134, 'SGK002', 3, NULL, NULL, 'ดวงใจ', 'แม่'),
(135, 'SGK002', 4, NULL, NULL, 'กัลยา', 'นารี'),
(136, 'KNK001', 1, NULL, NULL, 'สมชาย', 'สบายดี'),
(137, 'KNK001', 1, NULL, NULL, 'มาลี', 'สีสวย'),
(138, 'KNK001', 2, NULL, NULL, 'กล้าหาญ', 'ชาญชัย'),
(139, 'KNK001', 3, NULL, NULL, 'สุดา', 'รักเด็ก'),
(140, 'KNK001', 4, NULL, NULL, 'กนกวรรณ', 'พันธุ์ดี'),
(141, 'CHM002', 1, NULL, NULL, 'วิชาญ', 'ล้านนา'),
(142, 'CHM002', 1, NULL, NULL, 'บัวตอง', 'ผ่องอำไพ'),
(143, 'CHM002', 2, NULL, NULL, 'ไกรสร', 'ดอนแก้ว'),
(144, 'CHM002', 3, NULL, NULL, 'เอื้องเหนือ', 'เชื้อสาย'),
(145, 'CHM002', 4, NULL, NULL, 'กาสะลอง', 'ดอกงาม'),
(146, 'SPK001', 1, NULL, NULL, 'สมชาย', 'สบายดี'),
(147, 'SPK001', 1, NULL, NULL, 'วรรณภา', 'รักษาดี'),
(148, 'SPK001', 2, NULL, NULL, 'เกรียงไกร', 'ไวว่อง'),
(149, 'SPK001', 3, NULL, NULL, 'อรุณี', 'มีรัก'),
(150, 'SPK001', 4, NULL, NULL, 'กุลธิดา', 'ฟ้าสวย'),
(151, 'BKK009', 1, NULL, NULL, 'อาจหาญ', 'ชาญชัย'),
(152, 'BKK009', 1, NULL, NULL, 'ระเบียบ', 'วินัย'),
(153, 'BKK009', 2, NULL, NULL, 'มั่นคง', 'ทรงพลัง'),
(154, 'BKK009', 3, NULL, NULL, 'อ่อนโยน', 'ปลอดภัย'),
(155, 'BKK009', 4, NULL, NULL, 'มารดา', 'แห่งชาติ'),
(156, 'BKK003', 1, NULL, NULL, 'กนกวรรณ', 'อธิสุข'),
(157, 'BKK003', 1, NULL, NULL, 'ธีรภัทร', 'ศิริพันธ์'),
(158, 'BKK003', 2, NULL, NULL, 'รัชนนนท์', 'กฤตเทพ'),
(159, 'BKK003', 3, NULL, NULL, 'จารุณี', 'จันทร์อาภรณ์'),
(160, 'BKK003', 4, NULL, NULL, 'พิมพ์ชนก', 'เลิศประเสริฐ'),
(161, 'BKK008', 1, NULL, NULL, 'สุธีร์', 'สงวนวงษ์'),
(162, 'BKK008', 1, NULL, NULL, 'จุฑามาศ', 'เลิศมงคล'),
(163, 'BKK008', 2, NULL, NULL, 'นเรศ', 'อรุณศิลป์'),
(164, 'BKK008', 3, NULL, NULL, 'ปริญญา', 'จิตภักดี'),
(165, 'BKK008', 4, NULL, NULL, 'อภินัช', 'เหล่าศักดา'),
(166, 'BKK005', 1, NULL, NULL, 'สมบุญ', 'พูนสุข'),
(167, 'BKK005', 1, NULL, NULL, 'นิตยา', 'ใจดี'),
(168, 'BKK005', 2, NULL, NULL, 'ชัยยุทธ', 'มือฉมัง'),
(169, 'BKK005', 3, NULL, NULL, 'รักเด็ก', 'ใจดี'),
(170, 'BKK005', 4, NULL, NULL, 'กุลสตรี', 'ศรีสยาม'),
(171, 'BKK013', 1, NULL, NULL, 'วิศรุต', 'หิรัญพงศ์'),
(172, 'BKK013', 1, NULL, NULL, 'สุภาพัฒน์', 'คงมั่น'),
(173, 'BKK013', 2, NULL, NULL, 'พสิษฐ์', 'ชัยชาญ'),
(174, 'BKK013', 3, NULL, NULL, 'ชนกนันท์', 'รัศมี'),
(175, 'BKK013', 4, NULL, NULL, 'รวิสรา', 'พิทักษ์ธรรม'),
(176, 'BKK014', 1, NULL, NULL, 'วัฒนา', 'สุขเสมอ'),
(177, 'BKK014', 1, NULL, NULL, 'ลลิตา', 'พาดี'),
(178, 'BKK014', 2, NULL, NULL, 'เกรียงไกร', 'ไวว่อง'),
(179, 'BKK014', 3, NULL, NULL, 'เพ็ญพร', 'รักเด็ก'),
(180, 'BKK014', 4, NULL, NULL, 'กุลธิดา', 'สง่างาม'),
(181, 'BKK015', 1, NULL, NULL, 'ศิริชัย', 'รักษาดี'),
(182, 'BKK015', 1, NULL, NULL, 'ลมหายใจ', 'สดชื่น'),
(183, 'BKK015', 2, NULL, NULL, 'มือฉมัง', 'ผ่าตัดพริ้ว'),
(184, 'BKK015', 3, NULL, NULL, 'ใจดี', 'รักเด็ก'),
(185, 'BKK015', 4, NULL, NULL, 'มารดา', 'ผู้ให้กำเนิด'),
(186, 'BKK006', 1, NULL, NULL, 'ปิยบุตร', 'มหากรุณา'),
(187, 'BKK006', 1, NULL, NULL, 'กมลวรรณ', 'รักษาดี'),
(188, 'BKK006', 2, NULL, NULL, 'วิจิตร', 'วิชาญ'),
(189, 'BKK006', 3, NULL, NULL, 'วิไลลักษณ์', 'รักเด็ก'),
(190, 'BKK006', 4, NULL, NULL, 'จิรวรรณ', 'สูตินรีเวช'),
(191, 'BKK011', 1, NULL, NULL, 'กฤษฎา', 'กมลรักษา'),
(192, 'BKK011', 1, NULL, NULL, 'พิชชาพร', 'ทรัพย์สมบูรณ์'),
(193, 'BKK011', 2, NULL, NULL, 'ชยพล', 'ตระกูลวานิช'),
(194, 'BKK011', 3, NULL, NULL, 'วรัญญา', 'กิจเกรียงไกร'),
(195, 'BKK011', 4, NULL, NULL, 'สิริวรรณา', 'สุรชัยปกรณ์'),
(196, 'SGK001', 1, NULL, NULL, 'ปักษ์ใต้', 'บ้านเรา'),
(197, 'SGK001', 1, NULL, NULL, 'ลมทะเล', 'สดชื่น'),
(198, 'SGK001', 2, NULL, NULL, 'คมกริช', 'มิตรภาพ'),
(199, 'SGK001', 3, NULL, NULL, 'รักเด็ก', 'เมตตา'),
(200, 'SGK001', 4, NULL, NULL, 'กุลสตรี', 'ศรีสงขลา'),
(201, 'KNK002', 1, NULL, NULL, 'อีสาน', 'บ้านเฮา'),
(202, 'KNK002', 1, NULL, NULL, 'ลมหนาว', 'พัดผ่าน'),
(203, 'KNK002', 2, NULL, NULL, 'ผู้บ่าว', 'พยาบาล'),
(204, 'KNK002', 3, NULL, NULL, 'ฮักเด็ก', 'แพงเด็ก'),
(205, 'KNK002', 4, NULL, NULL, 'แม่หญิง', 'งามตา'),
(206, 'BKK002', 1, NULL, NULL, 'สินแพทย์', 'ดูแลดี'),
(207, 'BKK002', 1, NULL, NULL, 'หายใจ', 'โล่งสบาย'),
(208, 'BKK002', 2, NULL, NULL, 'ผ่าตัด', 'ปลอดภัย'),
(209, 'BKK002', 3, NULL, NULL, 'เด็กน้อย', 'สดใส'),
(210, 'BKK002', 4, NULL, NULL, 'สุขภาพ', 'สตรี'),
(211, 'BKK010', 1, NULL, NULL, 'พุฒิพงศ์', 'ธีรธาดา'),
(212, 'BKK010', 1, NULL, NULL, 'อรศิริ', 'สมองดี'),
(213, 'BKK010', 2, NULL, NULL, 'สิรวิชญ์', 'พงษ์พาณิชย์'),
(214, 'BKK010', 3, NULL, NULL, 'ชุติมา', 'จันทรประเสริฐ'),
(215, 'BKK010', 4, NULL, NULL, 'ณัฐวุฒิ', 'อมรศิลป์'),
(216, 'BKK007', 1, NULL, NULL, 'วิทยา', 'ก้าวหน้า'),
(217, 'BKK007', 1, NULL, NULL, 'ภาวนา', 'พารักษา'),
(218, 'BKK007', 2, NULL, NULL, 'ชาญชัย', 'ใจสู้'),
(219, 'BKK007', 3, NULL, NULL, 'วัยใส', 'ใจดี'),
(220, 'BKK007', 4, NULL, NULL, 'วิมล', 'วงศ์วิภา');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` int UNSIGNED NOT NULL,
  `hospital_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `hospital_id`, `name`, `type`, `state`, `district`) VALUES
(1, 'BKK004', 'กรุงเทพ', 'โรงพยาบาลเอกชน', 'กรุงเทพมหานคร', 'ห้วยขวาง'),
(2, 'BKK012', 'โรงพยาบาลบำรุงราษฎร์', 'โรงพยาบาลเอกชนระดับนานาชาติ', 'กรุงเทพมหานคร', 'เขตวัฒนา'),
(3, 'CHM001', 'เชียงใหม่ราม', 'โรงพยาบาลเอกชน', 'เชียงใหม่', 'เมืองเชียงใหม่'),
(4, 'BKK001', 'โรงพยาบาลจุฬาลงกรณ์', 'โรงพยาบาลรัฐ', 'กรุงเทพมหานคร', 'ปทุมวัน'),
(5, 'SGK002', 'หาดใหญ่', 'โรงพยาบาลรัฐ', 'สงขลา', 'หาดใหญ่'),
(6, 'KNK001', 'ขอนแก่นราม', 'โรงพยาบาลเอกชน', 'ขอนแก่น', 'เมืองขอนแก่น'),
(7, 'CHM002', 'มหาราชนครเชียงใหม่', 'โรงพยาบาลรัฐ', 'เชียงใหม่', 'เมืองเชียงใหม่'),
(8, 'SPK001', 'เปาโล สมุทรปราการ', 'โรงพยาบาลเอกชน', 'สมุทรปราการ', 'เมืองสมุทรปราการ'),
(9, 'BKK009', 'พระมงกุฎเกล้า', 'โรงพยาบาลรัฐ', 'กรุงเทพมหานคร', 'ราชเทวี'),
(10, 'BKK003', 'โรงพยาบาลพญาไท 2', 'โรงพยาบาลเอกชนตติยภูมิ', 'กรุงเทพมหานคร', 'ราชเทวี'),
(11, 'BKK008', 'โรงพยาบาลพระรามเก้า', 'โรงพยาบาลเอกชน', 'กรุงเทพมหานคร', 'เขตห้วยขวาง'),
(12, 'BKK005', 'ราชวิถี', 'โรงพยาบาลรัฐ', 'กรุงเทพมหานคร', 'ราชเทวี'),
(13, 'BKK013', 'โรงพยาบาลรามาธิบดี', 'โรงพยาบาลมหาวิทยาลัย', 'กรุงเทพมหานคร', 'เขตราชเทวี'),
(14, 'BKK014', 'สมิติเวช สุขุมวิท', 'โรงพยาบาลเอกชน', 'กรุงเทพมหานคร', 'วัฒนา'),
(15, 'BKK015', 'ศิริราช', 'โรงพยาบาลรัฐ', 'กรุงเทพมหานคร', 'บางกอกน้อย'),
(16, 'BKK006', 'โรงพยาบาลศิริราช ปิยมหาราชการุณย์', 'โรงพยาบาลมหาวิทยาลัย', 'กรุงเทพมหานคร', 'เขตบางกอกน้อย'),
(17, 'BKK011', 'โรงพยาบาลศูนย์การแพทย์สมเด็จพระเทพรัตน์', 'ศูนย์การแพทย์เฉพาะทาง', 'กรุงเทพมหานคร', 'เขตราชเทวี'),
(18, 'SGK001', 'สงขลานครินทร์', 'โรงพยาบาลรัฐ', 'สงขลา', 'หาดใหญ่'),
(19, 'KNK002', 'ศรีนครินทร์', 'โรงพยาบาลรัฐ', 'ขอนแก่น', 'เมืองขอนแก่น'),
(20, 'BKK002', 'โรงพยาบาลสินแพทย์', 'โรงพยาบาลเอกชน', 'กรุงเทพมหานคร', 'ห้วยขวาง'),
(21, 'BKK010', 'โรงพยาบาลเวชธานี', 'โรงพยาบาลเอกชน', 'กรุงเทพมหานคร', 'เขตบางกะปิ'),
(22, 'BKK007', 'วิภาวดี', 'โรงพยาบาลเอกชน', 'กรุงเทพมหานคร', 'จตุจักร');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(2, 'Admin'),
(1, 'Super_Admin'),
(3, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `specialties`
--

CREATE TABLE `specialties` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ชื่อความเชี่ยวชาญ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `specialties`
--

INSERT INTO `specialties` (`id`, `name`) VALUES
(1, 'อายุรกรรม'),
(2, 'ศัลยกรรม'),
(3, 'กุมารเวชกรรม'),
(4, 'นรีเวชกรรม'),
(5, 'หัวใจ'),
(6, 'จิตเวช');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_doctor_id` (`doctor_id`);

--
-- Indexes for table `bts_stations`
--
ALTER TABLE `bts_stations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_hospital_id` (`hospital_id`),
  ADD KEY `idx_specialty_id` (`specialty_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hospital_id` (`hospital_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bts_stations`
--
ALTER TABLE `bts_stations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_appointment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `fk_doctor_specialty` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
