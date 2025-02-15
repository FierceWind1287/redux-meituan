//编写store
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    foodsList: [],
    activeIndex: 0,
    cartList: []
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload
    },
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload
    },
    addCart(state, action) {
      const items = state.cartList.find(i => i.id === action.payload.id)
      if (items) {
        items.count++
      }
      else {
        state.cartList.push(action.payload)
        //这里可以用push因为createSlice内部使用了 Immer 库，它可以自动处理不可变性
      }//payload 可以接受不同类型的数据,对象，数字等均可
    },
    increCount(state, action) {
      const item = state.cartList.find(i => i.id === action.payload.id)
      item.count++
    },
    decreCount(state, action) {
      const item = state.cartList.find(i => i.id === action.payload.id)
      if (item.count - 1 === 0) {
        state.cartList = state.cartList.filter(i => i.id !== item.id)
        return
      }
      item.count--

    },
    clearCart(state) {
      state.cartList = []
    }
  }
})

const { setFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart } = foodsStore.actions
const reducer = foodsStore.reducer

const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway')
    dispatch(setFoodsList(res.data))
  }
}

export { fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart }
export default reducer
//reducer后面除了在configureStore用到之外，几乎没用了
//后续在react中修改状态主要靠dispatch(setFoodsList()))来实现