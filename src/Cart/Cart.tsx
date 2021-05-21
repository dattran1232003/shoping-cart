import CartItem from '../CartItem/CartItem'

// Types
import { CartItemType } from '../App'

// Styles
import { Wrapper } from './Cart.styles'

type Props = {
  cartItems: CartItemType[]
  removeFromCart: (id: number) => void
  addToCart: (clickedItem: CartItemType) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }: Props) => {
  return (
    <Wrapper>
      { cartItems.length === 0
        ? <p>No items in cart</p>
        : cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        )) 
      }
    </Wrapper>
  )
}

export default Cart
