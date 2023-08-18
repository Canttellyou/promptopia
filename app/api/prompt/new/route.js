import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag, answer } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag, answer });
        await newPrompt.save();
        console.log('Prompt created');

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log('Prompt not created');
        return new Response('Failed to create a new prompt', {
            status: 500
        })

    }
}