import { Box, Image, VStack, Text, HStack, ScrollView, useToast } from 'native-base';
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderAds from '@components/HeaderAds';
import { CaroulselAds } from '@components/CarouselAds';
import BackgroundImgProduct from '../assets/img_product_a.png'
import AvataDefault from '../assets/avatar_default.png'
import { Barcode, QrCode, Money, CreditCard, Bank } from "phosphor-react-native";
import { Button } from '@components/Button';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { dimensionWith } from '@utils/dimensionWith';
import { useEffect, useState } from 'react';
import { api } from '@services/api';
import { PropsPaymentMethods, PropsProduct } from '@contexts/AppContext';
import { useAuth } from '@hooks/useAuth';
import { formatValueBRL } from '@utils/index';
import { PaymentMethod } from '@components/PaymentMethod';
import { Loading } from '@components/Loading';
import { AppError } from '@utils/AppError';

type RouteParams = {
  id: string;
}

type PropsAds = {
  preview?: boolean;
}

export type PropsCarousel = {
  id: string;
  path: string;
}

export function DetailAd({ preview }: PropsAds) {

  const toast = useToast();
  const { user, fetchMyProducts } = useAuth()
  const dimension = dimensionWith()
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute()
  const { id } = route.params as RouteParams
  const [ isLoadingDetailAds, setIsLoadingDetailAds ] = useState(false)
  const [ detailAd, setDetailAd ] = useState<PropsProduct>()
  const [ myAds, setMyAds ] = useState(false)
  const [ paymentMethods, setPaymentMethods ] = useState<PropsPaymentMethods[]>([])
  const [ carousel, setCarousel ] = useState<PropsCarousel[]>([])

  

  async function fetchMyProductId(id: string) {
    try {

      setIsLoadingDetailAds(true)
      const response = await api.get(`/products/${id}`);
      console.log(response.data)
      setDetailAd(response.data);

      if(response.data.user_id === user.id) {
        setMyAds(true)
      }
      setPaymentMethods(response.data.payment_methods)
      setCarousel(response.data.product_images)

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
      setIsLoadingDetailAds(false)
    }
  }

  function handleCreateAndEdit(id: string) {
    navigation.navigate('createandedit', {
      id
    });
  }


  function handleGoBack() {
    navigation.goBack();
  }

  async function handleIsActive(id: string, isActive: boolean) {
    try {

      setIsLoadingDetailAds(true);
      const is_active = isActive;
      await api.patch(`/products/${id}`, {is_active: is_active});
      fetchMyProductId(id)
      fetchMyProducts()
      const statusTile = isActive ? 'ativado' : 'desativado'
      toast.show({
        title: `Produto ${statusTile} com sucesso`,
        placement: 'top',
        bgColor: 'green.500',
      })

    } catch (error) {

      console.log('error')
      console.log(error)
      const isAppError = error instanceof AppError;
      const statusTile = isActive ? 'ativado' : 'desativado'
      const title = isAppError ? error.message : `Não foi possível ${statusTile} o produto. Tente novamente mais tarde`;
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoadingDetailAds(false)
    }
  }

  async function handleDeleteProduc(id: string) {
    try {

      setIsLoadingDetailAds(true);
      await api.delete(`/products/${id}`);
      fetchMyProductId(id)
      fetchMyProducts()
      toast.show({
        title: 'Produto deletado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })
      navigation.navigate('myads');

    } catch (error) {
      console.log('error')
      console.log(error)
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível deletar o produto. Tente novamente mais tarde';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoadingDetailAds(false)
    }
  }

  useEffect(() => {
    fetchMyProductId(id)
  },[id])

  console.log('detailAd')
  console.log(detailAd)

  return (
    <VStack flex={isLoadingDetailAds ? 1 : 0}>
      {
        isLoadingDetailAds ?
        <Loading/>
        :
        <>
          {
            preview === true ?
            <Box 
              flexDir="column" 
              justifyContent="center" 
              alignItems="center" 
              textAlign="center"
              bg="blue.200"
              pt={10}
              pb={4}
            >
              <Text fontFamily="bold" fontSize="md" color="gray.700">
                Pré visualização do anúncio
              </Text>
              <Text fontFamily="regular" fontSize="sm" color="gray.700">
                É assim que seu produto vai aparecer!
              </Text>
            </Box>
            :
            <HeaderAds
              iconLeft={true}
              nameIconLeft='arrow-back'
              iconRight={true}
              nameIconRight='border-color'
              handleGoBack={handleGoBack}
              myAd={myAds}
              handleCreateAndEdit={()=>handleCreateAndEdit(detailAd?.id!)}
            />
          }
          <ScrollView w="full"showsVerticalScrollIndicator={false} mb={ preview === true ? 200 : 24}>
          <CaroulselAds
          isActive={detailAd?.is_active}
          data={carousel}
          />
          <VStack px={dimension > 400 ? 10 : 5}>
            <Box h={7} w="full" my={4} flexDirection="row" justifyContent="flex-start" textAlign="center" alignContent="center" >
              <Image
                h={7}
                w={7} 
                borderRadius={detailAd?.user?.avatar ? 999 : 0}
                source={detailAd?.user?.avatar ? { uri: `http://192.168.100.7:3333/images/${detailAd?.user?.avatar}` } : AvataDefault}
                defaultSource={AvataDefault}
                alt="Avatar do perfil sem imagem"
                resizeMode="contain"
                position="relative"
              />
              <Text pl={2} pt="2px" fontFamily="regular" fontSize="sm" color="gray.100">
                { detailAd?.user?.name }
              </Text>
            </Box>
            <Box w="50px" mt={2} h="17px" bg="gray.500" borderRadius="full">
              <Text fontFamily="bold" fontSize="xss" color="gray.200" textAlign="center" top="0">
                {detailAd?.is_new === true ? 'NOVO' : 'USADO'}
              </Text>
            </Box>
            <HStack mt={1} mb={2} justifyContent="space-between">
              <Box>
                <Text fontFamily="bold" fontSize="lg" color="gray.100">
                {detailAd?.name}
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text fontFamily="bold" fontSize="sm" color="blue.200" top="6px" mr="3px">
                  R$
                </Text>
                <Text fontFamily="bold" fontSize="lg" color="blue.200">
                  {formatValueBRL(detailAd?.price!)}
                </Text>
              </Box>
            </HStack>
          <VStack>
            <Text fontFamily="regular" fontSize="sm" color="gray.200" mt={1} mb={0} h="auto" >
              {detailAd?.description}
            </Text>
            <Box flexDirection="row" justifyContent="flex-start" my={6}>
              <Text fontFamily="bold" fontSize="sm" color="gray.200" mr={2}>
                Aceita troca?
              </Text>
              <Text fontFamily="regular" fontSize="sm" color="gray.200">
              {detailAd?.is_new === true ? 'Sim' : 'Não'}
              </Text>
            </Box>
            <Box flexDirection="column" justifyContent="flex-start">
              <Text fontFamily="bold" fontSize="sm" color="gray.200" mb={2}>
              Meios de pagamento:
              </Text>
              {
                paymentMethods.length !== 0 ?
                paymentMethods.map((pm) => (
                  <PaymentMethod 
                    name={pm.name}
                  />
                ))
                :
                ''
              }
            </Box>
            </VStack>
          </VStack>
            {
              preview === true ?
              ''
              :
              myAds ?
              <VStack py={5} h="145px" px={dimension > 400 ? 10 : 5} justifyContent="space-between">
                <Button
                  icon={true}
                  nameIcon='power-settings-new'
                  title={detailAd?.is_active === true ? 'Desativar anúncio' : 'Reativar anúncio'}
                  variant={detailAd?.is_active === true ? "black" : "blue"}
                  onPress={()=> handleIsActive(detailAd?.id!, !detailAd?.is_active)}
                />
                <Button
                  icon={true}
                  nameIcon='delete-outline'
                  title='Excluir anúncio'
                  variant="gray"
                  onPress={()=>handleDeleteProduc(detailAd?.id!)}
                />
              </VStack>
              :
              <HStack mt={4} px={dimension > 400 ? 10 : 5} py={4} bg="white" justifyContent="space-between" w="100%">
                <Box w="35%" flexDirection="row" top={1}>
                  <Text fontFamily="bold" fontSize="sm" color="blue.200" top="6px" mr="3px">
                    R$
                  </Text>
                  <Text fontFamily="bold" fontSize="lg" color="blue.200">
                    120,00
                  </Text>
                </Box>
                <Box w="65%" ml={3}>
                  <Button
                    icon={true}
                    nameIcon='whatshot'
                    title='Entrar em contato'
                    variant="blue"
                  />
                </Box>
              </HStack>
            }
          </ScrollView>
          {
            preview === true ?
            <HStack 
              h="90px" 
              bg="gray.700" 
              w="100%"
              bottom={106}
              flexDirection="row" 
              justifyContent="space-between" 
              alignContent="center"
              alignItems="center"
              px={dimension > 400 ? 10 : 5}
              position="absolute"
              >
                <Box w="47%" mr={2}>
                  <Button
                    title="Voltar"
                    variant="gray"
                    icon={true}
                    nameIcon='arrow-back'
                    onPress={handleGoBack}
                  />
                </Box>
                <Box w="47%">
                  <Button
                    title="Publicar"
                    variant="blue"
                    icon={true}
                    nameIcon='local-offer'
                  />
                </Box>
              </HStack>
            :
            ''
          }
        </>
      }
    </VStack>
  );
}