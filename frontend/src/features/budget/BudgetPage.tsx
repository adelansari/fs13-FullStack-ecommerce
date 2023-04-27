import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, Paper, IconButton, LinearProgress, Box, Divider, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { deposit, expense, save, setTarget, reset, editDeposit, deleteDeposit, editExpense, deleteExpense } from "./budgetSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DatePickerProps } from "@mui/lab/DatePicker";
import { DatePicker, DatePickerProps } from "@mui/lab";

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

// Define a custom date format for the date picker
const dateFormat = (date: Date | null) => {
    if (date) {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    } else {
        return "";
    }
};

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
            <Typography className="animatedTitle" variant="h6">
                {title}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <StyledPaper>
                        <Typography variant="h6" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            Deposit
                        </Typography>
                        <Divider />
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
                                                {deposit.title}: €{deposit.amount} ({dateFormat(deposit.date)})
                                            </Typography>{" "}
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
                        <Typography variant="h6" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            Expense
                        </Typography>
                        <Divider />
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
                                                {expense.title}: €{expense.amount} ({dateFormat(expense.date)})
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
                </Grid>
                <Grid item xs={3}>
                    <StyledPaper>
                        <Typography variant="h6" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            Saving
                        </Typography>
                        <Divider />
                        <Form noValidate autoComplete="off">
                            <Input label="Amount" type="number" value={savingAmount} onChange={handleSavingAmountChange} />
                            <StyledButton variant="contained" color="primary" onClick={handleSaveClick}>
                                Save
                            </StyledButton>
                        </Form>
                        <Typography variant="body1">
                            Total saving: €<span style={{ color: "orange" }}>{state.saving}</span>
                        </Typography>
                    </StyledPaper>
                    <StyledPaper>
                        <Typography variant="h6" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            Target
                        </Typography>
                        <Divider />
                        <Form noValidate autoComplete="off">
                            <Input label="Amount" type="number" value={targetAmount} onChange={handleTargetAmountChange} />
                            <StyledButton variant="contained" color="primary" onClick={handleTargetClick}>
                                Set
                            </StyledButton>
                        </Form>
                        <Typography variant="body1">
                            Target: €<span style={{ color: "orange" }}>{state.target}</span>
                        </Typography>
                    </StyledPaper>

                    <StyledPaper>
                        <Typography variant="h6" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            Progress
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "100%", mr: 1 }}>
                                <LinearProgress variant="determinate" value={(state.saving / state.target) * 100} sx={{ height: 10 }} />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${Math.round((state.saving / state.target) * 100)}%`}</Typography>
                            </Box>
                        </Box>
                        {state.saving >= state.target ? (
                            <Typography variant="body1" color="primary">
                                Congratulations! You have reached your saving goal! 🎉
                            </Typography>
                        ) : (
                            <Typography variant="body1" color="error">
                                You still need €{state.target - state.saving} to reach your saving goal. Keep it up! 💪
                            </Typography>
                        )}
                    </StyledPaper>
                </Grid>
                <Grid item xs={3}>
                    <StyledPaper>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                Balance
                            </Typography>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body1">
                                    Total deposit: €<span style={{ color: "orange" }}>{state.deposit}</span>
                                </Typography>
                                <Typography variant="body1">
                                    Total expense: €<span style={{ color: "orange" }}>{state.expense}</span>
                                </Typography>
                                <Typography variant="body1">
                                    Balance: €<span style={{ color: "orange" }}>{state.balance}</span>
                                </Typography>
                            </Box>
                        </Box>
                    </StyledPaper>
                    <StyledButton variant="contained" color="warning" onClick={handleResetClick}>
                        Reset
                    </StyledButton>
                </Grid>
                <Grid item xs={3}>
                    <StyledPaper sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h6">Pie Chart for Deposits</Typography>
                        <Divider />
                        <Chart width={300} height={300}>
                            <Pie dataKey="amount" nameKey="title" isAnimationActive={false} data={state.deposits} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                                {state.deposits.map((entry, index) => (
                                    <Cell key={`cell-${depositTitle}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
                            <Tooltip formatter={(value) => `${value}`} />
                        </Chart>
                    </StyledPaper>
                    <StyledPaper sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h6">Pie Chart for Expenses</Typography>
                        <Divider />
                        <Chart width={300} height={300}>
                            <Pie dataKey="amount" nameKey="title" isAnimationActive={false} data={state.expenses} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                                {state.expenses.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
                            <Tooltip formatter={(value) => `${value}`} />
                        </Chart>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Root>
    );
};

export default BudgetPage;