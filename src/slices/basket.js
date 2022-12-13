import { createSlice } from "@reduxjs/toolkit"

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        goods: []
    },
    reducers: {
        addGood(state, { payload }) {
            state.goods.push(payload)
            localStorage.setItem("basket", JSON.stringify(state.goods))
        },
        incQuantity(state, { payload }) {
            const good = state.goods.find((good) => good.id === payload)

            good.quantity++
            localStorage.setItem("basket", JSON.stringify(state.goods))
        },
        decQuantity(state, { payload }) {
            const good = state.goods.find((good) => good.id === payload)

            if (good.quantity > 1) good.quantity--
            localStorage.setItem("basket", JSON.stringify(state.goods))
        },
        removeGood(state, { payload }) {
            state.goods = state.goods.filter((good) => good.id !== payload)
            localStorage.setItem("basket", JSON.stringify(state.goods))
        },
        setBasket(state, { payload }) {
            state.goods = payload
        }
    }
})

export const selectBasketGoods = (state) => state.basket.goods

export const {
    addGood: addGoodAction,
    removeGood: removeGoodAction,
    incQuantity: incQuantityAction,
    decQuantity: decQuantityAction,
    setBasket: setBasketAction
} = basketSlice.actions

export default basketSlice.reducer
