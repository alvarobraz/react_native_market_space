import { useCallback, useEffect, useState } from 'react';
import HeaderAds from '@components/HeaderAds';
import { ScrollView, Box, CheckIcon, Select, Text, VStack } from 'native-base';
import { ProductAds } from '@components/ProductAds';
import { dimensionWith } from '@utils/dimensionWith';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Loading } from '@components/Loading';
import { PropsProduct } from '@contexts/AppContext';
import { api } from '@services/api';


export function MyAds() {

  const dimension = dimensionWith()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const [myProducts, setMyProducts] = useState<PropsProduct[]>([]);
  const [countMyProducts, setCountMyProducts] = useState<number>(0);
  const [isLoadingMyProducts, setIsLoadingMyProducts] = useState(false);
  const [selectMyProducts, setSelectMyProducts] = useState("all");
  
  function handleCreateAndEdit() {
    navigation.navigate('createandedit', {
      id: undefined
    });
  }

  function handleDetailAd(id: string) {
    navigation.navigate('detailAd', {
      id
    });
  }

   // My Ads
   async function fetchMyProducts() {
    try {

      setIsLoadingMyProducts(true)
      const response = await api.get('/users/products');

      if(response.data.lenth !== 0) {
        if(selectMyProducts === 'all') {
          setCountMyProducts(response.data.length)
          setMyProducts(response.data);
        }
        if(selectMyProducts === 'new') {
          const newProducts = response.data.filter((product: { is_new: boolean; })  => product.is_new === true);
          setCountMyProducts(newProducts.length)
          setMyProducts(newProducts);
        }
        if(selectMyProducts === 'used') {
          const usedProducts = response.data.filter((product: { is_new: boolean; })  => product.is_new === false);
          setCountMyProducts(usedProducts.length)
          setMyProducts(usedProducts);
        }
      }

    } 
    catch (error) {
      console.log('error -> '+error)
    }
    finally {
      setIsLoadingMyProducts(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts()
      if(selectMyProducts) {
        fetchMyProducts()
      }
    },[selectMyProducts])
  )

  return (
    <VStack flex={isLoadingMyProducts ? 1 : 0}>
      {
      isLoadingMyProducts ?
      <Loading/>
      :
      <> 
        <ScrollView w="full" h="full" showsVerticalScrollIndicator={false}>
          <HeaderAds
            iconLeft={false}
            title='Meus anúncios'
            iconRight={true}
            nameIconRight='add'
            handleCreateAndEdit={handleCreateAndEdit}
          />
          <Box px={dimension > 400 ? 10 : 5} flexDir="row" justifyContent="space-between" alignContent="center" alignItems="center">
            <Text fontFamily="regular" fontSize="sm" color="gray.200">
              {countMyProducts > 0 ? `${countMyProducts} anúncíos`: `${countMyProducts} anúncío`}
            </Text>
            <Select w="111px" h="34px" selectedValue={selectMyProducts} accessibilityLabel="Todos" placeholder="Todos" _selectedItem={{
              bg: "gray.600",
              endIcon: <CheckIcon style={{ transform: [{scale: 0.5}] }} />
            }} mt={1} onValueChange={itemValue => setSelectMyProducts(itemValue)}>
                <Select.Item label="Todos" value="all" />
                <Select.Item label="Novo" value="new" />
                <Select.Item label="usado" value="used" />
              </Select>
          </Box>
          <Box px={dimension > 400 ? 10 : 5} top={6} flexDir="row" flexWrap="wrap" justifyContent="space-between" pb={10} maxW="full">
            {
              isLoadingMyProducts ?
              <Loading/>
              :
              myProducts.map((product, index) => (
                <ProductAds
                  key={index}
                  onPress={ () => handleDetailAd(product?.id!) }
                  product={product}
                />
              ))
            }
          </Box>
        </ScrollView> 
      </>
    }
    </VStack>
  );
}