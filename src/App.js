import { useState } from 'react'

import CartProvider from './storage/CartProvider'

import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
import Meals from './components/Meals/Meals'

const App = () => {
	const [cartIsVisible, setCartIsVisible] = useState(false)

	const showCartHandler = () => {
		setCartIsVisible(true)
	}

	const hideCartHandler = () => {
		setCartIsVisible(false)
	}

	return (
		<CartProvider>
			{cartIsVisible && <Cart onClose={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	)
}

export default App
