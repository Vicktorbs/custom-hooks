import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {
    // Se ejecuta cuando el componente se monta
    const isMounted = useRef(true);

    const [state, setState] = useState({
        data: null, 
        loading: true, 
        error: null
    });

    // Se ejecuta cuando el componente se desmonta evitando errores que pueden ocasionar perdida de memoria al llamar a un componente desmontado
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        setState({data: null, loading: true, error: null});
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }
            })
            .catch(() => {
                setState({
                    data: null, 
                    loading: false, 
                    error: 'No se pudo cargar la info'
                })
            })
    }, [url]);

    return state
}
