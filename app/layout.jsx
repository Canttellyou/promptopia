

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Head from 'next/head';
import '@styles/globals.css';
export const metadata = {
    title: "Promptopia",
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en' >
            <head>
                <link rel="icon" href="logo.svg" />
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-cave-dark.min.css" />
            </head>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>

                </Provider>

            </body>
        </html>
    )
}

export default RootLayout