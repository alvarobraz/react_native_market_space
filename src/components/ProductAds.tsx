import { Button as ButtonNativeBase, IButtonProps, Box, HStack, Image, Text, VStack } from "native-base";

import BackgroundImgProduct from '../assets/img_product_a.png'
import AvataDefault from '../assets/avatar_default.png'
import Luminaria from '../assets/luminaria.png'

type Props = IButtonProps & {
  imgAvatar?: string;
  hasAvatar?: boolean;
  variant?: 'new' | 'used';
  adsInactive?: boolean;
}

export function ProductAds({ imgAvatar, variant, hasAvatar, adsInactive, ...rest }: Props) {
  return (
    <ButtonNativeBase 
      bg="gray.600" 
      mt={0}
      mb={8}
      mr={0} 
      px={0} 
      py={0} 
      _pressed={{
        bg: 'gray.500'
      }}
      {...rest}
      maxW="127px"
      style={ adsInactive ? { opacity: 0.8 } : null}
    >
      <VStack h={143} maxW="127px">
        <Image 
            maxW="127px" 
            h="90px"
            source={Luminaria}
            defaultSource={Luminaria}
            alt="Produto a venda"
            // resizeMode="contain"
            position="relative"
            borderRadius={6}
            mb={2}
          />
          
          <HStack justifyContent={hasAvatar ? "space-between" : "flex-end"} w="127px">
            {
              hasAvatar ?
              <Image
                h={4}
                w={4} 
                top={-94}
                left={1}
                source={imgAvatar ? imgAvatar : AvataDefault}
                defaultSource={AvataDefault}
                alt="Avatar do perfil sem imagem"
                resizeMode="contain"
                position="relative"
              />
              :
              null
            }
            
            <Box w="60px" h="17px" bg={variant === "new" ? "blue.200" : "gray.200"} top={-94} left={-3} borderRadius="full">
              <Text fontFamily="bold" fontSize="xss" color="white" textAlign="center" top={-1}>
                {variant === 'new' ? 'NOVO' : 'USADO'}
              </Text>
            </Box>
          </HStack>
          {
            adsInactive ?
            <VStack top={-43}>
              <Text fontFamily="bold" fontSize="9px" color="white" textAlign="left" left={1} >
                ANÚNCIO DESATIVADO
              </Text>
            </VStack>
            :
            ''
          }
          <VStack style={ adsInactive ? { opacity: 0.7 } : null} top={adsInactive ? -22 : -6}>
            <Text fontFamily="bold" fontSize="sm" color="gray.200" textAlign="left">
            Tênis vermelho
            </Text>
            <HStack>
            <Text top={1} fontFamily="bold" fontSize="xm" color="gray.100">
              R$ 
            </Text>
            <Text fontFamily="bold" fontSize="md" color="gray.100" paddingLeft={1}>
              59,90
            </Text>
            </HStack>
          </VStack>
        
      </VStack>
    </ButtonNativeBase>

  )
}