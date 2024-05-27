import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";

export default function ColorChanger(props) {
  return (
    <View>
      <Text style={{ fontSize: 20, color: "orange" }}>{props.color}</Text>
      <Button
        title="Increase"
        onPress={() => props.onIncrease()}
        style={styles.button}
      />
      <Button
        title="Decrease"
        onPress={() => props.onDecrease()}
        style={styles.button}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
