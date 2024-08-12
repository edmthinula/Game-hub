import React from 'react'
import {Card,CardBody,Skeleton, SkeletonText} from '@chakra-ui/react'

const GamecarSceleton = () => {
  return (
    <Card >
        <Skeleton 
        height='200px'/>
        <CardBody>
            <SkeletonText/>
        </CardBody>
    </Card>
  )
}

export default GamecarSceleton