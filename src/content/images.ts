export const siteImages = {
  // EDIT_SITE_IMAGES_HERE
  homeHero: "/images/home/homepage.png",
  aboutHero: "/images/home/aboutHero.png",
  socialShare: "/images/home/horecaplus.jpg",
  logos: {
    header: "/images/home/short_logo.png",
    footer: "/images/home/short.png",
  },
  contactHero: "/images/contact/contact2.jpg",
  services: {
    financialPlanning: "/images/services/businesscontrol.png",
    productCosting: "/images/services/productCosting.png",
    pricingPolicy: "/images/services/pricingPolicy.png",
    operationsOrganization: "/images/services/operationsOrganization.png",
    procurementControl: "/images/services/procurementControl.png",
    menuEngineering: "/images/services/menuEngineering.png",
    serviceTraining: "/images/services/serviceTraining.png",
    accountingSupport: "/images/services/accountingSupport.png",
    complianceSupport: "/images/services/complianceSupport.png",
  },
  caseStudies: {
    costControl: "/images/casestudies/costControl.png",
    operations: "/images/casestudies/operations.png",
    procurement: "/images/casestudies/procurement.png",
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;
