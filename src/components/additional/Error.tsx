import { useContext, useEffect, useState } from "react";
import { MyGlobalContext } from "../../functions/useGlobalContext";

export default function Error(){
    const [alert, setAlert] = useState(false);
    const { error } = useContext(MyGlobalContext);

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setAlert(true);
    //     },3500);
    // },[])
    return <>
    {!alert?<span className="Error">{error}</span>:''}
    </>
}