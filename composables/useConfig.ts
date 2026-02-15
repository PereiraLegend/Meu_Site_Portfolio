// =============================================================================
// Site Configuration - Lucas Pereira Portfolio
// Edit ONLY this file to customize all content across the site.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string
  description: string
  language: string
}

export const siteConfig: SiteConfig = {
  title: "Lucas Pereira | Desenvolvedor Full Stack & Tech Lead",
  description: "Portfólio de Lucas Pereira - Desenvolvedor Full Stack Pleno e Tech Lead especializado em React, Node.js, Python, Flutter e mais. Bacharel em Ciências da Computação e Pós-graduado em Engenharia de Software.",
  language: "pt-BR",
}

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string
  sectionId: string
  icon: "disc" | "play" | "calendar" | "music"
}

export interface HeroConfig {
  backgroundImage: string
  brandName: string
  decodeText: string
  decodeChars: string
  subtitle: string
  ctaPrimary: string
  ctaPrimaryTarget: string
  ctaSecondary: string
  ctaSecondaryTarget: string
  cornerLabel: string
  cornerDetail: string
  navItems: HeroNavItem[]
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  brandName: "LUCAS PEREIRA",
  decodeText: "FULL STACK",
  decodeChars: "DEV",
  subtitle: "Desenvolvedor Full Stack Pleno & Tech Lead | Transformando ideias em soluções digitais robustas e escaláveis",
  ctaPrimary: "Ver Projetos",
  ctaPrimaryTarget: "gallery",
  ctaSecondary: "Contato",
  ctaSecondaryTarget: "contact",
  cornerLabel: "DISPONÍVEL",
  cornerDetail: "Para Freelance & Projetos",
  navItems: [
    { label: "Tecnologias", sectionId: "tech", icon: "disc" },
    { label: "Projetos", sectionId: "gallery", icon: "play" },
    { label: "Experiência", sectionId: "experience", icon: "calendar" },
    { label: "Contato", sectionId: "contact", icon: "music" },
  ],
}

// -- Tech Cube Section (adapted from Album Cube) ------------------------------
export interface Album {
  id: number
  title: string
  subtitle: string
  image: string
}

export interface AlbumCubeConfig {
  albums: Album[]
  cubeTextures: string[]
  scrollHint: string
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    { id: 1, title: "REACT", subtitle: "ECOSSISTEMA", image: "/tech-react.jpg" },
    { id: 2, title: "NODE.JS", subtitle: "BACKEND", image: "/tech-node.jpg" },
    { id: 3, title: "PYTHON", subtitle: "FULL STACK", image: "/tech-python.jpg" },
    { id: 4, title: "FLUTTER", subtitle: "MOBILE", image: "/tech-flutter.jpg" },
  ],
  cubeTextures: [
    "/tech-react.jpg",
    "/tech-node.jpg",
    "/tech-python.jpg",
    "/tech-flutter.jpg",
    "/tech-java.jpg",
    "/tech-database.jpg",
  ],
  scrollHint: "Explore as tecnologias",
}

// -- Parallax Gallery Section (Projects) --------------------------------------
export interface ParallaxImage {
  id: number
  src: string
  alt: string
}

export interface GalleryImage {
  id: number
  src: string
  title: string
  date: string
}

export interface ParallaxGalleryConfig {
  sectionLabel: string
  sectionTitle: string
  galleryLabel: string
  galleryTitle: string
  marqueeTexts: string[]
  endCtaText: string
  parallaxImagesTop: ParallaxImage[]
  parallaxImagesBottom: ParallaxImage[]
  galleryImages: GalleryImage[]
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "TECNOLOGIAS",
  sectionTitle: "STACK COMPLETO",
  galleryLabel: "PORTFÓLIO",
  galleryTitle: "PROJETOS ENTREGUES",
  marqueeTexts: [
    "REACT • NEXT.JS • NODE.JS • PYTHON •",
    "FLUTTER • REACT NATIVE • DJANGO •",
    "TYPESCRIPT • JAVASCRIPT • JAVA •",
    "POSTGRESQL • MONGODB • FIREBASE •",
  ],
  endCtaText: "Vamos criar algo incrível juntos?",
  parallaxImagesTop: [
    { id: 1, src: "/project-1.jpg", alt: "Projeto Web" },
    { id: 2, src: "/project-2.jpg", alt: "App Mobile" },
    { id: 3, src: "/project-3.jpg", alt: "Dashboard" },
    { id: 4, src: "/project-4.jpg", alt: "E-commerce" },
    { id: 5, src: "/project-5.jpg", alt: "API REST" },
    { id: 6, src: "/project-6.jpg", alt: "Sistema Web" },
  ],
  parallaxImagesBottom: [
    { id: 1, src: "/tech-1.jpg", alt: "React" },
    { id: 2, src: "/tech-2.jpg", alt: "Node.js" },
    { id: 3, src: "/tech-3.jpg", alt: "Python" },
    { id: 4, src: "/tech-4.jpg", alt: "Flutter" },
    { id: 5, src: "/tech-5.jpg", alt: "Database" },
    { id: 6, src: "/tech-6.jpg", alt: "Cloud" },
  ],
  galleryImages: [
    { id: 1, src: "/gallery-1.jpg", title: "Sistema de Gestão", date: "2024" },
    { id: 2, src: "/gallery-2.jpg", title: "App de Delivery", date: "2024" },
    { id: 3, src: "/gallery-3.jpg", title: "E-commerce", date: "2023" },
    { id: 4, src: "/gallery-4.jpg", title: "Dashboard Analytics", date: "2023" },
    { id: 5, src: "/gallery-5.jpg", title: "API RESTful", date: "2023" },
    { id: 6, src: "/gallery-6.jpg", title: "App Financeiro", date: "2022" },
  ],
}

// -- Experience Section (adapted from Tour Schedule) --------------------------
export interface TourDate {
  id: number
  date: string
  time: string
  city: string
  venue: string
  status: "on-sale" | "sold-out" | "coming-soon"
  image: string
}

export interface TourStatusLabels {
  onSale: string
  soldOut: string
  comingSoon: string
  default: string
}

export interface TourScheduleConfig {
  sectionLabel: string
  sectionTitle: string
  vinylImage: string
  buyButtonText: string
  detailsButtonText: string
  bottomNote: string
  bottomCtaText: string
  statusLabels: TourStatusLabels
  tourDates: TourDate[]
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "TRAJETÓRIA",
  sectionTitle: "EXPERIÊNCIA PROFISSIONAL",
  vinylImage: "/vinyl.png",
  buyButtonText: "Ver Detalhes",
  detailsButtonText: "Mais Info",
  bottomNote: "Sempre em busca de novos desafios",
  bottomCtaText: "Vamos trabalhar juntos",
  statusLabels: {
    onSale: "ATUAL",
    soldOut: "CONCLUÍDO",
    comingSoon: "PRÓXIMO",
    default: "VER",
  },
  tourDates: [
    {
      id: 1,
      date: "2025.02",
      time: "ATUAL",
      city: "Tech Lead & Full Stack",
      venue: "Medsafe Brasil",
      status: "on-sale",
      image: "/exp-medsafe.jpg",
    },
    {
      id: 2,
      date: "2024.07",
      time: "9 MESES",
      city: "Desenvolvedor Full Stack",
      venue: "CodeFreela",
      status: "sold-out",
      image: "/exp-codefreela.jpg",
    },
    {
      id: 3,
      date: "2023.08",
      time: "7 MESES",
      city: "Estagiário de TI",
      venue: "GP1 Portal de Notícias",
      status: "sold-out",
      image: "/exp-gp1.jpg",
    },
    {
      id: 4,
      date: "2020.01",
      time: "5 ANOS+",
      city: "Desenvolvedor Freelancer",
      venue: "Projetos Independentes",
      status: "on-sale",
      image: "/exp-freelancer.jpg",
    },
  ],
}

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number
  src: string
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music"
  label: string
  href: string
}

export interface FooterConfig {
  portraitImage: string
  portraitAlt: string
  heroTitle: string
  heroSubtitle: string
  artistLabel: string
  artistName: string
  artistSubtitle: string
  brandName: string
  brandDescription: string
  quickLinksTitle: string
  quickLinks: string[]
  contactTitle: string
  emailLabel: string
  email: string
  phoneLabel: string
  phone: string
  addressLabel: string
  address: string
  newsletterTitle: string
  newsletterDescription: string
  newsletterButtonText: string
  subscribeAlertMessage: string
  copyrightText: string
  bottomLinks: string[]
  socialLinks: SocialLink[]
  galleryImages: FooterImage[]
}

export const footerConfig: FooterConfig = {
  portraitImage: "/portrait.jpg",
  portraitAlt: "Lucas Pereira - Desenvolvedor Full Stack",
  heroTitle: "VAMOS",
  heroSubtitle: "CRIAR ALGO INCRÍVEL",
  artistLabel: "DESENVOLVEDOR",
  artistName: "LUCAS PEREIRA",
  artistSubtitle: "Full Stack Pleno & Tech Lead",
  brandName: "LUCAS PEREIRA",
  brandDescription: "Desenvolvedor Full Stack apaixonado por tecnologia, com experiência em desenvolvimento web, mobile e liderança técnica. Especializado em criar soluções escaláveis e de alta performance.",
  quickLinksTitle: "Links Rápidos",
  quickLinks: ["Tecnologias", "Projetos", "Experiência", "Contato"],
  contactTitle: "Contato",
  emailLabel: "Email",
  email: "pereirapro123@gmail.com",
  phoneLabel: "Telefone",
  phone: "(86) 99880-7200",
  addressLabel: "Localização",
  address: "Teresina - Piauí, Brasil",
  newsletterTitle: "Newsletter",
  newsletterDescription: "Receba novidades sobre tecnologia e projetos",
  newsletterButtonText: "Inscrever",
  subscribeAlertMessage: "Obrigado por se inscrever! Em breve você receberá novidades.",
  copyrightText: "© 2025 Lucas Pereira. Todos os direitos reservados.",
  bottomLinks: ["LinkedIn", "GitHub", "Portfólio"],
  socialLinks: [
    { icon: "instagram", label: "LinkedIn", href: "https://www.linkedin.com/in/lucas-pereira-1bb851201" },
    { icon: "twitter", label: "GitHub", href: "https://github.com/PereiraLegend" },
    { icon: "youtube", label: "Site", href: "https://lucaspereira.netlify.app/" },
  ],
  galleryImages: [
    { id: 1, src: "/footer-1.jpg" },
    { id: 2, src: "/footer-2.jpg" },
    { id: 3, src: "/footer-3.jpg" },
    { id: 4, src: "/footer-4.jpg" },
  ],
}
