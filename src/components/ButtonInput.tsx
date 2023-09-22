import { Button as ButtonNativeBase, IButtonProps, Icon, Text, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
// type Props = IButtonProps & {
//   nameIcon: 'add'
// }

export function ButtonInput({...rest }: IButtonProps) {
 return(
  <ButtonNativeBase
    alignItems="center"
    textAlign="center"
    justifyContent="center"
    mr={2}
    h="100px"
    w="100px"
    bg="gray.500"
    rounded="md"
    _pressed={{
      bg:"rgba(217, 216, 218, 0.4)"
    }}
    {...rest}
  >
    <Icon 
      as={MaterialIcons}
      name="add"
      color="gray.400"
      size={7}
      top={0.4}
      // left={3}
    />
  </ButtonNativeBase>
 )
}