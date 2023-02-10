export default function CButton({placeholder,click}) {
    return(
        <button className="bg-cyan-600 p-2 text-white rounded-md hover:bg-cyan-700 active:bg-cyan-800" onClick={click}>
            {placeholder}
        </button>
    )
}