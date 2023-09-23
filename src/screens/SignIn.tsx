import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Center, Heading, Icon, ScrollView, useToast } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

import LogoSvg from '@assets/logo_market_space.svg';
import MarketspaceSvg from '@assets/marketspace.svg'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { dimensionWith } from "@utils/dimensionWith";


type FormData = {
  email: string;
  password: string;
}

export function SignIn() {

  const toast = useToast();
  const { singIn } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [visiblyPassword, setVisiblyPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const dimension = dimensionWith()
  const navigation = useNavigation<AuthNavigatorRoutesProps>();


  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignIn({ email, password }: FormData){
    try {
      setIsLoading(true);
      await singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
  
      const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
  
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.600">
      <ScrollView w="full" px={dimension > 400 ? 10 : 5} showsVerticalScrollIndicator={false}>
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
          <Controller 
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                value={value}
              />
            )}
          />
          <Controller 
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry={!visiblyPassword}
                InputRightElement={
                  <Icon 
                    style={{ marginRight: '7%' }}
                    as={MaterialIcons}
                    name="visibility"
                    color={!visiblyPassword ? "gray.400" : "blue.200"}
                    size={5}
                    onPress={()=>setVisiblyPassword((state)=> !state)}
                  />
                }
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Button 
            title="Entrar"
            variant="blue"
            mt={4}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
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