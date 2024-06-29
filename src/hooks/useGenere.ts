import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genere{
    id: number;
    name: string;
}
interface FetchGeneresResponse{
    count:number;
    results : Genere[]
}



const useGenere =() =>{
        const [genere , setGenere] = useState<Genere[]>([]);
        const [error, setError] = useState('');
        const [isLoading, setLoading] = useState(false);
    
        useEffect(() => {
            const controller = new AbortController();
    
            setLoading(true);
    
            apiClient.get<FetchGeneresResponse>('/genres'
                ,{signal:controller.signal}
            )
            .then(res => {setGenere(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message)
            setLoading(false)});
    
        return () => controller.abort();
        },[]);
        return { genere , error , isLoading };
    }

export default useGenere;