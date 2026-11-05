import { useEffect, useState} from "react"
import { getPlaylists, getPlaylist } from "../services/service"

export function usePlaylists(query="") {
    const [albums, setAlbums] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        let ignore = false;

        setLoading(true);
        setError(null);

        getPlaylists(query)
        .then((result) => {
            if (ignore) return;
            setAlbums(result.data);
            setTotal(result.total);
            setTotalPages(result.totalPages);
        })
        .catch((err) => {
            if (!ignore) setError(err.message);
        })
        .finally(() => {
            if (!ignore) setLoading(false);
        });
    return () => {
        ignore = true;
    };
    }, [query]);

    return { albums, total, totalPages, loading, error };
}

export function usePlaylist(id) {
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        let ignore = false; 

        setAlbum(null);
        setLoading(true);
        setError(null);

        getPlaylist(id) 
        .then ((result) => {
            if (!ignore) setAlbum(result);
        })
        .catch((err) => {
            if (!ignore) setError(err.message);
        })
        .finally(() => {
            if (!ignore) setLoading(false);
        });
    return () => {
        ignore = true;
    };
    }, [id]);

    return {album, loading, error}; 
}