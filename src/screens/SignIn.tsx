import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Center, Heading, Icon, ScrollView } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo_market_space.svg';
import MarketspaceSvg from '@assets/marketspace.svg'

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <VStack flex={1} bg="gray.600">
      <ScrollView w="full" px={5} showsVerticalScrollIndicator={false}>
        <Center my={12}>
          <LogoSvg />
        </Center>
        <Center mb={10}>
          <MarketspaceSvg />
          <Text color="gray.300" fontSize="xs">
            Seu espaço de compra e venda
          </Text>
        </Center>
        <Center>
          <Heading color="gray.200" fontSize="xm" mb={4} fontFamily="regular">
            Acesse a conta
          </Heading>
          <Input placeholder="E-mail" />
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
          <Button 
            title="Entrar"
            variant="blue"
            mt={4}
          />
        </Center>
        <Center py={10} alignItems="center">
        <Heading color="gray.200" fontSize="xm" mb={2} fontFamily="regular">
            Ainda não tem acesso?
          </Heading>
          <Button 
          title="Criar uma conta"
          variant="gray"
          onPress={handleNewAccount}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}