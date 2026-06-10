import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ConfirmacaoParams = {
  nome?: string | string[];
  selecao?: string | string[];
};

function getParamValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default function Confirmacao() {
  const params = useLocalSearchParams<ConfirmacaoParams>();
  const nome = getParamValue(params.nome);
  const selecao = getParamValue(params.selecao);

  function handleBack(): void {
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.success}>Palpite enviado com sucesso!</Text>
        <Text style={styles.message}>
          {nome} apostou {selecao}
        </Text>
        <Pressable accessibilityRole="button" style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Fazer outro palpite</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f7fb",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#0f172a",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  success: {
    color: "#087f5b",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  message: {
    color: "#102a43",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: "#0057b8",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
