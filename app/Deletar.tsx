import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Button } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useContext } from "react";
import { EditEmpresaContext } from "./src/context/DataContext";
import { BackToHome } from "../components/BackHomeButton";
import { buttonToConfirm } from "../constants/Colors";
import { DeleteCargo, DeleteEmpresa, DeleteFuncionario, DeleteProdutos } from "./src/services/api";
import { useNavigation } from "@react-navigation/native";

interface props {
  id: number;
}

export default function ModalDelete() {
  const { dados } = useContext(EditEmpresaContext) as { dados: any };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deletar{" "}
        {dados?.type === null || undefined ? "Carregando..." : dados?.type}
      </Text>
      <Text>
        Deseja realmente{" "}
        <Text style={styles.alertar}>DELETAR PERMANENTEMENTE</Text>
      </Text>
      <Text>
        id: {dados.id} - {dados.nome}{" "}
      </Text>
      <View style={styles.container_buttons}>
        <Button
          title="Confirmar"
          color={buttonToConfirm}
          onPress={() => {
            if (dados.type === "Empresa") {
              DeleteEmpresa(dados.id);
            }
            if (dados.type === "Cargo") {
              DeleteCargo(dados.id);
            }
            if (dados.type === "Funcionário") {
              DeleteFuncionario(dados.id);
            }
            if (dados.type === "Produto") {
              DeleteProdutos(dados.id);
            }
          }}
        />
        <BackToHome />
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container_buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  alertar: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
