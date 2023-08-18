

import { useSession } from "next-auth/react"
import PromptCard from "./PromptCard"

const Profile = ({ data, handleEdit, handleDelete, name = 'My', desc }) => {
    const { data: session } = useSession()

    return (
        <section className="w-full" >


            <h1 className="head_text text-left" ><span className="blue_gradient" >{name} Profile</span> </h1>
            <p className="desc text-left">{desc}</p>

            <div className="mt-16 prompt_layout" >
                {data.map((post) => (
                    <PromptCard key={post._id} post={post} handleEdit={() => handleEdit && handleEdit(post)} handleDelete={() => handleDelete && handleDelete(post)} />
                ))}
            </div>
        </section>
    )
}

export default Profile