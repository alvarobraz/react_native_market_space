import { useAuth } from '@hooks/useAuth';
import {  Button as ButtonNativeBase, IButtonProps, Image, IImageProps, VStack, Center, Icon, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
// import { Loading } from '@components/Loading';
import AvataDefault from '../assets/avatar_default.png'
import { dimensionWith } from '@utils/dimensionWith';

type Props = IImageProps & IButtonProps & {
  size: number;
  icon?: boolean;
  imgAvatar?: string;
  value?: any
}

export function UserPhoto({ size, icon, imgAvatar, value, isLoading, ...rest }: Props) {
  const { user } = useAuth(); 
  const dimension = dimensionWith()
  // {dimension > 400 ? "50px" : "40px"}
  return (
    <VStack 
      // top={icon === true ? null : dimension > 400 ? "-17" : "-7"} 
      alignItems={icon === true ? "flex-end" : "flex-start"}
      // w={dimension > 400 ? "50px" : "40px"}
      // h={dimension > 400 ? "50px" : "40px"}
    >
      {
        isLoading === true ? 
        <Center w="88px" h="88px" bg="gray.700" borderRadius={999} mb={10} >
          <Spinner color="blue.200" />
        </Center> :
        <>
          <Image
          w={dimension > 400 ? "50px" : "40px"}
          h={dimension > 400 ? "50px" : "40px"}
          borderRadius={user.avatar ? "50px" : "0"}
          // top="18px"
          source={user.avatar ? { uri: `http://192.168.100.7:3333/images/${user.avatar}` } : AvataDefault}
          defaultSource={AvataDefault}
          alt="Avatar do perfil sem imagem"
          // resizeMode="contain"
          position="relative"
          onError={(error) => console.log('Erro ao carregar imagem:', error)}
        />
        {
          icon === true ?
          <ButtonNativeBase w={10} h={10} bg="blue.200" mr={0} borderRadius={999} top="-40" right="-20" {...rest}>
            <Center w={10} h={10} borderRadius={999} top="0">
            <Icon 
                as={MaterialIcons}
                name="border-color"
                color="white"
                size={4}
              />
            </Center>
          </ButtonNativeBase>
          :
          null
        }
        </>
      }
    </VStack>
  );
}