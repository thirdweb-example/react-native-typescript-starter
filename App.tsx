// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import "react-native-get-random-values";

// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import "@ethersproject/shims";

// Step 3: Import the thirdweb SDK
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

import type { NFT } from "@thirdweb-dev/sdk";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [nfts, setNFTS] = useState<NFT[]>([]);
  useEffect(() => {
    const sdk = new ThirdwebSDK("goerli");
    const loadNFTS = async () => {
      const contract = await sdk.getContract(
        "0x2e01763fA0e15e07294D74B63cE4b526B321E389"
      );
      return await contract.erc721.getAll();
    };

    loadNFTS().then((_nfts) => {
      setNFTS(_nfts);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.nftList}
        data={nfts}
        bounces={true}
        keyExtractor={(item) => item.metadata.id}
        renderItem={({ item }) => (
          <View style={styles.nftItem} key={item.metadata.id}>
            {item.metadata.image && (
              <Image
                style={styles.nftImage}
                source={{ uri: item.metadata.image }}
              />
            )}
            <Text>{item.metadata.name}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nftList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  nftItem: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  nftImage: {
    width: 100,
    height: 100,
  },
});
