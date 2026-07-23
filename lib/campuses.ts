export interface CampusBank {
  bank: string;
  accountName: string;
  accountNumber: string;
}

export interface Campus {
  id: string;
  name: string;
  shortAddress: string;
  address: string;
  mapEmbed: string;
  mapLink: string;
  phone: string;
  email: string;
  serviceTimes: { day: string; time: string }[];
  image: string;
  bank?: CampusBank;
}

// ─────────────────────────────────────────────
// Campus data — single source of truth, shared by the Contact page's
// location selector, the Give page's per-campus accounts, the Footer,
// and the /campuses showcase page. Add more campuses here as needed.
// ─────────────────────────────────────────────
export const CAMPUSES: Campus[] = [
  {
    id: "wuse",
    name: "Wuse Campus",
    shortAddress: "Jabi, FCT Abuja",
    address: "Suite 350, Dominion Hub\nRock of Ages Mall, Jabi\nFCT Abuja",
    mapEmbed:
      "https://maps.google.com/maps?q=Suite+350+Dominion+Hub+Rock+of+Ages+Mall+Jabi+Abuja&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Suite+350+Dominion+Hub+Rock+of+Ages+Mall+Jabi+Abuja",
    phone: "+234 701 914 5771 / +234 814 629 0513",
    email: "teliosisworldoutreach@gmail.com",
    serviceTimes: [{ day: "Last Saturday of Every Month", time: "4:00 PM – 7:00 PM" }],
    image: "/assets/aboutpage-hero.jpg",
    bank: {
      bank: "UBA BANK",
      accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLY CAMPUS 2",
      accountNumber: "1029796165",
    },
  },
  {
    id: "tudunwada",
    name: "Tudunwada Campus",
    shortAddress: "Lugbe, Abuja",
    address: "After Catholic Church\nSauka Road, Tudunwada\nFHA Lugbe, Abuja",
    // FIX: Using exact coordinates extracted from the Google Maps link for a precise pin
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.3571170132373!2d7.363908625571797!3d8.998421113006497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e71e79b74fb25%3A0x6a996a6047010166!2sTeliosis%20World%20Outreach!5e0!3m2!1sen!2sng!4v1779930787918!5m2!1sen!2sng",
    mapLink: "https://www.google.com/maps/place/Teliosis+World+Outreach/@8.9984211,7.3639086,18z",
    phone: "+234 701 914 5771 / +234 814 629 0513",
    email: "teliosisworldoutreach@gmail.com",
    serviceTimes: [
      { day: "Sunday", time: "8:00 AM & 10:00 AM" },
      { day: "Wednesday", time: "6:00 PM" },
    ],
    image: "/assets/hero-background.png",
    bank: {
      bank: "UBA BANK",
      accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLY",
      accountNumber: "1029796000",
    },
  },
  {
    id: "zhidu",
    name: "Zhidu Campus",
    shortAddress: "FHA Lugbe, Abuja",
    address: "King of Peace Hotel\nZhidu, FHA Lugbe\nAbuja",
    // NOTE: Zhidu not yet on Google Maps — using address string until registered
    mapEmbed:
      "https://maps.google.com/maps?q=King+of+Peace+Hotel+Zhidu+FHA+Lugbe+Abuja&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=King+of+Peace+Hotel+Zhidu+FHA+Lugbe+Abuja",
    phone: "+234 701 914 5771 / +234 814 629 0513",
    email: "teliosisworldoutreach@gmail.com",
    serviceTimes: [
      { day: "Sunday", time: "8:00 AM" },
      { day: "Tuesday", time: "6:00 PM" },
      { day: "Friday", time: "6:00 PM" },
    ],
    image: "/assets/about-hero-image.jpg",
    bank: {
      bank: "UBA BANK",
      accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLY CAMPUS 3",
      accountNumber: "1029794817",
    },
  },
];
