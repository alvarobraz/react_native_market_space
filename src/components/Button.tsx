import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'black' | 'blue' | 'gray';
}

export function Button({ title, variant, ...rest }: Props) {
  return (
    <ButtonNativeBase
      flexDirection="row"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      w="full"
      h={12}
      pr={0}
      bg={variant === 'blue' ? 'blue.200' : variant === 'black' ? 'gray.100' : 'gray.500'}
      rounded="sm"
      _pressed={{
        bg: variant === 'blue' ? 'blue.100' : variant === 'black' ? 'gray.200' : 'gray.400'
      }}
      {...rest}
    >
      <Text 
        // bg="gray.100"
        w="full"
        color={variant === 'blue' ? 'white' : variant === 'black' ? 'white' : 'gray.100'}
        fontFamily="bold"
        fontSize="sm"
        // mr={7}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}