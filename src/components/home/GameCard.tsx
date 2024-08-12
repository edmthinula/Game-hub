import React from 'react'
import { Game } from '../../hooks/useGames';
import { Card, CardBody, HStack, Heading, Image, Text } from '@chakra-ui/react';
import PlatformIconList from './PlatformIconList';
import CreditScore from './CreditScore';
import getCroppedImageUrl from '../../services/image-url';
import { Link } from 'react-router-dom';

interface Props{
    game : Game;
}

const GameCard = ({game}:Props) => {
  return (
    <Link to={`/game/${game.id}`} style={{textDecoration:'none',color:'inherit'}}>
    <Card>
        <Image src ={getCroppedImageUrl(game.background_image)}/>
        <CardBody>
            <Heading fontSize='2xl'>
                {game.name}
            </Heading>
            <HStack justifyContent={'space-between'} marginBottom={3}>
            <PlatformIconList platforms={game.parent_platforms.map
                (p => p.platform)}/>
            <CreditScore score={game.metacritic}/>  
            </HStack>
        </CardBody>
    </Card>
    </Link>
  )
}

export default GameCard;