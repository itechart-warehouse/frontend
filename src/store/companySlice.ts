import {createSlice} from "@reduxjs/toolkit";

export interface CompanyState {
    company: {
        companyName: string;
        companyAddress: string;
        companyPhone: string;
        companyEmail: string;
    }
}

const initialState: CompanyState = {
    company: {
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        companyEmail: '',
    }

}

const companySlice = createSlice({
    name: 'user login logout',
    initialState,
    reducers: {
        setCompanyState: (state, actions) => {
            state.company = actions.payload
        }
    }
})

export const {setCompanyState} = companySlice.actions;
export default companySlice.reducer;