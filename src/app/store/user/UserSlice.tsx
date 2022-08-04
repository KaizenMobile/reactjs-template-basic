import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from "../Store";
import { IUserState } from '../../../models/UserInterfaceModel';

const initialState: IUserState = {
    userInfo: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            return {
                ...state,
                userInfo: action.payload
            }
        }
    }
})

export const { signIn } = userSlice.actions
export const userReducer = userSlice.reducer
export const selectUserInfo = (state: RootState) => state.user.userInfo
export default userSlice