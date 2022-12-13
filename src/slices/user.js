import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
        token: null
    },
    reducers: {
        setUserInfo(state, { payload }) {
            state.userInfo = payload
        },
        setToken(state, { payload }) {
            state.token = payload
        }
    }
})

export const selectUserInfo = (state) => state.user.userInfo
export const selectToken = (state) => state.user.token

export const { setToken: setTokenAction, setUserInfo: setUserInfoAction } =
    userSlice.actions

export default userSlice.reducer
