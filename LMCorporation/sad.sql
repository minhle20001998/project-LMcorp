-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2020 at 05:29 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sad`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `CompanyID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`CompanyID`, `Name`, `Address`) VALUES
(1, 'LMCORP', '108 Cu Chinh Lan Thanh Xuan Ha Noi');

-- --------------------------------------------------------

--
-- Table structure for table `constract`
--

CREATE TABLE `constract` (
  `ContractID` int(11) NOT NULL,
  `Work_Hour` int(2) NOT NULL,
  `Role` varchar(50) NOT NULL,
  `Salary` int(11) NOT NULL,
  `EmployeeID` int(11) NOT NULL,
  `CompanyID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerID` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `PhoneNumber` varchar(15) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustomerID`, `Name`, `PhoneNumber`, `Email`, `Address`) VALUES
(12, 'Lê Quang Vinh', '0194456578', 'vinkwang@gmail.com', '64 Trần Hưng Đạo'),
(13, 'Hoàng Trung Hiếu', '0867460351', 'hieuthuhai@gmail.com', '45 Huỳnh Thúc Khoáng'),
(14, 'Lê Đức Long', '0174854362', 'longwibu@gmail.com', '1405 Tòa Nhà Artemis');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `EmployeeID` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `PhoneNumber` varchar(15) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `DOB` date NOT NULL,
  `Address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`EmployeeID`, `Name`, `PhoneNumber`, `Email`, `DOB`, `Address`) VALUES
(20, 'Lê Tuấn Minh', '0964460331', 'minhle20001998@gmail.com', '2000-09-24', '108 Cù Chính Lan'),
(23, 'Phạm Quốc Huy', '0954659598', 'huygreen@gmail.com', '2020-11-06', '56 Tạ Hiện'),
(24, 'Nguyễn Quốc Khánh', '0964460331', 'knq2000@gmail.com', '2020-11-21', '155 Nguyen Ngoc Nai');

-- --------------------------------------------------------

--
-- Table structure for table `performance`
--

CREATE TABLE `performance` (
  `PerformanceID` int(11) NOT NULL,
  `Complaint` varchar(255) NOT NULL,
  `Compliment` varchar(255) NOT NULL,
  `EmployeeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `ProjectID` int(11) NOT NULL,
  `Deadline` date NOT NULL,
  `Price` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `CustomerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`ProjectID`, `Deadline`, `Price`, `Title`, `CustomerID`) VALUES
(20, '2022-06-06', 15000, 'Read Dead Redemption 3', 14),
(21, '2023-05-09', 18000, 'GTA 6', 12),
(22, '2021-02-18', 750, 'Project Management System', 12);

-- --------------------------------------------------------

--
-- Table structure for table `project_team`
--

CREATE TABLE `project_team` (
  `Project_team_ID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `EmployeeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_team`
--

INSERT INTO `project_team` (`Project_team_ID`, `ProjectID`, `EmployeeID`) VALUES
(24, 20, 20),
(25, 21, 24),
(26, 22, 23);

-- --------------------------------------------------------

--
-- Table structure for table `register_user`
--

CREATE TABLE `register_user` (
  `register_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register_user`
--

INSERT INTO `register_user` (`register_id`, `username`, `password`, `email`) VALUES
(11, 'vinkwang', '$2b$10$Cw9in9HZqyPN7C8vRM8RzeihBXbGJgtRzIcTUED0eSTxazsRfmsPm', 'vinkwang@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `Email`) VALUES
(1, 'minhle', '$2b$10$B6lyRylmbBwA9eLq6bJsbuM5DMD/DrzauS2Dl.obri9E6Mz6oJ0LG', 'minhle20001998@gmail.com'),
(7, 'huygreen', '$2b$10$mCQbfqFZ/OOMfpfVDUeaX.f01.SInzayK5fR6DTdUWO670.zErZdC', 'huygreen@gmail.com'),
(8, 'vinhkwang', '$2b$10$.z7JfqxFYAH9JxtBzA5eeOZzHt5xeT8ZN64e9kSrP1uET5qGqm6PC', 'vinh@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`CompanyID`);

--
-- Indexes for table `constract`
--
ALTER TABLE `constract`
  ADD PRIMARY KEY (`ContractID`),
  ADD KEY `FK_CON_EM` (`EmployeeID`),
  ADD KEY `FK_CON_COM` (`CompanyID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EmployeeID`);

--
-- Indexes for table `performance`
--
ALTER TABLE `performance`
  ADD PRIMARY KEY (`PerformanceID`),
  ADD KEY `FK_PER_EM` (`EmployeeID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ProjectID`),
  ADD KEY `FK_PRO_CUS` (`CustomerID`);

--
-- Indexes for table `project_team`
--
ALTER TABLE `project_team`
  ADD PRIMARY KEY (`Project_team_ID`),
  ADD KEY `FK_PT_PRO` (`ProjectID`),
  ADD KEY `FK_PT_EM` (`EmployeeID`);

--
-- Indexes for table `register_user`
--
ALTER TABLE `register_user`
  ADD PRIMARY KEY (`register_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `CompanyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `constract`
--
ALTER TABLE `constract`
  MODIFY `ContractID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `PerformanceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `ProjectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `project_team`
--
ALTER TABLE `project_team`
  MODIFY `Project_team_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `register_user`
--
ALTER TABLE `register_user`
  MODIFY `register_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `constract`
--
ALTER TABLE `constract`
  ADD CONSTRAINT `constract_ibfk_1` FOREIGN KEY (`CompanyID`) REFERENCES `company` (`CompanyID`),
  ADD CONSTRAINT `constract_ibfk_2` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`);

--
-- Constraints for table `performance`
--
ALTER TABLE `performance`
  ADD CONSTRAINT `performance_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`);

--
-- Constraints for table `project_team`
--
ALTER TABLE `project_team`
  ADD CONSTRAINT `project_team_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`),
  ADD CONSTRAINT `project_team_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
