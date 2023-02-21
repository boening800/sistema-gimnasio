import { addDoc, collection, getDocs, query, serverTimestamp, where } from "@firebase/firestore";
import { db } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useState } from "react";

import * as Yup from "yup";

import { CToast } from '../../components/CToast';
import CButton from "../../components/CButton";

export default function UpdateUser({ open, onClose, onUpdate, id }) {

    const validationSchema = Yup.object().shape({
        names: Yup.string().required('Campo requerido.'),
        lastname: Yup.string().required('Campo requerido.'),
        email: Yup.string().required('Campo requerido.').email('Debe ingresar un correo.'),
        password: Yup.string().required("Campo requerido.").min(8, "Contraseña debe contener 8 caracteres como mínimo."),
    });

    const [disabledBtn, setDisabledBtn] = useState(false); // HABILITAR / DESHABILITAR BOTON

    const addUserAuth = async (data) => {
        try {
            setDisabledBtn(true);
            const auth = getAuth();
            const existsEmail = await verifyEmailExists(data.email)
            if (!existsEmail) {
                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        addUserCollection(data, user.uid)
                    })
                    .catch(() => {
                        CToast('error');
                        setDisabledBtn(false);
                        onClose();
                    });
            }
        } catch (error) {
            CToast('error');
            setDisabledBtn(false);
            onClose();
        }
    }

    const addUserCollection = async (data, uidNewUser) => {
        try {
            const existsEmail = await verifyEmailExists(data.email);
            if (!existsEmail) {
                await addDoc(collection(db, "users"),
                    { ...data, 
                        uid: uidNewUser,
                        names:data.names,
                        lastname:data.lastname,
                        email:data.email,
                        type:data.type,
                        createAt: serverTimestamp(), 
                        updateAt:serverTimestamp(), 
                        status:'A'
                    }
                ).then(
                    ()=>{
                        CToast('success', 'Usuario creado correctamente.');
                        onUpdate();
                    }
                ).catch(
                    ()=>{
                        CToast("error")
                    }
                ).finally(
                    ()=>{
                        onClose();
                        setDisabledBtn(false);
                        reset();
                    }
                );
            }
        } catch (e) {
            CToast('error');
            setDisabledBtn(false);
            onClose();
            reset();
        }
    }

    const verifyEmailExists = async (email) => {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const verifyEmail = await getDocs(q);
        if (verifyEmail.docs.length > 0) {
            CToast('alert', 'El correo ya se encuentra registrado.');
            return true;
        }
        else {
            return false;
        }
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

    if (open == false) return;

    return (
        <div className="fixed bg-[rgba(10,9,9,0.5)] w-full h-full top-0 left-0 z-[1000] flex justify-center items-center">
            <div className="w-[50%] bg-white p-4 rounded-lg">
                <div className="flex justify-between">
                    <h1 className='text-gray-500 font-bold'>Registrar Usuario</h1>
                    <button className="cursor-pointer" onClick={() => { onClose(); reset(); }} disabled={disabledBtn}><XMarkIcon className="h-5 w-5 text-cyan-600" /></button>
                </div>
                <hr className="border-cyan-600 my-4" />
                <form onSubmit={handleSubmit(addUserAuth)} className='grid w-full gap-1'>

                    <div className="desktop:col-span-6 phone:col-span-6">
                        <label className='text-gray-500'>Nombres</label>
                        <input
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none"
                            type="text"
                            placeholder="Ingrese nombres"
                            {...register("names", { required: true })}
                            />
                        {errors.names && <span className="text-red-500 text-xs">{errors.names.message}</span>}
                    </div>

                    <div className="desktop:col-span-6 phone:col-span-6">
                        <label className='text-gray-500'>Apellidos</label>
                        <input
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none"
                            type="text"
                            placeholder="Ingrese apellidos"
                            {...register("lastname", { required: true })} />
                        {errors.lastname && <span className="text-red-500 text-xs">{errors.lastname.message}</span>}
                    </div>

                    <div className="desktop:col-span-6 phone:col-span-6">
                        <label className='text-gray-500'>Correo</label>
                        <input
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none"
                            type="text"
                            placeholder="Ingrese correo"
                            {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="desktop:col-span-6 phone:col-span-6">
                        <label className='text-gray-500'>Contraseña</label>
                        <input
                            className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none"
                            type="password"
                            placeholder="Ingrese contraseña"
                            {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    </div>

                    <div className="desktop:col-span-6 phone:col-span-6">
                        <label className='text-gray-500'>Tipo</label>
                        <select
                            defaultValue={'A'}
                            className="mt-1 block w-full rounded-md bg-gray-100 py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
                            {...register("type", { required: true })}
                        >
                            <option value={'A'}>Aministrador</option>
                            <option value={'E'}>Entrenador</option>
                            <option value={'O'}>Otros</option>
                        </select>
                    </div>

                    <div className="desktop:col-span-6 phone:col-span-6 flex gap-2 mt-4 justify-end">
                        {disabledBtn?<></>:<CButton placeholder={"Cancelar"} secondary={true} click={()=>{onClose(); reset();}}></CButton>}
                        <CButton placeholder={"Registrar"} type={'submit'} disabled={disabledBtn}></CButton>
                    </div>
                </form>
            </div>
        </div>
    )
}