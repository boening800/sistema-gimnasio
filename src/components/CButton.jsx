export default function CButton({placeholder,click,disabled,type}) {
    return(
        <button 
        className="bg-cyan-600 px-4 py-[5px] text-white rounded-full hover:bg-cyan-500 active:bg-cyan-800 disabled:cursor-default disabled:bg-slate-400 disabled:hover:bg-slate-400" 
        onClick={click} 
        disabled={disabled} 
        type={type}>
        {placeholder}
        </button>
    )
}