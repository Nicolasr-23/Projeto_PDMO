import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet
} from "react-native";
 
export default function App() {
  return (
    <View style={styles.container}>
 
      <Text style={styles.titulo}>
        Palpite da Copa do Mundo
      </Text>
 
      <Image
        source={{
          uri: "https://i.postimg.cc/1f0YMn9z/FIFA-Logo-2026.png"
        }}
        style={styles.imagem}
      />
 
      <Text style={styles.label}>
        Seu nome:
      </Text>
 
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
      />
 
      <Text style={styles.label}>
        Qual seleção será campeã?
      </Text>
 
      <TextInput
        style={styles.input}
        placeholder="Digite a seleção"
      />
 
      <Button
        title="Enviar palpite"
        onPress={() => alert("Palpite enviado!")}
      />
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
 
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
 
  imagem: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 30,
  },
 
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
 
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});