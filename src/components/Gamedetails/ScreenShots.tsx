import { Fade } from "react-slideshow-image";
import { useState, useEffect, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";
import axios from "axios";

interface Screenshot {
  id: number;
  image: string;
}

interface ScreenshotProps {
  ids: string | undefined;
}

function ScreenShots({ ids }: ScreenshotProps) {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fadeRef = useRef<any>(null);

  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        const response = await axios.get<{ results: Screenshot[] }>(
          `https://api.rawg.io/api/games/${ids}/screenshots?key=7ff649f928e448d58ceaaadcb391c639`
        );
        setScreenshots(response.data.results);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchScreenshot();
  }, [ids]);



  return (
    <div className={styles.container}>
      {error && <p>Error: {error}</p>}
      <Fade
        ref={fadeRef}
        easing="ease"
        autoplay={true}
        duration={5000}
        pauseOnHover={false}
        arrows={false}
      >
        {screenshots.map((screenshot) => (
          <div className={styles.slide} key={screenshot.id}>
            <div
              style={{
                backgroundImage: `url(${screenshot.image})`,
                backgroundSize: "cover",
                height: "100vh",
                width: "100%",
              }}
            ></div>
          </div>
        ))}
      </Fade>

    </div>
  );
}
export default ScreenShots;
