import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import homescreen from "./src/screens/homescreen";
import Login from "./src/screens/Login"
import NextScreen from "./src/screens/NextScreen"
import SignUp from "./src/screens/SignUp"
// import FirstScreen from "./src/screens/FirstScreen"
import MainScreen from "./src/screens/MainScreen"
import ForgotPassword from "./src/screens/ForgotPassword"
import ResultScreen from "./src/screens/ResultScreen"
import TodoScreen from "./src/screens/TodoScreen"
// import EmailForm from "./src/screens/EmailForm"


const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login">
        <Stack.Screen name="Home" component={homescreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="FirstScreen" component={FirstScreen} /> */}
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="TodoScreen" component={TodoScreen} />
        {/* <Stack.Screen name="HomeFront" component={HomeFront} /> */}
        {/* <Stack.Screen name="EmailForm" component={EmailForm} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

