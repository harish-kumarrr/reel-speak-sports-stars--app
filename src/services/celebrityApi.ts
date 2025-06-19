interface Celebrity {
  id: string;
  name: string;
  sport: string;
  description: string;
  imageUrl: string;
  achievements: string[];
}

// Famous sports celebrities data
const sportsStars = [
  {
    name: "Serena Williams",
    sport: "Tennis",
    achievements: [
      "23 Grand Slam titles",
      "319 weeks at No. 1",
      "4 Olympic gold medals",
    ],
  },
  {
    name: "LeBron James",
    sport: "Basketball",
    achievements: [
      "4 NBA championships",
      "4 Finals MVP awards",
      "19 All-Star selections",
    ],
  },
  {
    name: "Cristiano Ronaldo",
    sport: "Soccer",
    achievements: [
      "5 Ballon d'Or awards",
      "5 Champions League titles",
      "800+ career goals",
    ],
  },
  {
    name: "Michael Jordan",
    sport: "Basketball",
    achievements: [
      "6 NBA championships",
      "5 MVP awards",
      "Basketball Hall of Fame",
    ],
  },
  {
    name: "Tiger Woods",
    sport: "Golf",
    achievements: [
      "15 Major championships",
      "82 PGA Tour wins",
      "Masters champion",
    ],
  },
  {
    name: "Tom Brady",
    sport: "American Football",
    achievements: [
      "7 Super Bowl titles",
      "5 Super Bowl MVP awards",
      "15 Pro Bowl selections",
    ],
  },
  {
    name: "Usain Bolt",
    sport: "Track and Field",
    achievements: [
      "8 Olympic gold medals",
      "World record holder",
      "100m and 200m champion",
    ],
  },
  {
    name: "Michael Phelps",
    sport: "Swimming",
    achievements: [
      "23 Olympic gold medals",
      "39 world records",
      "Most decorated Olympian",
    ],
  },
  {
    name: "Lionel Messi",
    sport: "Soccer",
    achievements: [
      "7 Ballon d'Or awards",
      "World Cup winner",
      "800+ career goals",
    ],
  },
  {
    name: "Venus Williams",
    sport: "Tennis",
    achievements: [
      "7 Grand Slam titles",
      "5 Wimbledon titles",
      "Olympic gold medalist",
    ],
  },
  {
    name: "Kobe Bryant",
    sport: "Basketball",
    achievements: [
      "5 NBA championships",
      "18 All-Star selections",
      "NBA Hall of Fame",
    ],
  },
  {
    name: "Roger Federer",
    sport: "Tennis",
    achievements: [
      "20 Grand Slam titles",
      "310 weeks at No. 1",
      "Wimbledon champion",
    ],
  },
  {
    name: "Muhammad Ali",
    sport: "Boxing",
    achievements: [
      "3-time world champion",
      "Olympic gold medalist",
      "Sports icon",
    ],
  },
  {
    name: "Simone Biles",
    sport: "Gymnastics",
    achievements: [
      "7 Olympic medals",
      "19 World Championship gold",
      "Greatest gymnast",
    ],
  },
  {
    name: "Stephen Curry",
    sport: "Basketball",
    achievements: [
      "4 NBA championships",
      "2 MVP awards",
      "3-point record holder",
    ],
  },
];

const generateDescription = (name: string, sport: string): string => {
  const templates = [
    `${name} is a legendary ${sport} athlete known for their exceptional skill and dedication to the sport.`,
    `Meet ${name}, one of the most celebrated names in ${sport} history.`,
    `${name} has made significant contributions to ${sport} and continues to inspire athletes worldwide.`,
    `A true champion in ${sport}, ${name} represents excellence and perseverance.`,
    `${name} is widely regarded as one of the greatest ${sport} players of all time.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

export const generateRandomImage = () => {
  const sportImages = [ 
    "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1709884735017-114f4a31f944?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1721132447246-5d33f3008b05?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1723129092506-5cd0cd84decd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561816544-21ecbffa09a3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1578645635737-6a88e706e0f1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  ];
  return sportImages[Math.floor(Math.random() * sportImages.length)];
};

export const fetchCelebrities = async (
  page: number = 1,
  limit: number = 3
): Promise<Celebrity[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const start = (page - 1) * limit;
  const end = start + limit;
  const celebrities = sportsStars.slice(start, end);

  return celebrities.map((celeb, index) => ({
    id: `${page}-${index}`,
    name: celeb.name,
    sport: celeb.sport,
    description: generateDescription(celeb.name, celeb.sport),
    imageUrl: generateRandomImage(),
    achievements: celeb.achievements,
  }));
};

export const getTotalPages = (limit: number = 3): number => {
  return Math.ceil(sportsStars.length / limit);
};
