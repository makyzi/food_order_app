import { useReducer } from 'react'

import CartContext from './cart-context'

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

const cartReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.ADD_ITEM: {
			const updatedTotalAmount =
				state.totalAmount + action.payload.price * action.payload.amount

			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			)

			const existingCartItem = state.items[existingCartItemIndex]

			let updatedItem
			let updatedItems = []

			if (existingCartItem) {
				updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.payload.amount,
				}
				updatedItems = [...state.items]
				updatedItems[existingCartItemIndex] = updatedItem
			} else {
				updatedItems = [...state.items, action.payload]
			}

			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			}
		}
		case ACTIONS.REMOVE_ITEM:
			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.payload
			)

			const existingItem = state.items[existingCartItemIndex]

			const updatedTotalAmount = state.totalAmount - existingItem.price

			let updatedItems

			if (existingItem.amount === 1) {
				updatedItems = state.items.filter(
					(item) => item.id !== action.payload
				)
			} else {
				const updatedItem = {
					...existingItem,
					amount: existingItem.amount - 1,
				}
				updatedItems = [...state.items]
				updatedItems[existingCartItemIndex] = updatedItem
			}

			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			}

		case ACTIONS.CLEAR:
			return defaultCartState
		default:
			return defaultCartState
	}
}

const ACTIONS = {
	ADD_ITEM: 'ADD_ITEM',
	REMOVE_ITEM: 'REMOVE_ITEM',
	CLEAR: 'CLEAR',
}

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	)
	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: ACTIONS.ADD_ITEM, payload: item })
	}

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: ACTIONS.REMOVE_ITEM, payload: id })
	}

	const clearCartHandler = () => {
		dispatchCartAction({ type: 'CLEAR' })
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	}

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartProvider
