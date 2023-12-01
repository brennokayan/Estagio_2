import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Button, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useContext, useState } from "react";
import { EditEmpresaContext } from "./src/context/DataContext";
import { buttonToCancel, buttonToConfirm } from "../constants/Colors";
import { BackToHome } from "../components/BackHomeButton";
import { updateFuncionario } from "./src/services/api";
import { useNavigation } from "@react-navigation/native";

export default function EditarFuncionario() {
  const navigate = useNavigation();
  const navegar = () => {
    navigate.navigate("index" as never);
  }
  const { dados } = useContext(EditEmpresaContext) as {
    dados: any;
  };
  const [funcionario, setFuncionario] = useState({
    nome: dados.nome === undefined ? "" : dados.nome,
    cargoId: dados.cargoId === undefined ? "" : dados.cargoId,
    empresaId: dados.empresaId === undefined ? "" : dados.empresaId,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar {dados?.type}</Text>
      <View
        style={styles.separator}
        lightColor="#000"
        darkColor="rgba(0,0,0, .4)"
      />
      <View style={styles.container_input}>
        <Text>Nome do Funcionário:</Text>
        <TextInput
          placeholder="Nome do Funcionário..."
          style={styles.text_input}
          value={funcionario.nome}
          onChangeText={(e) =>
            setFuncionario((newFuncionario) => ({ ...newFuncionario, nome: e }))
          }
        />
        <Text>Id do Cargo:</Text>
        <TextInput
          placeholder="Id do Cargo..."
          style={styles.text_input}
          value={funcionario.cargoId}
          onChangeText={(e) =>
            setFuncionario((newFuncionario) => ({
              ...newFuncionario,
              cargoId: e,
            }))
          }
        />
        <Text>Id da Empresa:</Text>
        <TextInput
          placeholder="Id da Empresa..."
          style={styles.text_input}
          value={String(funcionario.empresaId)}
          onChangeText={(e) =>
            setFuncionario((newFuncionario) => ({
              ...newFuncionario,
              empresaId: e,
            }))
          }
        />
        <View
          style={styles.separator}
          lightColor="#000"
          darkColor="rgba(0,0,0, .4)"
        />
        <View style={styles.container_buttons}>
          <Button
            title="Confirmar"
            color={buttonToConfirm}
            onPress={() => {
              updateFuncionario(
                dados.id,
                funcionario.nome,
                funcionario.cargoId,
                funcionario.empresaId
              );
            }}
          />
          <BackToHome />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container_buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  text_input: {
    padding: 10,
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 8,
  },
  container_input: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
});
