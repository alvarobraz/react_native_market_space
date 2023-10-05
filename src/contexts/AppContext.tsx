import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import { api } from '@services/api';

import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from '@storage/storageAuthToken';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

import { UserDTO } from "@dtos/UserDTO";
import { useToast } from "native-base";
import { AppError } from "@utils/AppError";

export type PropsProductImages = {
  id: string;
  path: string;
}

export type PropsPaymentMethods = {
  key?: string;
  name: string;
}

export type PropsUser = {
  avatar: string;
  name?: string;
  tel?: number;
} 

export type PropsProduct = {
  id?: string,
  name: string,
  description?: string;
  price: number,
  is_new: boolean,
  accept_trade: boolean,
  user_id?: string,
  is_active?: boolean;
  product_images: PropsProductImages[]
  payment_methods: PropsPaymentMethods[]
  user?: PropsUser
}

export type AppContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  products: PropsProduct[];
  isLoadingProducts: boolean;
  handleSearchAds: () => void;
  setQuery: React.Dispatch<SetStateAction<string>>;
  query: string;
  setPix: React.Dispatch<SetStateAction<string>>;
  pix: string;
  setCard: React.Dispatch<SetStateAction<string>>;
  card: string;
  setBoleto: React.Dispatch<SetStateAction<string>>;
  boleto: string;
  setCash: React.Dispatch<SetStateAction<string>>;
  cash: string;
  setDeposit: React.Dispatch<SetStateAction<string>>;
  deposit: string;
  setAcceptTrade: React.Dispatch<SetStateAction<boolean | undefined>>;
  acceptTrade: boolean | undefined;
  setNovo: React.Dispatch<SetStateAction<boolean>>;
  novo: boolean;
  setUsado: React.Dispatch<SetStateAction<boolean>>;
  usado: boolean;
  handleTypeCheckBox: (title: string) => void;
  type: string[];
  setType: React.Dispatch<SetStateAction<string[]>>;
  handleResetFilters: () => void;
  handleApllyFilters: () => void;
  showModal: () => void;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
}

type AppContextProviderProps = {
  children: ReactNode
}

export const AppContext = createContext<AppContextDataProps>({} as AppContextDataProps);

export function AppContextProvider({ children }: AppContextProviderProps)  {

  const [ pix, setPix ] = useState('pix')
  const [ card, setCard ] = useState('card')
  const [ boleto, setBoleto ] = useState('boleto')
  const [ cash, setCash ] = useState('cash')
  const [ deposit, setDeposit ] = useState('deposit')

  function handleTypeCheckBox(title: string) {
    if (type.includes(title)) {
      title === 'pix' ? setPix('') : null
      title === 'boleto' ? setBoleto('') : null
      title === 'cash' ? setCash('') : null
      title === 'card' ? setCard('') : null
      title === 'deposit' ? setDeposit('') : null
      setType(type.filter((item) => item !== title));
    } else {
      title === 'pix' ? setPix('pix') : null
      title === 'boleto' ? setBoleto('boleto') : null
      title === 'cash' ? setCash('cash') : null
      title === 'card' ? setCard('card') : null
      title === 'deposit' ? setDeposit('deposit') : null
      setType([...type, title]);
    }
  }

  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const [ acceptTrade, setAcceptTrade ] = useState<boolean | undefined>(undefined)
  const [ novo, setNovo ] = useState<boolean>(true)
  const [ usado, setUsado ] = useState<boolean>(true)
  const [ isNew, setIsNew ] = useState<boolean | undefined>(undefined)
  const [ query, setQuery ] = useState('')

  const [type, setType] = useState<string[]>(["pix", "boleto", "cash", "card", "deposit"])
  const [isModalVisible, setModalVisible] = useState(false);

  // const toast = useToast();
  
  const [products, setProducts] = useState<PropsProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  
  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {

    try {
      
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave(token);

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  
  }

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
  
      if(data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token)
        fetchProducts()
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if(token && userLogged) {
        userAndTokenUpdate(userLogged, token);
        fetchProducts()
      } 
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  function handleResetFilters() {
    setNovo(true)
    setUsado(true)
    setIsNew(undefined)
    setAcceptTrade(undefined)
    setType(["pix", "boleto", "cash", "card", "deposit"])
  }

  function handleApllyFilters() {
    setModalVisible(false);
    fetchProducts()
  }

  const showModal = () => {
    setAcceptTrade(undefined)
    setModalVisible(true);
  };

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true)

      let url = ''
      
      if(acceptTrade !== undefined && isNew !== undefined) {
        url = `is_new=${isNew}&accept_trade=${acceptTrade}&payment_methods=${pix}&payment_methods=${card}&payment_methods=${boleto}&payment_methods=${cash}&payment_methods=${deposit}&query=${query}`        
      }
      else 
      if(acceptTrade !== undefined) {
        url = `accept_trade=${acceptTrade}&payment_methods=${pix}&payment_methods=${card}&payment_methods=${boleto}&payment_methods=${cash}&payment_methods=${deposit}&query=${query}`        
      }
      else
      if(novo === true && usado === false) {
        url = `is_new=true&payment_methods=${pix}&payment_methods=${card}&payment_methods=${boleto}&payment_methods=${cash}&payment_methods=${deposit}&query=${query}`        
      }
      else
      if(novo === false && usado === true) {
        url = `is_new=false&payment_methods=${pix}&payment_methods=${card}&payment_methods=${boleto}&payment_methods=${cash}&payment_methods=${deposit}&query=${query}`        
      }
      else {
        url = `payment_methods=${pix}&payment_methods=${card}&payment_methods=${boleto}&payment_methods=${cash}&payment_methods=${deposit}&query=${query}`
      }

      const response = await api.get(`/products/?${url}`);
      setProducts(response.data);
    } 
    catch (error) {
      console.log('error -> '+error)
    }
    finally {
      setIsLoadingProducts(false)
    }
  }

  function handleSearchAds() {
    fetchProducts()
  }

  useEffect(() => {
    loadUserData()
    fetchProducts()
  },[])

  return (
    <AppContext.Provider value={
      { 
        user, 
        singIn, 
        signOut, 
        isLoadingUserStorageData, 
        products, 
        isLoadingProducts,
        handleSearchAds,
        setQuery,
        query,
        setPix,
        pix,
        setCard,
        card,
        setBoleto,
        boleto,
        setCash,
        cash,
        setDeposit,
        deposit,
        setNovo,
        novo,
        setUsado,
        usado,
        setAcceptTrade,
        acceptTrade,
        handleTypeCheckBox,
        type,
        setType,
        handleResetFilters,
        handleApllyFilters,
        showModal,
        setModalVisible,
        isModalVisible
      }
    }
    >
      {children}
    </AppContext.Provider>
  )
}