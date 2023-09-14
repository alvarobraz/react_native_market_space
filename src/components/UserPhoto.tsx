import {  Button as ButtonNativeBase, IButtonProps, Image, IImageProps, VStack, Center, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import AvataDefault from '../assets/avatar_default.png'

type Props = IImageProps & IButtonProps & {
  size: number;
  icon?: boolean;
  imgAvatar?: string;
}

export function UserPhoto({ size, icon, imgAvatar, ...rest }: Props) {
  // console.log(imgAvatar)
  return (
    <VStack top={icon === true ? null : "-17"} alignItems={icon === true ? "flex-end" : "flex-start"}>
      <Image 
        source={imgAvatar ? imgAvatar : AvataDefault}
        defaultSource={AvataDefault}
        alt="Avatar do perfil sem imagem"
        resizeMode="contain"
        position="relative"
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
    </VStack>
  );
}