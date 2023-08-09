import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {


            if (session && session.user && session.user.email) {
                const sessionUser = await User.findOne({
                    email: session.user.email
                });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
            }
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                // check if the user already exists
                const userExists = await User.find({
                    email: profile.email
                })
                if (userExists.length === 0) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replaceAll(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                } else {
                    console.log('User already exists.');
                }

                // if not, create a new user
                return true;
            } catch (error) {
                console.log('Error during sign-in:', error);
                return false;
            }
        }
    }

})

export { handler as GET, handler as POST }