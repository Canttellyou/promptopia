"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from "next/navigation";
const Nav = () => {
    const router = useRouter();

    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const signUserOut = () => {
        router.push('/');
        signOut({ callbackUrl: 'https://promptopia-prompt.vercel.app' });
    }
    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setProvider();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3" >
            <Link href="/" className="flex gap-2 flex-center" >
                <Image src='/assets/images/logo.svg' alt="Promptopia Logo" width={30} height={30} className="object-contain" />
                <p className="logo_text" >Promptopia</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden" >
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5" >
                        <Link href={"/create-prompts"} className="black_btn" >Create Post</Link>
                        <button type="button" onClick={signUserOut} className="outline_btn">Sign Out</button>
                        <Link href={`/profile?id=${session.user.id}`} >
                            <Image src={session.user.image} width={37}
                                height={37}
                                alt="profile"
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (<>
                    {providers && Object.values(providers).map(provider => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In
                        </button>
                    ))}
                </>)
                }
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative" >

                {session?.user ? (
                    <div className="flex" >
                        <Image src={session.user.image} width={37}
                            height={37}
                            alt="profile"
                            className="rounded-full"
                            onClick={() => setToggleDropDown((prev) => !prev)}
                        />
                        {toggleDropDown && (
                            <div className="dropdown" >
                                <Link href={'/profile'} className="dropdown_link" onClick={() => setToggleDropDown(false)} >My Profile</Link>
                                <Link href={'/create-prompts'} className="dropdown_link" onClick={() => setToggleDropDown(false)} >Create Prompt</Link>
                                <button type="button" onClick={() => {
                                    setToggleDropDown(false);
                                    signOut();
                                }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav