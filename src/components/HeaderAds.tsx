import { Button as ButtonNativeBase, IButtonProps, HStack, Icon, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

type PropsHeader = IButtonProps & {
  iconLeft?: boolean;
  nameIconLeft?: 'arrow-back';
  title?: string;
  iconRight?: boolean;
  nameIconRight?: 'arrow-forward';
}

export default function HeaderAds({ iconLeft, nameIconLeft, title, iconRight, nameIconRight, ...rest }: PropsHeader) {
  console.log(iconLeft)
  return(
    <HStack
      justifyContent={title ? "center" : "space-between"} 
      alignContent="center"
      textAlign="center"
      h={12} 
      mt={6} 
      mb={2} 
      px={5} 
      py={4}
    >
       {
          iconLeft === true ?
          <ButtonNativeBase
            {...rest}
            w={5}
            bg="gray.600"
            _pressed={{
              bg: 'gray.500'
            }}
            left={title ? "0" : "-4px"}
          >
            <Icon 
              as={MaterialIcons}
              name={nameIconLeft}
              color="gray.100"
              size={5}
              left={-9}
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
            w={iconLeft === true ? "70%" : "70%"}
            h={5}
            color="gray.100"
            fontFamily="bold"
            fontSize={iconLeft === true ? "sm" : "sm"}
            ml={
              iconLeft === false && iconRight === true ? 
              "45px" 
              : 
              iconLeft === true && iconRight === false ? 
              "45px" 
              : 
              "21px"
            }
            mr={
              iconLeft === false && iconRight === true ? 
              "23px" 
              : 
              "22px"
            }
            top={-2}
            left={iconRight === false ? '-24px' : '0'}
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
            w={5}
            bg="gray.600"
            _pressed={{
              bg: 'gray.500'
            }}
            right={title ? "0" : "-4px"}
          >
            <Icon 
              as={MaterialIcons}
              name={nameIconRight}
              color="gray.100"
              size={5}
              left={-9}
            />
          </ButtonNativeBase>
          :
          ''
        }
    </HStack>
  )
}