import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state of the budget app
const initialState = {
    deposit: 0,
    expense: 0,
    saving: 0,
    target: 0,
    balance: 0,
    deposits: [] as { title: string; amount: number; date: Date }[],
    expenses: [] as { title: string; amount: number; date: Date }[],
};

// Define the type for the deposit payload
type DepositPayload = {
    title: string;
    amount: number;
    date: Date; // changed from Date | null;
};

// Define the type for the expense payload
type ExpensePayload = {
    title: string;
    amount: number;
    date: Date; // changed from Date | null;
};

// Define the type for the edit payload
type EditPayload = {
    id: number;
    title?: string;
    amount?: number;
    date?: Date | null;
};

// Create the budget slice
const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        // Define the reducer for adding a deposit
        deposit(state, action: PayloadAction<DepositPayload>) {
            // Update the state with the deposit amount and title
            state.deposit += action.payload.amount;
            state.deposits.push(action.payload);
            // Update the balance with the deposit amount
            state.balance += action.payload.amount;
        },
        // Define the reducer for subtracting an expense
        expense(state, action: PayloadAction<ExpensePayload>) {
            // Update the state with the expense amount and title
            state.expense += action.payload.amount;
            state.expenses.push(action.payload);
            // Update the balance with the expense amount
            state.balance -= action.payload.amount;
        },
        // Define the reducer for saving an amount
        save(state, action: PayloadAction<number>) {
            // Update the state with the saving amount
            state.saving += action.payload;
            // Update the balance with the saving amount
            state.balance -= action.payload;
        },
        setTarget(state, action: PayloadAction<number>) {
            // Update the state with the target amount
            state.target = action.payload;
        },

        reset(state) {
            // Reset the state to the initial state
            Object.assign(state, initialState);
        },

        // Define the reducer for editing a deposit
        editDeposit(state, action: PayloadAction<EditPayload>) {
            // Find the index of the deposit to edit
            const index = action.payload.id;
            // Update the deposit with the new values
            if (action.payload.title) {
                state.deposits[index].title = action.payload.title;
            }
            if (action.payload.amount) {
                state.deposit += action.payload.amount - state.deposits[index].amount;
                state.balance += action.payload.amount - state.deposits[index].amount;
                state.deposits[index].amount = action.payload.amount;
            }
            if (action.payload.date) {
                state.deposits[index].date = action.payload.date;
            }
        },

        // Define the reducer for deleting a deposit
        deleteDeposit(state, action: PayloadAction<number>) {
            // Find the index of the deposit to delete
            const index = action.payload;
            // Update the state with the deleted deposit amount and title
            state.deposit -= state.deposits[index].amount;
            state.balance -= state.deposits[index].amount;
            // Remove the deposit from the array
            state.deposits.splice(index, 1);
        },

        // Define the reducer for editing an expense
        editExpense(state, action: PayloadAction<EditPayload>) {
            // Find the index of the expense to edit
            const index = action.payload.id;
            // Update the expense with the new values
            if (action.payload.title) {
                state.expenses[index].title = action.payload.title;
            }
            if (action.payload.amount) {
                state.expense += action.payload.amount - state.expenses[index].amount;
                state.balance -= action.payload.amount - state.expenses[index].amount;
                state.expenses[index].amount = action.payload.amount;
            }
            if (action.payload.date) {
                state.expenses[index].date = action.payload.date;
            }
        },

        // Define the reducer for deleting an expense
        deleteExpense(state, action: PayloadAction<number>) {
            // Find the index of the expense to delete
            const index = action.payload;
            // Update the state with the deleted expense amount and title
            state.expense -= state.expenses[index].amount;
            state.balance += state.expenses[index].amount;
            // Remove the expense from the array
            state.expenses.splice(index, 1);
        },
    },
});

export const { deposit, expense, save, setTarget, reset, editDeposit, deleteDeposit, editExpense, deleteExpense } = budgetSlice.actions;
export default budgetSlice.reducer;
