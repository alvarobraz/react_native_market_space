import { useState } from "react";
import { ButtonTag } from "@components/ButtonTag";
import HeaderCatalog from "@components/HeaderCatalog";
import { InputButtonFilter } from "@components/InputButtonFilter";
import { ProductAds } from "@components/ProductAds";
import YourAds from "@components/YourAds";
import { VStack, Text, HStack, ScrollView, Modal, Box, } from "native-base";
import { Switch } from 'react-native';
import { CheckBox } from "@components/CheckBox";
import { Button } from "@components/Button";

export function Catalog() {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [type, setType] = useState<string[]>([])
  const checkBoxItem = ['Pix', 'Boleto', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito' ];

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  function handleYourAds() {
    alert('Ir para seus anúncios')
  }

  function handleSearchAds() {
    alert('Buscar anúncios')
  }

  const showModal = () => {
    console.log('modal')
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  function handleTypeCheckBox(title: string) {
    if (type.includes(title)) {
      setType(type.filter((item) => item !== title));
    } else {
      setType([...type, title]);
    }
  }
  
  return (
    <>
      <Modal  isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
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
                icon={true}
               />
               <ButtonTag
                title="USADO"
                variant="used"
                // icon={true}
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
                  thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
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
                />
              </Box>
              <Box w="47%">
                <Button
                  title="Aplicar filtros"
                  variant="black"
                />
              </Box>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <ScrollView w="full"showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={5} bg="gray.600" alignItems="center">
        <HeaderCatalog
          nameUser="Álvaro"
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
        handleSearchAds={handleSearchAds}
        handleApplyFilters={showModal}
        />
        <HStack top={8} flexWrap="wrap" justifyContent="space-between" pb={10} maxW="300px">
            <ProductAds variant="new" />
            <ProductAds />
            <ProductAds />
            <ProductAds variant="new" />
            <ProductAds />
            <ProductAds />
          </HStack>
      </VStack>
    </ScrollView>
    </>
  );
  
}