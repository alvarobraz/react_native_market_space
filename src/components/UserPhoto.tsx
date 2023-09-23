import { useAuth } from '@hooks/useAuth';
import {  Button as ButtonNativeBase, IButtonProps, Image, IImageProps, VStack, Center, Icon, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
// import { Loading } from '@components/Loading';
import AvataDefault from '../assets/avatar_default.png'

type Props = IImageProps & IButtonProps & {
  size: number;
  icon?: boolean;
  imgAvatar?: string;
  value?: any
}

export function UserPhoto({ size, icon, imgAvatar, value, isLoading, ...rest }: Props) {
  const { user } = useAuth(); 
  return (
    <VStack top={icon === true ? null : "-17"} alignItems={icon === true ? "flex-end" : "flex-start"}>
      {
        isLoading === true ? 
        <Center w="88px" h="88px" bg="gray.700" borderRadius={999} mb={10}>
          <Spinner color="blue.200" />
        </Center> :
        <>
          <Image
          size="88px"
          borderRadius={999}
          source={!user.avatar ? { uri: `../../tmp/uploads/${user.avatar}` } : AvataDefault}
          defaultSource={AvataDefault}
          alt="Avatar do perfil sem imagem"
          resizeMode="contain"
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