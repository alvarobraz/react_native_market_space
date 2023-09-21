import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Center, Heading, Icon, ScrollView } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoMinSvg from '@assets/log_market_space_min.svg';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { dimensionWith } from "@utils/dimensionWith";

export function SignUp() {

  const dimension = dimensionWith()
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1} bg="gray.600" alignItems="center">
      <ScrollView w="full" px={dimension > 400 ? 10 : 5} showsVerticalScrollIndicator={false}>
        <Center mt={12} mb={5}>
          <LogoMinSvg />
        </Center>
        <Center mb={10}>
          <Text color="gray.100" fontSize="sm" fontFamily="bold">
            Boas vindas!
          </Text>
          <Text color="gray.200" fontSize="xm" textAlign="center">
            Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
          </Text>
        </Center>
        <Center>
          <UserPhoto 
            size={16}
            mr={4}
            icon={true}
          />
        </Center>
        <Center>
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" />
          <Input placeholder="Telefone" />
          <Input
            placeholder="Senha"
            InputRightElement={
              <Icon 
                style={{ marginRight: '7%' }}
                as={MaterialIcons}
                name="visibility"
                color="gray.400"
                size={5}
              />
            }
          />
          <Input
            placeholder="Confirmar senha"
            InputRightElement={
              <Icon 
                style={{ marginRight: '7%' }}
                as={MaterialIcons}
                name="visibility"
                color="gray.400"
                size={5}
              />
            }
          />
          <Button 
            title="Criar"
            variant="black"
            mt={4}
          />
        </Center>
        <Center py={10} alignItems="center">
        <Heading color="gray.200" fontSize="xm" mb={2} fontFamily="regular">
            Ainda não tem acesso?
          </Heading>
          <Button 
          title="Ir para login"
          variant="gray"
          onPress={handleGoBack}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}