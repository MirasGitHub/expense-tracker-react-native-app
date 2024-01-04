import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();

	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		const getExpenses = async () => {
			try {
				const expenses = await fetchExpenses();

				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError("Could not fetch expenses");
			}
			setIsFetching(false);
		};

		getExpenses();
	}, []);

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	if (error && !isFetching) {
		return <ErrorOverlay message={error} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod="Last 7 Days"
			fallbackText="No expenses registered for the last 7 days"
		/>
	);
};

const styles = StyleSheet.create({});

export default RecentExpenses;
