import { Button, FlatList, ListRenderItem } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "../../components/Themed";
import { useContext, useEffect } from "react";
import { Text } from "../../components/Themed";
import { getEmpresa } from "../src/services/api";
import { buttonDelete, buttonEdit } from "../../constants/Colors";
import { Link, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AdicionarButton from "../../components/AdicionarButton";
import { DataLocal } from "../../constants/data";

import { useState } from "react";
import { EditEmpresaContext } from "../src/context/DataContext";

interface dataProps {
  id: string;
  nome: string;
}
interface empresaProps {
  empresas: dataProps[];
}

export default function tabOne() {
  const [data, setData] = useState<empresaProps | null>(null);
  const [externalData, setExternalData] = useState<empresaProps | null>({
    empresas: [
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
  // END: ed8c6549bwf9
  const renderItem: ListRenderItem<dataProps> = ({ item }) => {
    return (
      <>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ width: "50%" }}>
            <Text style={{ textAlign: "center" }}>
              {item.nome} - {item.id}
            </Text>
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
              title={"Edi"}
              color={buttonEdit}
              onPress={() => {
                setEmpresa({ id: item.id, nome: item.nome, type: "Empresa" }),
                  navigate.navigate("editar_empresa" as never);
              }}
            />
            <Button
              title={"Del"}
              color={buttonDelete}
              onPress={() => {
                setEmpresa({ id: item.id, nome: item.nome, type: "Empresa" }),
                  navigate.navigate("Deletar" as never);
              }}
            />
          </View>
        </View>
      </>
    );
  };
  function getData() {
    getEmpresa().then((res) => {
      setData(res.data.data);
    });
  }
  useEffect(() => {
  getData();
  }, []);
  // console.log(data?.empresas);

  return (
    <View style={{ height: "100%", maxWidth: "100%", width: "100%" }}>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <Button title="ref" onPress={() => {getData()}} />
        <AdicionarButton type="Empresa" href="adicionar_empresa" />
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
          data={
            data?.empresas == undefined
              ? externalData?.empresas
              : data?.empresas
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}
