/* Progress bar + navbar blur saat scroll */
const bar = document.querySelector<HTMLElement>(".progress");
const nav = document.querySelector<HTMLElement>(".nav");
let ticking = false;

function updateScroll(): void {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  nav?.classList.toggle("scrolled", y > 24);
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  },
  { passive: true }
);
updateScroll();

/* Menu navigasi mobile */
const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
const navMenu = document.querySelector<HTMLElement>("#nav-menu");

function closeMenu(): void {
  nav?.classList.remove("menu-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("menu-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
});

navMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("click", (e) => {
  if (nav?.classList.contains("menu-open") && !nav.contains(e.target as Node)) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

/* Elemen muncul halus saat masuk layar */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);
document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => revealObserver.observe(el));

/* Lightbox untuk foto */
const lightbox = document.querySelector<HTMLElement>("#lightbox");
const lbImg = lightbox?.querySelector<HTMLImageElement>("img") ?? null;
const lbClose = lightbox?.querySelector<HTMLButtonElement>(".lb-close") ?? null;
let lastFocus: HTMLElement | null = null;

function openLightbox(src: string, alt: string): void {
  if (!lightbox || !lbImg) return;
  lastFocus = document.activeElement as HTMLElement | null;
  lbImg.src = src;
  lbImg.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lbClose?.focus();
}

function closeLightbox(): void {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
  lastFocus?.focus();
}

document.querySelectorAll<HTMLButtonElement>(".zoom").forEach((btn) => {
  btn.addEventListener("click", () => openLightbox(btn.dataset.src ?? "", btn.dataset.alt ?? ""));
});

lightbox?.addEventListener("click", (e) => {
  if (e.target !== lbImg) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});