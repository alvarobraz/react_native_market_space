import { Button as ButtonNativeBase, IButtonProps, Image, Icon, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import UpaloadImage from '../assets/upload_image.png'

export function UploadButton({...rest }: IButtonProps) {
  return (
      <Box
        flexDir="row"
        alignItems="end"
        textAlign="right"
        justifyContent="flex-end"
        mb={2}
        mr={2}
        h="100px"
        w="100px"
        bg="gray.500"
        rounded="md"
      >
        <Image
          h="100px"
          w="100px" 
          left="23px"
          rounded="md"
          source={UpaloadImage}
          defaultSource={UpaloadImage}
          alt="Upload image"
          resizeMode="contain"
          position="relative"
        />

        <ButtonNativeBase
          alignItems="center"
          textAlign="center"
          justifyContent="center"
          h="16px"
          w="16px"
          bg="gray.200"
          borderRadius="999px"
          _pressed={{
            bg:"rgba(62, 58, 64, 0.4)"
          }}
          top={1}
          right={1}
          {...rest}
        >
          <Icon 
            as={MaterialIcons}
            name="close"
            color="gray.700"
            size={4}
            top={0.4}
            right={2}
          /> 
        </ButtonNativeBase>
      </Box>
  )
}