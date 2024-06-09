import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = ({ year, month, onClose, employee, refetch }) => {
   const axiosSecure = useAxiosSecure();
   const stripe = useStripe();
   const elements = useElements();
   const [clientSecret, setClientSecret] = useState();
   const [processing, setProcessing] = useState(false);
   const { user } = useAuth();

   useEffect(() => {
      getClientSecret(employee?.salary);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [employee?.salary]);

   const getClientSecret = async (salary) => {
      const { data } = await axiosSecure.post("/create-payment-intent", {
         salary,
      });
      console.log(data);
      setClientSecret(data.clientSecret);
   };

   const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
      const employeeObj = {
         month: month,
         year: year,
         salary: employee?.salary,
         email: employee?.email,
         hrEmail: user?.email,
      };
      const { data } = await axiosSecure.post("/pay-query", employeeObj);
      console.log(data);

      if (data.message === "salary already given") {
         toast.error("Salary already given for this month");
         onClose();
         return;
      }

      setProcessing(true);

      if (!stripe || !elements) {
         // Stripe.js has not loaded yet. Make sure to disable
         // form submission until Stripe.js has loaded.
         return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);

      if (card == null) {
         return;
      }

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         console.log("[error]", error);
         toast.error(error?.message);
         setProcessing(false);
         return;
      } else {
         console.log("[PaymentMethod]", paymentMethod);
      }

      // confirm payment
      const { paymentIntent, error: cardConfirmError } =
         await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: card,
               billing_details: {
                  email: user?.email,
                  name: user?.displayName || user?.name,
               },
            },
         });

      if (cardConfirmError) {
         setProcessing(false);
         console.log(cardConfirmError.message);
         toast.error(cardConfirmError.message);
         return;
      }

      if (paymentIntent.status === "succeeded") {
         // 1. create payment info object
         const salaryInfo = {
            ...employeeObj,
            transactionId: paymentIntent.id,
            date: new Date(),
         };

         console.log(salaryInfo);

         const { data } = await axiosSecure.post("/pay", salaryInfo);

         if (data.insertedId) {
            toast.success(`SALARY PAID TO ${employee.userName.toUpperCase()}`);
            refetch();
            onClose();
         }
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <CardElement
            options={{
               style: {
                  base: {
                     fontSize: "16px",
                     color: "#424770",
                     "::placeholder": {
                        color: "#aab7c4",
                     },
                  },
                  invalid: {
                     color: "#9e2146",
                  },
               },
            }}
         />

         <div className="flex items-center px-4 py-3">
            <button
               className={`w-full px-5 py-2 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-ourPrimary hover:bg-white hover:text-ourPrimary flex justify-center items-center duration-300 tracking-widest ${
                  !month || !year ? "opacity-50 cursor-not-allowed" : ""
               }`}
               //    onClick={handlePay}
               disabled={
                  !month || !year || !stripe || !clientSecret || processing
               }
               type="submit"
            >
               PAY ${employee?.salary}
            </button>
            <button
               className="w-full px-5 py-2 relative bg-ourAsh group overflow-hidden font-medium text-white border-2 border-ourAsh mr-2 hover:border-ourAsh hover:bg-white hover:text-ourAsh flex justify-center items-center duration-300 tracking-widest"
               onClick={onClose}
            >
               CANCEL
            </button>
         </div>
      </form>
   );
};

CheckoutForm.propTypes = {
   year: PropTypes.string,
   month: PropTypes.string,
   handlePay: PropTypes.func,
   onClose: PropTypes.func.isRequired,
   refetch: PropTypes.func.isRequired,
   employee: PropTypes.object,
};

export default CheckoutForm;
