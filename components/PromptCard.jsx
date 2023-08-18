'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Highlight from "react-highlight";
import detectLang from "lang-detector";
import { styled } from "styled-components";
import Link from "next/link";


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [copied, setCopied] = useState('');
    const handleCopy = () => {
        setCopied(post.prompt + '\n\n' + post.answer);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    }
    useEffect(() => {
        (() => {
            console.log(detectLang(post.answer).toLowerCase());
        })()
    }, [post.answer])

    return (
        <div className="prompt_card" >
            <div className=" flex justify-between items-start gap-5 ">
                <Link href={`/profile?id=${post.creator._id}`} >
                    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                        <Image src={post.creator.image} alt="user_image" width={40} height={40} className="rounded-full object-contain" />
                        <div className="flex flex-col" >
                            <h3 className="font-satoshi font-semibold text-gray-900" >{post.creator.username}</h3>
                            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
                        </div>
                    </div>
                </Link>

                <div className="copy_btn" onClick={() => handleCopy()} >
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        width={12}
                        height={12}
                        alt="copy-to-clipboard"
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700" >{post.prompt}</p>

            Answer: <br />
            {detectLang(post.answer).toLowerCase() !== "unknown" &&
                <p className="my-4 font-satoshi text-sm text-gray-700">
                    <HighlightStyle className="highlight" innerHTML={detectLang(post.answer).toLowerCase() === "unknown" ? true : false} language={detectLang(post.answer)}>
                        {post.answer}

                    </HighlightStyle></p>}
            {detectLang(post.answer).toLowerCase() === "unknown" &&
                <p className="my-4 font-satoshi text-sm text-gray-700">{post.answer}</p>
            }



            <p className=" font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)} >
                {!post.tag.includes('#') && '#'}
                {post.tag}</p>
            {
                session?.user.id === post.creator._id && pathname === '/profile' && (
                    <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3" >
                        <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}  >Edit</p>
                        <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}  >Delete</p>
                    </div>
                )
            }
        </div >
    )
}
const HighlightStyle = styled(Highlight)`
&>*{
    width: 100%;
}
`

export default PromptCard