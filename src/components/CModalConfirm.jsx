import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import CButton from "./CButton";

export default function CModalConfirm({open,onAccept,onCancel,title,message}) {
    const [disabledBtn, setDisabledBtn] = useState(false); // HABILITAR / DESHABILITAR BOTON

    if (open == false) return;
    return(
        <div className="fixed bg-[rgba(10,9,9,0.5)] w-full h-full top-0 left-0 z-[1000] flex justify-center items-center">
            <div className="w-[80%] tablet:w-[50%] desktop:w-[20%] bg-white p-4 rounded-lg">
                <div className="flex justify-between">
                    <h1 className='text-gray-500 font-bold'>{title}</h1>
                    <button className="cursor-pointer" onClick={()=>{onCancel();}} disabled={disabledBtn}><XMarkIcon className="h-5 w-5 text-cyan-600"/></button>
                </div>
                <hr className="border-cyan-600 my-4"/>
                <div className="flex flex-col gap-4">
                    <span className="text-gray-500">{message}</span>
                    <div className="flex gap-2 justify-end">
                        <CButton placeholder={'Cancelar'} secondary={true} click={()=>{onCancel()}}></CButton>
                        <CButton placeholder={'Aceptar'} click={()=>{onAccept()}}></CButton>
                    </div>
                </div>
            </div>
        </div>
    )
}