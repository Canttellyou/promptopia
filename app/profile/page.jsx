'use client';

import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";
const MyProfile = () => {
    const router = useRouter();

    const { data: session } = useSession()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchDataWithDelay = async () => {
        try {
            setLoading(true);
            // await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 3 seconds
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const resp_data = await response.json();
            setData(resp_data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDataWithDelay()
    }, [session?.user.id]);


    useEffect(() => {
        (() => {
            if (!session) {
                router.push('/');
            }
        })()
    });


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                })
                const filteredPosts = data.filter((p) => p._id !== post._id);
                setData(filteredPosts)
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (

        <>
            <Profile name="My" desc="Welcome to your personalized profile" data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
            {loading && <Loader />}
            {!loading && data.length === 0 && !error && <p>No prompts currently. Create one!</p>}

        </>

    )
}

export default MyProfile;