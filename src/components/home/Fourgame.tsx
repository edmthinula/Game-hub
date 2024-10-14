import React, { useEffect, useState } from "react";
import {
  Stack,
  VStack,
  Box,
  Card,
  CardBody,
  StackDivider,
  Text,
  CardHeader,
  Heading,
  Center,
  Image,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import GODofwar from "../../images/Ragnarök-culture-ar1qdh.webp";
import star5 from "../../images/5star.png";
import last2 from "../../images/last2.jpg";
import spidy from "../../images/spiderman.jpg";
import creed from "../../images/assasins.jpg";
import horizon from "../../images/horizon.jpg";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";

function Fourgame() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    },2000);
  },[])

  if (loading) {
    return (
<Center h="100vh">
<Triangle
  visible={true}
  height="2500"
  width="250"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
</Center>
    );
  }

  return (
    <div>
      <Card borderRadius={40} width="90vw" maxW="1980px">
        <CardBody>
          <Stack spacing="50">
            <Center>
              <Stack direction={["column", "row"]} spacing="3vw">
                <Box w="40vw" h="26vh">
                  <Image
                    height="25vh"
                    width="45vw"
                    objectFit="cover"
                    src={spidy}
                    alt="God of war"
                  />
                </Box>
                <Box maxW="35vw">
                  <Heading marginTop="1vh" fontWeight={100} size="lg">
                    Marvel's
                  </Heading>
                  <Heading marginBottom="4vh">Spider Man 2 </Heading>
                  Swing into action as Peter Parker and Miles Morales face their
                  greatest challenges yet in a thrilling battle to save New
                  York. Developed by Insomniac Games, this sequel brings intense
                  web-slinging, dynamic combat, and an emotional story that
                  pushes both heroes to their limits
                  <Flex marginTop="1vh">
                    <Link to={"/game/662316"}>
                      <Button
                        marginTop="0.5vh"
                        colorScheme="teal"
                        variant="outline"
                      >
                        More
                      </Button>
                    </Link>
                    <Spacer />
                    <Box
                      marginBottom={0}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      textAlign="right"
                    >
                      1 year
                      <Image
                        src={star5}
                        alt="rating"
                        width="100px"
                        height="15px"
                        marginTop={0}
                      />
                      (93)
                    </Box>
                  </Flex>
                </Box>
              </Stack>
            </Center>

            <Center>
              <Stack direction={["column", "row"]} spacing="3vw">
                <Box maxW="35vw">
                  <Heading marginTop="1vh" fontWeight={100} size="lg">
                    Assassin's Creed
                  </Heading>
                  <Heading marginBottom="4vh">Mirage</Heading>
                  Swing into action as Peter Parker and Miles Morales face their
                  greatest challenges yet in a thrilling battle to save New
                  York. Developed by Insomniac Games, this sequel brings intense
                  web-slinging, dynamic combat, and an emotional story that
                  pushes both heroes to their limits
                  <Flex marginTop="1vh">
                    <Link to="/game/845261">
                      <Button
                        marginTop="0.5vh"
                        colorScheme="teal"
                        variant="outline"
                      >
                        More
                      </Button>
                    </Link>
                    <Spacer />
                    <Box
                      marginBottom={0}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      textAlign="right"
                    >
                      1 year
                      <Image
                        src={star5}
                        alt="rating"
                        width="100px"
                        height="15px"
                        marginTop={0}
                      />
                      (84)
                    </Box>
                  </Flex>
                </Box>
                <Box w="40vw" h="26vh">
                  <Image
                    height="25vh"
                    width="45vw"
                    objectFit="cover"
                    src={creed}
                    alt="God of war"
                  />
                </Box>
              </Stack>
            </Center>

            <Center>
              <Stack direction={["column", "row"]} spacing="3vw">
                <Box w="40vw" h="26vh">
                  <Image
                    height="25vh"
                    width="45vw"
                    objectFit="cover"
                    src={horizon}
                    alt="God of war"
                  />
                </Box>
                <Box maxW="35vw">
                  <Heading marginTop="1vh" fontWeight={100} size="lg">
                    Horizon
                  </Heading>
                  <Heading marginBottom="4vh">Forbidden West</Heading>
                  Join Aloy on a breathtaking journey through majestic, untamed
                  lands in this sequel to Horizon Zero Dawn. Explore mysterious
                  new regions, face awe-inspiring machines, and uncover hidden
                  dangers as you fight to save the world from a looming
                  catastrophe.
                  <Flex marginTop="1vh">
                    <Link to="/game/966906">
                      <Button
                        marginTop="0.5vh"
                        colorScheme="teal"
                        variant="outline"
                      >
                        More
                      </Button>
                    </Link>
                    <Spacer />
                    <Box
                      marginBottom={0}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      textAlign="right"
                    >
                      2 year
                      <Image
                        src={star5}
                        alt="rating"
                        width="100px"
                        height="15px"
                        marginTop={0}
                      />
                      (93)
                    </Box>
                  </Flex>
                </Box>
              </Stack>
            </Center>
            <Center>
              <Stack direction={["column", "row"]} spacing="3vw">
                <Box maxW="35vw">
                  <Heading marginTop="1vh" fontWeight={100} size="lg">
                    Last Of Us
                  </Heading>
                  <Heading marginBottom="4vh">Part II</Heading>
                  Experience an emotional and intense journey in a
                  post-apocalyptic world as Ellie seeks vengeance and justice.
                  Developed by Naughty Dog, this sequel to the acclaimed The
                  Last of Us pushes the boundaries of storytelling, survival,
                  and human resilience.
                  <Flex marginTop="1vh">
                    <Link to="/game/51325">
                      <Button
                        marginTop="0.5vh"
                        colorScheme="teal"
                        variant="outline"
                      >
                        More
                      </Button>
                    </Link>
                    <Spacer />
                    <Box
                      marginBottom={0}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      textAlign="right"
                    >
                      4 year
                      <Image
                        src={star5}
                        alt="rating"
                        width="100px"
                        height="15px"
                        marginTop={0}
                      />
                      (64)
                    </Box>
                  </Flex>
                </Box>
                <Box w="40vw" h="26vh">
                  <Image
                    height="25vh"
                    width="45vw"
                    objectFit="cover"
                    src={last2}
                    alt="God of war"
                  />
                </Box>
              </Stack>
            </Center>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default Fourgame;
