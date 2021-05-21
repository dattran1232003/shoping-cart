import Button from "@material-ui/core/Button"

// Types
import { CartItemType } from "../App"

// Styles
import { Wrapper } from "./CartItem.style"

type Props = {
  item: CartItemType
  removeFromCart: (id: number) => void
  addToCart: (clickedItem: CartItemType) => void
}

const CartItem: React.FC<Props> = ({
  item,
  addToCart,
  removeFromCart,
}: Props) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>

      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>

      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={removeFromCart.bind(null, item.id)}
        >
          -
        </Button>

        {item.amount}
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={addToCart.bind(null, item)}
        >
          +
        </Button>
      </div>
    </div>

    <img src={item.image} alt={item.title} />
  </Wrapper>
)

export default CartItem
