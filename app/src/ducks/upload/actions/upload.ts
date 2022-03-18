import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { AppDispatch, RootState } from "src/store/configure";
import {
    setUpload,
    clearUpload,
    UploadState,
} from "src/ducks/upload/uploadSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MessageState, setMessage } from "src/ducks/message/messageSlice";

const PORT = 3001;
const ADDRESS = "localhost";
const PROTOCOL = "http";
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const UPLOAD_ENDPOINT = "/api/upload";

const testUpload = (dispatch: AppDispatch, res: AxiosResponse) => {
    const upload: UploadState = {
        creditCard: res.data.creditCard,
        payment: res.data.payment,
        status: "success",
    };
    dispatch(setUpload(upload));
};

const handleError = (dispatch: AppDispatch, error: AxiosError) => {
    const err = error.response?.data.message || error.response?.data.errno;
    const message: MessageState = { value: err, status: "error" };
    dispatch(setMessage(message));
};

const uploadPDF = (files: FormData, dispatch: AppDispatch) => {
    axios.post(`${API_URL}${UPLOAD_ENDPOINT}`, files).then(
        (res) => {
            testUpload(dispatch, res);
        },
        (error) => {
            handleError(dispatch, error);
        }
    );
};

export const useUpload = () =>
    useAppSelector((state: RootState) => state.upload);

export const useUploadActions = () => {
    const dispatch = useAppDispatch();

    return useMemo(
        () => ({
            uploadPDF: (files: FormData) => uploadPDF(files, dispatch),
            clearUpload: () => dispatch(clearUpload()),
            setUpload: (message: UploadState) => dispatch(setUpload(message)),
        }),
        [dispatch]
    );
};
