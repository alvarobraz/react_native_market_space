import { Button as ButtonNativeBase, IButtonProps, Image, Icon, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import UpaloadImage from '../assets/upload_image.png'
import { FileProductsProp } from '@screens/CreateAndEdit';
import { Loading } from './Loading';
import { PropsProductImages } from '@contexts/AppContext';

type PropsUloadButton = IButtonProps & {
  fileProducts: FileProductsProp[];
  fileProductsId?: PropsProductImages[];
  fileProductsIsLoading?: boolean;
  handleDeleteFileProductSelected: (name: string, type: string) => void;
  // handleDeleteFileProductId: (name: string) => void;
}

export function UploadButton({ fileProducts, fileProductsId, fileProductsIsLoading, handleDeleteFileProductSelected,...rest }: PropsUloadButton) {
  return (
    <>
      {
        fileProductsIsLoading ?
        <Loading/>
        :
        fileProductsId?.length !== 0 ?
        fileProductsId?.map((file, _) => (
          <Box
            key={file.id}
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
              source={{ uri: `http://192.168.100.7:3333/images/${file.path}` }}
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
              onPress={()=>handleDeleteFileProductSelected(file?.id!, 'id')}
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
              onPress={()=>handleDeleteFileProductSelected(file?.name!, 'photo')}
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