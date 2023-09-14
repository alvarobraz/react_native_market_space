import HeaderCatalog from "@components/HeaderCatalog";
import { Input } from "@components/Input";
import { InputButtonFilter } from "@components/InputButtonFilter";
import { ProductAds } from "@components/ProductAds";
import YourAds from "@components/YourAds";
import { VStack, Text, HStack, ScrollView } from "native-base";
import { MagnifyingGlass } from "phosphor-react-native";

export default function Catalog() {

  function handleYourAds() {
    alert('Ir para seus anúncios')
  }

  function handleSearchAds() {
    alert('Buscar anúncios')
  }

  function handleApplyFilters() {
    alert('Aplicar filtros')
  }


  return (
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
        handleApplyFilters={handleApplyFilters}
        />
        <HStack top={8} flexWrap="wrap" justifyContent="space-between" px={0} maxW="300px">
            <ProductAds variant="new" />
            <ProductAds />
            <ProductAds />
            <ProductAds />
            <ProductAds />
            <ProductAds />
          </HStack>
      </VStack>
    </ScrollView>
  )
}