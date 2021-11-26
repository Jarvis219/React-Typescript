import { CartModel } from 'models/cart';
import { Fragment, useEffect, useRef, useState } from 'react';
import { getToken, getUser, notifyError, notifySuccess } from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'app/hook';
import {
	CreateCart,
	ListCartUser,
	UpdateCart,
} from 'features/admin/pages/Cart/CartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { FindProduct } from 'features/admin/pages/Products/ProductSlice';

export const AddToCart = ({ product, id }: any) => {
	const dispatch = useAppDispatch();
	const carts = useAppSelector((state: any) => {
		return state.cart.current;
	});
	const [user, setUser] = useState<boolean>(false);
	const [cart, setCart] = useState<CartModel | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [checkProductCart, setCheckProductCart] = useState<boolean>(false);
	const [idCart, setIdCart] = useState<string>('');
	const [countAdd, setCountAdd] = useState<number>(0);
	const amount = useRef<number>(0);

	useEffect(() => {
		if (!getToken() || !getUser()) return;

		setUser(true);
		return () => setUser(false);
	}, []);

	useEffect(() => {
		if (!getUser()) return;
		const { _id } = getUser();
		carts.forEach((item: any) => {
			if (item.user === _id && item.product === id) {
				amount.current = item.amount;
				setIdCart(item._id);
				setCheckProductCart(true);
			}
		});

		setCart({ user: _id, product: product._id });

		return () => {
			setCheckProductCart(false);
			setCart(null);
			setIdCart('');
		};
	}, [product, user, carts, checkProductCart, id]);

	const handleAddToCart = async () => {
		setLoading(true);
		if (!user) {
			notifyError('Please login before purchasing!');
			setLoading(false);
			return;
		}
		if (!cart) return;
		const quantity = await checkAmountProduct(cart?.product);
		if (quantity <= 0 || countAdd >= quantity) {
			notifyError('The product is out of stock');
			setLoading(false);
			return;
		}
		if (!cart) {
			return;
		} else {
			if (!checkProductCart) {
				createCart(cart);
			} else {
				updateCart({ _id: idCart, amount: (amount.current += 1) });
			}
		}
		setCountAdd((pre) => pre + 1);
		setLoading(false);
	};

	const checkAmountProduct = async (id: string): Promise<number> => {
		try {
			const actionResult: any = await dispatch(FindProduct(id));
			const currentCategory = unwrapResult(actionResult);
			return currentCategory.quantity;
		} catch (error) {
			console.log(error);
			return 0;
		}
	};

	const createCart = async (data: CartModel): Promise<void> => {
		try {
			const actionResult: any = await dispatch(CreateCart(data));
			const currentCategory = unwrapResult(actionResult);
			notifySuccess(currentCategory.message + ' 👌');
		} catch (error) {
			notifyError('Add to cart failed!');
		}
	};

	const updateCart = async (data: {
		_id: string;
		amount: number;
	}): Promise<void> => {
		try {
			const actionResult: any = await dispatch(UpdateCart(data));
			const currentCategory = unwrapResult(actionResult);
			getCartUser();
			notifySuccess(currentCategory.message + ' 👌');
		} catch (error) {
			notifyError('Add to cart failed!');
		}
	};

	const getCartUser = async () => {
		try {
			const { _id } = getUser();
			await dispatch(ListCartUser(_id));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Fragment>
			<button
				disabled={loading}
				onClick={handleAddToCart}
				className='relative flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-gradient-to-r from-green-400 to-blue-500 rounded'>
				{loading && (
					<div className='flex items-center justify-center absolute top-[10px] left-1'>
						<div className='w-5 h-5 border-t-2 border-b-2 border-green-300 rounded-full animate-spin'></div>
					</div>
				)}
				ADD TO CART
			</button>
		</Fragment>
	);
};
