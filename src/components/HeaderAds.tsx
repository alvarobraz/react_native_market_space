import { Button as ButtonNativeBase, IButtonProps, HStack, Icon, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { dimensionWith } from "@utils/dimensionWith";

type PropsHeader = IButtonProps & {
  iconLeft?: boolean;
  nameIconLeft?: 'arrow-back';
  title?: string;
  iconRight?: boolean;
  nameIconRight?: 'add' | 'arrow-forward' | 'border-color';
  handleGoBack?: () => void;
  myAd?: boolean;
}

export default function HeaderAds({ iconLeft, nameIconLeft, title, iconRight, nameIconRight, handleGoBack, myAd = true, ...rest }: PropsHeader) {
  const dimension = dimensionWith()
  return(
    <HStack
      justifyContent={title ? "center" : "space-between"} 
      alignContent="center"
      textAlign="center"
      h={12} 
      mt={6} 
      mb={2} 
      px={dimension > 400 ? 10 : 5} 
      pt={5}
      pb={7}
    >
       {
          iconLeft === true ?
          <ButtonNativeBase
            {...rest}
            w="5%"
            bg="gray.600"
            _pressed={{
              bg: 'gray.500'
            }}
            left={0}
            onPress={handleGoBack}
          >
            <Icon 
              as={MaterialIcons}
              name={nameIconLeft}
              color="gray.100"
              size={5}
              left={-17}
            />
          </ButtonNativeBase>
          :
          null
        }
        {
          title ?
          <Text 
            flexDirection="row"
            alignItems="center"
            textAlign={iconLeft === true ? "center" : "center"}
            justifyContent={iconLeft === true ? "center" : "center"}
            w="90%"
            h={5}
            color="gray.100"
            fontFamily="bold"
            fontSize={iconLeft === true ? "sm" : "sm"}
            mx={0}
            ml={iconLeft === false ? '5%' : 0}
            mr={iconRight === false ? '5%' : 0}
            top={-2}
            // left={iconRight === false ? '-24px' : '0'}
          >
            {title}
          </Text>
          :
          null
        }
        {
          iconRight === true ?
          <ButtonNativeBase
            {...rest}
            w="5%"
            bg="gray.600"
            _pressed={{
              bg: 'gray.500'
            }}
            right={0}
          >
            <Icon 
              as={MaterialIcons}
              name={nameIconRight}
              color="gray.100"
              size={4}
              left={-17}
            />
          </ButtonNativeBase>
          :
          ''
        }
    </HStack>
  )
}