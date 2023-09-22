import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Center, Heading, Icon, ScrollView, useToast } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoMinSvg from '@assets/log_market_space_min.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { dimensionWith } from "@utils/dimensionWith";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FileInfo = {
  exists: true;
  uri: string;
  size: number;
  isDirectory: boolean;
  modificationTime: number;
  md5?: string | undefined;
}

type Avatar = {
  name: string;
  uri: string;
  type: string;
}

type FormDataProps = {
  avatar?: Avatar;
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
}

export function SignUp() {

  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<Avatar>();
  const [visiblyPassword, setVisiblyPassword] = useState(false);
  const [visiblyConfirmPassword, setVisiblyConfirmPassword] = useState(false);

  const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    tel: yup.string().required('Informe um telefone'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere')
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>(
    { 
      resolver: yupResolver(signUpSchema),
    }
    
  );

 
  const dimension = dimensionWith()
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleUserPhotoSelected(){
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if(photoSelected.canceled) {
        return;
      }

			if(photoSelected.assets[0].uri) {
        
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) as FileInfo;
        console.log(photoInfo);
        if(photoInfo.size && (photoInfo.size  / 1024 / 1024 ) > 5){

          alert('Essa imagem é muito grande. Escolha uma de até 2MB')
        }
        
        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `alvaro${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as Avatar;

        setUserPhoto(photoFile)
        setPhotoIsLoading(false)
      }
      

	  } catch (error) {
	    console.log(error)
      setPhotoIsLoading(false)
	  } finally {
	    setPhotoIsLoading(false)
	  }
  }

  async function handleSignUp({name, password, email, tel}: FormDataProps) {
    try {
      setIsSubmitting(true);
      const userData = new FormData();

      userData.append('name', name);
      userData.append('email', email);
      userData.append('password', password);
      userData.append('tel', tel);

      userData.append('avatar', userPhoto as any)

      await api.post('/users', userData, { 
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      reset();
      
      toast.show({
        title: 'Conta Criada com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde';
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
          <Controller 
            control={control}
            name="avatar"
            render={({ field: { onChange, value } }) => (
              <UserPhoto 
                size={16}
                mr={4}
                icon={true}
                value={value}
                onPress={handleUserPhotoSelected}
                imgAvatar={userPhoto?.uri}
                isLoading={photoIsLoading}
              />
            )}
          />
        </Center>
        <Center>
        <Controller 
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller 
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="E-mail" 
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller 
          control={control}
          name="tel"
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Telefone"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller 
          control={control}
          name="password"
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
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller 
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirmar senha"
              secureTextEntry={!visiblyConfirmPassword}
              InputRightElement={
                <Icon 
                  style={{ marginRight: '7%' }}
                  as={MaterialIcons}
                  name="visibility"
                  color={!visiblyConfirmPassword ? "gray.400" : "blue.200"}
                  size={5}
                  onPress={()=>setVisiblyConfirmPassword((state)=> !state)}
                />
              }
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />
          <Button 
            title="Criar"
            variant="black"
            mt={4}
            onPress={handleSubmit(handleSignUp)}
            isLoading={isSubmitting}
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