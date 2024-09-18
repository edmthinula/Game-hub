import React from "react";
import styles from "./landslide.module.css";
import { Fade } from "react-slideshow-image";
import { useState, useEffect, useRef } from "react";
import { Button, Stack, Center, Heading } from "@chakra-ui/react";
import Slidesarray from "../../services/slideshow";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {Link} from 'react-router-dom';

function Landingslideshow() {
  const fadeRef = useRef<any>(null);
  const [currentslide, setCurrentSlide] = useState(0);

  const handleButtonClick = (index: number) => {
    setCurrentSlide(index);
    fadeRef.current.goTo(index);
  };
  return (
    <div className={styles.container}>
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
        {Slidesarray.map((slides) => (
          <div className={styles.slide} key={slides.id}>
            <div
              style={{
                backgroundImage: `url(${slides.pc})`,
                backgroundSize: "cover",
                height: "100vh", // adjust based on your design
                width: "100vw",
              }}
            >
              <Heading
                as="h2"
                size="4xl"
                position="absolute"
                top="35vh"
                left="3vw"
              >
                {slides.name}
              </Heading>

              <Stack
                direction={["column", "row"]}
                spacing="24px"
                position="absolute"
                top="55vh"
                left="4vh"
              >
                <Button colorScheme="teal" variant="outline" size="lg">
                  Wath Trailer
                </Button>
                <Link to={`/game/${slides.more}`} style={{textDecoration:'none',color:'inherit'}}>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  size="lg"
                >
                  More
                </Button>
                </Link>
              </Stack>
            </div>
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
          {Slidesarray.map((_, index) => (
            <Button
              key={index}
              colorScheme={index === currentslide ? "teal" : "purple"}
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

export default Landingslideshow;
