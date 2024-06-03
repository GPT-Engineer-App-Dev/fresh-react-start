import { Container, Text, VStack, Box, Flex, Spacer, IconButton, useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { useEvents, useAddEvent } from "../integrations/supabase/index.js";
import { FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEventMutation = useAddEvent();

  const handleAddEvent = () => {
    addEventMutation.mutate({
      name: "New Event",
      date: new Date().toISOString().split('T')[0],
      description: "This is a new event",
      venue_id: 1,
      is_pinned: false,
    });
  };
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <Box>
      <Flex as="nav" bg={useColorModeValue("gray.100", "gray.900")} p={4} boxShadow="md">
        <Box p="2">
          <Text fontSize="xl" fontWeight="bold">MyApp</Text>
        </Box>
        <Spacer />
        <Box>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorModeIcon}
            onClick={toggleColorMode}
          />
        </Box>
      </Flex>
      <Container centerContent maxW="container.md" height="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        <Button onClick={handleAddEvent} isLoading={addEventMutation.isLoading}>Add Event</Button>
          {isLoading && <Text>Loading events...</Text>}
          {isError && <Text>Error loading events</Text>}
          {events && events.map(event => (
            <Box key={event.id} p={4} shadow="md" borderWidth="1px">
              <Text>{event.name}</Text>
              <Text>{event.date}</Text>
              <Text>{event.description}</Text>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;