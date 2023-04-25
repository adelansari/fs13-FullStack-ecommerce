import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, Paper, IconButton, LinearProgress } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { deposit, expense, save, setTarget, reset, editDeposit, deleteDeposit, editExpense, deleteExpense } from "./budgetSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "@mui/lab/DatePicker";
import { DatePickerProps } from "@mui/lab";

// Define the types for the state and the props
type State = {
    budget: {
        deposit: number;
        expense: number;
        saving: number;
        target: number;
        balance: number;
        deposits: { title: string; amount: number; date: Date }[];
        expenses: { title: string; amount: number; date: Date }[];
    };
};

type Props = {
    title?: string;
};

// Define the colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Define the styles for the components
const Root = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 600,
}));

const Form = styled("form")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
}));

const Input = styled(TextField)({
    width: 100,
});

const StyledButton = styled(Button)({
    width: 100,
});

const Chart = styled(PieChart)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const List = styled("ul")(({ theme }) => ({
    listStyleType: "none",
    padding: 0,
}));

const ListItem = styled("li")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

// Define the main component
const BudgetPage = ({ title }: Props) => {
    // Use the state and the dispatch from Redux
    const state = useSelector((state: State) => state.budget);
    const dispatch = useDispatch();

    // Use the local state for the input fields
    const [depositTitle, setDepositTitle] = React.useState("");
    const [depositAmount, setDepositAmount] = React.useState("");
    const [depositDate, setDepositDate] = React.useState<Date>(new Date()); // Changed from Date | null
    const [expenseTitle, setExpenseTitle] = React.useState("");
    const [expenseAmount, setExpenseAmount] = React.useState("");
    const [expenseDate, setExpenseDate] = React.useState<Date>(new Date()); // Changed from Date | null
    const [savingAmount, setSavingAmount] = React.useState("");
    const [targetAmount, setTargetAmount] = React.useState("");

    // Use the local state for editing mode
    const [editingDepositId, setEditingDepositId] = React.useState<number | null>(null);
    const [editingExpenseId, setEditingExpenseId] = React.useState<number | null>(null);

    // Handle the input changes
    const handleDepositTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepositTitle(event.target.value);
    };

    const handleDepositAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepositAmount(event.target.value);
    };

    const handleDepositDateChange = (date: Date | null) => {
        if (date) {
            setDepositDate(date); // Added a null check
        }
    };

    const handleExpenseTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseTitle(event.target.value);
    };

    const handleExpenseAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseAmount(event.target.value);
    };

    const handleExpenseDateChange = (date: Date | null) => {
        if (date) {
            setExpenseDate(date); // Added a null check
        }
    };

    const handleSavingAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSavingAmount(event.target.value);
    };

    const handleTargetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetAmount(event.target.value);
    };

    // Handle the button clicks
    const handleDepositClick = () => {
        dispatch(deposit({ title: depositTitle, amount: +depositAmount, date: depositDate }));
        setDepositTitle("");
        setDepositAmount("");
        setDepositDate(new Date());
    };

    const handleExpenseClick = () => {
        dispatch(expense({ title: expenseTitle, amount: +expenseAmount, date: expenseDate }));
        setExpenseTitle("");
        setExpenseAmount("");
        setExpenseDate(new Date());
    };

    const handleSaveClick = () => {
        dispatch(save(+savingAmount));
        setSavingAmount("");
    };

    const handleTargetClick = () => {
        dispatch(setTarget(+targetAmount));
        setTargetAmount("");
    };

    const handleResetClick = () => {
        dispatch(reset());
    };

    const handleEditDepositClick = (id: number) => {
        setEditingDepositId(id);
    };

    const handleEditExpenseClick = (id: number) => {
        setEditingExpenseId(id);
    };

    const handleDeleteDepositClick = (id: number) => {
        dispatch(deleteDeposit(id));
    };

    const handleDeleteExpenseClick = (id: number) => {
        dispatch(deleteExpense(id));
    };

    // Render the component
    return (
        <Root>
            <Typography variant="h4">{title}</Typography>
            <StyledPaper>
                <Typography variant="h6">Deposit</Typography>
                <Form noValidate autoComplete="off">
                    <Input label="Title" value={depositTitle} onChange={handleDepositTitleChange} />
                    <Input label="Amount" type="number" value={depositAmount} onChange={handleDepositAmountChange} />
                    <DatePicker label="Date" value={depositDate} onChange={handleDepositDateChange} renderInput={(params: DatePickerProps<unknown>) => <TextField {...params} />} />
                    {/* Added type annotation for params */}
                    <StyledButton variant="contained" color="primary" onClick={handleDepositClick}>
                        Add
                    </StyledButton>
                </Form>
                <List>
                    {state.deposits.map((deposit, index) => (
                        <ListItem key={index}>
                            {editingDepositId === index ? (
                                <Form noValidate autoComplete="off">
                                    <Input label="Title" value={deposit.title} onChange={(event) => dispatch(editDeposit({ id: index, title: event.target.value }))} />
                                    <Input label="Amount" type="number" value={deposit.amount} onChange={(event) => dispatch(editDeposit({ id: index, amount: +event.target.value }))} />
                                    <DatePicker
                                        label="Date"
                                        value={deposit.date}
                                        onChange={(date: Date | null) => date && dispatch(editDeposit({ id: index, date: date }))}
                                        renderInput={(params: DatePickerProps<unknown>) => <TextField {...params} />}
                                    />
                                    <StyledButton variant="contained" color="primary" onClick={() => setEditingDepositId(null)}>
                                        Save
                                    </StyledButton>
                                </Form>
                            ) : (
                                <>
                                    <Typography variant="body1">
                                        {deposit.title}: {deposit.amount} ({deposit.date.toLocaleDateString()})
                                    </Typography>
                                    <IconButton onClick={() => handleEditDepositClick(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteDepositClick(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h6">Expense</Typography>
                <Form noValidate autoComplete="off">
                    <Input label="Title" value={expenseTitle} onChange={handleExpenseTitleChange} />
                    <Input label="Amount" type="number" value={expenseAmount} onChange={handleExpenseAmountChange} />
                    <DatePicker label="Date" value={expenseDate} onChange={handleExpenseDateChange} renderInput={(params: DatePickerProps<unknown>) => <TextField {...params} />} />
                    <StyledButton variant="contained" color="secondary" onClick={handleExpenseClick}>
                        Subtract
                    </StyledButton>
                </Form>
                <List>
                    {state.expenses.map((expense, index) => (
                        <ListItem key={index}>
                            {editingExpenseId === index ? (
                                <Form noValidate autoComplete="off">
                                    <Input label="Title" value={expense.title} onChange={(event) => dispatch(editExpense({ id: index, title: event.target.value }))} />
                                    <Input label="Amount" type="number" value={expense.amount} onChange={(event) => dispatch(editExpense({ id: index, amount: +event.target.value }))} />
                                    <DatePicker
                                        label="Date"
                                        value={expense.date}
                                        onChange={(date: Date | null) => date && dispatch(editExpense({ id: index, date: date }))}
                                        renderInput={(params: DatePickerProps<unknown>) => <TextField {...params} />}
                                    />
                                    <StyledButton variant="contained" color="primary" onClick={() => setEditingExpenseId(null)}>
                                        Save
                                    </StyledButton>
                                </Form>
                            ) : (
                                <>
                                    <Typography variant="body1">
                                        {expense.title}: {expense.amount} ({expense.date.toLocaleDateString()})
                                    </Typography>
                                    <IconButton onClick={() => handleEditExpenseClick(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteExpenseClick(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h6">Saving</Typography>
                <Form noValidate autoComplete="off">
                    <Input label="Amount" type="number" value={savingAmount} onChange={handleSavingAmountChange} />
                    <StyledButton variant="contained" color="primary" onClick={handleSaveClick}>
                        Save
                    </StyledButton>
                </Form>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h6">Target</Typography>
                <Form noValidate autoComplete="off">
                    <Input label="Amount" type="number" value={targetAmount} onChange={handleTargetAmountChange} />
                    <StyledButton variant="contained" color="primary" onClick={handleTargetClick}>
                        Set
                    </StyledButton>
                </Form>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h6">Balance</Typography>
                <Typography variant="body1">Total deposit: {state.deposit}</Typography>
                <Typography variant="body1">Total expense: {state.expense}</Typography>
                <Typography variant="body1">Balance: {state.balance}</Typography>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h6">Pie Chart for Deposits</Typography>
                <Chart width={400} height={400}>
                    <Pie dataKey="amount" isAnimationActive={false} data={state.deposits} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                        {state.deposits.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}`} />
                </Chart>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h6">Pie Chart for Expenses</Typography>
                <Chart width={400} height={400}>
                    <Pie dataKey="amount" isAnimationActive={false} data={state.expenses} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                        {state.expenses.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}`} />
                </Chart>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h6">Progress</Typography>
                {state.saving >= state.target ? (
                    <Typography variant="body1" color="primary">
                        Congratulations! You have reached your saving goal! 🎉
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body1" color="error">
                            You still need {state.target - state.saving} to reach your saving goal. Keep it up! 💪
                        </Typography>
                        <LinearProgress variant="determinate" value={(state.saving / state.target) * 100} />
                    </>
                )}
            </StyledPaper>
            <StyledButton variant="contained" color="inherit" onClick={handleResetClick}>
                Reset
            </StyledButton>
        </Root>
    );
};

export default BudgetPage;
