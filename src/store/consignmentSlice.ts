import {createSlice} from "@reduxjs/toolkit";

export interface ConsignmentState {
    consignment: {
      status: string;
      bundle_seria: string;
      bundle_number: string;
      consignment_seria: string;
      consignment_number: string;
      truck:{
        truck_number: string;
        truck_type: {
          truck_type_name: string;
        }
      }
      driver  : {
        first_name: string;
        second_name: string;
        middle_name: string;
        birthday: string;
        passport: string;
        role:{
          role_name: string;
        }
        company:{
          name: string;
        }
      }
    }
}

const initialState: ConsignmentState = {
    consignment: {
      status: '',
      bundle_seria: '',
      bundle_number: '',
      consignment_seria: '',
      consignment_number: '',
      truck:{
        truck_number: '',
        truck_type: {
          truck_type_name: '',
        },
      },
      driver  : {
        first_name: '',
        second_name: '',
        middle_name: '',
        birthday: '',
        passport: '',
        role:{
          role_name: '',
        },
        company:{
          name: '',
        },
      }
    }

}

const consignmentSlice = createSlice({
    name: 'consignment card',
    initialState,
    reducers: {
        setConsignmentState: (state, actions) => {
            state.consignment = actions.payload
        }
    }
})

export const {setConsignmentState} = consignmentSlice.actions;
export default consignmentSlice.reducer;
