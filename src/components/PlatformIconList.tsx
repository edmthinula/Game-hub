import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import{MdPhoneIphone} from 'react-icons/md';
import {SiNintendo} from 'react-icons/si';
import{BsGlobe} from 'react-icons/bs';
import { platform } from "../hooks/useGames";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { color } from "framer-motion";

interface Props {
  platforms: platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
  const iconMap:{[key:string]:IconType} = {
    pc:FaWindows,
    playstation : FaPlaystation,
    xbox:FaXbox,
    nintendo:SiNintendo,
    ios:MdPhoneIphone,
    android:FaAndroid,
    linux:FaLinux,
    mac:FaApple,
    web:BsGlobe
  }

  return (
    <HStack marginY={'10px'}>
      {platforms.map((platforms) => (
        <Icon key={platforms.id} as={iconMap[platforms.slug]} color='gray.500'/>
      ))}
    </HStack>
  );
};

export default PlatformIconList;
