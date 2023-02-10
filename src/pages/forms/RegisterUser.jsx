import { XMarkIcon } from "@heroicons/react/20/solid";

export default function RegisterUser({open, onClose}) {

    if (open == false) return;
    return (
        <div className="fixed bg-[rgba(10,9,9,0.5)] w-full h-full top-0 left-0 z-[1000] flex justify-center items-center">
            <div className="w-[50%] bg-white p-4 rounded-md">
                <div className="flex justify-between">
                    <h1>Registrar Usuario</h1>
                    <span className="cursor-pointer" onClick={onClose}><XMarkIcon className="h-5 w-5"/></span>
                </div>
                <hr />
                <form>
                    
                </form>
            </div>
        </div>
    )
}