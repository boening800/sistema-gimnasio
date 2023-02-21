import { ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import CButton from "../components/CButton";
import CSkeleton from "../components/skeleton/CSkeleton";
import RegisterUser from "./forms/RegisterUser";
import { CToast } from "../components/CToast";

export default function Users() {

    const itemsPerPage = 15;

    const [openAddUserBool, setOpenAddUserBool] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const getUsers = async () => {
        setLoading(true);
        try {
            const usersTemp = []
            const querySnapshot = await getDocs(
                query(
                    collection(db, "users"),
                    orderBy("createAt", "desc"),
                )
            );
            querySnapshot.forEach((doc) => {
                usersTemp.push({ ...doc.data(), id: doc.id })
            });
            setUsers(usersTemp)
            setLoading(false);
        } catch (error) {
            CToast("error");
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const listUsers = () => {
        return users.slice(currentPage,currentPage + itemsPerPage)
    }

    function renderTypeUser(type) {
        switch (type) {
            case 'A':
                return 'Administrador'
                break;
            case 'E':
                return 'Entrenador'
                break;
            default:
                return 'Otros'
                break;
        }
    }

    const nextPage = () => {
        if(users.length > currentPage + itemsPerPage)
        setCurrentPage(currentPage + itemsPerPage);
        console.log((currentPage / itemsPerPage ) + 1)
    }

    const prevPage = () => {
        if(currentPage > 0)
        setCurrentPage(currentPage - itemsPerPage);
    }

    return (
        <React.Fragment>
            <RegisterUser open={openAddUserBool} onClose={() => setOpenAddUserBool(false)} onAdd={() => { setOpenAddUserBool(false); getUsers(); }} />
            <div className="rounded-lg bg-gray-50 h-full p-5 shadow-lg">
                <div className="flex justify-end">
                    <CButton placeholder={"Agregar usuario"} click={() => setOpenAddUserBool(true)}></CButton>
                </div>
                <div className="relative overflow-x-auto shadow-lg rounded-lg my-4 text-center">
                    {
                        loading ?
                            <CSkeleton></CSkeleton> :
                            <>
                                <table className="w-full text-sm text-left text-gray-500">
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
                                                Tipo
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Estado
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Acción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="w-full">
                                        {
                                            users.length > 0 ?
                                            listUsers().map((user, i) => (
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
                                                            {renderTypeUser(user.type)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {
                                                                user.status == 'A' ?
                                                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-white bg-green-500 rounded-lg">Activo</kbd>
                                                                    :
                                                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-lg">Inactivo</kbd>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 flex gap-2">
                                                            <PencilSquareIcon className="w-5 h-5 hover:text-cyan-600 hover:cursor-pointer"></PencilSquareIcon>
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr className="bg-white border-b">
                                                    <td colSpan={6}>
                                                        <div className="w-full text-center p-2">No hay datos disponibles.</div>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                                {/* PAGINACION */}
                                {
                                    users.length > 0 ?
                                        <div className="p-2 w-full inline-flex justify-end bg-white items-center gap-2">
                                            <span className="text-sm text-cyan-600">
                                                Pág. <b>{(currentPage / itemsPerPage ) + 1}</b> de <b>{Math.ceil(users.length / itemsPerPage)}</b>
                                            </span>
                                            <button 
                                                className="text-center px-4 py-2 text-sm font-medium text-cyan-600 bg-white  rounded-lg hover:bg-gray-100  hover:cursor-pointer"
                                                onClick={()=>prevPage()}
                                            >
                                                <ChevronLeftIcon className="w-5 h-5"></ChevronLeftIcon>
                                            </button>
                                            <button 
                                                className="text-center px-4 py-2 text-sm font-medium text-cyan-600 bg-white rounded-lg hover:bg-gray-100 hover:cursor-pointer"
                                                onClick={()=>nextPage()}
                                            >
                                                <ChevronRightIcon className="w-5 h-5"></ChevronRightIcon>
                                            </button>
                                        </div>
                                        : <></>
                                }
                            </>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}
