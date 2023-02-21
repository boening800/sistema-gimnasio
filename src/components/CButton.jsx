
export default function CButton({placeholder,click,disabled,type,secondary}) {
    return(
        <button 
            className={`px-4 py-[5px] 
            ${secondary 
                ? 'bg-white active:bg-gray-400 active:text-white hover:bg-gray-100 text-cyan-600' 
                : 'bg-cyan-600 active:bg-cyan-500 hover:bg-cyan-700 text-white'} 
                rounded-lg disabled:cursor-default disabled:bg-slate-400 disabled:hover:bg-slate-400`}
            onClick={click} 
            disabled={disabled}
            type={type}
        >
            {
                disabled ?
                'Cargando...':
                placeholder
            }
        </button>
    )
}