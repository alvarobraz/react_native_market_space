import { Box, HStack, VStack, Text } from "native-base";
import { Button } from "./Button";
import { UserPhoto } from "./UserPhoto";

type PropsHeader = {
  imgAvatar?: string;
  nameUser: string
}

export default function HeaderCatalog({ imgAvatar, nameUser }: PropsHeader) {
  return(
    <HStack justifyContent="space-between" mt={10} mb={2}>
      <Box w="50%">
        <HStack>
        <VStack 
          w="30%"
        >
        <UserPhoto 
          size={8}
          mb={2}
          imgAvatar={imgAvatar}
        />
        </VStack>
        <VStack w="70%" top={1} left={2}>
          <Text
            fontSize="xs"
          >
            Boas vindas,
          </Text>
          <Text
           fontSize="xs"
          >
            {nameUser}
          </Text>
        </VStack>
        </HStack>
      </Box>
      <Box w="50%">
      <Button 
        title="Criar anúncio"
        variant="black"
        icon={true}
        nameIcon="add"
      />
      </Box>
    </HStack>
  )
}