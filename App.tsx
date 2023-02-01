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
import {useAccount, useConnect} from 'wagmi';

const LOG_TAG = '(TW)';

const log = (message: string, ...args: any[]) => {
  console.log(LOG_TAG, message, ...args);
};

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const {connector, isConnected} = useAccount();

  const {connect, connectors, error, isLoading, isSuccess, pendingConnector} =
    useConnect();

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

  useEffect(() => {
    // Only supports wallet connect for now, when adding more connectors
    // it will subscribe after the user selects a connector
    if (connectors[0]) {
      log('connector', 'setListeners', connectors[0]);
      const connector_ = connectors[0];
      connector_.addListener('connect', data => {
        log('connect', data);
      });
      connector_.addListener('message', ({type, data}) => {
        log('message', type, data);
        switch (type) {
          case 'display_uri':
            if (typeof data !== 'string') {
              throw new Error('display_uri data is not a string');
            }
            Linking.openURL(data.replace('wc:', 'wc://'));
            break;
        }
      });
      connector_.addListener('error', e => {
        log('error', e);
      });
      connector_.addListener('disconnect', () => {
        log('disconnect');
      });
    }
  }, [connectors]);

  const onConnectPress = async () => {
    connect({connector: connectors[0]});
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <Text style={styles.title}>Welcome to thirdweb</Text>
      <TouchableOpacity style={styles.connectButton} onPress={onConnectPress}>
        <Text style={styles.text}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </Text>
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
  connectButton: {
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
