import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

const SELECOES_COPA = [
  "Africa do Sul",
  "Alemanha",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Australia",
  "Austria",
  "Belgica",
  "Bosnia e Herzegovina",
  "Brasil",
  "Cabo Verde",
  "Canada",
  "Colombia",
  "Coreia do Sul",
  "Costa do Marfim",
  "Croacia",
  "Curacao",
  "Congo RD",
  "Equador",
  "Egito",
  "Escocia",
  "Espanha",
  "Estados Unidos",
  "Franca",
  "Gana",
  "Haiti",
  "Inglaterra",
  "Ira",
  "Iraque",
  "Japao",
  "Jordania",
  "Marrocos",
  "Mexico",
  "Noruega",
  "Nova Zelandia",
  "Paises Baixos",
  "Panama",
  "Paraguai",
  "Portugal",
  "Qatar",
  "Republica Tcheca",
  "Senegal",
  "Suica",
  "Suecia",
  "Tunisia",
  "Turquia",
  "Uruguai",
  "Uzbequistao",
];

type FormErrors = {
  nome?: string;
  selecao?: string;
};

export default function App() {
  const [nome, setNome] = useState("");
  const [selecao, setSelecao] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function validateForm(): boolean {
    const nextErrors: FormErrors = {};

    if (!nome.trim()) {
      nextErrors.nome = "Informe seu nome para enviar o palpite.";
    }

    if (!selecao) {
      nextErrors.selecao = "Selecione uma selecao participante da Copa.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function clearError(field: keyof FormErrors) {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function handleSelectSelecao(value: string) {
    setSelecao(value);
    clearError("selecao");
    setIsPickerOpen(false);
  }

  function handleSubmit() {
    if (isSubmitting || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    setTimeout(() => {
      const nomeLimpo = nome.trim();

      setSuccessMessage("Palpite enviado com sucesso!");
      setIsSubmitting(false);

      router.push({
        pathname: "/confirmacao",
        params: {
          nome: nomeLimpo,
          selecao,
        },
      });
    }, 1000);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Palpite da Copa do Mundo</Text>

        <Image
          source={{
            uri: "https://i.postimg.cc/1f0YMn9z/FIFA-Logo-2026.png",
          }}
          style={styles.imagem}
        />

        <Text style={styles.label}>Seu nome:</Text>

        <TextInput
          style={[styles.input, errors.nome ? styles.invalidField : null]}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={(value) => {
            setNome(value);
            clearError("nome");
          }}
          editable={!isSubmitting}
        />
        {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

        <Text style={styles.label}>Qual selecao sera campea?</Text>

        <Pressable
          accessibilityRole="button"
          disabled={isSubmitting}
          onPress={() => setIsPickerOpen(true)}
          style={[
            styles.selectButton,
            errors.selecao ? styles.invalidField : null,
            isSubmitting ? styles.disabledField : null,
          ]}
        >
          <Text style={[styles.selectText, !selecao ? styles.placeholderText : null]}>
            {selecao || "Selecione uma selecao"}
          </Text>
          <Text style={styles.selectIcon}>v</Text>
        </Pressable>
        {errors.selecao ? <Text style={styles.errorText}>{errors.selecao}</Text> : null}

        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <Pressable
          accessibilityRole="button"
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : null]}
        >
          {isSubmitting ? (
            <View style={styles.loadingContent}>
              <ActivityIndicator color="#ffffff" />
              <Text style={styles.submitButtonText}>Enviando...</Text>
            </View>
          ) : (
            <Text style={styles.submitButtonText}>Enviar palpite</Text>
          )}
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isPickerOpen}
        onRequestClose={() => setIsPickerOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsPickerOpen(false)}>
          <Pressable style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma selecao</Text>
            <ScrollView style={styles.optionList}>
              {SELECOES_COPA.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => handleSelectSelecao(item)}
                  style={[styles.option, selecao === item ? styles.selectedOption : null]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selecao === item ? styles.selectedOptionText : null,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    padding: 22,
    shadowColor: "#0f172a",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#102a43",
  },

  imagem: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 30,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#243b53",
  },

  input: {
    borderWidth: 1,
    borderColor: "#9fb3c8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },

  selectButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#9fb3c8",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  selectText: {
    flex: 1,
    fontSize: 16,
    color: "#102a43",
  },

  placeholderText: {
    color: "#829ab1",
  },

  selectIcon: {
    fontSize: 18,
    color: "#486581",
  },

  invalidField: {
    borderColor: "#d64545",
    borderWidth: 2,
  },

  disabledField: {
    opacity: 0.7,
  },

  errorText: {
    color: "#b42318",
    fontSize: 14,
    marginBottom: 14,
  },

  successText: {
    color: "#087f5b",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 14,
    textAlign: "center",
  },

  submitButton: {
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: "#0057b8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  submitButtonDisabled: {
    backgroundColor: "#6c8ebf",
  },

  submitButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },

  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "78%",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 18,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#102a43",
    marginBottom: 12,
  },

  optionList: {
    maxHeight: 460,
  },

  option: {
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  selectedOption: {
    backgroundColor: "#e6f0ff",
  },

  optionText: {
    fontSize: 16,
    color: "#243b53",
  },

  selectedOptionText: {
    color: "#0057b8",
    fontWeight: "700",
  },
});
