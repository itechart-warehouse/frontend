import {createSlice} from "@reduxjs/toolkit";

export interface CompanyState {
    company: {
        companyName: string;
        companyAddress: string;
        companyPhone: string;
        companyEmail: string;
        active: boolean;
    }
}

const initialState: CompanyState = {
    company: {
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        companyEmail: '',
        active: false
    }

}

const companySlice = createSlice({
    name: 'company card',
    initialState,
    reducers: {
        setCompanyState: (state, actions) => {
            state.company = actions.payload
        }
    }
})

export const {setCompanyState} = companySlice.actions;
export default companySlice.reducer;