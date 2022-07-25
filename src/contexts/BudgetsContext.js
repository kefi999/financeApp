import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid"; //generates good ids
import useLocalStorage from "../hooks/useLocalStorage"; //necessary for use local storage store info about the website

//create/using the createContext hook that's used when sharing variables is wanted
const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

//cool way of invoking the useContext hook
export function useBudgets() {
  return useContext(BudgetsContext);
}

//here children represent everything that's passed from <App/> etc...
export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  //takes in the budgetID,compare if the expenses id and the passed in id are the same, if yes return needed expenses
  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    //from AddBudgetModal we get name,max that are used in setBudgets,we compare to check if the existing budget already exists with the same name
    //if it does we just return previousBudgets, so pretty much nothing happens.(useEffect in useLocalStorage does not get triggered just yet)
    //if the passed name is new, we return all the previous Budgets and the new budget with an added id value, since we added a newBudget(which in useLocalStorage is presented as defaultValue
    //it triggers the useEffect hook that ads it to the local storage.)
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  //here we return the BudgetsContext.Provider because we're using the useContext hook and we need to use it like this, value will store all the shared value,functions
  //lastly children are everything placed in <App/> (so app and all components used there will be able to share and use these thingies.)
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
