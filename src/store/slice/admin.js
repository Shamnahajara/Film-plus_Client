import { createSlice } from "@reduxjs/toolkit";

export const Admin = createSlice({
    name:'adminAuth',
    initialState:{
        name : null,
        token: null,
        role : null,
    },
    reducers :{
        adminLogin:(state,action)=>{
            state.name = action.payload.name,
            state.role = action.payload.role,
            state.token = action.payload.token
        },

        adminLogout:(state,action)=>{
            state.name = null,
            state.role = null,
            state.token = null

        }
    }
})

export const {adminLogin,adminLogout} = Admin.actions;
export default Admin.reducer