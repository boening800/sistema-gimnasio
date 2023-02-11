import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";

export default function RegisterUser({open, onClose}) {

    const addUser = async (data) => {
        try {
        const docRef = await addDoc(collection(db, "users"), data);
        console.log("Document written with ID: ", docRef.id)
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    if (open == false) return;

    return (
        <>
            <div className="fixed bg-[rgba(10,9,9,0.5)] w-full h-full top-0 left-0 z-[1000] flex justify-center items-center">
                <div className="w-[50%] bg-white p-4 rounded-md">
                    <div className="flex justify-between">
                        <h1>Registrar Usuario</h1>
                        <span className="cursor-pointer" onClick={onClose}><XMarkIcon className="h-5 w-5 text-cyan-600"/></span>
                    </div>
                    <hr className="border-cyan-600 my-4"/>
                    <form onSubmit={handleSubmit(addUser)}>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="">Nombres</label>
                            <input 
                            className="w-full p-1 bg-gray-200 rounded-md focus:outline-none" 
                            type="text"
                            {...register("names",{ required: true })}/>
                            {errors.names && <span className="text-red-500 text-xs">Campo requerido.</span>}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="">Apellidos</label>
                            <input 
                            className="w-full p-1 bg-gray-200 rounded-md focus:outline-none" 
                            type="text" 
                            {...register("lastname")}/>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="">Correo</label>
                            <input 
                            className="w-full p-1 bg-gray-200 rounded-md focus:outline-none" 
                            type="email" 
                            {...register("email")}/>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="">Contraseña</label>
                            <input 
                            className="w-full p-1 bg-gray-200 rounded-md focus:outline-none" 
                            type="password" 
                            {...register("password")}/>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="">Tipo</label>
                            <select
                            className="mt-1 block w-full rounded-md border bg-gray-200 py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
                            {...register("type")}
                            >
                                <option value={'A'}>Aministrador</option>
                                <option value={'E'}>Entrenador</option>
                                <option value={'O'}>Otros</option>
                            </select>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <input className="px-4 py-2 bg-cyan-600 text-white rounded-full cursor-pointer hover:shadow-md" type="submit" value="Registrar"/>
                            <input className="px-4 py-2 bg-white text-cyan-600 rounded-full cursor-pointer hover:shadow-md" type="submit" value="Cancelar"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}