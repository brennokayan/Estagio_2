import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { buttonToCancel, buttonToConfirm } from "../constants/Colors";
import { EditEmpresaContext } from "./src/context/DataContext";
import { useContext, useState } from "react";
import { navigateToHome } from "./src/hooks/navigateHome";
import { Link, useNavigation } from "@react-navigation/native";
import { BackToHome } from "../components/BackHomeButton";
import { createEmpresa } from "./src/services/api";

export default function ModalAddEmpresa() {
  const navigate = useNavigation();
  const navegar = () => {
    navigate.navigate("index" as never);
  }
  const [empresa, setEmpresas] = useState({ nome: "" });
  const { dados, setEmpresa } = useContext(EditEmpresaContext) as {
    dados: any;
    setEmpresa: any;
  };
  async function CriarEmpresa(){
    await createEmpresa(empresa.nome)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Adicionar{" "}
        {dados.type == null || undefined ? "Carregando..." : dados.type}
      </Text>
      <View
        style={styles.separator}
        lightColor="#000"
        darkColor="rgba(0,0,0, .4)"
      />
      <View style={styles.container_input}>
        <Text></Text>
        <TextInput
          placeholder="Nome da Empresa"
          style={styles.text_input}
          value={empresa.nome}
          onChangeText={(e) =>
            setEmpresas((newEmpresa) => ({ ...newEmpresa, nome: e }))
          }
        />
        <View
          style={styles.separator}
          lightColor="#000"
          darkColor="rgba(0,0,0, .4)"
        />
        <View style={styles.container_buttons}>
          <Button title="Confirmar" color={buttonToConfirm} onPress={() => {CriarEmpresa()}} />
          <BackToHome />
        </View>
      </View>
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
