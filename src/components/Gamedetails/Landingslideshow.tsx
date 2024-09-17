import React from 'react'
import styles from "./Slider.module.css";
import { Fade } from "react-slideshow-image";
import { useState, useEffect, useRef } from "react";
import { Button, Stack,Center } from "@chakra-ui/react";
import Slidesarray from"../../services/slideshow";

function Landingslideshow (){
  const fadeRef = useRef<any>(null);
  const [currentslide, setCurrentSlide] = useState(0);

  const handleButtonClick = (index: number) => {
    setCurrentSlide(index);
    fadeRef.current.goTo(index);
  }
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
  )
}

export default Landingslideshow;