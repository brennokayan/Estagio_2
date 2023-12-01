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
import { getEmpresa, getFuncionarios } from "../src/services/api";
import { buttonDelete, buttonEdit } from "../../constants/Colors";
import { Link, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AdicionarButton from "../../components/AdicionarButton";
import { EditEmpresaContext } from "../src/context/DataContext";

interface dataProps {
  id: string;
  nome: string;
  empresa: {
    id: string;
    nome: string;
  };
  cargo: {
    id: string;
    nome: string;
  };
}
interface empresaProps {
  funcionarios: dataProps[];
}

export default function tabOne() {
  const [data, setData] = useState<empresaProps | null>(null);

  const [externalData, setExternalData] = useState<empresaProps | null>({
    funcionarios: [
      {
        id: "1",
        nome: "teste",
        cargo: { id: "1", nome: "teste cargo" },
        empresa: { id: "1", nome: "teste empresa" },
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
          <Text style={{ textAlign: "center" }}>{item.empresa.nome}</Text>
        </View>
        <View style={{ width: "25%" }}>
          <Text style={{ textAlign: "center" }}>{item.cargo.nome}</Text>
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
                empresaId: item.empresa.id,
                cargoId: item.cargo.id,
                type: "Funcionário",
              }),
                navigate.navigate("editar_funcionario" as never);
            }}
          />
          <Button
            title={"del"}
            color={buttonDelete}
            onPress={() => {
              setEmpresa({ id: item.id, nome: item.nome, type: "Funcionário" }),
                navigate.navigate("Deletar" as never);
            }}
          />
        </View>
      </View>
    );
  };
  function getData() {
    getFuncionarios().then((res) => {
      setData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

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
        <AdicionarButton type="Funcionário" href="adicionar_funcionario" />
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
            <Text style={{ textAlign: "center" }}>Empresa</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={{ textAlign: "center" }}>Cargo</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={{ textAlign: "center" }}>Ações</Text>
          </View>
        </View>
        <FlatList
          data={
            data?.funcionarios == undefined
              ? externalData?.funcionarios
              : data?.funcionarios
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}
