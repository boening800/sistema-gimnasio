import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import CButton from "../components/CButton";
import { db } from "../firebase";
import RegisterUser from "./forms/RegisterUser";

export default function Users() {

    const [openAddUserBool, setOpenAddUserBool] = useState(false)
    
    const addUser = () => {
        // try {
        //     const docRef = await addDoc(collection(db, "users"), {
        //       first: "Alan",
        //       middle: "Mathison",
        //       last: "Turing",
        //       born: 1912
        //     });
        
        //     console.log("Document written with ID: ", docRef.id);
        //   } catch (e) {
        //     console.error("Error adding document: ", e);
        //   }
    };

    return (
        <div className="rounded-lg bg-white h-full p-5">
            <RegisterUser open={openAddUserBool} onClose={()=>setOpenAddUserBool(false)}/>
            <CButton placeholder={"Agregar"} click={()=>setOpenAddUserBool(true)}></CButton>
        </div>
    );
}
