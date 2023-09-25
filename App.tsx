import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { AppContextProvider } from '@contexts/AppContext';
import { Routes } from '@routes/index';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
       <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AppContextProvider>
    </NativeBaseProvider>
  );
}