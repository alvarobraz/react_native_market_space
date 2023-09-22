import { Button as ButtonNativeBase, IButtonProps, Icon, Text, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { dimensionWith } from '@utils/dimensionWith';

type Props = IButtonProps & {
  title: string;
  variant?: 'black' | 'blue' | 'gray';
  icon?: boolean;
  nameIcon?: 'add' | 'whatshot' | 'power-settings-new' | 'delete-outline' | 'arrow-back' | 'local-offer'
}

export function Button({ title, variant, icon, nameIcon, ...rest }: Props) {
  const dimension = dimensionWith()
  return (
    <ButtonNativeBase
      flexDirection="row"
      alignItems="center"
      textAlign="center"
      justifyContent={icon === true ? "space-around" : "flex-start"}
      h={12}
      bg={variant === 'blue' ? 'blue.200' : variant === 'black' ? 'gray.100' : 'gray.500'}
      rounded="md"
      _pressed={{
        bg: variant === 'blue' ? 'blue.100' : variant === 'black' ? 'gray.200' : 'gray.400'
      }}
      {...rest}
    >
      <HStack
        flexDirection="row"
        alignItems="center"
        textAlign="center"
        justifyContent={icon === true ? "flex-start" : "center"}
      >
        {
          icon === true ?
          
          <Icon 
            as={MaterialIcons}
            name={nameIcon}
            color={nameIcon === 'delete-outline' || nameIcon === 'arrow-back' ? "black" : nameIcon === 'local-offer' ? "white" : "white"}
            size={4}
            top={0.4}
            // left={3}
          />
          :
          ''
        }
        <Text 
          // bg="gray.500"
          flexDirection="row"
          alignItems="center"
          textAlign={icon === true ? "center" : "center"}
          justifyContent={icon === true ? "center" : "center"}
          w={icon === true ? "auto" : "full"}
          color={variant === 'blue' ? 'white' : variant === 'black' ? 'white' : 'gray.100'}
          fontFamily="bold"
          fontSize={icon === true ? "xs" : "xm"}
          // position="relative"
          // right={-6}
          ml={icon === true ? "2" : "0"}
          // left={-3}
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
}