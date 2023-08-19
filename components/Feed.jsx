"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loader from "./Loader";

export const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout" >
            {data.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
        setLoading(false);
    };

    const fetchPost = async () => {
        try {
            const response = await fetch("api/prompt");
            const data = await response.json();
            setPosts(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchPost();
    }, []);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt) ||
                regex.test(item.answer)
        );
    };


    return (
        <section className="feed" onLoad={fetchPost} >
            <form className="relative w-full flex-center ">
                <input
                    type="text"
                    placeholder="Search for a tag, username or keyword..."
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            {searchText ? (
                <PromptCardList data={searchedResults} handleTagClick={() => { }} />
            ) : (
                <PromptCardList data={posts} handleTagClick={() => { }} />
            )}
            {loading && <Loader />}
        </section>
    )
}
export default Feed;
