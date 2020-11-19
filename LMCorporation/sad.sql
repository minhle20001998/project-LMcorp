-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2020 at 06:03 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

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

--
-- Dumping data for table `constract`
--

INSERT INTO `constract` (`ContractID`, `Work_Hour`, `Role`, `Salary`, `EmployeeID`, `CompanyID`) VALUES
(1, 8, 'Tester', 20000000, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerID` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustomerID`, `Name`, `Email`, `Address`) VALUES
(1, 'Le Minh', 'minhle20001998@gmail.com', '108 Cu Chinh Lan Thanh Xuan Ha Noi'),
(2, 'Le Tuan Anh', 'lta@gmail.com', '108 Cu Chinh Lan Thanh Xuan Ha Noi');

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
(1, 'Pham Quoc Huy', '0999999999', 'minhle20001998@gmail.com', '2020-01-13', 'Hai Ba Trung'),
(2, 'Le Tuan Minh', '0964460331', 'minhle20001998@gmail.com', '2020-01-13', '107 Thanh Xuan'),
(3, 'Le Tuan Duc', '01639330587', 'minhle2000@gmail.com', '2020-01-13', '108 Huynh Thuc Khang');

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
(1, '2020-11-28', 1000, 'Employee Management System', 1),
(2, '2020-11-27', 1250, 'system analysis and design', 2);

-- --------------------------------------------------------

--
-- Table structure for table `project_team`
--

CREATE TABLE `project_team` (
  `Project_team_ID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `EmployeeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`) VALUES
('minhle', '$2b$10$B6lyRylmbBwA9eLq6bJsbuM5DMD/DrzauS2Dl.obri9E6Mz6oJ0LG');

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
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `PerformanceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `ProjectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project_team`
--
ALTER TABLE `project_team`
  MODIFY `Project_team_ID` int(11) NOT NULL AUTO_INCREMENT;

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
