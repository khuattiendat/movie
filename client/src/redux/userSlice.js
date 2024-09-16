import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    id: "",
    full_name: "",
    phone: "",
    role: "",
    email: "",
    token: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action?.payload?.id
            state.name = action?.payload?.name
            state.phone = action?.payload?.phone
            state.role = action?.payload?.role
            state.email = action?.payload?.email
            state.token = action?.payload?.token
        },
        logout: (state, action) => {
            state.id = ""
            state.name = ""
            state.phone = ""
            state.role = ""
            state.socketConnection = null
        },
    },
})

// Action creators are generated for each case reducer function
export const {setUser, logout, setOnlineUser, setSocketConnection} = userSlice.actions

export default userSlice.reducer