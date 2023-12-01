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
import { getCargos } from "../src/services/api";
import { buttonDelete, buttonEdit } from "../../constants/Colors";
import { Link, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AdicionarButton from "../../components/AdicionarButton";
import { EditEmpresaContext } from "../src/context/DataContext";

interface dataProps {
  id: string;
  nome: string;
}
interface empresaProps {
  cargos: dataProps[];
}

export default function tabOne() {
  const [data, setData] = useState<empresaProps | null>(null);
  const [externalData, setExternalData] = useState<empresaProps | null>({
    cargos: [
      {
        id: "1",
        nome: "teste",
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
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>{item.nome}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Button
            title={"edi"}
            color={buttonEdit}
            onPress={() => {
              setEmpresa({ id: item.id, nome: item.nome, type: "Cargo" }),
                navigate.navigate("editar_cargo" as never);
            }}
          />
          <Button
            title={"del"}
            color={buttonDelete}
            onPress={() => {
              setEmpresa({ id: item.id, nome: item.nome, type: "Cargo" }),
                navigate.navigate("Deletar" as never);
            }}
          />
        </View>
      </View>
    );
  };
  function getData() {
    getCargos().then((res) => {
      setData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  // console.log(data?.cargos);

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
        <AdicionarButton type="Cargo" href="adicionar_cargo" />
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
          <View style={{ width: "50%" }}>
            <Text style={{ textAlign: "center" }}>Nome</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={{ textAlign: "center" }}>Ações</Text>
          </View>
        </View>
        <FlatList
          data={data?.cargos == undefined ? externalData?.cargos : data?.cargos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}
