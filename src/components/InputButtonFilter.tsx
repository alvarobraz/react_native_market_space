import { Button as ButtonNativeBase, IButtonProps, Center, HStack, Box } from "native-base";
import { Input } from "./Input";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";

type Props = IButtonProps & {
  typeInput?: 'default' | 'filter'
  handleSearchAds: () => void;
  handleApplyFilters: () =>  void;
}

export function InputButtonFilter({ typeInput, handleSearchAds, handleApplyFilters, ...rest }:Props) {
  return (
    <HStack flex={1} top={4} w="full">
      <Input 
        w="85%" 
        placeholder="Buscar" 
        typeInput={typeInput}
        InputRightElement={
          <ButtonNativeBase 
            bg="gray.700"
            _pressed={{
              bg: "gray.700"
            }}
            onPress={handleSearchAds}
          >
            <MagnifyingGlass
              color="#3E3A40"
              size={20}
              style={{ top: 0, right: -1 }}
            />
          </ButtonNativeBase>
        }
        _focus={{
          borderWidth: 1,
          bg: "gray.700",
          borderColor: "gray.500"

        }}
        borderRightColor="gray.400"
      />
      <Box w={0.4} h="18px" mt="15px" bg="gray.400" />
      <ButtonNativeBase 
        w={10} 
        h={12} 
        bg="gray.700" 
        mr={0} 
        borderTopRightRadius={6}
        borderBottomRightRadius={6}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}  
        borderRightWidth={1}
        borderTopWidth={1}
        borderBottomWidth={1}
        borderTopColor="gray.500"
        borderRightColor="gray.500"
        borderBottomColor="gray.500"
        _pressed={{
          bg: "gray.700"
        }}
        onPress={handleApplyFilters}
        {...rest}
      >
          <Center w={10} h={10} top="0">
            <Sliders
              color="#3E3A40"
              size={20}
              style={{ top: 0, right: 2 }}
            />
          </Center>
        </ButtonNativeBase>
    </HStack>
  )
}