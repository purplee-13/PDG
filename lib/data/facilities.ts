export interface FacilityPackage {
    name: string;
    price: number;
    duration: string;
    timeRange: string;
}

export interface Facility {
    id: string;
    name: string;
    category: "Gedung" | "Lapangan" | "Stadion" | "Taman" | "Panggung" | "Mes";
    count: number;
    price: number;
    unitLabel?: string;
    image: string;
    description: string;
    address?: string;
    capacity?: string;
    packages?: FacilityPackage[];
}

export const facilities: Facility[] = [
    {
        id: "balai-ainun-habibie",
        name: "Balai Ainun Habibie",
        category: "Gedung",
        count: 4,
        price: 750000,
        unitLabel: "Paket",
        image: "https://pareparetourism.id/media/k2/items/cache/af2ef6a0e2c9c528b09655df79f3b312_XL.jpg",
        description: "Balai Ainun Haibie merupakan Gedung pusat kegiatan pemberdayaan masyarakat, terdiri atas ruang pameran kerajinan lantai 1, ruang pertemuan di lantai 2 dengan kapasitas 400 orang dan area santai dan menikmati pemandangan di lantai 3.",
        address: "Jalan Alwi Abdul jalil Habibie",
        capacity: "400 Orang",
        packages: [
            { name: "Full Day", price: 750000, duration: "9h 30min", timeRange: "07.30 - 17.00" },
            { name: "Sesi Malam", price: 750000, duration: "3h", timeRange: "19.00 - 22.00" },
            { name: "Sesi Pagi", price: 500000, duration: "5h", timeRange: "07.00 - 12.00" },
            { name: "Sesi Siang", price: 500000, duration: "5h", timeRange: "12.01 - 17.00" }
        ]
    },
    {
        id: "gedung-islamic-centre",
        name: "Gedung Islamic Centre",
        category: "Gedung",
        count: 7,
        price: 1000000,
        unitLabel: "Paket",
        image: "https://images.unsplash.com/photo-1542667593-947113824ee7?auto=format&fit=crop&q=80&w=800",
        description: "Pusat kegiatan keagamaan dan sosial Islam di Parepare."
    },
    {
        id: "lapangan-andi-makkasau",
        name: "Lapangan Andi Makkasau",
        category: "Lapangan",
        count: 4,
        price: 500000,
        unitLabel: "Sesi",
        image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800",
        description: "Lapangan utama kota untuk berbagai kegiatan olahraga dan upacara."
    },
    {
        id: "mes-pemda",
        name: "Mes Pemda",
        category: "Mes",
        count: 1,
        price: 250000,
        unitLabel: "Malam",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
        description: "Fasilitas penginapan milik pemerintah daerah."
    },
    {
        id: "lapangan-balai-kota",
        name: "Lapangan Balai Kota",
        category: "Lapangan",
        count: 1,
        price: 300000,
        unitLabel: "Sesi",
        image: "https://images.unsplash.com/photo-1533443913963-3c5826f9f706?auto=format&fit=crop&q=80&w=800",
        description: "Lapangan yang berada di kompleks Balai Kota Parepare."
    },
    {
        id: "taman-mattirotasi",
        name: "Taman Mattirotasi",
        category: "Taman",
        count: 2,
        price: 0,
        unitLabel: "Gratis",
        image: "https://images.unsplash.com/photo-1467385829985-2b0fb82b5193?auto=format&fit=crop&q=80&w=800",
        description: "Taman pesisir pantai untuk rekreasi keluarga."
    },
    {
        id: "lapangan-lemoe",
        name: "Lapangan Lemoe",
        category: "Lapangan",
        count: 1,
        price: 200000,
        unitLabel: "Sesi",
        image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=800",
        description: "Lapangan olahraga di wilayah Lemoe."
    },
    {
        id: "gedung-mario-pulana",
        name: "Gedung Mario Pulana",
        category: "Gedung",
        count: 3,
        price: 600000,
        unitLabel: "Paket",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        description: "Gedung serbaguna untuk berbagai acara komunitas."
    },
    {
        id: "lapangan-basket-jati-diri",
        name: "Lapangan Basket Jati Diri",
        category: "Lapangan",
        count: 5,
        price: 150000,
        unitLabel: "Jam",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
        description: "Fasilitas olahraga basket terbuka."
    },
    {
        id: "lapangan-tennis-jati-diri",
        name: "Lapangan Tennis Jati Diri",
        category: "Lapangan",
        count: 5,
        price: 150000,
        unitLabel: "Jam",
        image: "https://images.unsplash.com/photo-1595435064212-0104677c30ae?auto=format&fit=crop&q=80&w=800",
        description: "Fasilitas olahraga tennis lapangan."
    },
    {
        id: "gor-lompoe",
        name: "Gor Lompoe",
        category: "Stadion",
        count: 5,
        price: 400000,
        unitLabel: "Sesi",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        description: "Gedung Olahraga indoor untuk berbagai cabang olahraga."
    },
    {
        id: "stadion-bj-habibie",
        name: "Stadion BJ Habibie",
        category: "Stadion",
        count: 2,
        price: 5000000,
        unitLabel: "Hari",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
        description: "Stadion sepak bola utama kebanggaan warga Parepare."
    },
    {
        id: "panggung-salo-karajae",
        name: "Panggung Salo Karajae",
        category: "Panggung",
        count: 2,
        price: 1500000,
        unitLabel: "Event",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800",
        description: "Panggung pertunjukan budaya di tepi sungai Salo Karajae."
    },
    {
        id: "pelataran-monumen-cinta-habibie-ainun",
        name: "Pelataran Monumen Cinta Habibie Ainun",
        category: "Taman",
        count: 2,
        price: 0,
        unitLabel: "Gratis",
        image: "https://images.unsplash.com/photo-1519304116743-7590bd3012c4?auto=format&fit=crop&q=80&w=800",
        description: "Ikon landmark kota Parepare sebagai simbol cinta sejati."
    },
    {
        id: "tonrangeng-river-side",
        name: "Tonrangeng River Side",
        category: "Taman",
        count: 2,
        price: 0,
        unitLabel: "Gratis",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
        description: "Area rekreasi di bantaran sungai dengan pemandangan asri."
    },
    {
        id: "anjungan-cempae",
        name: "Anjungan Cempae",
        category: "Taman",
        count: 2,
        price: 0,
        unitLabel: "Gratis",
        image: "https://images.unsplash.com/photo-1514432324607-017d83230399?auto=format&fit=crop&q=80&w=800",
        description: "Anjungan terbuka untuk menikmati matahari terbenam."
    }
];
