import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filtered {
    name: string;
    values: string[];
    dates: string[];
    occurence: number;
}

export interface UploadState {
    creditCard: Filtered[];
    payment: Filtered[];
    status: "success" | "error" | "info" | "";
}

const initialState: UploadState = {
    creditCard: [],
    payment: [],
    status: "",
};

export const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        setUpload: (state, action: PayloadAction<UploadState>) => {
            state.creditCard = action.payload.creditCard;
            state.payment = action.payload.payment;
            state.status = action.payload.status;
        },
        clearUpload: (state) => {
            state.creditCard = initialState.creditCard;
            state.payment = initialState.payment;
            state.status = initialState.status;
        },
    },
});

export const { setUpload, clearUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
