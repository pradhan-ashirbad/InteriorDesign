export const galleryImages = {
  residential: [
    {
      id: 1,
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      title: "Modern Living Room",
      category: "residential"
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      title: "Contemporary Kitchen",
      category: "residential"
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg",
      title: "Luxury Bedroom",
      category: "residential"
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg",
      title: "Minimalist Bathroom",
      category: "residential"
    }
  ],
  commercial: [
    {
      id: 5,
      url: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
      title: "Modern Office",
      category: "commercial"
    },
    {
      id: 6,
      url: "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg",
      title: "Conference Room",
      category: "commercial"
    },
    {
      id: 7,
      url: "https://images.pexels.com/photos/261156/pexels-photo-261156.jpeg",
      title: "Hotel Lobby",
      category: "commercial"
    },
    {
      id: 8,
      url: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg",
      title: "Restaurant Interior",
      category: "commercial"
    }
  ],
  portfolio: [
    {
      id: 9,
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      title: "Luxury Penthouse",
      category: "portfolio"
    },
    {
      id: 10,
      url: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
      title: "Modern Workspace",
      category: "portfolio"
    },
    {
      id: 11,
      url: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      title: "Designer Kitchen",
      category: "portfolio"
    },
    {
      id: 12,
      url: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg",
      title: "Outdoor Living",
      category: "portfolio"
    }
  ]
};

export const serviceDetails = {
  residential: {
    gallery: galleryImages.residential.map(img => img.url),
    process: [
      "Initial Consultation",
      "Design Concept Development",
      "Material Selection",
      "Implementation",
      "Final Styling"
    ],
    pricing: {
      basic: "$1,000 - $3,000",
      standard: "$3,000 - $7,000",
      premium: "$7,000+"
    }
  },
  commercial: {
    gallery: galleryImages.commercial.map(img => img.url),
    process: [
      "Site Analysis",
      "Space Planning",
      "Design Development",
      "Construction Documentation",
      "Project Management"
    ],
    pricing: {
      basic: "$5,000 - $15,000",
      standard: "$15,000 - $30,000",
      premium: "$30,000+"
    }
  }
};
