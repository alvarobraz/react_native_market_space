import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from '@services/api';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps)  {

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
  
      if(data.user) {
        setUser(data.user);
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }


  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if(userLogged) {
        setUser(userLogged);
      } 
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }
  
  useEffect(() => {
    loadUserData()
  },[])

  return (
    <AuthContext.Provider value={{ user, singIn, isLoadingUserStorageData, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}