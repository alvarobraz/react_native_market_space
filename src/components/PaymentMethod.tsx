import { PropsPaymentMethods } from "@contexts/AppContext";
import { Box, Text } from "native-base";
import { QrCode, Money, CreditCard, Bank, Barcode } from "phosphor-react-native";

export function PaymentMethod({ name }: PropsPaymentMethods) {
  return(
    <Box key={name} flexDirection="row" justifyContent="flex-start" alignContent="center" textAlign="center">
      {
        <>
          {
            name === 'Pix' ?
            <QrCode
              color="#1A181B"
              size={18}
              style={{top: 4}}
            />
            : null
          }
          {
            name === 'Dinheiro' ?
            <Money
              color="#1A181B"
              size={18}
              style={{top: 4}}
            />
            : null
          }
          {
            name === 'Cartão de Crédito' ?
            <CreditCard
              color="#1A181B"
              size={18}
              style={{top: 4}}
            />
            : null
          }
          {
            name === 'Depósito Bancário' ?
            <Bank
              color="#1A181B"
              size={18}
              style={{top: 4}}
            />
            : null
          }
          {
            name === 'Boleto' ?
            <Barcode
              color="#1A181B"
              size={18}
              style={{top: 4}}
            />
            : null
          }
          <Text fontFamily="regular" fontSize="sm" color="gray.200" pl={3}>
            {name}
          </Text>
        </>
      }
    </Box>
  )
} 