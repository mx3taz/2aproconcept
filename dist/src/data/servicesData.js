// ============================================================================
// servicesData.js — AUTHORITATIVE SERVICES & SOLUTIONS CATALOG
// Source: "2a pro concept Informations.txt" + "Structure 2A PRO CONCEPT"
// 8 Authoritative Domains of Activity in 3 Engineering Clusters
// ============================================================================

window.servicesData = [
  // --------------------------------------------------------------------------
  // PÔLE A : PROTECTION & COUVERTURE EXTÉRIEURE
  // --------------------------------------------------------------------------
  {
    id: "abri-de-voiture",
    cluster: "structures-exterieures",
    clusterTitle: "Protection & Couverture Extérieure",
    title: "Abris de Voitures",
    shortSubtitle: "Protection solaire & intempéries sur mesure",
    heroImage: "./Structure 2A PRO CONCEPT/Abri de voiture/Abri_voiture (1).jpg",
    description: "Conception, fabrication et pose d'abris de voitures sur mesure, adaptés aux dimensions et aux besoins du client (structure galvanisé/alu, peinture epoxy au four/au pistolet, forme plat/arrondi). Disponibles en configuration standard à poteaux et traverse ou en abri suspendu sans poteaux frontaux.",
    types: [
      {
        name: "Abri Standard",
        description: "Abris avec une structure en poteaux et traverse. Configuration classique robuste.",
        image: "./Structure 2A PRO CONCEPT/Abri de voiture/Abri standard/Abri_standard_COUVERTURE_polycarbonate.jpg"
      },
      {
        name: "Abri Suspendu (Cantilever)",
        description: "Abris avec une structure permettant de réduire ou supprimer les poteaux frontaux pour libérer l'espace au sol.",
        image: "./Structure 2A PRO CONCEPT/Abri de voiture/Abri suspendu/Abri_suspendu_polycarbonate.jpg"
      }
    ],
    coverings: [
      { name: "Couverture Polycarbonate", detail: "Haute résistance aux chocs, filtre anti-UV et excellente transmission lumineuse", image: "./Structure 2A PRO CONCEPT/Abri de voiture/Abri standard/Abri_standard_COUVERTURE_polycarbonate.jpg" },
      { name: "Couverture PVC", detail: "Opacité protectrice, étanchéité totale et durabilité sans entretien face au soleil", image: "./Structure 2A PRO CONCEPT/Abri de voiture/Abri standard/Abri_standard_COUVERTURE_pvc.jpg" },
      { name: "Couverture Toile PVC", detail: "Esthétique tendue contemporaine avec haute résistance mécanique et prise au vent", image: "./Structure 2A PRO CONCEPT/Abri de voiture/Abri standard/Abri_standard_COUVERTURE_toile_pvc.jpg" },
      { name: "Couverture Panneaux Sandwich", detail: "Isolation thermique maximale contre la chaleur caniculaire et le froid", image: "./Structure 2A PRO CONCEPT/Abri de voiture/Abri standard/Abri_standard_COUVERTURE_panneaux_sandwich.jpg" }
    ],
    technicalSpecs: [
      "Ossature en acier galvanisé traité anti-corrosion ou aluminium thermolaqué",
      "Finition peinture époxy cuite au four ou application au pistolet industriel haute résistance",
      "Formes de toiture disponibles : profil plat épuré ou profil galbé/arrondi",
      "Fixations d'ancrage renforcées conformes aux prises au vent côtières"
    ]
  },
  {
    id: "abri-de-terrace",
    cluster: "structures-exterieures",
    clusterTitle: "Protection & Couverture Extérieure",
    title: "Abris de Terrasses",
    shortSubtitle: "Couverture fixe sur mesure pour terrasses de villas & résidences",
    heroImage: "./Structure 2A PRO CONCEPT/Abri de terrace/Abri_de_terrace (1).jpg",
    description: "Conception fabrication et pose d'abris de terrasse sur mesure, adaptés aux dimensions et aux besoins du client (étanchéité complète, structure galvanisé/alu, peinture epoxy au four/au pistolet, forme plat/arrondi, couverture au choix).",
    types: [
      {
        name: "Abri de Terrasse Fixe Plat",
        description: "Couverture permanente au profil plat moderne avec chéneau d'évacuation d'eaux pluviales discrètement intégré.",
        image: "./Structure 2A PRO CONCEPT/Abri de terrace/Abri_de_terrace (1).jpg"
      },
      {
        name: "Abri de Terrasse Galbé",
        description: "Structure cintrée offrant un écoulement rapide des eaux et une élégance architecturale arrondie.",
        image: "./Structure 2A PRO CONCEPT/Abri de terrace/Abri_de_terrace (2).jpg"
      }
    ],
    coverings: [
      { name: "Polycarbonate Compact / Alvéolaire", detail: "Luminosité naturelle zénithale sans effet de serre", image: "./Structure 2A PRO CONCEPT/Abri de terrace/Abri_de_terrace (1).jpg" },
      { name: "Panneaux Sandwich Isolants", detail: "Confort thermique été comme hiver pour les terrasses de vie", image: "./Structure 2A PRO CONCEPT/Abri de terrace/Abri_de_terrace (2).jpg" }
    ],
    technicalSpecs: [
      "Étanchéité complète périphérique garantie par joints haute performance",
      "Structure sur mesure en acier galvanisé ou aluminium haute rigidité",
      "Peinture époxy cuite au four ou pistolet (coloris au choix du nuancier RAL)",
      "Forme toiture plane monopente ou cintre galbé"
    ]
  },
  {
    id: "abri-ouvrant",
    cluster: "structures-exterieures",
    clusterTitle: "Protection & Couverture Extérieure",
    title: "Abris Ouvrants & Toitures Rétractables",
    shortSubtitle: "Systèmes coulissants manuels & automatiques pour patios et terrasses",
    heroImage: "./Structure 2A PRO CONCEPT/Abri ouvrant/Abri ouvrant automatique/Abri_ouvrant_automatique (1).jpg",
    description: "Conception, fabrication et pose d'abris ouvrants de maison arabe, terrasse, etc. sur mesure, adaptés aux dimensions et aux besoins du client (étanchéité complète, ouverture sur une seule partie / ouverture sur plusieurs modules, structure galvanisé/alu, peinture epoxy au four/au pistolet, forme plat/arrondi, avec canalisation d'eaux / sans canalisation, couverture au choix).",
    types: [
      {
        name: "Abri Ouvrant Manuel",
        description: "Système coulissant à ouverture manuelle par poussée sur rails usinés de haute précision.",
        image: "./Structure 2A PRO CONCEPT/Abri ouvrant/Abri ouvrant manuelle/Abri_ouvrant_manuelle (1).jpg"
      },
      {
        name: "Abri Ouvrant Automatique (Motorisé)",
        description: "Système coulissant à ouverture automatique motorisé avec système de commande pour l'ouverture motorisée (télécommande ou commande murale).",
        image: "./Structure 2A PRO CONCEPT/Abri ouvrant/Abri ouvrant automatique/Abri_ouvrant_automatique (1).jpg"
      }
    ],
    coverings: [
      { name: "Polycarbonate Traité Anti-UV", detail: "Transmission de lumière claire ou opale anti-éblouissement", image: "./Structure 2A PRO CONCEPT/Abri ouvrant/Abri ouvrant automatique/Abri_ouvrant_automatique (10).jpg" },
      { name: "Panneaux Sandwich Isolants", detail: "Protection thermique complète et isolation phonique", image: "./Structure 2A PRO CONCEPT/Abri ouvrant/Abri ouvrant automatique/Abri_ouvrant_automatique (15).jpg" }
    ],
    technicalSpecs: [
      "Étanchéité complète garantie aux infiltrations d'eau et aux poussières",
      "Canalisation d'eaux pluviales intégrée avec évacuation discrète",
      "Ouverture modulable : simple poussée ou motorisation télécommandée",
      "Structure en acier galvanisé ou aluminium avec thermolaquage époxy au four"
    ]
  },
  {
    id: "pergola",
    cluster: "structures-exterieures",
    clusterTitle: "Protection & Couverture Extérieure",
    title: "Pergolas Métalliques & Aluminium",
    shortSubtitle: "Pergolas bioclimatiques et contemporaines pour terrasses & jardins",
    heroImage: "./Structure 2A PRO CONCEPT/Pergola/Pergola_1.jpg",
    description: "Conception, fabrication et pose de pergola en acier galvanisé ou en aluminium avec couverture au choix. Structures architecturales contemporaines alliant design épuré et robustesse durable face au vent.",
    types: [
      {
        name: "Pergola en Acier Galvanisé",
        description: "Structure métallique robuste grande portée avec peinture époxy cuite au four.",
        image: "./Structure 2A PRO CONCEPT/Pergola/Pergola_1.jpg"
      },
      {
        name: "Pergola Autoportante Aluminium",
        description: "Pergola contemporaine autoportante laquée blanche ou anthracite, idéale abords de piscine.",
        image: "./Structure 2A PRO CONCEPT/Pergola/Pergola_freestanding_white.jpg"
      }
    ],
    coverings: [
      { name: "Couverture Polycarbonate", detail: "Protection solaire filtrante et clarté naturelle", image: "./Structure 2A PRO CONCEPT/Pergola/Pergola_2.jpg" },
      { name: "Lames Brise-Soleil", detail: "Ombrage calibré et ventilation naturelle sous toiture", image: "./Structure 2A PRO CONCEPT/Pergola/Pergola_4.jpg" }
    ],
    technicalSpecs: [
      "Structure en acier galvanisé ou aluminium haute rigidité",
      "Peinture époxy au four résistante aux agressions marines et UV",
      "Ancrages muraux et platines au sol masqués sans vis apparentes",
      "Couverture au choix : polycarbonate, toile PVC, tôle perforée ou lames"
    ]
  },

  // --------------------------------------------------------------------------
  // PÔLE B : ESPACES VITRÉS & FERMETURES
  // --------------------------------------------------------------------------
  {
    id: "extension",
    cluster: "espaces-vitres",
    clusterTitle: "Espaces Vitrés & Fermetures",
    title: "Extensions de Terrasses & Brise-Vue",
    shortSubtitle: "Vérandas, fermetures de terrasses maison & café, séparations",
    heroImage: "./Structure 2A PRO CONCEPT/Extension/En aluminium/Extension_en_aluminium (1).jpg",
    description: "Conception fabrication et pose d'extension de terrasse maison, terrasse café, séparation. Remplissage en tous types de verres, panneaux sandwich, pvc. Déclinaisons en aluminium, tôle galvanisée découpée laser ou acier galvanisé.",
    types: [
      {
        name: "Extension en Aluminium",
        description: "Structure en aluminium (fixe, ouvrant, coulissant) avec remplissage au choix.",
        image: "./Structure 2A PRO CONCEPT/Extension/En aluminium/Extension_en_aluminium (1).jpg"
      },
      {
        name: "Extension en Tôle",
        description: "Extension en tôle galvanisée, dimensions au besoin du client, découpe laser de motifs selon le choix.",
        image: "./Structure 2A PRO CONCEPT/Extension/En tôle/Extension_en_tole_1.jpg"
      },
      {
        name: "Extension en Acier",
        description: "Structure en acier galvanisée, peinture au choix, remplissage au choix.",
        image: "./Structure 2A PRO CONCEPT/Extension/En acier/Extension_en_acier.jpg"
      },
      {
        name: "Extension & Brise-Vue",
        description: "Panneaux brise-vue décoratifs découpés au laser et extensions de séparation d'intimité.",
        image: "./Structure 2A PRO CONCEPT/Extension/Extension & Brise-Vue/Extension_brise_soleil_noir (1).jpg"
      }
    ],
    coverings: [
      { name: "Tous types de verres", detail: "Simple, double vitrage isolant ou verre feuilleté de sécurité", image: "./Structure 2A PRO CONCEPT/Extension/En aluminium/Extension_en_aluminium (2).jpg" },
      { name: "Panneaux Sandwich & PVC", detail: "Remplissages pleins isolants et durables sans entretien", image: "./Structure 2A PRO CONCEPT/Extension/En aluminium/Extension_en_aluminium (4).jpg" },
      { name: "Tôle Découpée Laser", detail: "Motifs géométriques ou orientaux personnalisés sur commande numérique", image: "./Structure 2A PRO CONCEPT/Extension/Extension & Brise-Vue/Extension_brise_soleil_noir (3).jpg" }
    ],
    technicalSpecs: [
      "Structure adaptée aux terrasses de villas résidentielles et terrasses de cafés",
      "Remplissage sur mesure : verre de sécurité, tôle ajourée, panneaux sandwich",
      "Système d'ouverture fixe, battant ou coulissant au choix",
      "Découpe laser 5 motifs ou dessin vectoriel personnalisé"
    ]
  },
  {
    id: "menuiserie-aluminium",
    cluster: "espaces-vitres",
    clusterTitle: "Espaces Vitrés & Fermetures",
    title: "Menuiserie Aluminium Sur Mesure",
    shortSubtitle: "Fenêtres, portes, portes-fenêtres, moustiquaires & volets roulants",
    heroImage: "./Structure 2A PRO CONCEPT/Menuiserie aluminium/Menuiserie_aluminium_1.jpg",
    description: "Fabrication et installation de menuiseries aluminium sur mesure : fenêtre, porte, porte-fenêtre, moustiquaire, volet roulant. Configurations fixe, coulissant, à la française et battantes avec remplissage au besoin du client.",
    types: [
      {
        name: "Fenêtres & Baies Coulissantes",
        description: "Systèmes coulissants fluides sur rails inox intégrés, haute étanchéité acoustique et thermique.",
        image: "./Structure 2A PRO CONCEPT/Menuiserie aluminium/Menuiserie_aluminium_2.jpg"
      },
      {
        name: "Portes & Portes-Fenêtres Battantes",
        description: "Ouvrants à la française et oscillo-battants avec quincaillerie de sécurité renforcée.",
        image: "./Structure 2A PRO CONCEPT/Menuiserie aluminium/Menuiserie_aluminium_4.jpg"
      },
      {
        name: "Fermetures Spéciales & Dômes Piscines",
        description: "Verrières architecturales, dômes de piscines intérieures et sas d'entrée sur mesure.",
        image: "./Structure 2A PRO CONCEPT/Menuiserie aluminium/Menuiserie_piscine_overhead.jpg"
      }
    ],
    coverings: [
      { name: "Volets Roulants Aluminium", detail: "Lames aluminium thermolaquées avec commande manuelle ou motorisée", image: "./Structure 2A PRO CONCEPT/Menuiserie aluminium/Menuiserie_aluminium_5.jpg" },
      { name: "Moustiquaires Plissées / Enroulables", detail: "Protection fine discrète sans entraver la circulation d'air", image: "./Structure 2A PRO CONCEPT/Menuiserie aluminium/Menuiserie_aluminium_7.jpg" }
    ],
    technicalSpecs: [
      "Profilés aluminium de premier choix certifiés et thermolaqués",
      "Systèmes fixe, coulissant, à la française et battantes",
      "Vitrage feuilleté de sécurité ou double vitrage isolant au choix",
      "Pose directe sans intermédiaire par nos équipes d'atelier"
    ]
  },

  // --------------------------------------------------------------------------
  // PÔLE C : FINITIONS MÉTALLIQUES D'ART
  // --------------------------------------------------------------------------
  {
    id: "garde-corps-rampes-inox",
    cluster: "finitions-metalliques",
    clusterTitle: "Finitions Métalliques d'Art",
    title: "Garde-Corps & Rampes en Inox",
    shortSubtitle: "Sécurité et pureté de l'acier inoxydable pour escaliers, balcons & terrasses",
    heroImage: "./Structure 2A PRO CONCEPT/GARDE-CORPS & RAMPES EN INOX/Garde-corps à tubes inox/Garde-corps_à_tubes_inox (1).jpg",
    description: "Conception et fabrication de garde-corps en acier inoxydable pour escaliers, balcons, terrasses. L'inox apporte une modernité intemporelle, une sécurité absolue et une résistance exemplaire face à l'humidité côtière.",
    types: [
      {
        name: "Garde-corps à Tubes Inox",
        description: "Montants verticaux, lisses horizontales et main courante en acier inoxydable haute finition.",
        image: "./Structure 2A PRO CONCEPT/GARDE-CORPS & RAMPES EN INOX/Garde-corps à tubes inox/Garde-corps_à_tubes_inox (1).jpg"
      },
      {
        name: "Garde-corps avec Remplissage en Verre",
        description: "Structure inox, poteaux inox, main courante inox, verre de sécurité et fixations adaptées pour une transparence totale.",
        image: "./Structure 2A PRO CONCEPT/GARDE-CORPS & RAMPES EN INOX/Garde-corps avec remplissage en verre/Garde-corps_avec_remplissage_en_verre (1).jpg"
      }
    ],
    coverings: [
      { name: "Inox Brossé Satiné", detail: "Finition noble mate sans traces de doigts", image: "./Structure 2A PRO CONCEPT/GARDE-CORPS & RAMPES EN INOX/Garde-corps à tubes inox/Garde_corps_escalier_detail.jpg" },
      { name: "Verre de Sécurité Feuilleté", detail: "Panneaux trempés sécurit pour rooftop et balcons avec vue panoramique", image: "./Structure 2A PRO CONCEPT/GARDE-CORPS & RAMPES EN INOX/Garde-corps à tubes inox/Garde_corps_rooftop_panorama.jpg" }
    ],
    technicalSpecs: [
      "Acier inoxydable de qualité marine supérieure (zéro corrosion)",
      "Montants verticaux solidement chevillés dans la dalle ou fixation à l'anglaise",
      "Lisses de sécurité horizontales calibrées aux normes de retenue",
      "Verre de sécurité feuilleté trempé avec pinces inox massives"
    ]
  },
  {
    id: "enceigne-set-habillage-de-facades",
    cluster: "finitions-metalliques",
    clusterTitle: "Finitions Métalliques d'Art",
    title: "Enseignes & Habillage de Façades (Alucobond)",
    shortSubtitle: "Panneaux aluminium composite Alucobond & découpe laser sur mesure",
    heroImage: "./Structure 2A PRO CONCEPT/Enceigne set habillage de façades/Enceigne_set_habillage_de_façades (1).jpg",
    description: "Conception et réalisation d'enseignes, habillages et décorations de façades en panneaux aluminium composite (Alucobond), avec découpe laser de motifs et logos sur mesure.",
    types: [
      {
        name: "Habillage de Façades Alucobond",
        description: "Pose de cassettes composites créant des surfaces planes, modernes, isolantes et durables.",
        image: "./Structure 2A PRO CONCEPT/Enceigne set habillage de façades/Enceigne_set_habillage_de_façades (3).jpg"
      },
      {
        name: "Enseignes Commerciales & Découpe Laser",
        description: "Conception de logos, lettrages 3D et caissons lumineux découpés au laser numérique sur mesure.",
        image: "./Structure 2A PRO CONCEPT/Enceigne set habillage de façades/Enseigne_rts_school (1).jpg"
      }
    ],
    coverings: [
      { name: "Alucobond Composite 4mm", detail: "Planéité irréprochable et résistance éprouvée aux fortes chaleurs", image: "./Structure 2A PRO CONCEPT/Enceigne set habillage de façades/Enceigne_set_habillage_de_façades (4).jpg" },
      { name: "Découpe Numérique Laser", detail: "Reproduction fidèle des chartes graphiques et logos institutionnels", image: "./Structure 2A PRO CONCEPT/Enceigne set habillage de façades/Enseigne_rts_school (2).jpg" }
    ],
    technicalSpecs: [
      "Panneaux aluminium composite (Alucobond) haute densité",
      "Sous-structure secondaire porteuse traitée contre la corrosion",
      "Découpe laser numérique de haute précision pour motifs et logos",
      "Intégration d'éclairage LED et fixations invisibles"
    ]
  }
];
