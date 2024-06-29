
import useData from "./useData";

export interface Genere{
    id: number;
    name: string;
}



const useGenere =() =>useData<Genere>('/genres')

export default useGenere;