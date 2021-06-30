-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 30, 2021 at 08:30 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `codespace_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `id` int(11) NOT NULL,
  `badge_name` varchar(255) NOT NULL,
  `badge_price` varchar(255) NOT NULL,
  `badge_collection` int(11) NOT NULL,
  `badge_description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`id`, `badge_name`, `badge_price`, `badge_collection`, `badge_description`) VALUES
(1, 'HTML Gold', '500', 1, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(2, 'HTML Silver', '280', 1, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(3, 'HTML Bronze', '170', 1, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(4, 'CSS Gold', '500', 2, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(5, 'CSS Silver', '280', 2, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(6, 'CSS Bronze', '170', 2, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(7, 'JS Gold', '500', 3, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(8, 'JS Silver', '280', 3, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.'),
(9, 'JS Bronze', '170', 3, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi qui molestiae soluta possimus cum. Odio esse eaque accusantium aperiam,                                  sapiente ex minima quasi? Hic amet doloremque illo, id placeat voluptatem consequatur officia numquam quam, laborum voluptas! Modi blanditiis                                  animi obcaecati? Deleniti odio quasi sunt in, beatae quaerat iusto vero reiciendis.');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `collection_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `collection_name`) VALUES
(1, 'HTML Collection'),
(2, 'CSS Collection'),
(3, 'Javascript Collection');

-- --------------------------------------------------------

--
-- Table structure for table `members_collections`
--

CREATE TABLE `members_collections` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `badge_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collection` (`badge_collection`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members_collections`
--
ALTER TABLE `members_collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `badge_id` (`badge_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `members_collections`
--
ALTER TABLE `members_collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `badges`
--
ALTER TABLE `badges`
  ADD CONSTRAINT `collection` FOREIGN KEY (`badge_collection`) REFERENCES `collections` (`id`);

--
-- Constraints for table `members_collections`
--
ALTER TABLE `members_collections`
  ADD CONSTRAINT `badge_id` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`),
  ADD CONSTRAINT `member_id` FOREIGN KEY (`member_id`) REFERENCES `users` (`id`);
