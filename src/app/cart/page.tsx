"use client";
//import CartItemCard from "../components/shared/CartItemCard";
import Wrapper from "../components/Wrapper";
//import { useAppSelector } from "@/redux/store";
import { BiShoppingBag } from "react-icons/bi";
//import { selectIsLoading } from "@/redux/features/cartSlice";
//import StripeCheckOutButton from "@/components/sections/CheckOut";
import StartShopping from "../components/shared/StartShopping"; 
import { Toaster, toast } from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import CartItemCard from "../components/shared/CartItemCard";
import StripeCheckOutButton from "../components/shared/CheckOut";
// const CartDataLoadingFromApi = () => {
//   return (
//     <Wrapper>
//       <div className="flex justify-center items-center w-full h-40">
//         <h1>Loading Data</h1>
//       </div>
//     </Wrapper>
//   );
// };

// const LoadedCartData = () => {
const CartPage = () => {    
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalAmount);
  

if (cartItems.length > 0) {
    return (
      <Wrapper>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h3>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-x-5 px-5">
          <div className="basis-3/4">
            {cartItems.map((elm) => (
              <CartItemCard key={elm._id} cartItem={elm} />
            ))}
          </div>
          <div className="basis-1/4 bg-gray-200 rounded-md w-full h-full  mt-5 sm:mt-0 p-2 self-start">
            <div className="flex flex-col items-center justify-between gap-5  border border-gray-300 p-7 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800">Order Summary</h4>
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-between items-center w-full">
                  <p className="text-gray-800">Quantity</p>
                </div>
                <div>
                  <p className="text-gray-800">{totalItems}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p>Total Amount</p>
                </div>
                <div>
                  <p>${totalPrice}</p>
                </div>
              </div>
              <div>
                
                {/* <StripeCheckOutButton />  */}
                <StripeCheckOutButton products={cartItems} /> 
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h3>

        <div className="flex flex-col w-full gap-10 h-full justify-center items-center">
          <BiShoppingBag size={200} />
          <h1>Your shopping bag is empty</h1>
          <StartShopping  />
        </div>
      </Wrapper>
    );
  }
};

// const CartPage = () => {
//   const isLoading = useAppSelector(selectIsLoading);

//   return <>{isLoading ? <CartDataLoadingFromApi /> : <LoadedCartData />}</>;
// };

export default CartPage;