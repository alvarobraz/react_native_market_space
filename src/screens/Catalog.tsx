import { useState } from "react";
import { VStack, Text, HStack, ScrollView, Modal, Box, } from "native-base";
import { useAuth } from '@hooks/useAuth';
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ButtonTag } from "@components/ButtonTag";
import HeaderCatalog from "@components/HeaderCatalog";
import { InputButtonFilter } from "@components/InputButtonFilter";
import { ProductAds } from "@components/ProductAds";
import YourAds from "@components/YourAds";
import { Switch } from 'react-native';
import { CheckBox } from "@components/CheckBox";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { dimensionWith } from "@utils/dimensionWith";
import { Loading } from '@components/Loading';

export type PropsProductImages = {
  id: string;
  path: string;
}

export function Catalog() {

  const { 
    products, 
    isLoadingProducts,
    setNovo,
    novo,
    setUsado,
    usado,
    setAcceptTrade,
    acceptTrade,
    handleTypeCheckBox,
    type,
    handleResetFilters,
    handleApllyFilters,
    showModal,
    setModalVisible,
    isModalVisible
  } = useAuth();

  const dimension = dimensionWith()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [isEnabled, setIsEnabled] = useState(false);
  const checkBoxItem = ["pix", "boleto", "cash", "card", "deposit"];
  
  const toggleSwitch = () => {
    setAcceptTrade(!isEnabled)
  };

  function handleYourAds() {
    navigation.navigate('myads');
  }

  function handleDetailAd(id: string) {
    navigation.navigate('detailAd', {
      id
    });
  }

  function handleCreateAndEdit() {
    navigation.navigate('createandedit', {
      id: undefined
    });
  }
  
  return (
    <>
      {
        isLoadingProducts ?
        <VStack flex={1}>
          <Loading/>
        </VStack>
        :
        <>
          <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content 
              flex={1} 
              flexDirection="column" 
              position="relative"
              bottom={-75} 
              h={200} 
              w="100%" 
              bg="gray.600"
            >
              <Modal.Header bg="gray.600" borderBottomWidth={0} top={1}>
                <Text fontFamily="bold" fontSize="md" color="gray.100" pl={2}>Filtrar anúncios</Text>
              </Modal.Header>
              <Modal.CloseButton color="gray.400" top="15px" pr={2} />
              <Modal.Body>
                <VStack px={2}>
                  <Box mb={2}>
                  <Text fontFamily="bold" fontSize="sm" color="gray.100">
                    Condição
                  </Text>
                  </Box>
                  <Box>
                  <HStack>
                  <ButtonTag
                    title="NOVO"
                    variant="new"
                    icon={novo === true ? true : false}
                    onPress={()=>setNovo((state)=> !state)}
                  />
                  <ButtonTag
                    title="USADO"
                    variant="used"
                    onPress={()=>setUsado((state)=> !state)}
                    icon={usado === true ? true : false}
                  />
                  </HStack>
                  </Box>
                </VStack>
                <VStack pt={3} px={2}>
                  <Box mb={2}>
                  <Text fontFamily="bold" fontSize="sm" color="gray.100">
                  Aceita troca?
                  </Text>
                  </Box>
                  <Box>
                  <HStack left={-10}>
                  <Switch
                      trackColor={{false: '#D9D8DA', true: '#647AC7'}}
                      thumbColor={acceptTrade === true ? '#f4f3f4' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={acceptTrade}
                  />
                  </HStack>
                  </Box>
                </VStack>
                <VStack pt={3} px={2}>
                  <Box mb={2}>
                  <Text fontFamily="bold" fontSize="sm" color="gray.100">
                  Meios de pagamento aceitos
                  </Text>
                  </Box>
                  <Box>
                  <VStack>
                    <CheckBox 
                      type={type}
                      checkBoxItem={checkBoxItem}
                      handleTypeCheckBox={handleTypeCheckBox}
                    />
                  </VStack>
                  </Box>
                </VStack>
                <HStack flex={1} mt={10} mb={5} flexDirection="row" justifyContent="space-between" px={2}>
                  <Box w="47%" mr={2}>
                    <Button
                      title="Resetar filtros"
                      variant="gray"
                      onPress={handleResetFilters}
                    />
                  </Box>
                  <Box w="47%">
                    <Button
                      title="Aplicar filtros"
                      variant="black"
                      onPress={handleApllyFilters}
                    />
                  </Box>
                </HStack>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <ScrollView w="full"showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={dimension > 400 ? 10 : 5} mt={6} mb={12} bg="gray.600" alignItems="center">
              <HeaderCatalog
                handleCreateAndEdit={handleCreateAndEdit}
              />
              <Text  w="full" fontFamily="regular" fontSize="xm" color="gray.300" mb={2}>
              Seus produtos anunciados para venda 
              </Text>
              <YourAds
                handleYourAds={handleYourAds}
              />
              <Text w="full" top={5} left={1} fontFamily="regular" fontSize="xm" color="gray.300" mb={2}>
              Compre produtos variados
              </Text>
              <InputButtonFilter
                typeInput="filter"
                handleApplyFilters={showModal}
              />
              <Box bg="gray.600" top={8} flexDir="row" flexWrap="wrap" justifyContent="space-between" pb={10} w="100%">
                {
                  products.map((product, index) => (
                    <ProductAds
                      key={index}
                      onPress={ () => handleDetailAd(product?.id!) }
                      hasAvatar={true}
                      product={product}
                    />
                  ))
                }
              </Box>
            </VStack>
          </ScrollView>
        </>
      }
    </>
  );
  
}