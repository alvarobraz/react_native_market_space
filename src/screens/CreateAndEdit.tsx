import { Button } from "@components/Button";
import { ButtonInput } from "@components/ButtonInput";
import { CheckBox } from "@components/CheckBox";
import HeaderAds from "@components/HeaderAds";
import { Input } from "@components/Input";
import { UploadButton } from "@components/UploadButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { dimensionWith } from "@utils/dimensionWith";
import { Box, Text, VStack, ScrollView, Radio, HStack, Switch } from "native-base";
import { useState } from "react";


export function CreateAndEdit() {

  const dimension = dimensionWith()
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [value, setValue] = useState("Produto novo");
  const [isEnabled, setIsEnabled] = useState(false);
  const [type, setType] = useState<string[]>([])
  const checkBoxItem = ['Pix', 'Boleto', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito' ];

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  function handleGoBack() {
    navigation.goBack();
  }

  function handleTypeCheckBox(title: string) {
    if (type.includes(title)) {
      setType(type.filter((item) => item !== title));
    } else {
      setType([...type, title]);
    }
  }

  return (
    <VStack mb={20}>
      <HeaderAds
        iconLeft={true}
        nameIconLeft='arrow-back'
        title='Criar Anúncios'
        handleGoBack={handleGoBack}
      />
      <ScrollView w="full"showsVerticalScrollIndicator={false}>
        <Box px={dimension > 400 ? 10 : 5} flexDir="column" justifyContent="flex-start">
          <Text fontFamily="bold" fontSize="md" color="gray.200">
            Imagens
          </Text>
          <Text fontFamily="regular" fontSize="sm" color="gray.300">
            Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Box my={5} flexDir="row" justifyContent="flex-start">
              <ButtonInput /> <UploadButton /> <UploadButton />
            </Box>
          </ScrollView>
          <Text mb={2} fontFamily="bold" fontSize="sm" color="gray.200">
            Sobre o produto
          </Text>
          <Input
            placeholder="Luminária pendente"
          />
          <Input
            typeInput="text"
          />
        </Box>
        <Radio.Group 
          flexDirection="row" 
          px={dimension > 400 ? 10 : 5} 
          defaultValue="1" 
          name="myRadioGroup" 
          accessibilityLabel="Escolha entre novo ou usado"
          value={value} onChange={nextValue => {
            setValue(nextValue);
          }}
        >
          <Radio size="sm" value="1" my={1} pr={1}>
            <Text fontFamily="regular" fontSize="sm" color="gray.200">
              Produto novo
            </Text>
          </Radio>
          <Radio size="sm" value="2" my={1} pr={1} ml={2}>
            <Text fontFamily="regular" fontSize="sm" color="gray.200">
              Produto usado
            </Text>
          </Radio>
        </Radio.Group>
        <Box px={dimension > 400 ? 10 : 5} flexDir="column" justifyContent="flex-start">
          <Text mt={6} mb={4} fontFamily="bold" fontSize="md" color="gray.200">
            Venda
          </Text>
          <Input
            placeholder="Valor do produto"
            typeInput='brl'
          />
           <Text mt={2} mb={1} fontFamily="bold" fontSize="md" color="gray.200">
              Aceita troca
            </Text>
        </Box>
        <Box px={dimension > 400 ? 10 : 5}>
        <HStack>
          <Switch
            trackColor={{false: '#D9D8DA', true: '#647AC7'}}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </HStack>
        </Box>
        <VStack pt={3} px={dimension > 400 ? 10 : 5}>
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
        <HStack 
        h="90px" 
        bg="gray.700" 
        flex={1} 
        mt={8} 
        flexDirection="row" 
        justifyContent="space-between" 
        alignContent="center"
        alignItems="center"
        px={dimension > 400 ? 10 : 5}
        >
          <Box w="47%" mr={2}>
            <Button
              title="Cancelar"
              variant="gray"
            />
          </Box>
          <Box w="47%">
            <Button
              title="Avançar"
              variant="black"
            />
          </Box>
        </HStack>
      </ScrollView>
      
      

    </VStack>
  )
}