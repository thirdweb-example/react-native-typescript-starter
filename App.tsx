/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Button, Linking, SafeAreaView, StyleSheet, Text} from 'react-native';

import {ChainId, useContract, useSDK} from '@thirdweb-dev/react-core';
import {
  ThirdwebProvider,
  useAccount,
  useWalletConnect,
  useWalletDisconnect,
} from '@thirdweb-dev/react-native';

const App = () => {
  return (
    <ThirdwebProvider activeChain={ChainId.Mainnet}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const sdk = useSDK();

  const {contract} = useContract('0xb8A3454db7042Ee72C93b42565357A2e13967FD4');

  const {connector, connect, isLoading, isSuccess, connectError, displayUri} =
    useWalletConnect();

  const disconnect = useWalletDisconnect();

  const {address: account} = useAccount();

  const onPress = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
  };

  const signMessage = () => {
    console.log('sign.Message');

    sdk?.wallet
      .sign('Test Message')
      .then(tx => {
        console.log('response', tx);
      })
      .catch(error => console.log('sign.error', error));

    Linking.openURL('wc:');
  };

  const claim = async () => {
    console.log('claim');
    contract?.erc721
      .claimTo('0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240', 1)
      .then(tx => {
        console.log('tx', tx);
      })
      .catch(error => {
        console.log('sendTransaction.error', error);
      });

    Linking.openURL('wc:');
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text>{`Account: ${account}`}</Text>

      <Button title={account ? 'Disconnect' : 'Connect'} onPress={onPress} />

      <Button title={'Claim'} onPress={claim} />

      <Button title={'Sign Message'} onPress={signMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
  touchable: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
  },
  connectText: {
    color: 'white',
    textAlign: 'center',
  },
  nftBalance: {
    marginTop: 10,
    flex: 1,
  },
  nftView: {
    marginTop: 20,
  },
  image: {
    height: 150,
  },
  textInput: {
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  backgroundStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
});

export default App;
