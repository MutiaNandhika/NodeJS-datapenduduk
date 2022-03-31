-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Mar 2022 pada 06.09
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_penduduk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_keluarga`
--

CREATE TABLE `tbl_keluarga` (
  `id` int(11) NOT NULL,
  `nokk` varchar(100) NOT NULL,
  `nama_kep` varchar(100) NOT NULL,
  `nik_kep` varchar(255) NOT NULL,
  `jumlah` int(20) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `rt` int(11) NOT NULL,
  `rw` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tbl_keluarga`
--

INSERT INTO `tbl_keluarga` (`id`, `nokk`, `nama_kep`, `nik_kep`, `jumlah`, `alamat`, `rt`, `rw`) VALUES
(1, '12345678910', 'Andiono', '3103119189', 9, 'Jl. Sokayasa', 3, 3),
(4, '1234567865', 'Chen', '3103119100', 3, 'Jl. Jendral Gatot Soebroto', 24, 13);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_warga`
--

CREATE TABLE `tbl_warga` (
  `id` int(11) NOT NULL,
  `nik_warga` varchar(50) DEFAULT NULL,
  `nama_warga` varchar(100) DEFAULT NULL,
  `jenis_kelamin` varchar(50) DEFAULT NULL,
  `usia` int(11) DEFAULT NULL,
  `pendidikan` varchar(50) DEFAULT NULL,
  `pekerjaan` varchar(50) DEFAULT NULL,
  `kawin` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tbl_warga`
--

INSERT INTO `tbl_warga` (`id`, `nik_warga`, `nama_warga`, `jenis_kelamin`, `usia`, `pendidikan`, `pekerjaan`, `kawin`, `status`) VALUES
(1, '3103119128', 'Mutia Nandhika', 'Perempuan', 18, 'SMK', 'Pelajar', 'Belum', 'Anak'),
(3, '3103119199', 'Giselle', 'Perempuan', 21, 'Kuliah', 'Pelajar', 'Belum', 'Istri'),
(5, '3103119199', 'Sehun', 'Laki-Laki', 25, 'Sarjana', 'Penyanyi', 'Belum', 'Suami'),
(6, '3103119199', 'Winter', 'Perempuan', 18, 'Kuliah', 'Pelajar', 'Belum', 'Anak');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `the_email` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `the_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `the_email`, `nama`, `phone`, `the_password`) VALUES
(1, 'mutia@coba.com', 'Mutia', '081229938305', '123456789'),
(2, 'levi@gmail.com', 'levioi', '089988765542', '123456789'),
(3, 'kiki@gmail.com', 'Rizkiana', '0818280377', '12345678'),
(4, 'chen@gmail.com', 'Chen', '08123456789', '123456'),
(5, 'mutia@gmail.com', 'mutiandhk', '0818280377', '123456');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tbl_keluarga`
--
ALTER TABLE `tbl_keluarga`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tbl_warga`
--
ALTER TABLE `tbl_warga`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tbl_keluarga`
--
ALTER TABLE `tbl_keluarga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `tbl_warga`
--
ALTER TABLE `tbl_warga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
