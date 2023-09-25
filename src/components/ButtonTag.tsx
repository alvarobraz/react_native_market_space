import { useAuth } from '@hooks/useAuth';
import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';
import { XCircle } from "phosphor-react-native";

// const { 
//   setIsNew,
// } = useAuth();

type Props = IButtonProps & {
  title: string;
  variant?: 'new' | 'used';
  icon?: boolean;
}

export function ButtonTag({ title, variant, icon, ...rest  }:Props) {
  return (
    <ButtonNativeBase
        bg={variant === 'new' ? "blue.200" : "gray.500"}
        w="86px" 
        h="28px" 
        borderRadius="9999px"
        mr={2}
        _pressed={{
          bg: variant === 'new' ? 'blue.100' : 'gray.400'
        }}
        // onPress={()=>{}}
        { ...rest }
      >
        <Text 
          h="28px" 
          fontFamily="bold" 
          fontSize="xm" 
          color={variant === 'new' ? "white" : "gray.300"} 
          pt={icon === true ? "10px" : "3px"}
          pr={icon === true ? "10px" : "0px"}
          pl={icon === true ? "0px" : "4px"}
          left={icon === true ? "-3px" : "0px"}
        >
          {title}
        </Text>
        {
          icon === true ?
            <XCircle
              color={variant === 'new' ? "#FFFFFF" : "#5F5B62"}
              size={15}
              style={variant === 'new' ? { top: -14, right: -42 } : { top: -15, right: -52 }}
          />
          :
          null
        }
      </ButtonNativeBase>
  )
}