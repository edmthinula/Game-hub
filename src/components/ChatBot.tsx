// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  Tooltip,
  HStack,
  Collapse,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import {
  ChatIcon,
  CloseIcon,
  AddIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { SYSTEM_INSTRUCTION } from "../const/ChatbotConst";

// Component to render formatted text
interface FormattedMessageProps {
  text: string;
  color?: string;
}

const FormattedMessage = ({ text, color }: FormattedMessageProps) => {
  interface RenderFormattedTextProps {
    text: string;
    color?: string;
  }

  const renderFormattedText = (
    text: string,
    color?: string
  ): React.ReactNode[] => {
    const lines: string[] = text.split("\n");
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let inList = false;

    lines.forEach((line: string, lineIndex: number) => {
      // Check for bullet points
      if (line.trim().match(/^[\*\-•]\s+/)) {
        const content: string = line.trim().replace(/^[\*\-•]\s+/, "");
        listItems.push(
          <ListItem key={`list-${lineIndex}`} ml={2}>
            {parseInlineFormatting(content, color)}
          </ListItem>
        );
        inList = true;
      } else {
        // If we were in a list and now we're not, render the list
        if (inList && listItems.length > 0) {
          elements.push(
            <UnorderedList key={`ul-${lineIndex}`} spacing={1} mb={2}>
              {listItems}
            </UnorderedList>
          );
          listItems = [];
          inList = false;
        }

        // Render regular line
        if (line.trim()) {
          elements.push(
            <Text key={`text-${lineIndex}`} mb={line.trim() ? 2 : 0}>
              {parseInlineFormatting(line, color)}
            </Text>
          );
        }
      }
    });

    // Don't forget to add any remaining list items
    if (listItems.length > 0) {
      elements.push(
        <UnorderedList key="ul-final" spacing={1} mb={2}>
          {listItems}
        </UnorderedList>
      );
    }

    return elements;
  };

  const parseInlineFormatting = (text: string, color?: string) => {
    const parts = [];
    let currentIndex = 0;

    // Regex to match **bold** and *italic*
    // Removed emoji regex as it's not necessary - emojis render fine as-is
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }

      const matchedText = match[0];

      // Check for bold **text**
      if (matchedText.startsWith("**") && matchedText.endsWith("**")) {
        parts.push(
          <Text as="span" fontWeight="bold" key={`bold-${match.index}`}>
            {matchedText.slice(2, -2)}
          </Text>
        );
      }
      // Check for italic *text*
      else if (matchedText.startsWith("*") && matchedText.endsWith("*")) {
        parts.push(
          <Text as="span" fontStyle="italic" key={`italic-${match.index}`}>
            {matchedText.slice(1, -1)}
          </Text>
        );
      }

      currentIndex = regex.lastIndex;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return <Box>{renderFormattedText(text)}</Box>;
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me anything about games.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const apikey = import.meta.env.VITE_GEMINI_API_KEY;

  const genAI = new GoogleGenAI({ apiKey: apikey });

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: input }],
          },
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const text = result.text || "I couldn't generate a response.";
      setMessages((prev) => [...prev, { text: text, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I encountered an error.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      { text: "Hello! Ask me anything about games.", sender: "bot" },
    ]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsExpanded(false); // Reset expansion when closing
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Color mode values
  const userBg = "blue.500";
  const botBg = useColorModeValue("gray.200", "gray.700");
  const userColor = "white";
  const botColor = useColorModeValue("black", "white");
  const containerBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerBg = useColorModeValue("blue.500", "blue.600");
  const iconHoverBg = useColorModeValue("whiteAlpha.300", "whiteAlpha.200");

  // Dynamic sizing
  const chatWidth = isExpanded ? "500px" : "350px";
  const chatHeight = isExpanded ? "600px" : "450px";

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Tooltip label="Chat with Game Assistant" placement="left">
          <IconButton
            icon={<ChatIcon boxSize={6} />}
            onClick={toggleChat}
            position="fixed"
            bottom="20px"
            right="20px"
            size="lg"
            colorScheme="blue"
            borderRadius="full"
            boxShadow="2xl"
            zIndex={1000}
            _hover={{ transform: "scale(1.1)" }}
            transition="all 0.2s"
            aria-label="Open chat"
          />
        </Tooltip>
      )}

      {/* Chat Window */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          w={chatWidth}
          h={chatHeight}
          bg={containerBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="2xl"
          zIndex={1000}
          overflow="hidden"
          display="flex"
          flexDirection="column"
          transition="all 0.3s ease"
        >
          {/* Header */}
          <Flex
            bg={headerBg}
            px={4}
            py={3}
            align="center"
            justify="space-between"
            borderTopRadius="xl"
          >
            <HStack spacing={2}>
              <ChatIcon color="white" boxSize={5} />
              <Text color="white" fontWeight="bold" fontSize="md">
                Game Assistant
              </Text>
            </HStack>

            <HStack spacing={1}>
              <Tooltip label="New Chat" placement="bottom">
                <IconButton
                  icon={<AddIcon />}
                  size="sm"
                  variant="ghost"
                  color="white"
                  onClick={handleNewChat}
                  _hover={{ bg: iconHoverBg }}
                  aria-label="New chat"
                />
              </Tooltip>

              <Tooltip
                label={isExpanded ? "Collapse" : "Expand"}
                placement="bottom"
              >
                <IconButton
                  icon={isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  size="sm"
                  variant="ghost"
                  color="white"
                  onClick={toggleExpand}
                  _hover={{ bg: iconHoverBg }}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                />
              </Tooltip>

              <Tooltip label="Close" placement="bottom">
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  color="white"
                  onClick={toggleChat}
                  _hover={{ bg: iconHoverBg }}
                  aria-label="Close chat"
                />
              </Tooltip>
            </HStack>
          </Flex>

          {/* Messages Area */}
          <VStack
            flex={1}
            spacing={3}
            align="stretch"
            overflowY="auto"
            p={4}
            bg={useColorModeValue("gray.50", "gray.900")}
            css={{
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#CBD5E0",
                borderRadius: "24px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#A0AEC0",
              },
            }}
          >
            {messages.map((msg, index) => (
              <Flex
                key={index}
                justify={msg.sender === "user" ? "flex-end" : "flex-start"}
                animation="fadeIn 0.3s ease-in"
              >
                <Box
                  maxW="85%"
                  bg={msg.sender === "user" ? userBg : botBg}
                  color={msg.sender === "user" ? userColor : botColor}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  borderBottomRightRadius={msg.sender === "user" ? "0" : "lg"}
                  borderBottomLeftRadius={msg.sender === "bot" ? "0" : "lg"}
                  fontSize="sm"
                  boxShadow="sm"
                  wordBreak="break-word"
                >
                  {msg.sender === "bot" ? (
                    <FormattedMessage text={msg.text} color={botColor} />
                  ) : (
                    <Text whiteSpace="pre-wrap">{msg.text}</Text>
                  )}
                </Box>
              </Flex>
            ))}
            {isLoading && (
              <Flex justify="flex-start">
                <Box
                  bg={botBg}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  borderBottomLeftRadius="0"
                >
                  <HStack spacing={1}>
                    <Box
                      as="span"
                      w="8px"
                      h="8px"
                      bg="gray.500"
                      borderRadius="full"
                      animation="bounce 1.4s infinite ease-in-out both"
                      sx={{
                        "@keyframes bounce": {
                          "0%, 80%, 100%": { transform: "scale(0)" },
                          "40%": { transform: "scale(1)" },
                        },
                      }}
                    />
                    <Box
                      as="span"
                      w="8px"
                      h="8px"
                      bg="gray.500"
                      borderRadius="full"
                      animation="bounce 1.4s infinite ease-in-out both"
                      sx={{
                        animationDelay: "0.16s",
                        "@keyframes bounce": {
                          "0%, 80%, 100%": { transform: "scale(0)" },
                          "40%": { transform: "scale(1)" },
                        },
                      }}
                    />
                    <Box
                      as="span"
                      w="8px"
                      h="8px"
                      bg="gray.500"
                      borderRadius="full"
                      animation="bounce 1.4s infinite ease-in-out both"
                      sx={{
                        animationDelay: "0.32s",
                        "@keyframes bounce": {
                          "0%, 80%, 100%": { transform: "scale(0)" },
                          "40%": { transform: "scale(1)" },
                        },
                      }}
                    />
                  </HStack>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input Area */}
          <Flex
            p={3}
            borderTop="1px solid"
            borderColor={borderColor}
            align="center"
            bg={containerBg}
          >
            <Input
              placeholder="Ask about a game..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
              size="md"
              borderRadius="lg"
              mr={2}
              disabled={isLoading}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500",
              }}
            />
            <Button
              onClick={handleSend}
              colorScheme="blue"
              size="md"
              isLoading={isLoading}
              borderRadius="lg"
              px={6}
            >
              Send
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </>
  );
};

export default ChatBot;
