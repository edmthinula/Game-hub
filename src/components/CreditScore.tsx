import { Badge } from '@chakra-ui/react';


interface Props{
    score:number;
}

const CreditScore = ({score}:Props) => {
let color = score > 75 ? "green" : score > 60 ? 'yellow' : '';



  return (
    <Badge fontSize='14px' colorScheme={color}
    paddingX={2} borderRadius='4px' >
      {score}
    </Badge>
  )
}

export default CreditScore;