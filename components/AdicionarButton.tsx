import { StatusBar } from "expo-status-bar";
import { Platform, Button } from "react-native";
import { View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { buttonToAdd } from "../constants/Colors";
import { EditEmpresaContext } from "../app/src/context/DataContext";
import { useContext } from "react";
interface props {
  type?: string
  href?: string
}
export default function AdicionarButton({type,href}: props) {
  const navigate = useNavigation();
  const {setEmpresa} = useContext(EditEmpresaContext) as {setEmpresa: any};
  return (
    <View style={{ display: "flex", alignItems: "flex-end", margin: 10 }}>
      <View style={{ display: "flex" }}>
        <Button
          title="Add"
          color={buttonToAdd}
          onPress={() => {setEmpresa({type: type }),navigate.navigate(href as never)}}
        />
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
