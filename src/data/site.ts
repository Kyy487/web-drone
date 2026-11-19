export interface NavItem {
  label: string;
  href: string;
}
export interface Stat {
  value: string;
  label: string;
}
export interface Member {
  name: string;
  role: string;
  img?: string;
  position?: string;
  zoom?: number;
}
export interface MediaItem {
  label: string;
  img: string;
  autoplay?: boolean;
}
export interface DocItem {
  title: string;
  desc: string;
  label: string;
  img: string;
}

export const WA_NUMBER = "62895339900904"; // format internasional, hanya angka
export const EMAIL = "emailkamu@contoh.com"; // ganti dengan email asli
export const INSTAGRAM = "https://www.instagram.com/astraversa_";

export const NAV: NavItem[] = [
  { label: "Drones", href: "#produk" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Testing", href: "#testing" },
  { label: "Docs", href: "#dokumentasi" },
  { label: "Contact", href: "#kontak" },
];

export const STATS: Stat[] = [
  { value: "20 Min", label: "Waktu Terbang Maksimal" },
  { value: "MAP", label: "Real Time" },
  { value: "5 KM", label: "Jarak Operasional Maksimal" },
];

export const TEAM: Member[] = [
  { name: "Zakhwa Aliya", role: "Penanggung Jawab", img: "/gambar/team/Zakhwa.JPG", position: "center 20%" },
  { name: "Farhan Kamil", role: "AI Engineer", img: "/gambar/team/Farhan.JPG" },
  { name: "Najwa Hikmatyar", role: "Project Manager", img: "/gambar/team/Najwa.JPG", position: "center 30%" },
  { name: "Fathan Kairu", role: "UI/UX Designer", img: "/gambar/team/Fathan.JPG" },
  {
    name: "Moch Riezky Dwi Kuswanto",
    role: "Web Developer,",
    img: "/gambar/team/riezky.jpg",
    position: "center 25%",
    zoom: 2.15,
  },
];

export const TEST_PHOTOS: MediaItem[] = [
  { label: "Foto testing 1", img: "/gambar/testing_1.JPG" },
  { label: "Foto testing 2", img: "/gambar/testing_2.JPG" },
  { label: "Foto testing 3", img: "/gambar/testing_3.JPG" },
  { label: "Dashboard", img: "/gambar/Dashboard.png" },
  { label: "Video pendek", img: "/gambar/pendek.mp4", autoplay: true },
];

export const MAIN_VIDEO = { src: "/gambar/Video.mp4", poster: "/gambar/Drone.png" };

export const DOCS: DocItem[] = [
  { title: "Tahap 1", desc: "Perakitan Komponen", label: "Foto perakitan", img: "/gambar/perakitan1.jpeg" },
  { title: "Tahap 2", desc: "Program dan Kalibrasi", label: "Foto program dan kalibrasi", img: "/gambar/perakitan2.JPG" },
  { title: "Tahap 3", desc: "Kai ganteng", label: "Foto hasil akhir", img: "/gambar/perakitan3.png" },
];