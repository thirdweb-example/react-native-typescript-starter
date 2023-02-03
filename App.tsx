/**
 * Sample React Native App using @thirdweb-dev/react-native
 *
 * @format
 */

import {
  ChainId,
  ThirdwebProvider,
  useContract,
  useNFTs,
  useAccount,
  useThirdwebProvider,
  useDisconnect,
  useWalletConnect,
  useSDK,
} from '@thirdweb-dev/react-native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const LOG_TAG = '(TW)';
const WALLET_CONNECT_PREFIX = 'wc://';

const log = (message: string, ...args: any[]) => {
  console.log(LOG_TAG, message, ...args);
};

const deepLink = (uri: string) => {
  // Tricking the app to open the wallet app. This is usually not needed since
  // apps should pop up a notification for signing but Trust Wallet does not at the moment.
  Linking.openURL(uri);
};

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const {isInitializing} = useThirdwebProvider();

  const {connect, error, isLoading, isSuccess, displayUri, connectorError} =
    useWalletConnect();

  const {isConnected, connector} = useAccount();

  const disconnect = useDisconnect();

  const sdk = useSDK();

  useEffect(() => {
    if (displayUri && !isConnected) {
      deepLink(displayUri);
    }
  }, [displayUri, isConnected]);

  useEffect(() => {
    if (connectorError) {
      log('connectorError', connectorError);
    }
  }, [connectorError]);

  const {
    contract,
    isLoading: isLoadingContract,
    error: contractError,
  } = useContract('0xb8A3454db7042Ee72C93b42565357A2e13967FD4', 'nft-drop');

  const {
    data: nfts,
    isLoading: isLoadingNFTs,
    error: nftsError,
  } = useNFTs(contract, {
    start: 0,
    count: 100,
  });

  const onConnectPress = async () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const signMessage = () => {
    sdk?.wallet
      .sign('Test Message')
      .then(tx => {
        log('response', tx);
      })
      .catch(error => log('sign.error', error));

    deepLink(WALLET_CONNECT_PREFIX);
  };

  const claim = () => {
    if (!contract) {
      return;
    }

    contract.erc721
      .claim(1)
      .then(tx => {
        log('tx', tx);
      })
      .catch(error => {
        log('sendTransaction.error', error);
      });

    deepLink(WALLET_CONNECT_PREFIX);
  };

  if (isInitializing) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <Text style={styles.title}>Welcome to thirdweb</Text>
      <TouchableOpacity style={styles.button} onPress={onConnectPress}>
        <Text style={styles.text}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signMessage}>
        <Text style={styles.text}>Sign Message</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={claim}>
        <Text style={styles.text}>Claim NFT</Text>
      </TouchableOpacity>
      <View style={styles.scrollViewContainer}>
        {isLoadingNFTs ? <ActivityIndicator /> : null}
        <ScrollView>
          {nfts && nfts.length > 0
            ? nfts.map(nft => {
                return (
                  <TouchableOpacity
                    key={nft.metadata.name}
                    style={styles.nftView}>
                    <Text style={styles.nftText}>
                      Name: {nft.metadata.name}
                    </Text>
                    {nft?.metadata.image ? (
                      <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={{uri: nft?.metadata.image}}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 15,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0f1318',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f213a4',
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 20,
  },
  nftView: {
    alignItems: 'center',
    marginTop: 20,
  },
  nftText: {
    color: 'white',
  },
  image: {
    height: 150,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: '#f213a4',
  },
  button: {
    height: 50,
    width: 100,
    margin: 5,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.2,
    borderRadius: 10,
  },
});

export default App;
