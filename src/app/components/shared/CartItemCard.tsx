"use client";
import { Product } from "@/redux/feature/cartSlice"; 
import { useAppDispatch } from "@/redux/store";
import { Toaster, toast } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import { cartAction } from "@/redux/feature/cartSlice";
import { useState } from "react";
import Image from "next/image";
import { client } from "@/lib/sanityClient"; 
import imageUrlBuilder from "@sanity/image-url";

interface Props {
  cartItem: Product;
}

const CartItemCard = ({ cartItem }: Props) => {
  const [qty, setQty] = useState(cartItem.quantity);
  const dispatch = useAppDispatch();

  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
     return builder.image(source);
  }

  const handleCart = async (newQty: number) => {
    const newPrice = cartItem.price * newQty;

    try {
      if (newQty) {
        const res = await fetch(
          `/api/cart`,
          {
            method: "PUT",
            body: JSON.stringify({
              product_id: cartItem._id,
              quantity: newQty,
              price: newPrice,
            }),
          }
        );
        if (!res.ok) {
          throw new Error("Failed to update data");
        }
      } else {
        throw new Error("Failed to fetch update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    await fetch(`/api/cart?product_id=${cartItem._id}`, {
      method: "DELETE",
    });
  };

  const increament = () => {
    toast.promise(handleCart(qty + 1), {
      loading: "Increasing Product Quantity",
      success: "Product Quantity Increased",
      error: "Failed to Increased Quantity",
    });
    setQty(qty + 1);
    dispatch(cartAction.addToCart({ product: cartItem, quantity: 1 }));
  };

  const decreament = () => {
    if (cartItem.quantity > 1) {
      toast.promise(handleCart(qty - 1), {
        loading: "Decreasing Quantity",
        success: "Product quantity Decreased",
        error: "Failed to Decrease quantity",
      });
      setQty(qty - 1);
      dispatch(cartAction.decrementCartProduct(cartItem._id));
    }
  };

  const rmProduct = () => {
    toast.promise(handleDelete(), {
      loading: "Removing Product",
      success: "Product Removed",
      error: "Failed to Remove Product",
    });
    dispatch(cartAction.removeProduct(cartItem._id));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full px-5 py-7 gap-5 border-b border-gray-300 ">
      <div className="">
        <Image
          // @ts-ignore
          src={urlFor(cartItem.image).url()}
          alt={cartItem.productName}
          width={250}
          height={250}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between items-start w-full">
        <div className="flex justify-between items-center w-80 sm:w-full flex-initial">
          <h4>{cartItem.name ? cartItem.name :  cartItem.productName}</h4>
          <button onClick={rmProduct}>
            <BsTrash size={25} className="cursor-pointer" />
          </button>
        </div>
        <h5 className="font-semibold my-2 text-gray-400"> {cartItem.subcat ? cartItem.subcat : cartItem.productTypes[1] }</h5>
        <p className="flex flex-col gap-5 my-1 font-semibold text-base">
          Delivery Estimation
          <span className="text-yellow-500">5 Working Days</span>
        </p>
        <div className="flex justify-between items-center w-80 sm:w-full flex-initial">
          <div>${cartItem.price * cartItem.quantity}</div>
          <div className="flex justify-center items-center gap-5 text-2xl font-bold mt-8">
            <p>Quantity:</p>
            <button
              onClick={decreament}
              className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
            >
              -
            </button>
            {qty}
            <button
              onClick={increament}
              className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default CartItemCard;