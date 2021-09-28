import { useEffect, useRef } from "react"

export const useOnTimeoutCallback =  (callback) => {
    const callbackRef = useRef();
    useEffect(() => {
        callbackRef.current  = callback;
    })

    return callbackRef;
}