import sportsStars from "./sports_stars_100.json"
import sportVideo from "./sports_videos_20.json"
interface Celebrity {
  id: string;
  name: string;
  sport: string;
  description: string;
  videoUrl: string;
  achievements: string[];
}

// Famous sports celebrities data


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

export const generateRandomVideo = () => {

  return sportVideo[Math.floor(Math.random() * sportVideo.length)];
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
    videoUrl: generateRandomVideo(),
    achievements: celeb.achievements,
  }));
};

export const getTotalPages = (limit: number = 3): number => {
  return Math.ceil(sportsStars.length / limit);
};
