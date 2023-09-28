import { Button as ButtonNativeBase, IButtonProps, Image, Icon, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import UpaloadImage from '../assets/upload_image.png'
import { FileProductsProp } from '@screens/CreateAndEdit';
import { Loading } from './Loading';

type PropsUloadButton = IButtonProps & {
  fileProducts: FileProductsProp[];
  fileProductsIsLoading?: boolean;
  handleDeleteFileProductSelected: (name: string) => void;
}

export function UploadButton({ fileProducts, fileProductsIsLoading, handleDeleteFileProductSelected,...rest }: PropsUloadButton) {
  return (
    <>
      {
        fileProductsIsLoading ?
        <Loading/>
        :
        fileProducts.length !== 0 ?
        fileProducts.map((file, _) => (
          <Box
            key={file.name}
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
              source={{ uri: file.uri }}
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
              onPress={()=>handleDeleteFileProductSelected(file.name)}
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
        ))
        :
        null
      }
    </>
  )
}