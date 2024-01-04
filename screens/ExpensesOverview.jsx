import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";

const ExpensesOverview = () => {
	const BottomTabs = createBottomTabNavigator();

	return (
		<BottomTabs.Navigator>
			<BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
			<BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
		</BottomTabs.Navigator>
	);
};

const styles = StyleSheet.create({});

export default ExpensesOverview;
