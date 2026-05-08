import { siteImages } from "./images";

export type Locale = "el" | "en";

export type ServiceContent = {
  id: string;
  image: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  body: Record<Locale, string>;
  offers: Record<Locale, string[]>;
  audience: Record<Locale, string[]>;
  panel: {
    title: Record<Locale, string>;
    text: Record<Locale, string>;
  };
  keywords: Record<Locale, string[]>;
};

export const servicesContent: ServiceContent[] = [
  {
    id: "financial-planning",
    image: siteImages.services.financialPlanning,
    title: {
      el: "Οικονομικός Σχεδιασμός & Business Control",
      en: "Financial Planning & Business Control",
    },
    summary: {
      el: "Οικονομική εικόνα, προβλέψεις και δείκτες που βοηθούν την επιχείρηση να αποφασίζει με δεδομένα.",
      en: "Financial visibility, forecasts and indicators that help the business make data-informed decisions.",
    },
    body: {
      el: "Δημιουργούμε πρακτικά οικονομικά μοντέλα και αναφορές που συνδέουν έσοδα, κόστος, περιθώρια και λειτουργικές ανάγκες. Στόχος είναι ο επιχειρηματίας να έχει καθαρή εικόνα για το πού βρίσκεται η επιχείρηση και ποιες κινήσεις έχουν προτεραιότητα.",
      en: "We build practical financial models and reports that connect revenue, cost, margins and operational needs. The goal is to give the business owner a clear view of performance and priorities.",
    },
    offers: {
      el: ["Οικονομικό μοντέλο και προβλέψεις", "Ανάλυση εσόδων, κόστους και περιθωρίων", "KPIs και reporting για αποφάσεις", "Σενάρια κερδοφορίας και ανάπτυξης"],
      en: ["Financial model and forecasts", "Revenue, cost and margin analysis", "KPIs and decision-focused reporting", "Profitability and growth scenarios"],
    },
    audience: {
      el: ["Εστιατόρια και cafe που θέλουν καλύτερο έλεγχο", "Ξενοδοχεία και τουριστικές επιχειρήσεις", "Νέες επιχειρήσεις πριν ή μετά το άνοιγμα", "Ομάδες που χρειάζονται πιο καθαρό reporting"],
      en: ["Restaurants and cafes seeking stronger control", "Hotels and tourism businesses", "New businesses before or after launch", "Teams that need clearer reporting"],
    },
    panel: {
      title: { el: "Πρώτη αποτύπωση οικονομικής εικόνας", en: "Initial financial picture review" },
      text: {
        el: "Στην πρώτη συζήτηση βλέπουμε το μοντέλο λειτουργίας, τα διαθέσιμα δεδομένα και τα σημεία όπου χρειάζεται καλύτερος έλεγχος.",
        en: "In the first discussion we review the operating model, available data and the areas where stronger control is needed.",
      },
    },
    keywords: {
      el: ["οικονομικός σχεδιασμός εστίασης", "business control", "HORECA consulting Αθήνα"],
      en: ["hospitality financial planning", "business control", "HORECA consulting Greece"],
    },
  },
  {
    id: "product-costing",
    image: siteImages.services.productCosting,
    title: {
      el: "Κοστολόγηση Προϊόντων & Υπηρεσιών",
      en: "Product & Service Costing",
    },
    summary: {
      el: "Ακριβής εικόνα κόστους ανά προϊόν, υπηρεσία ή λειτουργική μονάδα.",
      en: "Accurate cost visibility per product, service or operating unit.",
    },
    body: {
      el: "Υπολογίζουμε πραγματικό κόστος, περιθώρια και κρίσιμες αποκλίσεις, ώστε οι τιμές και οι εμπορικές αποφάσεις να βασίζονται σε καθαρή εικόνα και όχι σε εκτιμήσεις.",
      en: "We calculate real cost, margins and critical variances so pricing and commercial decisions are based on clarity rather than assumptions.",
    },
    offers: {
      el: ["Κοστολόγηση συνταγών και προϊόντων", "Ανάλυση food cost και beverage cost", "Υπολογισμός περιθωρίων κέρδους", "Εντοπισμός αποκλίσεων και διορθωτικών κινήσεων"],
      en: ["Recipe and product costing", "Food cost and beverage cost analysis", "Margin calculation", "Variance detection and corrective actions"],
    },
    audience: {
      el: ["Επιχειρήσεις με ασαφή εικόνα κόστους", "Ομάδες που ανανεώνουν κατάλογο", "Νέα concepts πριν την τιμολόγηση", "Επιχειρήσεις με πίεση στα περιθώρια"],
      en: ["Businesses with unclear cost visibility", "Teams updating a menu", "New concepts before pricing", "Businesses under margin pressure"],
    },
    panel: {
      title: { el: "Κοστολόγηση με πρακτική εφαρμογή", en: "Costing with practical application" },
      text: {
        el: "Η δουλειά δεν σταματά στον υπολογισμό. Συνδέουμε την κοστολόγηση με τιμές, προμήθειες και καθημερινή λειτουργία.",
        en: "The work does not stop at calculation. We connect costing with prices, procurement and daily operations.",
      },
    },
    keywords: {
      el: ["κοστολόγηση εστιατορίου", "food cost", "κοστολόγηση προϊόντων HORECA"],
      en: ["restaurant costing", "food cost", "HORECA product costing"],
    },
  },
  {
    id: "pricing-policy",
    image: siteImages.services.pricingPolicy,
    title: {
      el: "Τιμολογιακή Πολιτική & Price Setting",
      en: "Pricing Policy & Price Setting",
    },
    summary: {
      el: "Τιμές που συνδέουν κόστος, αγορά, positioning και στόχους κερδοφορίας.",
      en: "Prices that connect cost, market positioning and profitability goals.",
    },
    body: {
      el: "Σχεδιάζουμε τιμολογιακή λογική που λαμβάνει υπόψη κόστος, ζήτηση, ανταγωνισμό, αντιληπτή αξία και εμπορικούς στόχους. Η τιμή γίνεται εργαλείο στρατηγικής και όχι απλή μαθηματική άσκηση.",
      en: "We design pricing logic that considers cost, demand, competition, perceived value and commercial goals. Pricing becomes a strategic tool rather than a simple calculation.",
    },
    offers: {
      el: ["Ανάλυση τρέχουσας τιμολογιακής πολιτικής", "Προτάσεις τιμών ανά κατηγορία", "Σύνδεση τιμών με περιθώρια", "Υποστήριξη σε menu engineering"],
      en: ["Current pricing policy analysis", "Price recommendations by category", "Price-to-margin alignment", "Menu engineering support"],
    },
    audience: {
      el: ["Επιχειρήσεις που δεν ξέρουν αν οι τιμές τους αποδίδουν", "Brands που αλλάζουν positioning", "Ομάδες που θέλουν καθαρή εμπορική στρατηγική", "Επιχειρήσεις με αυξημένο κόστος πρώτων υλών"],
      en: ["Businesses unsure whether their prices perform", "Brands changing positioning", "Teams seeking a clearer commercial strategy", "Businesses facing increased ingredient costs"],
    },
    panel: {
      title: { el: "Τιμές με εμπορική λογική", en: "Pricing with commercial logic" },
      text: {
        el: "Εξετάζουμε τιμές, κόστος, κατάλογο και στόχους ώστε η εμπορική εικόνα να είναι συνεπής και κερδοφόρα.",
        en: "We review prices, cost, menu and goals so the commercial picture is consistent and profitable.",
      },
    },
    keywords: {
      el: ["τιμολογιακή πολιτική εστίασης", "price setting", "menu engineering"],
      en: ["restaurant pricing strategy", "price setting", "menu engineering"],
    },
  },
  {
    id: "operations-organization",
    image: siteImages.services.operationsOrganization,
    title: {
      el: "Λειτουργική Οργάνωση & SOPs",
      en: "Operations Organization & SOPs",
    },
    summary: {
      el: "Διαδικασίες, ρόλοι και ροές εργασίας που κάνουν την καθημερινή λειτουργία πιο σταθερή.",
      en: "Processes, roles and workflows that make daily operations more stable.",
    },
    body: {
      el: "Χαρτογραφούμε τον τρόπο λειτουργίας, εντοπίζουμε ασυνέχειες και οργανώνουμε πρακτικές διαδικασίες που μπορούν να ακολουθηθούν από την ομάδα με συνέπεια.",
      en: "We map the operating model, identify friction points and organize practical procedures that teams can follow consistently.",
    },
    offers: {
      el: ["Χαρτογράφηση ροών και αρμοδιοτήτων", "Δημιουργία SOPs", "Οργάνωση ελέγχων και καθημερινών routines", "Υποστήριξη εφαρμογής με την ομάδα"],
      en: ["Workflow and responsibility mapping", "SOP creation", "Daily routines and control points", "Implementation support with the team"],
    },
    audience: {
      el: ["Επιχειρήσεις με ασυνέπεια στην καθημερινή λειτουργία", "Ομάδες που μεγαλώνουν", "Νέα καταστήματα ή νέα τμήματα", "Επιχειρήσεις που θέλουν λιγότερη εξάρτηση από πρόσωπα"],
      en: ["Businesses with inconsistent daily operations", "Growing teams", "New venues or departments", "Businesses that want less dependency on individuals"],
    },
    panel: {
      title: { el: "Λειτουργία που μπορεί να επαναληφθεί", en: "Operations that can be repeated" },
      text: {
        el: "Οργανώνουμε τις διαδικασίες με τρόπο που να βοηθά την ομάδα να δουλεύει πιο καθαρά, πιο γρήγορα και με λιγότερα λάθη.",
        en: "We organize procedures in a way that helps the team work more clearly, faster and with fewer errors.",
      },
    },
    keywords: {
      el: ["λειτουργική οργάνωση εστιατορίου", "SOPs", "operations consulting"],
      en: ["restaurant operations consulting", "SOPs", "hospitality operations"],
    },
  },
  {
    id: "procurement-control",
    image: siteImages.services.procurementControl,
    title: {
      el: "Προμήθειες, Αποθήκη & Supplier Control",
      en: "Procurement, Inventory & Supplier Control",
    },
    summary: {
      el: "Καλύτερη εικόνα αγορών, προμηθευτών, τιμών και αποθήκης.",
      en: "Better visibility over purchases, suppliers, prices and inventory.",
    },
    body: {
      el: "Οργανώνουμε την παρακολούθηση προμηθειών και αποθήκης, αξιολογούμε επιλογές προμηθευτών και δημιουργούμε βάση για καλύτερες διαπραγματεύσεις και λιγότερες απώλειες.",
      en: "We organize procurement and inventory monitoring, evaluate supplier options and create a stronger base for negotiation and loss reduction.",
    },
    offers: {
      el: ["Αξιολόγηση προμηθευτών", "Παρακολούθηση τιμών και αγορών", "Έλεγχος αποθήκης και απωλειών", "Προτάσεις βελτίωσης αγοραστικής πολιτικής"],
      en: ["Supplier evaluation", "Price and purchase monitoring", "Inventory and loss control", "Purchasing policy improvement proposals"],
    },
    audience: {
      el: ["Επιχειρήσεις με ασταθείς τιμές αγοράς", "Ομάδες χωρίς καθαρή εικόνα αποθήκης", "Brands που θέλουν καλύτερες συμφωνίες", "Επιχειρήσεις που θέλουν μείωση απωλειών"],
      en: ["Businesses facing unstable purchase prices", "Teams lacking inventory visibility", "Brands seeking better supplier agreements", "Businesses aiming to reduce losses"],
    },
    panel: {
      title: { el: "Έλεγχος από την αγορά μέχρι την κατανάλωση", en: "Control from purchasing to consumption" },
      text: {
        el: "Συνδέουμε προμηθευτές, αποθήκη και κοστολόγηση ώστε η επιχείρηση να βλέπει καθαρά πού επηρεάζεται το περιθώριο.",
        en: "We connect suppliers, inventory and costing so the business can see where margins are affected.",
      },
    },
    keywords: {
      el: ["έλεγχος προμηθειών", "supplier evaluation", "αποθήκη εστιατορίου"],
      en: ["procurement control", "supplier evaluation", "restaurant inventory"],
    },
  },
  {
    id: "menu-engineering",
    image: siteImages.services.menuEngineering,
    title: {
      el: "Σχεδιασμός Καταλόγου & Menu Engineering",
      en: "Menu Design & Menu Engineering",
    },
    summary: {
      el: "Κατάλογος που υπηρετεί την εμπειρία, τις πωλήσεις και την κερδοφορία.",
      en: "A menu that supports guest experience, sales and profitability.",
    },
    body: {
      el: "Συνδέουμε κοστολόγηση, τιμές, εμπορική λογική και ψυχολογία επιλογών για να δομηθεί ένας κατάλογος που είναι καθαρός για τον πελάτη και αποδοτικός για την επιχείρηση.",
      en: "We connect costing, prices, commercial logic and choice psychology to structure a menu that is clear for guests and effective for the business.",
    },
    offers: {
      el: ["Αξιολόγηση υπάρχοντος καταλόγου", "Δομή κατηγοριών και προτεραιοτήτων", "Σύνδεση προϊόντων με περιθώρια", "Προτάσεις για αύξηση μέσης απόδειξης"],
      en: ["Existing menu review", "Category and priority structure", "Product-to-margin alignment", "Average check improvement proposals"],
    },
    audience: {
      el: ["Εστιατόρια, cafe και bars", "Νέα concepts", "Επιχειρήσεις που ανανεώνουν κατάλογο", "Ομάδες που θέλουν πιο καθαρή εμπορική εικόνα"],
      en: ["Restaurants, cafes and bars", "New concepts", "Businesses refreshing a menu", "Teams seeking clearer commercial positioning"],
    },
    panel: {
      title: { el: "Ο κατάλογος ως εργαλείο πωλήσεων", en: "The menu as a sales tool" },
      text: {
        el: "Δεν βλέπουμε τον κατάλογο μόνο αισθητικά. Τον εξετάζουμε ως εργαλείο καθοδήγησης επιλογών και βελτίωσης αποτελέσματος.",
        en: "We do not treat the menu only visually. We review it as a tool for guiding choices and improving performance.",
      },
    },
    keywords: {
      el: ["σχεδιασμός καταλόγου", "menu engineering Αθήνα", "κατάλογος εστιατορίου"],
      en: ["menu engineering", "restaurant menu design", "hospitality sales"],
    },
  },
  {
    id: "service-training",
    image: siteImages.services.serviceTraining,
    title: {
      el: "Εκπαίδευση Service, Πωλήσεων & Κρασιού",
      en: "Service, Sales & Wine Training",
    },
    summary: {
      el: "Εκπαίδευση ομάδας με στόχο καλύτερη εμπειρία πελάτη, συνέπεια και αύξηση πωλήσεων.",
      en: "Team training focused on better guest experience, consistency and sales uplift.",
    },
    body: {
      el: "Σχεδιάζουμε πρακτική εκπαίδευση προσαρμοσμένη στο concept, στο επίπεδο της ομάδας και στους εμπορικούς στόχους της επιχείρησης.",
      en: "We design practical training adapted to the concept, team level and commercial goals of the business.",
    },
    offers: {
      el: ["Εκπαίδευση service standards", "Βασικές τεχνικές πωλήσεων", "Wine service και pairing", "Εφαρμογή στην καθημερινή λειτουργία"],
      en: ["Service standards training", "Core sales techniques", "Wine service and pairing", "Application in daily operations"],
    },
    audience: {
      el: ["Ομάδες service και υποδοχής", "Επιχειρήσεις με νέο προσωπικό", "Brands που θέλουν κοινό τρόπο εξυπηρέτησης", "Concepts με wine ή premium service ανάγκες"],
      en: ["Service and front-of-house teams", "Businesses with new staff", "Brands seeking a shared service standard", "Concepts with wine or premium service needs"],
    },
    panel: {
      title: { el: "Εκπαίδευση που φαίνεται στην πράξη", en: "Training that shows in practice" },
      text: {
        el: "Η εκπαίδευση σχεδιάζεται ώστε να εφαρμόζεται στην πραγματική βάρδια και να συνδέεται με την εμπειρία και τις πωλήσεις.",
        en: "Training is designed to apply in the real shift and connect with guest experience and sales.",
      },
    },
    keywords: {
      el: ["εκπαίδευση service", "wine training", "εκπαίδευση προσωπικού εστίασης"],
      en: ["service training", "wine training", "hospitality staff training"],
    },
  },
  {
    id: "accounting-support",
    image: siteImages.services.accountingSupport,
    title: {
      el: "Λογιστική Υποστήριξη & Business Admin",
      en: "Accounting Support & Business Admin",
    },
    summary: {
      el: "Σύνδεση της λογιστικής εικόνας με τις πραγματικές ανάγκες διοίκησης της επιχείρησης.",
      en: "Connecting accounting visibility with the real management needs of the business.",
    },
    body: {
      el: "Μέσα από συνεργαζόμενο δίκτυο μπορούμε να υποστηρίξουμε θέματα λογιστικής, μισθοδοσίας και διοικητικής οργάνωσης, ώστε η επιχείρηση να έχει πιο ολοκληρωμένη εικόνα.",
      en: "Through a partner network we can support accounting, payroll and administrative organization so the business has a more integrated view.",
    },
    offers: {
      el: ["Σύνδεση λογιστικών δεδομένων με reporting", "Υποστήριξη σε διοικητικές ανάγκες", "Συνεργασία με εξειδικευμένους επαγγελματίες", "Οργάνωση πληροφορίας για αποφάσεις"],
      en: ["Accounting data connection with reporting", "Administrative support", "Collaboration with specialized professionals", "Information organization for decisions"],
    },
    audience: {
      el: ["Επιχειρήσεις που θέλουν πιο καθαρή διοικητική εικόνα", "Νέα σχήματα που οργανώνουν υποδομή", "Ομάδες που χρειάζονται συντονισμό με συνεργάτες", "Επιχειρηματίες που θέλουν λιγότερη αποσπασματικότητα"],
      en: ["Businesses seeking clearer administrative visibility", "New ventures building infrastructure", "Teams needing coordination with partners", "Owners seeking less fragmentation"],
    },
    panel: {
      title: { el: "Πιο ολοκληρωμένη επιχειρησιακή εικόνα", en: "A more integrated business picture" },
      text: {
        el: "Στόχος είναι τα διοικητικά και οικονομικά δεδομένα να υποστηρίζουν την καθημερινή διοίκηση και όχι να μένουν αποκομμένα.",
        en: "The goal is for administrative and financial data to support daily management rather than remain disconnected.",
      },
    },
    keywords: {
      el: ["λογιστική υποστήριξη horeca", "business admin", "διοικητική οργάνωση"],
      en: ["HORECA accounting support", "business admin", "administrative organization"],
    },
  },
  {
    id: "compliance-support",
    image: siteImages.services.complianceSupport,
    title: {
      el: "Άδειες, HACCP & Υποστηρικτικές Συνεργασίες",
      en: "Licensing, HACCP & Support Partners",
    },
    summary: {
      el: "Συντονισμός κρίσιμων υποστηρικτικών θεμάτων με αξιόπιστους συνεργάτες.",
      en: "Coordination of critical support needs through trusted partners.",
    },
    body: {
      el: "Υποστηρίζουμε την επιχείρηση στον συντονισμό συνεργασιών για άδειες, HACCP, τεχνικά και θέματα ασφάλειας, ώστε να υπάρχει καλύτερη οργάνωση και λιγότερη τριβή.",
      en: "We support the business in coordinating partners for licensing, HACCP, technical and safety matters, creating better organization and less friction.",
    },
    offers: {
      el: ["Συντονισμός με μηχανικούς και τεχνικούς συνεργάτες", "Υποστήριξη σε HACCP και διαδικασίες", "Οργάνωση απαιτήσεων πριν το άνοιγμα", "Παρακολούθηση εκκρεμοτήτων"],
      en: ["Coordination with engineers and technical partners", "HACCP and procedure support", "Pre-opening requirement organization", "Pending-item monitoring"],
    },
    audience: {
      el: ["Νέες επιχειρήσεις πριν το άνοιγμα", "Υφιστάμενες επιχειρήσεις με εκκρεμότητες", "Ομάδες που χρειάζονται συντονισμό συνεργατών", "Επιχειρήσεις που θέλουν οργανωμένο compliance πλαίσιο"],
      en: ["New businesses before opening", "Existing businesses with pending issues", "Teams needing partner coordination", "Businesses seeking an organized compliance framework"],
    },
    panel: {
      title: { el: "Λιγότερη τριβή σε κρίσιμα θέματα", en: "Less friction around critical requirements" },
      text: {
        el: "Βοηθάμε να οργανωθούν τα υποστηρικτικά θέματα με σαφήνεια, ευθύνη και σωστή σειρά ενεργειών.",
        en: "We help organize support requirements with clarity, accountability and the right sequence of actions.",
      },
    },
    keywords: {
      el: ["HACCP εστίαση", "άδειες καταστημάτων", "υποστήριξη horeca"],
      en: ["HACCP hospitality", "business licensing", "HORECA support"],
    },
  },
];

export function getServiceById(id: string) {
  return servicesContent.find((service) => service.id === id);
}

export const serviceSelectOptions = servicesContent.map((service) => ({
  id: service.id,
  label: service.title,
}));
