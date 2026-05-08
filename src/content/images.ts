export const siteImages = {
  // EDIT_SITE_IMAGES_HERE
  homeHero: "/images/home/hero.jpg",
  aboutHero: "/images/home/home.jpg",
  socialShare: "/images/home/horecaplus.jpg",
  logos: {
    header: "/images/home/short_logo.png",
    footer: "/images/home/short.png",
  },
  contactHero: "/images/contact/contact.jpg",
  services: {
    financialPlanning: "/images/services/image1.jpg",
    productCosting: "/images/services/image2.jpg",
    pricingPolicy: "/images/home/horecaplus1.jpg",
    operationsOrganization: "/images/home/horecaplus2.jpg",
    procurementControl: "/images/casestudies/case1.jpg",
    menuEngineering: "/images/casestudies/case2.jpg",
    serviceTraining: "/images/casestudies/case3.jpg",
    accountingSupport: "/images/casestudies/case4.jpg",
    complianceSupport: "/images/casestudies/case5.jpg",
  },
  caseStudies: {
    costControl: "/images/casestudies/case1.jpg",
    operations: "/images/casestudies/case2.jpg",
    procurement: "/images/casestudies/case3.jpg",
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;
