import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface GameDetail {
  id: number;
  name: string;
  description: string;
  background_image: string;
  released: string;
  metacritic: number;
  website: string;
  platforms: { platform: { name: string } }[];
  // Add other fields as needed
}

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameDetail, setGameDetail] = useState<GameDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get<GameDetail>(
          `https://api.rawg.io/api/games/${id}?key=7ff649f928e448d58ceaaadcb391c639`
        );
        setGameDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameDetail) return <div>No data available</div>;

  console.log(gameDetail); // Log the game details to the console

  return (
    <div>
      <h1>{gameDetail.name}</h1>
      <img src={gameDetail.background_image} alt={gameDetail.name} />
      <p>Released: {gameDetail.released}</p>
      <p>Metacritic Score: {gameDetail.metacritic}</p>
      <p>{gameDetail.description}</p>
      <p>
        Website:{" "}
        <a href={gameDetail.website} target="_blank" rel="noopener noreferrer">
          {gameDetail.website}
        </a>
      </p>
      <p>
        Platforms:{" "}
        {gameDetail.platforms.map((platform) => platform.platform.name).join(", ")}
      </p>
    </div>
  );
};

export default GameDetail;
