import { Button as ButtonNativeBase, IButtonProps, Icon, Text, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type Props = IButtonProps & {
  title: string;
  variant?: 'black' | 'blue' | 'gray';
  icon?: boolean;
  nameIcon?: 'add'
}

export function Button({ title, variant, icon, nameIcon, ...rest }: Props) {
  console.log(nameIcon)
  return (
    <ButtonNativeBase
      flexDirection="row"
      alignItems="center"
      textAlign="center"
      justifyContent="flex-start"
      h={12}
      bg={variant === 'blue' ? 'blue.200' : variant === 'black' ? 'gray.100' : 'gray.500'}
      rounded="md"
      _pressed={{
        bg: variant === 'blue' ? 'blue.100' : variant === 'black' ? 'gray.200' : 'gray.400'
      }}
      {...rest}
    >
      <HStack>
        {
          icon === true ?
          
          <Icon 
            as={MaterialIcons}
            name={nameIcon}
            color="white"
            size={5}
            left={-3}
            top={0.4}
          />
          :
          ''
        }
        <Text 
          // bg="gray.500"
          flexDirection="row"
          alignItems="center"
          textAlign={icon === true ? "left" : "center"}
          justifyContent={icon === true ? "flex-start" : "center"}
          w={icon === true ? "150" : "full"}
          color={variant === 'blue' ? 'white' : variant === 'black' ? 'white' : 'gray.100'}
          fontFamily="bold"
          fontSize={icon === true ? "xm" : "sm"}
          ml={icon === true ? "1" : "0"}
          left={-3}
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
}