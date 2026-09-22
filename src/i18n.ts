export type Language = 'en' | 'hi' | 'ta' | 'es';

export interface TranslationStrings {
  tagline: string;
  heroSub: string;
  scanBtn: string;
  communityBtn: string;
  riskIndex: string;
  whatYouMightMiss: string;
  costCheck: string;
  beforeYouPay: string;
  reportDesign: string;
  calendarReminder: string;
  avoidSurprise: string;
  disclaimer: string;
  uploadPrompt: string;
  flagged: string;
  notDeceptive: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    tagline: "See the trap. Know the cost. Choose before you pay.",
    heroSub: "BetYouPay uses AI to help you spot potentially deceptive checkout and subscription designs before you click Pay.",
    scanBtn: "Scan a Screenshot",
    communityBtn: "Community Reports",
    riskIndex: "BetYouPay Risk Index",
    whatYouMightMiss: "👀 What You Might Miss",
    costCheck: "💰 Cost Check",
    beforeYouPay: "🧾 Before You Pay",
    reportDesign: "Report This Design",
    calendarReminder: "📅 Set Calendar Alert",
    avoidSurprise: "Avoid Surprise Renewals",
    disclaimer: "BetYouPay provides AI-assisted analysis for awareness and does not determine whether a business is fraudulent.",
    uploadPrompt: "Upload a checkout screenshot and we'll look for things you might miss.",
    flagged: "Flagged",
    notDeceptive: "Not deceptive"
  },
  hi: {
    tagline: "जाल को पहचानें। लागत जानें। भुगतान से पहले चुनें।",
    heroSub: "BetYouPay भुगतान करने से पहले छिपे हुए शुल्क और भ्रामक डिज़ाइनों का पता लगाने में मदद करता है।",
    scanBtn: "स्क्रीनशॉट स्कैन करें",
    communityBtn: "कम्युनिटी रिपोर्ट्स",
    riskIndex: "जोखिम सूचकांक (Risk Index)",
    whatYouMightMiss: "👀 जो आप नज़रअंदाज़ कर सकते हैं",
    costCheck: "💰 लागत जाँच",
    beforeYouPay: "🧾 भुगतान करने से पहले",
    reportDesign: "इस डिज़ाइन की शिकायत करें",
    calendarReminder: "📅 कैलेंडर रिमाइंडर जोड़ें",
    avoidSurprise: "अनपेक्षित बिलिंग से बचें",
    disclaimer: "BetYouPay केवल जागरूकता के लिए AI विश्लेषण प्रदान करता है और किसी व्यवसाय को धोखेबाज़ घोषित नहीं करता।",
    uploadPrompt: "चेकआउट स्क्रीनशॉट अपलोड करें, हम छिपे हुए नियम और शुल्क ढूंढेंगे।",
    flagged: "संदिग्ध माना गया",
    notDeceptive: "पारदर्शी"
  },
  ta: {
    tagline: "வலையைக் கண்டறியவும். கட்டணத்தை அறியவும். செலுத்தும் முன் தேர்வு செய்யவும்.",
    heroSub: "BetYouPay பணம் செலுத்தும் முன் மறைக்கப்பட்ட கட்டணங்கள் மற்றும் ஏமாற்றும் வடிவமைப்புகளைக் கண்டறிய உதவுகிறது.",
    scanBtn: "ஸ்கிரீன்ஷாட்டை ஸ்கேன் செய்",
    communityBtn: "சமூக அறிக்கைகள்",
    riskIndex: "அபாயக் குறியீடு (Risk Index)",
    whatYouMightMiss: "👀 நீங்கள் தவறவிடக்கூடியவை",
    costCheck: "💰 கட்டண சரிபார்ப்பு",
    beforeYouPay: "🧾 பணம் செலுத்தும் முன்",
    reportDesign: "புகாரளிக்கவும்",
    calendarReminder: "📅 நினைவூட்டல் சேர்",
    avoidSurprise: "திடீர் புதுப்பித்தல் கட்டணங்களைத் தவிர்க்கவும்",
    disclaimer: "BetYouPay விழிப்புணர்வுக்கான AI பகுப்பாய்வை மட்டுமே வழங்குகிறது.",
    uploadPrompt: "ஸ்கிரீன்ஷாட்டைப் பதிவேற்றுங்கள், மறைக்கப்பட்ட கட்டணங்களை நாங்கள் தேடுவோம்.",
    flagged: "புகாரளிக்கப்பட்டது",
    notDeceptive: "நேர்மையானது"
  },
  es: {
    tagline: "Mira la trampa. Conoce el costo. Elige antes de pagar.",
    heroSub: "BetYouPay usa IA para detectar diseños engañosos y cargos ocultos antes de hacer clic en Pagar.",
    scanBtn: "Escanear captura",
    communityBtn: "Reportes comunitarios",
    riskIndex: "Índice de riesgo BetYouPay",
    whatYouMightMiss: "👀 Lo que podrías pasar por alto",
    costCheck: "💰 Verificación de costos",
    beforeYouPay: "🧾 Antes de pagar",
    reportDesign: "Reportar este diseño",
    calendarReminder: "📅 Guardar recordatorio",
    avoidSurprise: "Evita renovaciones sorpresa",
    disclaimer: "BetYouPay proporciona análisis asistido por IA solo para concientización y no determina fraude.",
    uploadPrompt: "Sube una captura de pago y buscaremos lo que podrías perder de vista.",
    flagged: "Marcado",
    notDeceptive: "No engañoso"
  }
};
