import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "../../components/Themed";
import { useContext, useEffect, useState } from "react";
import { Text } from "../../components/Themed";
import { getEmpresa, getFuncionarios, getProdutos } from "../src/services/api";
import { buttonDelete, buttonEdit } from "../../constants/Colors";
import { Link, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AdicionarButton from "../../components/AdicionarButton";
import { EditEmpresaContext } from "../src/context/DataContext";

interface dataProps {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
}
interface empresaProps {
  produtos: dataProps[];
}

export default function tabOne() {
  const [data, setData] = useState<empresaProps | null>(null);
  const [externalData, setExternalData] = useState<empresaProps | null>({
    produtos: [
      {
        id: "1",
        nome: "teste",
        preco: 1000,
        descricao: "teste",
      },
    ],
  });
  const navigate = useNavigation();
  const { dados, setEmpresa } = useContext(EditEmpresaContext) as {
    dados: any;
    setEmpresa: any;
  };
  const renderItem: ListRenderItem<dataProps> = ({ item }) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View style={{ width: "25%" }}>
          <Text style={{ textAlign: "center" }}>{item.nome}</Text>
        </View>
        <View style={{ width: "25%" }}>
          <Text style={{ textAlign: "center" }}>{item.preco}</Text>
        </View>
        <View style={{ width: "25%" }}>
          <Text style={{ textAlign: "center" }}>{item.descricao}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Button
            title={"edi"}
            color={buttonEdit}
            onPress={() => {
              setEmpresa({
                id: item.id,
                nome: item.nome,
                preco: Number(item.preco),
                descricao: item.descricao,
                type: "Produto",
              }),
                navigate.navigate("editar_produto" as never);
            }}
          />
          <Button
            title={"del"}
            color={buttonDelete}
            onPress={() => {
              setEmpresa({ id: item.id, nome: item.nome, type: "Produto" }),
                navigate.navigate("Deletar" as never);
            }}
          />
        </View>
      </View>
    );
  };
  function getData() {
    getProdutos().then((res) => {
      setData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data?.produtos);

  return (
    <View style={{ height: "100%", maxWidth: "100%", width: "100%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          title="ref"
          onPress={() => {
            getData();
          }}
        />
        {/* <AdicionarButton type="Empresa" href="adicionar_empresa" /> */}
        <AdicionarButton type="Produto" href="adicionar_produto" />
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ width: "25%" }}>
            <Text style={{ textAlign: "center" }}>Nome</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={{ textAlign: "center" }}>Preço</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={{ textAlign: "center" }}>Descrição</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={{ textAlign: "center" }}>Ações</Text>
          </View>
        </View>
        <FlatList
          data={
            data?.produtos == undefined
              ? externalData?.produtos
              : data?.produtos
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}
