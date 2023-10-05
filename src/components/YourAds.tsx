import { useState, useEffect, useCallback } from "react";
import { Button as ButtonNativeBase, IButtonProps, Box, HStack, Icon, Text, VStack, Spinner } from "native-base";
import { Tag, ArrowRight } from "phosphor-react-native";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";


type PropsYourAds = IButtonProps &  {
  handleYourAds: () => void;
}

export default function YourAds({ handleYourAds,...rest}: PropsYourAds) {

  const [isLoadingMyProducts, setIsLoadingMyProducts] = useState(false);
  const [countMyProducts, setCountMyProducts] = useState<number>(0);

  // My Ads
  async function fetchMyProducts() {
    try {

      setIsLoadingMyProducts(true)
      const response = await api.get('/users/products');

      setCountMyProducts(response.data.length)

    } 
    catch (error) {
      // const isAppError = error instanceof AppError;
      // const title = isAppError ? error.message : 'Não foi possível carregar os seus anúncios';

      // toast.show({
      //   title,
      //   placement: 'top',
      //   bgColor: 'red.500'
      // })
    }
    finally {
      setIsLoadingMyProducts(false)
    }
  }

  // useEffect(() => {
  //   fetchMyProducts()
  // },[])

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts()
    },[])
  )

  return(
      <HStack
        justifyContent="space-between" 
        bg="gray.500" 
        borderRadius={6} 
        h={66} 
        px={4} 
        py={2}
      >
        <Box w="10%">
          <VStack>
          <Tag
            color="#647AC7"
            size={20}
            style={{ top: 15, right: 2 }}
          />
          </VStack>
        </Box>
        <Box w="45%">
          <VStack pl={1}>
            <Text top={1} fontFamily="bold" fontSize="md" color="gray.200">
              {isLoadingMyProducts ? <Spinner/> : countMyProducts}
            </Text>
            <Text top={-1} fontFamily="regular" fontSize="xss" color="gray.200">
              {countMyProducts > 0 ? `anúncios ativos` : `anúncio ativo`}
            </Text>
          </VStack>
        </Box>
        <Box w="45%">
          <HStack h={12} textAlign="center" justifyContent="center" justifyItems="center" alignItems="center">
              <Text fontFamily="bold" fontSize="xs" color="blue.200" left={-3} >
              Meus anúncios
              </Text>
              <ButtonNativeBase 
                bg="gray.500"
                _pressed={{
                  bg: 'gray.500'
                }}
                right={1}
                onPress={handleYourAds}
                {...rest}
              >
                <ArrowRight
                  color="#647AC7"
                  size={20}
                  style={{ top: 1, right: 0 }}
                />
              </ButtonNativeBase>
            </HStack>
        </Box>
      </HStack>
  )
}