import { Fade } from "react-slideshow-image";
import { useState, useEffect, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";
import axios from "axios";
import useScreenShots from "../../hooks/useScreenShots";

interface Screenshot {
  id: number;
  image: string;
}

interface ScreenshotProps {
  id: string | undefined;
}
function ScreenShots({ id }: ScreenshotProps) {
  const { data, error, isLoading } = useScreenShots(id || "");
  const fadeRef = useRef<any>(null);

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
        {data.map((screenshot) => (
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
