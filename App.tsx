/**
 * @format
 */

import React from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  ChainId,
  ThirdwebProvider,
  useAccount,
  useContract,
  useDisconnect,
  useSDK,
  useWalletConnect,
} from '@thirdweb-dev/react-native';

const App = () => {
  return (
    <ThirdwebProvider activeChain={ChainId.Mainnet}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const disconnect = useDisconnect();

  const sdk = useSDK();

  const {contract} = useContract('a-contract-address');

  const {connect, displayUri} = useWalletConnect();

  const {address: account} = useAccount();

  const onConnectPress = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
  };

  const onSignPress = () => {
    if (!displayUri) {
      Alert.alert('Connect to a wallet before claiming.');
      return;
    }
    console.log('sign.Message');

    sdk?.wallet
      .sign('Hello Thirdweb React Native SDK!!')
      .then(tx => {
        console.log('response', tx);
      })
      .catch(error => console.log('sign.error', error));

    Linking.openURL(displayUri.split('?')[0]);
  };

  const onClaimPress = async () => {
    if (!contract || !account || !displayUri) {
      Alert.alert('Connect to a wallet before claiming.');
      return;
    }

    contract.erc721
      .claimTo(account, 1)
      .then(tx => {
        console.log('tx', tx);
      })
      .catch(error => {
        console.log('sendTransaction.error', error);
      });

    Linking.openURL(displayUri.split('?')[0]);
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text>{account ? `Account: ${account}` : 'Wallet not connected'}</Text>

      <TouchableOpacity style={styles.button} onPress={onConnectPress}>
        <Text style={styles.text}>{account ? 'Disconnect' : 'Connect'}</Text>
      </TouchableOpacity>
      {account ? (
        <>
          <TouchableOpacity style={styles.button} onPress={onClaimPress}>
            <Text style={styles.text}>Claim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSignPress}>
            <Text style={styles.text}>Sign Message</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  backgroundStyle: {
    flex: 1,
    margin: 20,
    alignContent: 'center',
  },
});

export default App;
