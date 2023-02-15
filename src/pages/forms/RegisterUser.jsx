import { addDoc, collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebase";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useId, useState } from "react";

import {CToast} from '../../components/CToast';
import CButton from "../../components/CButton";

export default function RegisterUser({open, onClose}) {

    const [disabledBtn, setDisabledBtn] = useState(false); // HABILITAR / DESHABILITAR BOTON

    const addUser = async (data) => {
        setDisabledBtn(true);
        try {
            const q = query(collection(db,'users'), where('email','==',data.email));
            const verifyEmail = await getDocs(q);
            if (verifyEmail.empty) {
                await addDoc(collection(db, "users"), data);
                CToast('success','Usuario creado correctamente.');
                setDisabledBtn(false);
                onClose();
                reset();
            }else {
                CToast('alert','El correo ya se encuentra registrado.');
                setDisabledBtn(false);
            }
        } catch (e) {
            CToast('error');
            setDisabledBtn(false);
            onClose();
            reset();
        }

    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (open == false) return;

    return (
        <>
            <div className="fixed bg-[rgba(10,9,9,0.5)] w-full h-full top-0 left-0 z-[1000] flex justify-center items-center">
                <div className="w-[50%] bg-white p-4 rounded-md">
                    <div className="flex justify-between">
                        <h1 className='text-gray-500 font-bold'>Registrar Usuario</h1>
                        <button className="cursor-pointer" onClick={()=>{onClose(); reset();}} disabled={disabledBtn}><XMarkIcon className="h-5 w-5 text-cyan-600"/></button>
                    </div>
                    <hr className="border-cyan-600 my-4"/>
                    <form onSubmit={handleSubmit(addUser)} className='flex flex-col gap-1'>

                        <div className="col-span-6 sm:col-span-3">
                            <label className='text-gray-500'>Nombres</label>
                            <input
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none" 
                            type="text"
                            placeholder="Ingrese nombres"
                            {...register("names",{ required: true })}
                            required/>
                            {errors.names && <span className="text-red-500 text-xs">Campo requerido.</span>}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className='text-gray-500'>Apellidos</label>
                            <input 
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none" 
                            type="text" 
                            {...register("lastname",{ required: true })}/>
                            {errors.lastname && <span className="text-red-500 text-xs">Campo requerido.</span>}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className='text-gray-500'>Correo</label>
                            <input 
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none" 
                            type="email" 
                            {...register("email",{ required: true })}/>
                            {errors.email && <span className="text-red-500 text-xs">Campo requerido.</span>}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className='text-gray-500'>Contraseña</label>
                            <input 
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none" 
                            type="password" 
                            {...register("password",{ required: true })}/>
                            {errors.password && <span className="text-red-500 text-xs">Campo requerido.</span>}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className='text-gray-500'>Tipo</label>
                            <select
                            defaultValue={'A'}
                            className="mt-1 block w-full rounded-md border bg-gray-100 py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
                            {...register("type",{ required: true })}
                            >
                                <option value={'A'}>Aministrador</option>
                                <option value={'E'}>Entrenador</option>
                                <option value={'O'}>Otros</option>
                            </select>
                        </div>

                        <div className="flex gap-2 mt-4">
                            {/* <input 
                            className="px-4 py-2 bg-cyan-600 text-white rounded-full cursor-pointer hover:shadow-md disabled:bg-slate-400 disabled:cursor-none" 
                            type="submit" 
                            value="Registrar"
                            disabled={disabledBtn}
                            /> */}
                            <CButton placeholder={"Registrar"} type={'submit'} disabled={disabledBtn}></CButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}