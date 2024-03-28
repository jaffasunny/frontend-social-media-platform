"use client";

import withHeaderFooter from "@/components/HOC/withHeaderFooter";
import isNotAuth from "@/components/Auth/isNotAuth";
import Skeleton from "@/components/Skeleton";
import { usePostStore } from "@/store/postStore";
import React, { useEffect, useMemo, useState } from "react";
import TrashIcon from "@/public/icons/TrashIcon.svg";
import IconButton from "@/components/Button/IconButton";
import ForwardArrow from "@/public/icons/ForwardArrow.svg";
import { TItemType } from "@/types";
import EmptyCartGif from "@/public/gifs/emptyCartGif.gif";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type Props = {};

const Cart = (props: Props) => {
	const cart = usePostStore((state) => state.cart);
	const DecreaseCartCount = usePostStore((state) => state.decreaseCartCount);
	const isLoading = usePostStore((state) => state.loading);
	const AddToCart = usePostStore((state) => state.addToCart);
	const CompletelyRemoveItem = usePostStore(
		(state) => state.compeletelyRemoveItem
	);
	const increaseCartCount = usePostStore((state) => state.increaseCartCount);
	const setCartCount = usePostStore((state) => state.setCartCount);
	const apiResponse = usePostStore((state) => state.apiResponse) as {
		items: [];
	};
	const SingleItemRemoveFromCart = usePostStore(
		(state) => state.removeItemFromCart
	);
	const [cartItems, setCartItems] = useState<TItemType[]>([]);
	const [totalCartPrice, setTotalCartPrice] = useState(0);

	const router = useRouter();

	useEffect(() => {
		if (cart?.data[0]?.items) {
			setCartItems(cart?.data[0]?.items);
			setTotalCartPrice(cart?.data[0]?.totalPrice);
		}
	}, [cart?.data[0]?.items.length]);

	const handleAddToCart = async (
		cartId: string,
		productId: string,
		quantity: number
	) => {
		try {
			const itemToUpdateIndex = cartItems.findIndex(
				(item) => item._id === cartId
			);

			if (itemToUpdateIndex !== -1) {
				await AddToCart({ product: productId, quantity });

				if (
					cartItems[itemToUpdateIndex].quantity <=
					cartItems[itemToUpdateIndex].product.quantity
				) {
					const updatedItem = {
						...cartItems[itemToUpdateIndex],
						quantity: cartItems[itemToUpdateIndex].quantity + quantity,
					};

					// Create a new array without the old item
					const updatedState = [
						...cartItems.slice(0, itemToUpdateIndex),
						updatedItem,
						...cartItems.slice(itemToUpdateIndex + 1),
					];

					// Update the state
					setCartItems(updatedState);

					setTotalCartPrice((prev) =>
						Number(Number(prev + updatedItem.product.price).toFixed(2))
					);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveFromCart = async (cartId: string, productId: string) => {
		try {
			const itemToUpdateIndex = cartItems.findIndex(
				(item) => item._id === cartId
			);

			if (itemToUpdateIndex !== -1) {
				await SingleItemRemoveFromCart(productId);

				if (
					cartItems[itemToUpdateIndex].quantity <=
						cartItems[itemToUpdateIndex].product.quantity &&
					cartItems[itemToUpdateIndex].quantity > 1
				) {
					const updatedItem = {
						...cartItems[itemToUpdateIndex],
						quantity: cartItems[itemToUpdateIndex].quantity - 1,
					};

					// Create a new array without the old item
					const updatedState = [
						...cartItems.slice(0, itemToUpdateIndex),
						updatedItem,
						...cartItems.slice(itemToUpdateIndex + 1),
					];
					// Update the state
					setCartItems(updatedState);
					setTotalCartPrice((prev) =>
						Number(Number(prev - updatedItem.product.price).toFixed(2))
					);
				} else {
					// Create a new array without the old item
					const updatedState = [
						...cartItems.slice(0, itemToUpdateIndex),
						...cartItems.slice(itemToUpdateIndex + 1),
					];
					// Update the state
					setCartItems(updatedState);
					setTotalCartPrice((prev) =>
						Number(
							Number(prev - cartItems[itemToUpdateIndex].product.price).toFixed(
								2
							)
						)
					);
					DecreaseCartCount();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveItem = (itemId: string, productId: string) => {
		try {
			CompletelyRemoveItem(itemId, productId)
				.then((res) => {
					let previousCart = cartItems;

					if (previousCart.length > 1) {
						let updatedCart = previousCart.filter(
							(item) => item?._id !== productId
						);

						setCartItems(updatedCart);
						setCartCount(updatedCart.length);
					} else {
						setCartItems([]);
						setCartCount(0);
					}
				})
				.catch((err) => console.log(err));
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<section className='text-gray-600 body-font overflow-hidden'>
			<div className='container px-5 py-10 mx-auto'>
				{isLoading ? (
					<Skeleton />
				) : cartItems?.length > 0 ? (
					<>
						<h1 className='font-integralCF font-bold text-4xl text-black mb-2'>
							Your Cart
						</h1>

						<section className='flex gap-2 justify-between md:flex-row flex-col mt-4'>
							{/* LEFT SECTION */}
							<section className='md:w-3/5 w-full rounded-2xl border border-black/10 px-3 py-2 bg-white'>
								{cartItems?.map(({ product, quantity, _id }) => (
									<section className='p-3'>
										<div className='flex justify-between sm:flex-row sm:gap-0 gap-3 flex-col sm:h-32'>
											<span className='bg-[#F2F0F1] w-32 h-32 p-2 rounded-lg sm:self-auto self-center'>
												<img
													src={product.image || ""}
													alt={product.productName}
													className='md:w-11/12 md:h-11/12 w-full h-full object-contain mix-blend-multiply'
												/>
											</span>
											<div className='w-full h-full ml-2'>
												<div className='flex h-full justify-between'>
													<div className='flex flex-col justify-between h-full'>
														<h2 className='font-satoshi font-bold xl:text-xl lg:text-lg sm:text-base text-sm text-black'>
															{product.productName}
														</h2>

														<p className='font-satoshi font-bold text-2xl text-black'>
															${product.price}
														</p>
													</div>
													<div className='flex flex-col justify-between sm:gap-0 gap-3 items-end h-full'>
														<button
															onClick={() =>
																handleRemoveItem(
																	cart?.data[0]._id as string,
																	_id
																)
															}>
															<TrashIcon />
														</button>

														<div className='bg-[#F0F0F0] font-satoshi rounded-2xl sm:w-32 w-20 flex justify-between items-center'>
															<button
																className='xl:text-2xl lg:text-xl sm:text-base text-sm text-black w-2/6 text-center'
																onClick={() =>
																	handleRemoveFromCart(_id, product._id)
																}>
																-
															</button>
															<span className='xl:text-xl lg:text-lg sm:text-base text-sm text-black w-2/6 text-center'>
																{quantity}
															</span>
															<button
																className='xl:text-2xl lg:text-xl sm:text-base text-sm text-black w-2/6 text-center'
																onClick={() =>
																	handleAddToCart(_id, product._id, 1)
																}>
																+
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<hr className='mt-3' />
									</section>
								))}
							</section>

							{/* RIGHT SECTION */}
							<section className='md:w-2/5 w-full rounded-2xl border border-black/10 px-6 py-5 bg-white h-1/2'>
								<h2 className='font-satoshi font-bold text-2xl text-black'>
									Cart Summary
								</h2>

								{/* <div className='flex justify-between items-center mt-5'>
									<h3 className='font-satoshi font-normal text-xl text-black/60'>
										Subtotal
									</h3>
									<p className='font-satoshi font-bold text-xl text-black'>
										$565
									</p>
								</div>

								<hr className='mt-5' /> */}

								<div className='flex justify-between items-center mt-5'>
									<h3 className='font-satoshi font-normal text-xl text-black'>
										Total
									</h3>
									<p className='font-satoshi font-bold text-2xl text-black'>
										${totalCartPrice || "0"}
									</p>
								</div>

								<IconButton
									endIcon={<ForwardArrow />}
									text='Go to Checkout'
									buttonStyles='!bg-black !rounded-3xl mt-5'
									textStyles='text-white font-satoshi text-base font-medium'
								/>
							</section>
						</section>
					</>
				) : (
					<div className='flex justify-center items-center flex-col gap-3 w-full h-full'>
						<Image
							src={EmptyCartGif}
							width={100}
							height={100}
							alt='Empty Gif'
						/>
						<h1 className='font-integralCF font-bold text-2xl text-black'>
							Your cart is empty!
						</h1>
					</div>
				)}
			</div>
		</section>
	);
};

export default isNotAuth(withHeaderFooter(Cart));
