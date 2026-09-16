import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const clientQuery = useQueryClient();
    const {setUserId, showToast} = useAppContext();
    const navigate = useNavigate();

    const mutate = useMutation({
        mutationKey: ['logout'],
        mutationFn: apiClient.logout,
        onSuccess: () => {
            setUserId('');
            showToast({
                message:"Logout successfully",
                type: 'SUCCESS'
            })
            clientQuery.invalidateQueries({queryKey: ['cookieValidation']})
            navigate('/');
        },
        onError: () => {
            showToast({
                message: "Logout unsuccessful",
                type: 'ERROR'
            })
        }
    })

    const onClick = () => {
        mutate.mutate();
    }
    return(
        <button 
         className="bg-white px-2 py-1 font-bold text-blue-500 rounded-sm"
         onClick={onClick}>
            Logout
        </button>
    )
}

export default Logout;