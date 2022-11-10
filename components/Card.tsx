import type { FC } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ICardProps {
  link: string;
  title: string;
  description: string;
}

const Card: FC<ICardProps> = ({ link, title, description }) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(link)}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title} &rarr;</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "flex-start",
    border: "1px solid #eaeaea",
    borderRadius: 10,
    display: "flex",
    margin: 8,
    padding: 16,
    textAlign: "left",
    width: 400,
    backgroundColor: "#1b2129",
  },
  cardTitle: {
    color: "#f213a4",
  },
  cardDescription: {
    color: "#fff",
  },
});

export default Card;
