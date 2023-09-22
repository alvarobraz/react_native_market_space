import { Input as NativeBaseInput, IInputProps, Text, FormControl } from 'native-base';

type Props = IInputProps & {
  typeInput?: 'default' | 'filter' | 'text' | 'brl';
  errorMessage?: string | null;
}


export function Input({ typeInput, errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput 
        bg="gray.700"
        h={typeInput === 'text' ? 24 : 12}
        px={4}
        flexDir="column"
        textAlignVertical={typeInput === 'text' ? "top" : "center"}
        fontSize="md"
        color="gray.200"
        fontFamily="regular"
        mb={0}
        multiline={typeInput === 'text' ? true : false}
        placeholderTextColor="gray.400"
        borderTopLeftRadius={6}
        borderTopRightRadius={typeInput === 'filter' ? 0 : 6}
        borderBottomRightRadius={typeInput === 'filter' ? 0 : 6}
        borderBottomLeftRadius={6}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.100"
        }}
        _focus={{
          bgColor: 'gray.700',
          borderWidth: 1,
          borderColor: 'gray.300'
        }}
        borderRightWidth={typeInput === 'filter' ? 0 : 1}
        InputLeftElement={
          typeInput === 'brl' ?
            <Text pl={3} fontFamily="regular" fontSize="md" color="gray.100">
              R$
            </Text>
            :
            <Text pl={0} fontFamily="regular" fontSize="md" color="gray.100">
            </Text>
        }
        {...rest}
     />
     <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}