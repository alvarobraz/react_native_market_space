import { useEffect, useState } from "react";
import { Box, Text, VStack, ScrollView, Radio, HStack, Switch, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';
import { Button } from "@components/Button";
import { ButtonInput } from "@components/ButtonInput";
import { CheckBox } from "@components/CheckBox";
import HeaderAds from "@components/HeaderAds";
import { Input } from "@components/Input";
import { UploadButton } from "@components/UploadButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { dimensionWith } from "@utils/dimensionWith";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { yupResolver } from "@hookform/resolvers/yup";

type FileInfo = {
  exists: true;
  uri: string;
  size: number;
  isDirectory: boolean;
  modificationTime: number;
  md5?: string | undefined;
}

export type FileProductsProp = {
  name?: string | undefined;
  uri?: string | undefined;
  type?: string | undefined;
}



type FormDataProps = {
  id?: string;
  name: string;
  description: string;
  is_new?: boolean;
  price: number;
  accept_trade?: boolean;
  payment_methods?: string[]
}

export function CreateAndEdit() {

  const toast = useToast();
  const { type, handleTypeCheckBox } = useAuth();

  const [isNewRadio, setIsNewRadio] = useState('new');
  const [accept_trade, setAccept_trade] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    description: yup.string().required('Informe a descrição'),
    price: yup.number().required('Informe o preço').min(3, 'o preço deve ter no mínimo três dígitos.'),
    // payment_methods: yup.array().of(yup.string()).required('Selecione pelo menos um método de pagamento'),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>(
    { 
      defaultValues: {
        is_new: isNewRadio === 'new' ? true : false,
        accept_trade: accept_trade,
        payment_methods: type
      },
      resolver: yupResolver(signUpSchema),
    }
    
  );

  const dimension = dimensionWith()
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const checkBoxItem = ["pix", "boleto", "cash", "card", "deposit"];

  const [ fileProductsIsLoading, setFileProductsIsLoading ] = useState(false)
  const [fileProducts, setFileProducts] = useState<FileProductsProp[]>([]);

  const toggleSwitch = () => {
    setAccept_trade(!accept_trade);
  };

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleFileProductsSelected(){
    setFileProductsIsLoading(true);

    try {

      if(fileProducts.length === 3) {
        alert('Você só pode cadastrar três imagens')
        return
      }

      const fileProductSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if(fileProductSelected.canceled) {
        return;
      }

			if(fileProductSelected.assets[0].uri) {
        
        const photoInfo = await FileSystem.getInfoAsync(fileProductSelected.assets[0].uri) as FileInfo;
        console.log(photoInfo);
        if(photoInfo.size && (photoInfo.size  / 1024 / 1024 ) > 5){
          alert('Essa imagem é muito grande. Escolha uma de até 2MB')
        }
        
        const fileExtension = fileProductSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `${photoInfo.modificationTime}.${fileExtension}`.toLowerCase(),
          uri: fileProductSelected.assets[0].uri,
          type: `${fileProductSelected.assets[0].type}/${fileExtension}`
        } as FileProductsProp;

        setFileProducts((prevState) => {
          return [...prevState, photoFile];
        })
        setFileProductsIsLoading(false)
      }
      

	  } catch (error) {
	    console.log(error)
	  } finally {
	    setFileProductsIsLoading(false)
	  }
  }

  async function handleDeleteFileProductSelected(name: string) {
    const fileUpdate = fileProducts.filter(file => file.name !== name)
    setFileProducts(fileUpdate)
  }

  async function handleCreateProduct(data: FormDataProps) {
    try {

      setIsSubmitting(true);
      const newDefaultValues = {
        is_new: isNewRadio === 'new' ? true : false,
        accept_trade: accept_trade,
        payment_methods: type,
        price: Number(data.price)
      };

      const dataCombinedValues = { ...data, ...newDefaultValues };
      const response = await api.post('/products', dataCombinedValues);
      const product_id = response.data.id

      console.log('fileProducts')
      console.log(fileProducts)

      console.log('fileProducts.length')
      console.log(fileProducts.length)

      if(fileProducts.length !== 0) {

        const productData = new FormData();
        productData.append('product_id', product_id);

        // fileProducts.forEach(image => {
        //   if (image.name && image.uri && image.type) {
        //     productData.append("images", `${image.type};name=${image.name};uri=${image.uri}`);
        //   }
        // });

        fileProducts.forEach(image => {
          productData.append("images", {
            type: image.type,
            name: image.name,
            uri: image.uri,
          });
        });

        await api.post('/products/images/', productData, { 
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

      }
      
      // toast.show({
      //   title: 'Produto criado com sucesso',
      //   placement: 'top',
      //   bgColor: 'green.500',
      // })
      reset();
      navigation.navigate('myads');

    } catch (error) {

      console.log('error')
      console.log(error)
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível criar o produto. Tente novamente mais tarde';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsSubmitting(false)
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
              <ButtonInput 
                onPress={handleFileProductsSelected}
              />
              <UploadButton 
                fileProducts={fileProducts}
                fileProductsIsLoading={fileProductsIsLoading}
                handleDeleteFileProductSelected={handleDeleteFileProductSelected}
              />
              
            </Box>
          </ScrollView>
          <Text mb={2} fontFamily="bold" fontSize="sm" color="gray.200">
            Sobre o produto
          </Text>
          <Controller 
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Nome do produto"
                  onChangeText={onChange}
                  value={value}
              />
            )}
          />
          <Controller 
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Descrição"
                  onChangeText={onChange}
                  value={value}
                  typeInput="text"
              />
            )}
          />
        </Box>
        <Radio.Group 
          flexDirection="row" 
          px={dimension > 400 ? 10 : 5} 
          name="radioGroupIsnewOrUsed" 
          accessibilityLabel="Escolha entre novo ou usado"
          value={isNewRadio} onChange={nextValue => {
            setIsNewRadio(nextValue);
          }}
        >
          <Radio size="sm" value="new" my={1} pr={1}>
            <Text fontFamily="regular" fontSize="sm" color="gray.200">
              Produto novo
            </Text>
          </Radio>
          <Radio size="sm" value="used" my={1} pr={1} ml={2}>
            <Text fontFamily="regular" fontSize="sm" color="gray.200">
              Produto usado
            </Text>
          </Radio>
        </Radio.Group>
        <Box px={dimension > 400 ? 10 : 5} flexDir="column" justifyContent="flex-start">
          <Text mt={6} mb={4} fontFamily="bold" fontSize="md" color="gray.200">
            Venda
          </Text>
          <Controller 
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Valor do produto"
                  typeInput='brl'
                  onChangeText={onChange}
                  value={value?.toString()}
                  type="text"
                />
            )}
          />
          <Text mt={2} mb={1} fontFamily="bold" fontSize="md" color="gray.200">
              Aceita troca
          </Text>
        </Box>
        <Box px={dimension > 400 ? 10 : 5}>
        <HStack>
          <Switch
            trackColor={{false: '#D9D8DA', true: '#647AC7'}}
            thumbColor={accept_trade ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={accept_trade}
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
              onPress={handleSubmit(handleCreateProduct)}
              isLoading={isSubmitting}
            />
          </Box>
        </HStack>
      </ScrollView>
      
      

    </VStack>
  )
}