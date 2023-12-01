import { Link, useNavigation } from "@react-navigation/native";
import {Button} from "react-native";
import { buttonToCancel } from "../constants/Colors";
export function BackToHome() {
  const navigate = useNavigation();
  const navegar = () => {
    navigate.navigate("index" as never);
  }
  return (
    <>
      {/* <Link to={"/"}> */}
        <Button title="Cancelar" color={buttonToCancel} onPress={navegar} />
      {/* </Link> */}
    </>
  );
}
