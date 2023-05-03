import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe("pk_test_51N16a4DnDwuQYbaH8CfjBTIWAVB9UOpoxlzV2unVJXtYG8GhqKmCKkVItNv4OVqk1DXI2DO686g4Z2auZEjD6oBm00OrlJw2TZ");

export default function CheckoutWrapper() {
    // const dispatch = useAppDispatch();
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     agent.Payments.createPaymentIntent()
    //         .then((response) => dispatch(setBasket(response)))
    //         .catch((error) => console.log(error))
    //         .finally(() => setLoading(false));
    // }, [dispatch]);

    // if (loading) return <LoadingComponent message="Loading checkout" />;

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    );
}
