import React from "react";
import styles from "./landslide.module.css";
import { Fade } from "react-slideshow-image";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Stack,
  Center,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import Slidesarray from "../../services/slideshow";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function Landingslideshow() {
  const fadeRef = useRef<any>(null);
  const [currentslide, setCurrentSlide] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trailer, settrailer] = useState<string>();
  const [trailhead, settrailhead] = useState<string>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    // Check on initial load
    handleResize();
    
    // Add event listener to detect screen size change
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleButtonClick = (index: number) => {
    setCurrentSlide(index);
    fadeRef.current.goTo(index);
  };

  const handletrailer = (obj: string, head: string) => {
    const url = obj.match(/src="([^"]+)"/)?.[1];
    settrailhead(head);
    settrailer(url);
    onOpen();
  };
  return (
    <div className={styles.container}>
      <Fade
        ref={fadeRef}
        easing="ease"
        autoplay={true}
        duration={2500}
        pauseOnHover={false}
        onChange={(oldindex, newindex) => {
          setCurrentSlide(newindex);
        }}
      >
        {Slidesarray.map((slides) => (
          <div className={styles.slide} key={slides.id}>
            <div
              style={{
                height: "100vh", 
                width: "100vw",
                background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${isMobile ? slides.mobile : slides.pc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
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
                <Button
                  colorScheme="teal"
                  variant="outline"
                  size="lg"
                  onClick={() => handletrailer(slides.trailer, slides.name)}
                >
                  Wath Trailer
                </Button>
                <Link
                  to={`/game/${slides.more}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
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
          top="89%"
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>{trailhead}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              title="Video Trailer"
              width="500"
              height="315"
              src={trailer}
              allowFullScreen
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Landingslideshow;
