import React from "react";
import { useUpload } from "src/ducks/upload/actions/upload";
import DemoMix from "./components/Display/Display";
import UploadComponent from "./components/Upload/Upload";

const Home: React.FC = () => {
    const uploaded = useUpload();
    console.log(uploaded);
    return (
        <>
            {uploaded.creditCard.length > 0 ? (
                <DemoMix></DemoMix>
            ) : (
                <UploadComponent message={"BONJOUR"}></UploadComponent>
            )}
        </>
    );
};

export default Home;
