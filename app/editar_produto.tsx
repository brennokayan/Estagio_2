import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Button, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useContext, useState } from "react";
import { EditEmpresaContext } from "./src/context/DataContext";
import { buttonToCancel, buttonToConfirm } from "../constants/Colors";
import { BackToHome } from "../components/BackHomeButton";
import { UpdateEmpresa, updateProduto } from "./src/services/api";
import { useNavigation } from "@react-navigation/native";
interface dataProps {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  type: string;
}
export default function EditarProduto() {
  const { dados } = useContext(EditEmpresaContext) as {
    dados: dataProps;
  };

  const navigate = useNavigation();
  const navegar = () => {
    navigate.navigate("index" as never);
  }
  
  const [produto, setProduto] = useState({
    nome: dados.nome == undefined ? "" : dados.nome,
    preco: dados.preco == undefined ? 0 : dados.preco,
    descricao: dados.descricao == undefined ? "" : dados.descricao,
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
        <Text>Nome do Produto:</Text>
        <TextInput
          placeholder="Nome do Produto..."
          style={styles.text_input}
          value={produto.nome}
          onChangeText={(e) =>
            setProduto((newProduto) => ({ ...newProduto, nome: e }))
          }
        />
        <Text>Descrição do Produto:</Text>
        <TextInput
          placeholder="Descrição do Produto..."
          style={styles.text_input}
          value={produto.descricao}
          onChangeText={(e) =>
            setProduto((newProduto) => ({ ...newProduto, descricao: e }))
          }
        />
        <Text>Preço do Produto:</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Preço do Produto..."
          style={styles.text_input}
          value={String(produto.preco)}
          onChangeText={(e) =>
            setProduto((newProduto) => ({ ...newProduto, preco: Number(e) }))
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
              updateProduto(
                dados.id,
                produto.nome,
                produto.preco,
                produto.descricao
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
