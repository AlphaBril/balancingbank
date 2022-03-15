import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LCL {
    line: string;
    date: string;
    libelle: string;
    type: string;
    value: string;
    credit: boolean;
    info: string | null;
}

export interface UploadState {
    value: LCL[];
    status: "success" | "error" | "info" | "";
}

const initialState: UploadState = {
    value: [],
    status: "",
};

export const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        setUpload: (state, action: PayloadAction<UploadState>) => {
            state.value = action.payload.value;
            state.status = action.payload.status;
        },
        clearUpload: (state) => {
            state.value = initialState.value;
            state.status = initialState.status;
        },
    },
});

export const { setUpload, clearUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
