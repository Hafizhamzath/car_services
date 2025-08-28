import { Car, Bus } from "lucide-react";

/* ---- Flag SVGs ---- */
const UAEFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 640 480">
    <g fillRule="evenodd">
      <path fill="#00732f" d="M213.3 0h426.7v160H213.3z"/>
      <path fill="#fff" d="M213.3 160h426.7v160H213.3z"/>
      <path fill="#000" d="M213.3 320h426.7v160H213.3z"/>
      <path fill="#ff0000" d="M0 0h213.3v480H0z"/>
    </g>
  </svg>
);

const QatarFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 640 480">
    <path fill="#8d1b3d" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="M0 0h240v480H0z"/>
    <path fill="#fff" d="M240 0l60 20-60 20 60 20-60 20 60 20-60 20 60 20-60 20 60 20-60 20
      60 20-60 20 60 20-60 20 60 20-60 20 60 20-60 20V0z"/>
  </svg>
);

const KSAFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 640 480">
    <path fill="#006c35" d="M0 0h640v480H0z"/>
    <text
      x="50%"
      y="45%"
      fontSize="80"
      textAnchor="middle"
      fill="white"
      fontFamily="sans-serif"
    >
      ﷲ
    </text>
    <rect x="200" y="360" width="240" height="20" fill="white" />
  </svg>
);

const BahrainFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 640 480">
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#d71a28" d="M240 0h400v480H240z"/>
    <path
      fill="#fff"
      d="M240 0l60 40-60 40 60 40-60 40 60 40-60 40 60 40-60 40 60 40-60 40V0z"
    />
  </svg>
);

const KuwaitFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 640 480">
    <path fill="#007a3d" d="M0 0h640v160H0z"/>
    <path fill="#fff" d="M0 160h640v160H0z"/>
    <path fill="#ce1126" d="M0 320h640v160H0z"/>
    <path fill="#000" d="M0 0l240 160v160L0 480z"/>
  </svg>
);

/* ---- Config ---- */
export const COUNTRY_CODES = [
  { label: "UAE (+971)", value: "+971", flag: UAEFlag },
  { label: "Qatar (+974)", value: "+974", flag: QatarFlag },
  { label: "KSA (+966)", value: "+966", flag: KSAFlag },
  { label: "Bahrain (+973)", value: "+973", flag: BahrainFlag },
  { label: "Kuwait (+965)", value: "+965", flag: KuwaitFlag },
];

export const SERVICES = [
  { label: "Airport Services", value: "airport" },
  { label: "Hotel Transfer", value: "hotel" },
  { label: "Chauffeur Service", value: "chauffeur" },
  { label: "Corporate Transportation", value: "corporate" },
  { label: "Event Transportation", value: "event" },
  { label: "Group Transportation", value: "group" },
];

// Each category now has two specific vehicles to pick from
export const VEHICLES = [
  {
    value: "sedan",
    label: "Sedan",
    caption: "Elegant & discreet",
    icon: Car,
    models: ["Mercedes E-Class", "BMW 5 Series"],
  },
  {
    value: "suv",
    label: "SUV",
    caption: "Spacious comfort",
    icon: Car,
    models: ["Chevrolet Tahoe", "GMC Yukon"],
  },
  {
    value: "minibus",
    label: "Minibus",
    caption: "For small groups",
    icon: Bus,
    models: ["Mercedes Sprinter", "Toyota Hiace"],
  },
  {
    value: "bus",
    label: "Coach / Bus",
    caption: "Large parties & events",
    icon: Bus,
    models: ["Volvo Coach", "Scania Coach"],
  },
];

export const ADDONS = [
  { label: "Child Seat", value: "child_seat" },
  { label: "Meet & Greet", value: "meet_greet" },
  { label: "Extra Luggage", value: "extra_luggage" },
  { label: "Onboard Wi-Fi", value: "wifi" },
  { label: "Wheelchair Assistance", value: "wheelchair" },
  { label: "Bottled Water", value: "water" },
];
