/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  ChainId,
  CoinbaseWallet,
  ConnectWallet,
  MetaMaskWallet,
  ThirdwebProvider,
  Web3Button,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <ThirdwebProvider
      activeChain={ChainId.Mainnet}
      supportedWallets={[MetaMaskWallet, CoinbaseWallet]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.view}>
        <ConnectWallet />

        <Web3Button
          contractAddress="<a-contract-address>"
          action={contract => {
            // a contract action. e.g:
            contract?.erc721.claimTo('<a-wallet-address>', 1);
          }}>
          Claim
        </Web3Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default App;
