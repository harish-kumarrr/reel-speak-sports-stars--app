import sportsStars from "./sports_stars_100.json"
interface Celebrity {
  id: string;
  name: string;
  sport: string;
  description: string;
  imageUrl: string;
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

export const generateRandomImage = () => {
  const sportImages = [ 
 "https://videos.pexels.com/video-files/3125907/3125907-uhd_2560_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/3192198/3192198-uhd_2560_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/852038/852038-hd_1920_1080_30fps.mp4",
 "https://videos.pexels.com/video-files/2249402/2249402-uhd_2560_1440_24fps.mp4",
 "https://videos.pexels.com/video-files/2932301/2932301-uhd_2732_1440_24fps.mp4",
 "https://videos.pexels.com/video-files/854169/854169-hd_1920_1080_25fps.mp4",
 "https://videos.pexels.com/video-files/1585618/1585618-hd_1280_720_30fps.mp4",
 "https://videos.pexels.com/video-files/4438080/4438080-hd_1920_1080_25fps.mp4",
 "https://videos.pexels.com/video-files/854877/854877-hd_1920_1080_25fps.mp4",
 "https://videos.pexels.com/video-files/856132/856132-hd_1920_1080_30fps.mp4",
 "https://videos.pexels.com/video-files/992592/992592-hd_1920_1080_25fps.mp4",
 "https://videos.pexels.com/video-files/854878/854878-uhd_2560_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/3196564/3196564-uhd_2560_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/2657261/2657261-uhd_2560_1440_24fps.mp4",
 "https://videos.pexels.com/video-files/992695/992695-hd_1920_1080_25fps.mp4",
 "https://videos.pexels.com/video-files/2430839/2430839-uhd_2560_1440_24fps.mp4",
 "https://videos.pexels.com/video-files/3192082/3192082-uhd_2560_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/3196428/3196428-uhd_2560_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/4761738/4761738-uhd_2732_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/2938865/2938865-uhd_2732_1440_24fps.mp4",
 "https://videos.pexels.com/video-files/856188/856188-hd_1920_1080_30fps.mp4",
 "https://videos.pexels.com/video-files/3196221/3196221-uhd_2560_1440_25fps.mp4",
 "https://videos.pexels.com/video-files/2675510/2675510-hd_1920_1080_24fps.mp4"
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
