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
      activeChain={'mumbai'}
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
          contractAddress="0x43e906b1B8bBBE0ba4345B66dc9ae6690E553124"
          action={async contract => {
            // a contract action. e.g:
            const tokenId = 0;
            const nft = await contract.erc721.get(tokenId);
          }}>
          Get all NFTs
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
