export default function CButton({placeholder,click}) {
    return(
        <button className="bg-cyan-600 px-4 py-2 text-white rounded-full hover:bg-cyan-700 active:bg-cyan-800" onClick={click}>
            {placeholder}
        </button>
    )
}