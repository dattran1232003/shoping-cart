import { useState } from "react"
import { useQuery } from "react-query"

// Components
import Item from "./Item/Item"
import Cart from "./Cart/Cart"
import Grid from "@material-ui/core/Grid"
import Badge from "@material-ui/core/Badge"
import Drawer from "@material-ui/core/Drawer"
import LinearProgress from "@material-ui/core/LinearProgress"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"

// Styles
import { Wrapper, StyledButton } from "./App.styles"

// Types
export type CartItemType = {
  id: number
  title: string
  price: number

  category: string
  description: string

  image: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json()

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  )
  console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType): void => {
    setCartItems((prev: CartItemType[]) => {
      // 1. Is the item already added in cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)

      return !isItemInCart
        ? prev.concat({ ...clickedItem, amount: clickedItem.amount || 1 })
        : prev.map((item) =>
            item.id === clickedItem.id
              ? { ...item, amount: item.amount + 1 }
              : item
          )
    })
  }

  const handleRemoveFromCart = (id: number): void => {
    setCartItems((carts: CartItemType[]) => {
      return carts.flatMap((item) => {
        if (item.id !== id) return item
        return item.amount === 1
          ? [] // delete if last item
          : // not delete, just decrease item amount
            [{ ...item, amount: item.amount - 1 }]
      })
    })
  }

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={setCartOpen.bind(null, false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={setCartOpen.bind(null, true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map((item: CartItemType) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default App
