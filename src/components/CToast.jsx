import { toast } from "react-hot-toast";

export const CToast = (type,message) => {
    switch (type) {
        case 'success':
            return toast(message,{ style: {
                backgroundColor:'#3dbc60',
                color:'#fff',
                fontWeight:'bold'
            } });
            break;
        case 'error':
            return toast('Ocurrió un error.',{ style: {
                backgroundColor:'#ea4e2c',
                color:'#fff',
                fontWeight:'bold'
            } });
            break;
        case 'alert':
            return toast(message,{ style: {
                backgroundColor:'#ef9400',
                color:'#fff',
                fontWeight:'bold'
            } });
            break;
        case 'info':
            return toast(message,{ style: {
                backgroundColor:'#0068da',
                color:'#fff',
                fontWeight:'bold'
            } });
            break;
        default:
            return toast(message);
            break;
    }
}