export interface Service {
  slug: string;
  titleKey: string;
  shortDescriptionKey: string;
  descriptionKey: string;
  fullDescriptionKey: string;
  price: number;
  duration: string;
  difficulty: "Low" | "Medium" | "High";
  rating: number;
  reviewCount: number;
  languages: string[];
  images: string[];
  category: "cable_car" | "stars" | "hiking" | "observatory" | "independently";
  highlightsKeys: string[];
  includesKeys: string[];
  notIncludedKeys: string[];
  restrictionsKeys: string[];
  importantInfoKeys: string[];
  prepareKeys: string[];
  meetingPoint: string;
  relatedSlugs: string[];
}

export const services: Service[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. Teide Cable Car Tickets
  // ─────────────────────────────────────────────────────────────
  {
    slug: "teide-cable-car",
    titleKey: "services.teide-cable-car.title",
    shortDescriptionKey: "services.teide-cable-car.shortDescription",
    descriptionKey: "services.teide-cable-car.description",
    fullDescriptionKey: "services.teide-cable-car.fullDescription",
    price: 23.5,
    duration: "1 hour",
    difficulty: "Low",
    rating: 4.46,
    reviewCount: 3881,
    languages: ["DE", "EN", "ES", "FR", "IT", "NL", "PL", "RU"],
    images: [
      "https://api.volcanoteide.com/img/cache/5906x3919_302058763899_1-mount-teide-cable-car-tickets-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_2-mount-teide-cable-car-tickets-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1003_751492997_4-mount-teide-cable-car-tickets-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_5-mount-teide-cable-car-tickets-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_6-tenerife-cable-car-tickets-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_7-tenerife-cable-car-tickets-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x997_751492992_8-tenerife-cable-car-tickets-2025.jpg",
    ],
    category: "cable_car",
    highlightsKeys: [
      "services.mount-teide-night-tour.highlights.0",
      "services.mount-teide-night-tour.highlights.1",
      "services.mount-teide-night-tour.highlights.2",
      "services.mount-teide-night-tour.highlights.3",
      "services.mount-teide-night-tour.highlights.4",
    ],
    includesKeys: [
      "services.mount-teide-night-tour.includes.0",
      "services.mount-teide-night-tour.includes.1",
      "services.mount-teide-night-tour.includes.2",
      "services.mount-teide-night-tour.includes.3",
      "services.mount-teide-night-tour.includes.4",
    ],
    notIncludedKeys: [
      "services.mount-teide-night-tour.notIncluded.0",
      "services.mount-teide-night-tour.notIncluded.1",
      "services.mount-teide-night-tour.notIncluded.2",
    ],
    restrictionsKeys: [
      "services.mount-teide-night-tour.restrictions.0",
      "services.mount-teide-night-tour.restrictions.1",
    ],
    importantInfoKeys: [
      "services.mount-teide-night-tour.importantInfo.0",
    ],
    prepareKeys: [
      "services.mount-teide-night-tour.prepare.0",
      "services.mount-teide-night-tour.prepare.1",
    ],
    meetingPoint: "Teide Cable Car base station, TF-21 motorway, km 43 - Teide National Park, 38300 La Orotava",
    relatedSlugs: ["teide-tour-with-cable-car", "sunset-cable-car", "hiking-teide-with-cable-car"],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Mount Teide Tour with Cable Car
  // ─────────────────────────────────────────────────────────────
  {
    slug: "teide-tour-with-cable-car",
    titleKey: "services.teide-tour-with-cable-car.title",
    shortDescriptionKey: "services.teide-tour-with-cable-car.shortDescription",
    descriptionKey: "services.teide-tour-with-cable-car.description",
    fullDescriptionKey: "services.teide-tour-with-cable-car.fullDescription",
    price: 87.0,
    duration: "7 hours",
    difficulty: "Low",
    rating: 4.42,
    reviewCount: 317,
    languages: ["DE", "EN", "ES", "FR", "IT", "NL"],
    images: [
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_0-mount-teide-tour-with-cable-car-tickets-transport1.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_1-guide-mount-teide-tour-with-cable-car-tickets-excursion.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_2-teide-tour-with-cable-car-tickets-cabin.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_3-teide-tour-with-cable-car-tickets-views.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_4-trail-volcano-teide-tour.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_5-slope-trail-volcano-teide-tour.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_7-roques-garcia-trail-teide-tour.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_8-teide-tour-with-transport-cable-car.jpg",
    ],
    category: "cable_car",
    highlightsKeys: [
      "services.teide-tour-with-cable-car.highlights.0",
      "services.teide-tour-with-cable-car.highlights.1",
      "services.teide-tour-with-cable-car.highlights.2",
    ],
    includesKeys: [
      "services.teide-tour-with-cable-car.includes.0",
      "services.teide-tour-with-cable-car.includes.1",
      "services.teide-tour-with-cable-car.includes.2",
      "services.teide-tour-with-cable-car.includes.3",
    ],
    notIncludedKeys: [
      "services.teide-tour-with-cable-car.notIncluded.0",
      "services.teide-tour-with-cable-car.notIncluded.1",
      "services.teide-tour-with-cable-car.notIncluded.2",
      "services.teide-tour-with-cable-car.notIncluded.3",
    ],
    restrictionsKeys: [
      "services.teide-tour-with-cable-car.restrictions.0",
      "services.teide-tour-with-cable-car.restrictions.1",
      "services.teide-tour-with-cable-car.restrictions.2",
      "services.teide-tour-with-cable-car.restrictions.3",
      "services.teide-tour-with-cable-car.restrictions.4",
      "services.teide-tour-with-cable-car.restrictions.5",
      "services.teide-tour-with-cable-car.restrictions.6",
    ],
    importantInfoKeys: [
      "services.teide-tour-with-cable-car.importantInfo.0",
      "services.teide-tour-with-cable-car.importantInfo.1",
      "services.teide-tour-with-cable-car.importantInfo.2",
    ],
    prepareKeys: [
      "services.teide-tour-with-cable-car.prepare.0",
      "services.teide-tour-with-cable-car.prepare.1",
    ],
    meetingPoint: "Pick-up from hotels in North and South Tenerife, and the metropolitan area of Santa Cruz de Tenerife and Candelaria",
    relatedSlugs: ["teide-cable-car", "teide-tour-without-cable-car", "sunset-cable-car"],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Mount Teide Tour without Cable Car
  // ─────────────────────────────────────────────────────────────
  {
    slug: "teide-tour-without-cable-car",
    titleKey: "services.teide-tour-without-cable-car.title",
    shortDescriptionKey: "services.teide-tour-without-cable-car.shortDescription",
    descriptionKey: "services.teide-tour-without-cable-car.description",
    fullDescriptionKey: "services.teide-tour-without-cable-car.fullDescription",
    price: 49.0,
    duration: "7 hours",
    difficulty: "Low",
    rating: 4.72,
    reviewCount: 54,
    languages: ["DE", "EN", "ES", "FR", "IT", "NL"],
    images: [
      "https://api.volcanoteide.com/img/cache/2657x1401_13726431393_0-teide-tour-without-cable-car-bus.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_1-teide-tour-without-cable-car.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_2-teide-tour-roques-garcia-en.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1772_13926431763_3-teide-tour-trail-teide.jpg",
      "https://api.volcanoteide.com/img/cache/1200x800_641194796_4-guanche-mummy-teide-legend.jpg",
      "https://api.volcanoteide.com/img/cache/1200x800_641194796_5-teide-tour-teide-legend-exhibition.jpg",
      "https://api.volcanoteide.com/img/cache/852x405_42847402_6-restaurant-teide-tour-without-cable-car.jpg",
      "https://api.volcanoteide.com/img/cache/2657x1771_13926431762_7-teide-tour-bus-transfer.jpg",
    ],
    category: "cable_car",
    highlightsKeys: [
      "services.teide-tour-without-cable-car.highlights.0",
      "services.teide-tour-without-cable-car.highlights.1",
      "services.teide-tour-without-cable-car.highlights.2",
      "services.teide-tour-without-cable-car.highlights.3",
    ],
    includesKeys: [
      "services.teide-tour-without-cable-car.includes.0",
      "services.teide-tour-without-cable-car.includes.1",
      "services.teide-tour-without-cable-car.includes.2",
      "services.teide-tour-without-cable-car.includes.3",
    ],
    notIncludedKeys: [
      "services.teide-tour-without-cable-car.notIncluded.0",
      "services.teide-tour-without-cable-car.notIncluded.1",
      "services.teide-tour-without-cable-car.notIncluded.2",
    ],
    restrictionsKeys: [
      "services.teide-tour-without-cable-car.restrictions.0",
      "services.teide-tour-without-cable-car.restrictions.1",
    ],
    importantInfoKeys: [
      "services.teide-tour-without-cable-car.importantInfo.0",
      "services.teide-tour-without-cable-car.importantInfo.1",
    ],
    prepareKeys: [
      "services.teide-tour-without-cable-car.prepare.0",
      "services.teide-tour-without-cable-car.prepare.1",
    ],
    meetingPoint: "Pick-up from hotels in North and South Tenerife, Playa Paraiso, Los Gigantes, and the metropolitan area of Santa Cruz de Tenerife and Candelaria",
    relatedSlugs: ["teide-tour-with-cable-car", "teide-cable-car", "teide-legend"],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Teide Cable Car at Sunset
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sunset-cable-car",
    titleKey: "services.sunset-cable-car.title",
    shortDescriptionKey: "services.sunset-cable-car.shortDescription",
    descriptionKey: "services.sunset-cable-car.description",
    fullDescriptionKey: "services.sunset-cable-car.fullDescription",
    price: 71.0,
    duration: "2 hours",
    difficulty: "Medium",
    rating: 4.17,
    reviewCount: 42,
    languages: ["ES"],
    images: [
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_1-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_2-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_3-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_4-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_5-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_6-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_7-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_8-sunset-on-mount-teide-with-cable-car-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_9-sunset-on-mount-teide-with-cable-car-2025.jpg",
    ],
    category: "cable_car",
    highlightsKeys: [
      "services.sunset-cable-car.highlights.0",
      "services.sunset-cable-car.highlights.1",
      "services.sunset-cable-car.highlights.2",
      "services.sunset-cable-car.highlights.3",
    ],
    includesKeys: [
      "services.sunset-cable-car.includes.0",
      "services.sunset-cable-car.includes.1",
    ],
    notIncludedKeys: [
      "services.sunset-cable-car.notIncluded.0",
      "services.sunset-cable-car.notIncluded.1",
      "services.sunset-cable-car.notIncluded.2",
      "services.sunset-cable-car.notIncluded.3",
    ],
    restrictionsKeys: [
      "services.sunset-cable-car.restrictions.0",
      "services.sunset-cable-car.restrictions.1",
      "services.sunset-cable-car.restrictions.2",
      "services.sunset-cable-car.restrictions.3",
      "services.sunset-cable-car.restrictions.4",
      "services.sunset-cable-car.restrictions.5",
      "services.sunset-cable-car.restrictions.6",
    ],
    importantInfoKeys: [
      "services.sunset-cable-car.importantInfo.0",
      "services.sunset-cable-car.importantInfo.1",
      "services.sunset-cable-car.importantInfo.2",
    ],
    prepareKeys: [
      "services.sunset-cable-car.prepare.0",
      "services.sunset-cable-car.prepare.1",
      "services.sunset-cable-car.prepare.2",
    ],
    meetingPoint: "Teide Cable Car base station, TF-21 motorway, km 43 - Teide National Park, 38300 La Orotava",
    relatedSlugs: ["sunset-and-stars", "teide-cable-car", "astronomical-observation"],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Sunset & Stars on Teide
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sunset-and-stars",
    titleKey: "services.sunset-and-stars.title",
    shortDescriptionKey: "services.sunset-and-stars.shortDescription",
    descriptionKey: "services.sunset-and-stars.description",
    fullDescriptionKey: "services.sunset-and-stars.fullDescription",
    price: 172.0,
    duration: "8 hours",
    difficulty: "Medium",
    rating: 4.47,
    reviewCount: 45,
    languages: ["EN", "ES"],
    images: [
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_1-sunset-and-stars-mount-teide-by-night-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_2-sunset-and-stars-mount-teide-by-night-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_3-night-tour-to-mount-teide-stargazing-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_4-night-tour-to-mount-teide-stargazing-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x844_741492839_5-sunset-and-stars-mount-teide-by-night-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_6-night-tour-to-mount-teide-stargazing-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1440x960_751432955_7-night-tour-to-mount-teide-stargazing-20251.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1052_7514921046_8-night-tour-to-mount-teide-stargazing-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_9-sunset-and-stars-mount-teide-by-night-2025.jpg",
    ],
    category: "stars",
    highlightsKeys: [
      "services.sunset-and-stars.highlights.0",
      "services.sunset-and-stars.highlights.1",
      "services.sunset-and-stars.highlights.2",
      "services.sunset-and-stars.highlights.3",
    ],
    includesKeys: [
      "services.sunset-and-stars.includes.0",
      "services.sunset-and-stars.includes.1",
      "services.sunset-and-stars.includes.2",
      "services.sunset-and-stars.includes.3",
      "services.sunset-and-stars.includes.4",
    ],
    notIncludedKeys: [
      "services.sunset-and-stars.notIncluded.0",
      "services.sunset-and-stars.notIncluded.1",
      "services.sunset-and-stars.notIncluded.2",
      "services.sunset-and-stars.notIncluded.3",
    ],
    restrictionsKeys: [
      "services.sunset-and-stars.restrictions.0",
      "services.sunset-and-stars.restrictions.1",
      "services.sunset-and-stars.restrictions.2",
      "services.sunset-and-stars.restrictions.3",
      "services.sunset-and-stars.restrictions.4",
      "services.sunset-and-stars.restrictions.5",
      "services.sunset-and-stars.restrictions.6",
      "services.sunset-and-stars.restrictions.7",
    ],
    importantInfoKeys: [
      "services.sunset-and-stars.importantInfo.0",
      "services.sunset-and-stars.importantInfo.1",
      "services.sunset-and-stars.importantInfo.2",
      "services.sunset-and-stars.importantInfo.3",
    ],
    prepareKeys: [
      "services.sunset-and-stars.prepare.0",
      "services.sunset-and-stars.prepare.1",
      "services.sunset-and-stars.prepare.2",
    ],
    meetingPoint: "Pick-up from hotels in North and South Tenerife. Pick-up time varies between 2:15pm and 4:30pm depending on sunset time.",
    relatedSlugs: ["astronomical-observation", "sunset-cable-car", "astronomic-tour"],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Astronomical Observation on Teide
  // ─────────────────────────────────────────────────────────────
  {
    slug: "astronomical-observation",
    titleKey: "services.astronomical-observation.title",
    shortDescriptionKey: "services.astronomical-observation.shortDescription",
    descriptionKey: "services.astronomical-observation.description",
    fullDescriptionKey: "services.astronomical-observation.fullDescription",
    price: 40.0,
    duration: "1 hour",
    difficulty: "Low",
    rating: 4.51,
    reviewCount: 70,
    languages: ["EN", "ES", "FR"],
    images: [
      "https://api.volcanoteide.com/img/cache/1300x984_651293979_1-astronomical-observation-teide-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x984_651293979_2-astronomical-observation-teide-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_3-stargazing-teide-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x890_741492885_4-stargazing-teide-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_5-astronomical-observation-teide-2025.jpg",
    ],
    category: "stars",
    highlightsKeys: [
      "services.astronomical-observation.highlights.0",
      "services.astronomical-observation.highlights.1",
      "services.astronomical-observation.highlights.2",
      "services.astronomical-observation.highlights.3",
    ],
    includesKeys: [
      "services.astronomical-observation.includes.0",
      "services.astronomical-observation.includes.1",
      "services.astronomical-observation.includes.2",
    ],
    notIncludedKeys: [
      "services.astronomical-observation.notIncluded.0",
      "services.astronomical-observation.notIncluded.1",
    ],
    restrictionsKeys: [
      "services.astronomical-observation.restrictions.0",
    ],
    importantInfoKeys: [
      "services.astronomical-observation.importantInfo.0",
      "services.astronomical-observation.importantInfo.1",
      "services.astronomical-observation.importantInfo.2",
    ],
    prepareKeys: [
      "services.astronomical-observation.prepare.0",
      "services.astronomical-observation.prepare.1",
      "services.astronomical-observation.prepare.2",
      "services.astronomical-observation.prepare.3",
    ],
    meetingPoint: "Teide Cable Car base station car park, TF-21 motorway km 43. Coordinates: 28.254448, -16.625747. Wait for a member of the Teide Explorer team at the closed access gate.",
    relatedSlugs: ["sunset-and-stars", "astronomic-tour", "mount-teide-night-tour"],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Climbing the Teide Crater with Cable Car (Hiking)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "hiking-teide-with-cable-car",
    titleKey: "services.hiking-teide-with-cable-car.title",
    shortDescriptionKey: "services.hiking-teide-with-cable-car.shortDescription",
    descriptionKey: "services.hiking-teide-with-cable-car.description",
    fullDescriptionKey: "services.hiking-teide-with-cable-car.fullDescription",
    price: 163.0,
    duration: "6 hours",
    difficulty: "High",
    rating: 4.6,
    reviewCount: 244,
    languages: ["EN", "ES"],
    images: [
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_1-ascent-to-the-peak-of-teide-with-a-cable-car-ride-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_2-ascent-to-the-peak-of-teide-with-a-cable-car-ride-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_3-ascent-to-the-peak-of-teide-with-a-cable-car-ride-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_4-ascent-to-the-peak-of-teide-with-a-cable-car-ride-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_5-ascent-to-the-peak-of-teide-with-a-cable-car-ride-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_6-ascent-to-the-peak-of-teide-with-a-cable-car-ride-2025.jpg",
    ],
    category: "hiking",
    highlightsKeys: [
      "services.hiking-teide-with-cable-car.highlights.0",
      "services.hiking-teide-with-cable-car.highlights.1",
      "services.hiking-teide-with-cable-car.highlights.2",
      "services.hiking-teide-with-cable-car.highlights.3",
      "services.hiking-teide-with-cable-car.highlights.4",
      "services.hiking-teide-with-cable-car.highlights.5",
    ],
    includesKeys: [
      "services.hiking-teide-with-cable-car.includes.0",
      "services.hiking-teide-with-cable-car.includes.1",
      "services.hiking-teide-with-cable-car.includes.2",
      "services.hiking-teide-with-cable-car.includes.3",
      "services.hiking-teide-with-cable-car.includes.4",
    ],
    notIncludedKeys: [
      "services.hiking-teide-with-cable-car.notIncluded.0",
      "services.hiking-teide-with-cable-car.notIncluded.1",
      "services.hiking-teide-with-cable-car.notIncluded.2",
    ],
    restrictionsKeys: [
      "services.hiking-teide-with-cable-car.restrictions.0",
      "services.hiking-teide-with-cable-car.restrictions.1",
      "services.hiking-teide-with-cable-car.restrictions.2",
      "services.hiking-teide-with-cable-car.restrictions.3",
      "services.hiking-teide-with-cable-car.restrictions.4",
      "services.hiking-teide-with-cable-car.restrictions.5",
      "services.hiking-teide-with-cable-car.restrictions.6",
      "services.hiking-teide-with-cable-car.restrictions.7",
      "services.hiking-teide-with-cable-car.restrictions.8",
    ],
    importantInfoKeys: [
      "services.hiking-teide-with-cable-car.importantInfo.0",
      "services.hiking-teide-with-cable-car.importantInfo.1",
      "services.hiking-teide-with-cable-car.importantInfo.2",
      "services.hiking-teide-with-cable-car.importantInfo.3",
      "services.hiking-teide-with-cable-car.importantInfo.4",
    ],
    prepareKeys: [
      "services.hiking-teide-with-cable-car.prepare.0",
      "services.hiking-teide-with-cable-car.prepare.1",
      "services.hiking-teide-with-cable-car.prepare.2",
      "services.hiking-teide-with-cable-car.prepare.3",
    ],
    meetingPoint: "Pick-up from hotels in North and South Tenerife. Transport service available from 7:00am to 9:30am.",
    relatedSlugs: ["teide-cable-car", "teide-tour-with-cable-car", "sunset-and-stars"],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Guided Daytime Visit to the Teide Observatory
  // ─────────────────────────────────────────────────────────────
  {
    slug: "teide-observatory-visit",
    titleKey: "services.teide-observatory-visit.title",
    shortDescriptionKey: "services.teide-observatory-visit.shortDescription",
    descriptionKey: "services.teide-observatory-visit.description",
    fullDescriptionKey: "services.teide-observatory-visit.fullDescription",
    price: 21.0,
    duration: "1 hour 30 minutes",
    difficulty: "Low",
    rating: 4.65,
    reviewCount: 327,
    languages: ["DE", "EN", "ES", "FR"],
    images: [
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_1-1-visit-teide-observatory-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_2-2-visit-teide-observatory-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_3-3-visit-teide-observatory-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_4-4-visit-teide-observatory-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_5-5-visit-teide-observatory-2025.jpg",
    ],
    category: "observatory",
    highlightsKeys: [
      "services.teide-observatory-visit.highlights.0",
      "services.teide-observatory-visit.highlights.1",
      "services.teide-observatory-visit.highlights.2",
      "services.teide-observatory-visit.highlights.3",
    ],
    includesKeys: [
      "services.teide-observatory-visit.includes.0",
      "services.teide-observatory-visit.includes.1",
    ],
    notIncludedKeys: [
      "services.teide-observatory-visit.notIncluded.0",
      "services.teide-observatory-visit.notIncluded.1",
    ],
    restrictionsKeys: [
      "services.teide-observatory-visit.restrictions.0",
      "services.teide-observatory-visit.restrictions.1",
      "services.teide-observatory-visit.restrictions.2",
      "services.teide-observatory-visit.restrictions.3",
      "services.teide-observatory-visit.restrictions.4",
      "services.teide-observatory-visit.restrictions.5",
    ],
    importantInfoKeys: [
      "services.teide-observatory-visit.importantInfo.0",
      "services.teide-observatory-visit.importantInfo.1",
      "services.teide-observatory-visit.importantInfo.2",
    ],
    prepareKeys: [
      "services.teide-observatory-visit.prepare.0",
      "services.teide-observatory-visit.prepare.1",
      "services.teide-observatory-visit.prepare.2",
      "services.teide-observatory-visit.prepare.3",
    ],
    meetingPoint: "Izana Observatory, altitude ~2,400m. You must arrive at the Observatory gate at least 30 minutes before the scheduled time of the visit.",
    relatedSlugs: ["astronomic-tour", "astronomical-observation", "sunset-and-stars"],
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Astronomic Tour (Observatory + Stargazing)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "astronomic-tour",
    titleKey: "services.astronomic-tour.title",
    shortDescriptionKey: "services.astronomic-tour.shortDescription",
    descriptionKey: "services.astronomic-tour.description",
    fullDescriptionKey: "services.astronomic-tour.fullDescription",
    price: 103.0,
    duration: "8 hours",
    difficulty: "Low",
    rating: 4.59,
    reviewCount: 195,
    languages: ["EN", "ES"],
    images: [
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_1-excursion-stargazing-tenerife-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_2-excursion-teide-stargazing-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_3-excursion-teide-stargazing-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_4-excursion-stargazing-tenerife-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_5-excursion-stargazing-tenerife-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_6-excursion-stargazing-tenerife-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_7-excursion-stargazing-tenerife-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_8-excursion-teide-stargazing-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_9-excursion-teide-stargazing-2025.jpg",
    ],
    category: "stars",
    highlightsKeys: [
      "services.astronomic-tour.highlights.0",
      "services.astronomic-tour.highlights.1",
      "services.astronomic-tour.highlights.2",
    ],
    includesKeys: [
      "services.astronomic-tour.includes.0",
      "services.astronomic-tour.includes.1",
      "services.astronomic-tour.includes.2",
      "services.astronomic-tour.includes.3",
      "services.astronomic-tour.includes.4",
    ],
    notIncludedKeys: [
      "services.astronomic-tour.notIncluded.0",
      "services.astronomic-tour.notIncluded.1",
      "services.astronomic-tour.notIncluded.2",
    ],
    restrictionsKeys: [
      "services.astronomic-tour.restrictions.0",
      "services.astronomic-tour.restrictions.1",
      "services.astronomic-tour.restrictions.2",
      "services.astronomic-tour.restrictions.3",
      "services.astronomic-tour.restrictions.4",
      "services.astronomic-tour.restrictions.5",
    ],
    importantInfoKeys: [
      "services.astronomic-tour.importantInfo.0",
      "services.astronomic-tour.importantInfo.1",
      "services.astronomic-tour.importantInfo.2",
    ],
    prepareKeys: [
      "services.astronomic-tour.prepare.0",
      "services.astronomic-tour.prepare.1",
      "services.astronomic-tour.prepare.2",
      "services.astronomic-tour.prepare.3",
      "services.astronomic-tour.prepare.4",
    ],
    meetingPoint: "Pick-up from hotels. Pick-up time varies between 2:15pm and 4:30pm depending on sunset time.",
    relatedSlugs: ["teide-observatory-visit", "astronomical-observation", "sunset-and-stars"],
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Teide Legend Exhibition + Comic
  // ─────────────────────────────────────────────────────────────
  {
    slug: "teide-legend",
    titleKey: "services.teide-legend.title",
    shortDescriptionKey: "services.teide-legend.shortDescription",
    descriptionKey: "services.teide-legend.description",
    fullDescriptionKey: "services.teide-legend.fullDescription",
    price: 3.0,
    duration: "20 minutes",
    difficulty: "Low",
    rating: 2.55,
    reviewCount: 11,
    languages: ["DE", "EN", "ES", "FR", "IT", "NL", "PL", "RU"],
    images: [
      "https://api.volcanoteide.com/img/cache/850x510_43845507_teide-legend-tassat-guayota-en.jpg",
      "https://api.volcanoteide.com/img/cache/1000x600_53995597_teide-legend-tassat-guayota-1-EN.jpg",
      "https://api.volcanoteide.com/img/cache/850x507_43845504_teide-legend-characters.jpg",
      "https://api.volcanoteide.com/img/cache/850x510_43845507_teide-legend-comic-en.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_guanche-mummy-teide-legend-tour12.jpg",
      "https://api.volcanoteide.com/img/cache/5906x3945_302058763925_teide_legend_seniors_exposition.jpg",
      "https://api.volcanoteide.com/img/cache/4000x2661_201339802647_teide-legend-audiovisual-exhibition-guayota-EN.jpg",
      "https://api.volcanoteide.com/img/cache/5906x3937_302058763917_teide-legend-science.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_teide-legend-shop.jpg",
      "https://api.volcanoteide.com/img/cache/5906x3937_302058763917_teide-legend-cafe-guayota1.jpg",
    ],
    category: "independently",
    highlightsKeys: [
      "services.teide-legend.highlights.0",
      "services.teide-legend.highlights.1",
      "services.teide-legend.highlights.2",
    ],
    includesKeys: [
      "services.teide-legend.includes.0",
      "services.teide-legend.includes.1",
      "services.teide-legend.includes.2",
    ],
    notIncludedKeys: [
      "services.teide-legend.notIncluded.0",
      "services.teide-legend.notIncluded.1",
      "services.teide-legend.notIncluded.2",
    ],
    restrictionsKeys: [
      "services.teide-legend.restrictions.0",
    ],
    importantInfoKeys: [
      "services.teide-legend.importantInfo.0",
      "services.teide-legend.importantInfo.1",
      "services.teide-legend.importantInfo.2",
    ],
    prepareKeys: [
      "services.teide-legend.prepare.0",
      "services.teide-legend.prepare.1",
    ],
    meetingPoint: "Teide Cable Car Visitors' Centre, TF-21 motorway, km 43 - Teide National Park. Open daily (except Christmas Day), 9:00am to 3:00pm (3:30pm during Holy Week).",
    relatedSlugs: ["teide-cable-car", "teide-tour-without-cable-car", "mount-teide-night-tour"],
  },

  // ─────────────────────────────────────────────────────────────
  // 11. Mount Teide Night Tour
  // ─────────────────────────────────────────────────────────────
  {
    slug: "mount-teide-night-tour",
    titleKey: "services.mount-teide-night-tour.title",
    shortDescriptionKey: "services.mount-teide-night-tour.shortDescription",
    descriptionKey: "services.mount-teide-night-tour.description",
    fullDescriptionKey: "services.mount-teide-night-tour.fullDescription",
    price: 73.0,
    duration: "6 hours 30 minutes",
    difficulty: "Low",
    rating: 4.46,
    reviewCount: 57,
    languages: ["EN", "ES"],
    images: [
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_1-sunset-mount-teide-night-tour-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_3-group-astronomical-observation-mount-teide-night-tour-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_4-astronomical-observation-mount-teide-night-tour.-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x984_651293979_5-star-gazing-mount-teide-night-tour-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1300x867_641293862_6-stargazing-mount-teide-night-tour.-2025.jpg",
      "https://api.volcanoteide.com/img/cache/1500x1000_751492995_7-stargazing-by-night-mount-teide-night-tour-2025.jpg",
    ],
    category: "stars",
    highlightsKeys: [
      "services.mount-teide-night-tour.highlights.0",
      "services.mount-teide-night-tour.highlights.1",
      "services.mount-teide-night-tour.highlights.2",
      "services.mount-teide-night-tour.highlights.3",
      "services.mount-teide-night-tour.highlights.4",
    ],
    includesKeys: [
      "services.mount-teide-night-tour.includes.0",
      "services.mount-teide-night-tour.includes.1",
      "services.mount-teide-night-tour.includes.2",
      "services.mount-teide-night-tour.includes.3",
      "services.mount-teide-night-tour.includes.4",
    ],
    notIncludedKeys: [
      "services.mount-teide-night-tour.notIncluded.0",
      "services.mount-teide-night-tour.notIncluded.1",
      "services.mount-teide-night-tour.notIncluded.2",
    ],
    restrictionsKeys: [
      "services.mount-teide-night-tour.restrictions.0",
      "services.mount-teide-night-tour.restrictions.1",
    ],
    importantInfoKeys: [
      "services.mount-teide-night-tour.importantInfo.0",
      "services.mount-teide-night-tour.importantInfo.1",
      "services.mount-teide-night-tour.importantInfo.2",
    ],
    prepareKeys: [
      "services.mount-teide-night-tour.prepare.0",
      "services.mount-teide-night-tour.prepare.1",
    ],
    meetingPoint: "Pick-up from a meeting point near your hotel in North or South Tenerife. Schedule varies throughout the year depending on sunset time.",
    relatedSlugs: ["astronomical-observation", "sunset-and-stars", "astronomic-tour"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => !!s);
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category);
}

export const allServiceSlugs = services.map((s) => s.slug);

export async function getServiceWithOverrides(slug: string): Promise<Service | undefined> {
  const base = getServiceBySlug(slug);
  if (!base) return undefined;
  try {
    // Dynamic import to avoid bundling DB in client code
    const { getServiceOverride, getServiceData } = await import("./db");
    const override = getServiceOverride(slug);
    if (!override) return base;

    const data = getServiceData(slug);
    return {
      ...base,
      ...(override.price != null && { price: override.price }),
      ...(override.images_json && { images: JSON.parse(override.images_json) }),
      // Merge non-text overrides that apply to all locales
      ...(data?.duration && { duration: data.duration }),
      ...(data?.difficulty && { difficulty: data.difficulty as Service["difficulty"] }),
      ...(data?.rating != null && { rating: data.rating }),
      ...(data?.reviewCount != null && { reviewCount: data.reviewCount }),
      ...(data?.languages && { languages: data.languages }),
      ...(data?.meetingPoint && { meetingPoint: data.meetingPoint }),
    };
  } catch {
    return base;
  }
}
