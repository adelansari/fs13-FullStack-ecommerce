import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";

export default function Orders() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    useEffect(() => {
        agent.Orders.list()
            .then((orders) => setOrders(orders))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message="Loading orders..." />;

    if (selectedOrderNumber > 0) return <OrderDetailed order={orders?.find((o) => o.id === selectedOrderNumber)!} setSelectedOrder={setSelectedOrderNumber} />;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ bgcolor: "salmon", fontWeight: "bold" }}>
                    <TableRow>
                        <TableCell align="center">Order #</TableCell>
                        <TableCell align="center">Order Date</TableCell>
                        <TableCell align="center">Order Status</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Order Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        // Add hover effect to the whole row
                        <TableRow key={order.id} className="table-row">
                            <TableCell align="center">
                                {order.id}
                            </TableCell>
                            <TableCell align="center">{order.orderDate.split("T")[0]}</TableCell>
                            <TableCell align="center">{order.orderStatus}</TableCell>
                            <TableCell align="center">{currencyFormat(order.total)}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => setSelectedOrderNumber(order.id)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
