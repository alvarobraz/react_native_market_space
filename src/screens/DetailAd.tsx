import { Box, Image, VStack, Text, HStack, ScrollView } from 'native-base';
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderAds from '@components/HeaderAds';
import { CaroulselAds } from '@components/CarouselAds';
import BackgroundImgProduct from '../assets/img_product_a.png'
import AvataDefault from '../assets/avatar_default.png'
import { Barcode, QrCode, Money, CreditCard, Bank } from "phosphor-react-native";
import { Button } from '@components/Button';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

type RouteParams = {
  id: string;
}

type PropsAds = {
  imgAvatar?: string;
  nameUser?: string;
  variant?: 'new' | 'used';
}

export function DetailAd({  imgAvatar, nameUser, variant = 'new' }: PropsAds) {

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute()
  const { id } = route.params as RouteParams

  console.log(id)

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack>
      <HeaderAds
        iconLeft={true}
        nameIconLeft='arrow-back'
        title='Meus anúncios'
        iconRight={true}
        nameIconRight='arrow-forward'
        handleGoBack={handleGoBack}
      />
      <ScrollView w="full"showsVerticalScrollIndicator={false} mb={24}>
        <CaroulselAds />
        <VStack px={10}>
          <Box h={7} w="full" my={4} flexDirection="row" justifyContent="flex-start" textAlign="center" alignContent="center" >
            <Image
              h={7}
              w={7} 
              source={imgAvatar ? imgAvatar : AvataDefault}
              defaultSource={AvataDefault}
              alt="Avatar do perfil sem imagem"
              resizeMode="contain"
              position="relative"
            />
            <Text pl={2} pt="2px" fontFamily="regular" fontSize="sm" color="gray.100">
              Makenna Baptista
            </Text>
          </Box>
          <Box w="50px" mt={2} h="17px" bg="gray.500" borderRadius="full">
            <Text fontFamily="bold" fontSize="xss" color="gray.200" textAlign="center" top="0">
              {variant === 'new' ? 'NOVO' : 'USADO'}
            </Text>
          </Box>
          <HStack mt={1} mb={2} justifyContent="space-between">
            <Box>
              <Text fontFamily="bold" fontSize="lg" color="gray.100">
               Bicicleta
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text fontFamily="bold" fontSize="sm" color="blue.200" top="6px" mr="3px">
                R$
              </Text>
              <Text fontFamily="bold" fontSize="lg" color="blue.200">
                120,00
              </Text>
            </Box>
          </HStack>
          <VStack>
            <Text fontFamily="regular" fontSize="sm" color="gray.200" mt={1} mb={0} h="auto" >
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
            </Text>
            <Box flexDirection="row" justifyContent="flex-start" my={6}>
              <Text fontFamily="bold" fontSize="sm" color="gray.200" mr={2}>
                Aceita troca?
              </Text>
              <Text fontFamily="regular" fontSize="sm" color="gray.200">
                Sim
              </Text>
            </Box>
            <Box flexDirection="column" justifyContent="flex-start">
              <Text fontFamily="bold" fontSize="sm" color="gray.200" mb={2}>
               Meios de pagamento:
              </Text>
              <Box flexDirection="row" justifyContent="flex-start" alignContent="center" textAlign="center">
                <Barcode
                    color="#1A181B"
                    size={18}
                    style={{top: 4}}
                />
                <Text fontFamily="regular" fontSize="sm" color="gray.200" pl={3}>
                  Boleto
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="flex-start" alignContent="center" textAlign="center">
                <QrCode
                    color="#1A181B"
                    size={18}
                    style={{top: 4}}
                />
                <Text fontFamily="regular" fontSize="sm" color="gray.200" pl={3}>
                  Pix
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="flex-start" alignContent="center" textAlign="center">
                <Money
                    color="#1A181B"
                    size={18}
                    style={{top: 4}}
                />
                <Text fontFamily="regular" fontSize="sm" color="gray.200" pl={3}>
                  Dinheiro
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="flex-start" alignContent="center" textAlign="center">
                <CreditCard
                    color="#1A181B"
                    size={18}
                    style={{top: 4}}
                />
                <Text fontFamily="regular" fontSize="sm" color="gray.200" pl={3}>
                  Cartão de crédito
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="flex-start" alignContent="center" textAlign="center">
                <Bank
                    color="#1A181B"
                    size={18}
                    style={{top: 4}}
                />
                <Text fontFamily="regular" fontSize="sm" color="gray.200" pl={3}>
                  Depósito bancário
                </Text>
              </Box>
            </Box>
          </VStack>
        </VStack>
        <HStack mt={4} px={10} py={4} bg="white" justifyContent="space-between" w="100%">
            <Box flexDirection="row">
             <Text fontFamily="bold" fontSize="sm" color="blue.200" top="6px" mr="3px">
                R$
              </Text>
              <Text fontFamily="bold" fontSize="lg" color="blue.200">
                120,00
              </Text>
            </Box>
            <Box ml={3}>
              <Button
                icon={true}
                nameIcon='whatshot'
                title='Contatar'
                variant="blue"
              />
            </Box>
          </HStack>
      </ScrollView>
    </VStack>
  );
}