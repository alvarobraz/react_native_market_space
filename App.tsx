import { NativeBaseProvider } from 'native-base';
import { Text, View, StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';
import Catalog from '@screens/Catalog';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
       <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
     {fontsLoaded ? <Catalog /> : <Loading />}
    </NativeBaseProvider>
  );
}