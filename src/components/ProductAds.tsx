import { Button as ButtonNativeBase, IButtonProps, Box, HStack, Image, Text, VStack } from "native-base";
import AvataDefault from '../assets/avatar_default.png'
import imgDefault from '../assets/imgDefault.png'
import { dimensionWith } from "@utils/dimensionWith";
import { formatValueBRL } from "@utils/index";
import { PropsProduct, PropsProductImages } from "@contexts/AppContext";

type Props = IButtonProps & {
  imgAvatar?: string;
  hasAvatar?: boolean;
  adsInactive?: boolean;
  name?: string;
  price?: number;
  imgProduct?:  PropsProductImages[];
  product: PropsProduct
}

export function ProductAds({ imgAvatar, hasAvatar, adsInactive, name, price, imgProduct, product, ...rest }: Props) {

  const dimension = dimensionWith()
  const paths = product?.product_images?.map(product => product.path);

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
      w={dimension > 400 ? "153px" : "127px"}
      h="auto"
      style={ product?.is_active === false ? { opacity: 0.8 } : null}
    >
      <VStack flex={1} justifyContent="flex-start" h="auto" w={dimension > 400 ? "153px" : "127px"}>
        <Image 
            w={dimension > 400 ? "153px" : "127px"}
            h="90px"
            source={paths?.length ? { uri: `http://192.168.100.7:3333/images/${paths[0]}` } : imgDefault}
            defaultSource={imgDefault}
            alt="Produto a venda"
            // resizeMode="contain"
            position="relative"
            borderRadius={6}
            mb={2}
          />
          
          <Box 
            justifyContent={hasAvatar ? "space-between" : "flex-end"} 
            w={dimension > 400 ? "153px" : "127px"}
            flexDir="row"
          >
            {
              hasAvatar ?
              <Image
                h={4}
                w={4} 
                top={-94}
                left={1}
                borderRadius={999}
                source={product?.user?.avatar! ? { uri: `http://192.168.100.7:3333/images/${product?.user.avatar}` } : AvataDefault}
                defaultSource={AvataDefault}
                alt="Avatar do perfil sem imagem"
                resizeMode="contain"
                position="relative"
              />
              :
              null
            }
            
            <Box w="60px" h="17px" bg={product?.is_new === true ? "blue.200" : "gray.200"} top={-94} left={-3} borderRadius="full">
              <Text fontFamily="bold" fontSize="xss" color="white" textAlign="center" top={-1}>
                {product?.is_new === true ? 'NOVO' : 'USADO'}
              </Text>
            </Box>
          </Box>
          {
            product?.is_active === false ?
            <VStack position="absolute" top="72px">
              <Text fontFamily="bold" fontSize="9px" color="white" textAlign="left" left={2} >
                ANÚNCIO DESATIVADO
              </Text>
            </VStack>
            :
            ''
          }
          <VStack justifyContent="flex-start" style={ product?.is_active === false ? { opacity: 0.7 } : null} top={product?.is_active === false ? -6 : -6}>
            <Text fontFamily="bold" fontSize="sm" color="gray.200" textAlign="left" h="auto" numberOfLines={1}>
             {product?.name}
            </Text>
            <HStack>
              <Text top={1} fontFamily="bold" fontSize="xm" color="gray.100">
                R$ 
              </Text>
              <Text fontFamily="bold" fontSize="md" color="gray.100" paddingLeft={1}>
                {formatValueBRL(product?.price)}
              </Text>
            </HStack>
          </VStack>
        
      </VStack>
    </ButtonNativeBase>

  )
}