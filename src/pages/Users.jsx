import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import CButton from "../components/CButton";
import { db } from "../firebase";
import RegisterUser from "./forms/RegisterUser";

export default function Users() {

    const [openAddUserBool, setOpenAddUserBool] = useState(false);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const usersTemp = []
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            usersTemp.push(doc.data())
        });
        setUsers(usersTemp)
    }

    useEffect(()=>{
        getUsers()
    },[])

    return (
        <div className="rounded-lg bg-gray-50 h-full p-5 shadow-lg">

            <RegisterUser open={openAddUserBool} onClose={() => setOpenAddUserBool(false)} />
            <CButton placeholder={"Agregar"} click={() => setOpenAddUserBool(true)}></CButton>

            <div className="relative overflow-x-auto shadow-lg rounded-lg my-4">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs uppercase bg-cyan-600 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombres
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Apellidos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Correo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,i)=>(
                                <tr key={i} className="bg-white border-b ">
                                    <td className="px-6 py-4">
                                        {user.names}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.lastname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}
