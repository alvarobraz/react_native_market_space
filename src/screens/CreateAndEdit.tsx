import { useEffect, useState } from "react";
import { Box, Text, VStack, ScrollView, Image, Radio, HStack, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';
import AvataDefault from '../assets/avatar_default.png'
import { Button } from "@components/Button";
import { ButtonInput } from "@components/ButtonInput";
import { CheckBox } from "@components/CheckBox";
import HeaderAds from "@components/HeaderAds";
import { Input } from "@components/Input";
import { UploadButton } from "@components/UploadButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { dimensionWith } from "@utils/dimensionWith";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "@components/Loading";
import { PropsProductImages } from "@contexts/AppContext";
import { Switch } from "react-native";
import { CaroulselAds } from "@components/CarouselAds";
import { PropsCarousel } from "./DetailAd";
import { PaymentMethod } from "@components/PaymentMethod";
import { formatValueBRL } from "@utils/index";

type RouteParams = {
  id: string;
}

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

  const route = useRoute()
  // console.log('route.params -> '+JSON.stringify(route.params))
  const { id } = route.params as RouteParams

  const toast = useToast();
  const { user, type, setType, handleTypeCheckBox } = useAuth();

  const [isActive, setIsActive] = useState(false);
  const [isNewRadio, setIsNewRadio] = useState('new');
  const [accept_trade, setAccept_trade] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ carousel, setCarousel ] = useState<PropsCarousel[]>([])

  const [isLoadingProductId, setIsLoadingProductId] = useState(false);

  const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    description: yup.string().required('Informe a descrição'),
    price: yup.number().required('Informe o preço').min(3, 'o preço deve ter no mínimo três dígitos.'),
  });

  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm<FormDataProps>(
    { 
      defaultValues: {
        name: '',
        description: '',
        is_new: !id && isNewRadio === 'new' ? true : false,
        price: 0,
        accept_trade: accept_trade
      },
      resolver: yupResolver(signUpSchema),
    }
    
  );
 
  const name        = watch('name');
  const description = watch('description');
  const price       = watch('price');

  const dimension = dimensionWith()
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const checkBoxItem = ["pix", "boleto", "cash", "card", "deposit"];

  const [ fileProductsIsLoading, setFileProductsIsLoading ] = useState(false)
  const [fileProducts, setFileProducts] = useState<FileProductsProp[]>([]);
  const [fileProductsId, setFileProductsId] = useState<PropsProductImages[]>([]);
  const [productsIdToDelete, setProductsIdToDelete] = useState<string[]>([]);

  const [ isPreview, setIsPreview ] = useState(false)

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
        setCarousel((prevState) => {
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

  async function handleDeleteFileProductSelected(name: string, type: string) {

    if(type === 'photo') {
      const fileUpdate = fileProducts.filter(file => file.name !== name)
      setFileProducts(fileUpdate)

      const fileUpdateCarousel = carousel.filter(file => file.name !== name)
      setCarousel(fileUpdateCarousel)
    }
    
    if(type === 'id') {
      console.log('deletar este product image id -> '+ name)
      setProductsIdToDelete(  
        prevProductsIdToDelete => [...prevProductsIdToDelete, name]
      )
      const fileUpdateId = fileProductsId.filter(file => file.id !== name)
      setFileProductsId(fileUpdateId)
      
      const fileUpdateCarousel = carousel.filter(file => file.id !== name)
      setCarousel(fileUpdateCarousel)
    }
    
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

  async function fetchProductId(id: string) {

    try {
      setIsLoadingProductId(true)
      const response = await api.get(`/products/${id}`);

      const paymentMethods = response.data.payment_methods as { key: string }[] | undefined;
      const extractedKeys = paymentMethods?.map((method: { key: string; }) => method.key);
      const uniqueTypeIds = [...new Set(extractedKeys)];
      setType(uniqueTypeIds)

      setFileProductsId(response.data.product_images)
      setIsNewRadio(response.data.is_new === true ? 'new' : 'used')
      setAccept_trade(response.data.accept_trade)
      setIsActive(response.data.is_active)
      setCarousel(response.data.product_images)

      let defaultValues = {
        name: '',
        description: '',
        price: 0,
        payment_methods: ["pix", "boleto", "cash", "card", "deposit"]
      };
      defaultValues.name            = response.data.name;
      defaultValues.description     = response.data.description;
      defaultValues.price           = response.data.price;
      reset({ ...defaultValues });


    } catch (error) {
      throw error
    } finally {
      setIsLoadingProductId(false)
    }

  }

  function handleIsPreview() {
    setIsPreview(state => !state)
  }

  async function handleUpdateProduct(data: FormDataProps) {
    try {

      setIsSubmitting(true);
      const newDefaultValues = {
        is_new: isNewRadio === 'new' ? true : false,
        accept_trade: accept_trade,
        payment_methods: type,
        price: Number(data.price)
      };

      const dataCombinedValues = { ...data, ...newDefaultValues };
      await api.put(`/products/${id}`, dataCombinedValues);

      if(fileProducts.length !== 0) {
        const productData = new FormData();
        productData.append('product_id', id);
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

      if(productsIdToDelete.length !== 0) {
        const images = productsIdToDelete
        const imagesData = { productImagesIds: images }
        await api.delete('/products/images/', { data: imagesData });
      }

      setFileProducts([])
      setFileProductsId([])
      
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

  useEffect(()=> {
    if(id !== undefined) {
      fetchProductId(id)
    }
    else {
      setType(["pix", "boleto", "cash", "card", "deposit"])
      setFileProductsId([])
      setIsNewRadio('new')
      setAccept_trade(false)
      setIsActive(false)
      setCarousel([])

      let defaultValues = {
        name: '',
        description: '',
        price: 0,
        payment_methods: ["pix", "boleto", "cash", "card", "deposit"]
      };
      defaultValues.name            = '';
      defaultValues.description     = '';
      defaultValues.price           = 0;
      reset({ ...defaultValues });
    }
  },[id])

  return (
    <VStack mb={isPreview ? 0 : 20} flex={isLoadingProductId ? 1 : 0}>
      {
        isLoadingProductId ?
        <Loading />
        :
        isPreview ?
        <>
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
        <ScrollView w="full"showsVerticalScrollIndicator={false} mb={100}>
          <CaroulselAds
          isActive={isActive}
          data={carousel}
          />
          <VStack px={dimension > 400 ? 10 : 5}>
            <Box h={7} w="full" my={4} flexDirection="row" justifyContent="flex-start" textAlign="center" alignContent="center" >
              <Image
                h={7}
                w={7} 
                borderRadius={user?.avatar ? 999 : 0}
                source={user?.avatar ? { uri: `http://192.168.100.7:3333/images/${user?.avatar}` } : AvataDefault}
                defaultSource={AvataDefault}
                alt="Avatar do perfil sem imagem"
                resizeMode="contain"
                position="relative"
              />
              <Text pl={2} pt="2px" fontFamily="regular" fontSize="sm" color="gray.100">
                { user?.name }
              </Text>
            </Box>
            <Box w="50px" mt={2} h="17px" bg="gray.500" borderRadius="full">
              <Text fontFamily="bold" fontSize="xss" color="gray.200" textAlign="center" top="0">
                {isNewRadio === 'new' ? 'NOVO' : 'USADO'}
              </Text>
            </Box>
            <HStack mt={1} mb={2} justifyContent="space-between">
              <Box>
                <Text fontFamily="bold" fontSize="lg" color="gray.100">
                  {name}
                </Text>
              </Box>
              <Box flexDirection="row">
                <Text fontFamily="bold" fontSize="sm" color="blue.200" top="6px" mr="3px">
                  R$
                </Text>
                <Text fontFamily="bold" fontSize="lg" color="blue.200">
                  {formatValueBRL(price)}
                </Text>
              </Box>
            </HStack>
          <VStack>
            <Text fontFamily="regular" fontSize="sm" color="gray.200" mt={1} mb={0} h="auto" >
              {description}
            </Text>
            <Box flexDirection="row" justifyContent="flex-start" my={6}>
              <Text fontFamily="bold" fontSize="sm" color="gray.200" mr={2}>
                Aceita troca?
              </Text>
              <Text fontFamily="regular" fontSize="sm" color="gray.200">
              {accept_trade === true  ? 'Sim' : 'Não'}
              </Text>
            </Box>
            <Box flexDirection="column" justifyContent="flex-start">
              <Text fontFamily="bold" fontSize="sm" color="gray.200" mb={2}>
              Meios de pagamento:
              </Text>
              {
                type.length !== 0 ?
                type.map((pm) => (
                  <PaymentMethod 
                    name={pm}
                  />
                ))
                :
                ''
              }
            </Box>
            </VStack>
          </VStack>
          <VStack py={5} h="145px" px={dimension > 400 ? 10 : 5} justifyContent="space-between">
            <Button
              icon={true}
              nameIcon='arrow-back'
              title="Voltar e editar"
              variant="gray"
              onPress={handleIsPreview}
            />
            <Button
              icon={true}
              nameIcon='local-offer'
              title='Publicar'
              variant="blue"
              isLoading={isSubmitting}
              onPress={handleSubmit(id !== undefined ? handleUpdateProduct : handleCreateProduct)}
            />
          </VStack>
          </ScrollView>
        </>
        :
        <>
          <HeaderAds
            iconLeft={true}
            nameIconLeft='arrow-back'
            title={id ? 'Criar Anúncio' : 'Editar Anúncio'}
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
                    fileProductsId={fileProductsId}
                    fileProductsIsLoading={fileProductsIsLoading}
                    handleDeleteFileProductSelected={handleDeleteFileProductSelected}
                    // handleDeleteFileProductId={handleDeleteFileProductId}
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
              value={isNewRadio} 
              onChange={nextValue => {
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
                onValueChange={value=>setAccept_trade((prev) => !prev)}
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
                  onPress={()=>reset()}
                />
              </Box>
              <Box w="47%">
                <Button
                  title="Avançar"
                  variant="black"
                  onPress={handleIsPreview}
                  isLoading={isSubmitting}
                />
              </Box>
            </HStack>
          </ScrollView>
        </>
      }
    </VStack>
  )
}