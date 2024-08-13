import { Fade } from "react-slideshow-image";
import { useState, useEffect,useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";
import { Center } from "@chakra-ui/react";
import { Button, Stack } from "@chakra-ui/react";
import axios from 'axios';

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
  const [currentslide, setCurrentSlide] = useState(0);
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

  const handleButtonClick = (index: number) => {
    setCurrentSlide(index);
    fadeRef.current.goTo(index);
  };

  return (
    <div className={styles.container}>
      {error && <p>Error: {error}</p>}
      <Fade
        ref={fadeRef}
        easing="ease"
        autoplay={true}
        duration={5000}
        pauseOnHover={false}
        onChange={(oldindex, newindex) => {
          setCurrentSlide(newindex);
        }}
      >
        {screenshots.map((screenshot) => (
          <div className={styles.slide} key={screenshot.id}>
            <div
              style={{
                backgroundImage: `url(${screenshot.image})`,
                backgroundSize: "cover",
                height: "500px", // adjust based on your design
                width: "100%",
              }}
            ></div>
          </div>
        ))}
      </Fade>
      <Center>
        <Stack
          spacing={4}
          direction="row"
          top="94%"
          position="absolute"
          zIndex={10}
        >
        {screenshots.map((_, index) => (
           <Button
           key={index}
           colorScheme={index === currentslide ? 'teal':'purple'}
           size="xs"
           borderRadius="50%"
           onClick={() => handleButtonClick(index)}
         />
          
          ))}
        </Stack>
      </Center>
    </div>
  );
}
  export default ScreenShots;
  

