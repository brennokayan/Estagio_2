import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { buttonToCancel, buttonToConfirm } from "../constants/Colors";
import { EditEmpresaContext } from "./src/context/DataContext";
import { useContext, useState } from "react";
import { BackToHome } from "../components/BackHomeButton";
import { createCargo } from "./src/services/api";
import { useNavigation } from "@react-navigation/native";

export default function ModalAddCargo() {
  const navigate = useNavigation();
  const navegar = () => {
    navigate.navigate("index" as never);
  }
  const [cargo, setCargo] = useState({ nome: "" });
  const { dados, setEmpresa } = useContext(EditEmpresaContext) as {
    dados: any;
    setEmpresa: any;
  };

  
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
          placeholder="Nome do Cargo"
          style={styles.text_input}
          value={cargo.nome}
          onChangeText={(e) =>
            setCargo((newCargo) => ({ ...newCargo, nome: e }))
          }
        />
        <View
          style={styles.separator}
          lightColor="#000"
          darkColor="rgba(0,0,0, .4)"
        />
        <View style={styles.container_buttons}>
          <Button title="Confirmar" color={buttonToConfirm} onPress={() =>{createCargo(cargo.nome)}} />
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
