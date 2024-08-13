import React, { useEffect, useState } from 'react';
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
      <div>
        <h2>Screenshots</h2>
        {screenshots.map((screenshot) => (
          <img key={screenshot.id} src={screenshot.image} alt="Screenshot" />
        ))}
      </div>
    );
  }
  
  export default ScreenShots;
  

