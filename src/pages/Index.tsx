import { useState, useEffect, useRef } from "react";
import { Play, Pause, Plus, Volume2, VolumeX } from "lucide-react";
import {
  fetchCelebrities,
  generateRandomImage,
  getTotalPages,
} from "../services/celebrityApi";
import { showToast } from "../utils/toast";

interface Celebrity {
  id: string;
  name: string;
  sport: string;
  description: string;
  imageUrl: string;
  achievements: string[];
}

const SportsReelsApp = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState(false);
  const [newCelebName, setNewCelebName] = useState("");
  const [newCelebSport, setNewCelebSport] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load initial celebrities from API
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const initialCelebrities = await fetchCelebrities(1, 3);
        setCelebrities(initialCelebrities);
        setTotalPages(getTotalPages(3));

        // Try to load from localStorage as well
        const stored = localStorage.getItem("sportsReels");
        if (stored) {
          const storedCelebs = JSON.parse(stored);
          setCelebrities((prev) => [...prev, ...storedCelebs]);
        }
      } catch (error) {
        console.error("Error loading celebrities:", error);
        showToast("Error loading celebrities", "error");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Save custom celebrities to localStorage
  useEffect(() => {
    const customCelebrities = celebrities.filter((celeb) =>
      celeb.id.startsWith("custom-")
    );
    if (customCelebrities.length > 0) {
      localStorage.setItem("sportsReels", JSON.stringify(customCelebrities));
    }
  }, [celebrities]);

  // Handle scroll snapping and load more data
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / itemHeight);

      // Load more data when approaching the end
      if (
        newIndex >= celebrities.length - 2 &&
        currentPage < totalPages &&
        !isLoadingMore
      ) {
        loadMoreCelebrities();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [celebrities.length, currentPage, totalPages, isLoadingMore]);

  const loadMoreCelebrities = async () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const newCelebrities = await fetchCelebrities(nextPage, 3);
      setCelebrities((prev) => [...prev, ...newCelebrities]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more celebrities:", error);
      showToast("Error loading more celebrities", "error");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const generateDescription = (name: string, sport: string) => {
    const templates = [
      `${name} is a legendary ${sport} athlete known for their exceptional skill and dedication to the sport.`,
      `Meet ${name}, one of the most celebrated names in ${sport} history.`,
      `${name} has made significant contributions to ${sport} and continues to inspire athletes worldwide.`,
      `A true champion in ${sport}, ${name} represents excellence and perseverance.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const speakText = (text: string, celebrityId: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      if (isPlaying[celebrityId]) {
        setIsPlaying((prev) => ({ ...prev, [celebrityId]: false }));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = isMuted ? 0 : 1;

      utterance.onstart = () => {
        setIsPlaying((prev) => ({ ...prev, [celebrityId]: true }));
      };

      utterance.onend = () => {
        setIsPlaying((prev) => ({ ...prev, [celebrityId]: false }));
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const addNewCelebrity = async () => {
    if (!newCelebName.trim() || !newCelebSport.trim()) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setIsLoading(true);

    const newCelebrity: Celebrity = {
      id: `custom-${Date.now()}`,
      name: newCelebName.trim(),
      sport: newCelebSport.trim(),
      description: generateDescription(
        newCelebName.trim(),
        newCelebSport.trim()
      ),
      imageUrl: generateRandomImage(),
      achievements: [
        `Professional ${newCelebSport.trim()} player`,
        "Multiple championships",
        "Sports icon",
      ],
    };

    setCelebrities((prev) => [...prev, newCelebrity]);
    setNewCelebName("");
    setNewCelebSport("");
    setIsDialogOpen(false);
    setIsLoading(false);

    showToast(`${newCelebrity.name} has been added to your reels.`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechRef.current) {
      speechRef.current.volume = isMuted ? 1 : 0;
    }
  };

  if (isLoading && celebrities.length === 0) {
    return (
      <div
        className="app-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loading-spinner"></div>
        <span style={{ marginLeft: "12px" }}>Loading celebrities...</span>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">Sports Reels</h1>
          <div className="header-controls">
            <button className="button" onClick={toggleMute}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button className="button" onClick={() => setIsDialogOpen(true)}>
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <div className="modal-overlay" onClick={() => setIsDialogOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Sports Celebrity</h2>
            </div>
            <div className="modal-form">
              <input
                className="input"
                placeholder="Celebrity Name"
                value={newCelebName}
                onChange={(e) => setNewCelebName(e.target.value)}
              />
              <input
                className="input"
                placeholder="Sport (e.g., Basketball, Tennis)"
                value={newCelebSport}
                onChange={(e) => setNewCelebSport(e.target.value)}
              />
              <button
                className={`button-primary button-full ${
                  isLoading ? "loading" : ""
                }`}
                onClick={addNewCelebrity}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Celebrity"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reels Container */}
      <div ref={containerRef} className="reels-container scrollbar-hide">
        {celebrities.map((celebrity, index) => (
          <div key={celebrity.id} className="reel-item"> 
            <video
              className="reel-background"
              src={celebrity.imageUrl}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover", 
              }}
            />

            {/* Gradient Overlay */}
            <div className="reel-overlay" />

            {/* Content */}
            <div className="reel-content">
              <div>
                <h2 className="reel-name">{celebrity.name}</h2>
                <p className="reel-sport">{celebrity.sport}</p>

                <div className="reel-description-box">
                  <p className="reel-description">{celebrity.description}</p>

                  <div>
                    <h3 className="achievements-title">Key Achievements:</h3>
                    {celebrity.achievements.map((achievement, i) => (
                      <p key={i} className="achievement-item">
                        • {achievement}
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  className="button-primary"
                  onClick={() => speakText(celebrity.description, celebrity.id)}
                  disabled={isMuted && isPlaying[celebrity.id]}
                >
                  {isPlaying[celebrity.id] ? (
                    <>
                      <Pause style={{ marginRight: "8px" }} size={20} />
                      Stop Narration
                    </>
                  ) : (
                    <>
                      <Play style={{ marginRight: "8px" }} size={20} />
                      Play Narration
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Side Indicators */}
            <div className="side-indicators">
              {celebrities.map((_, i) => (
                <div
                  key={i}
                  className={`indicator ${i === index ? "active" : "inactive"}`}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Loading more indicator */}
        {isLoadingMore && (
          <div
            className="reel-item"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loading-spinner"></div>
            <span style={{ marginLeft: "12px" }}>Loading more...</span>
          </div>
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="bottom-gradient" />
    </div>
  );
};

export default SportsReelsApp;
