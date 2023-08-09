'use client';
import { useState, useEffect } from "react";


const usePosts = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const resp_data = await response.json();
                setData(resp_data);
                setLoading(false);
            } catch (error) {
                setError(true)
                setLoading(false);
            } finally {
                setLoading(false);
            }

        })()
    }, [])
    return [data, setData, error, setError, loading]
}

export default usePosts;