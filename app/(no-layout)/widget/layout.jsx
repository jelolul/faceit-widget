import '@styles/globals.css';
import { Suspense } from 'react';

export const metadata = {
    title: "FACEIT Widget",
    description: "Displays your FACEIT level and ELO on supported games in a customizable widget.",
    icons: {
        icon: "/assets/icons/favicon.svg"
    }
}

const WidgetLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Suspense>
                    {children}
                </Suspense>
            </body>
        </html>
    )
}

export default WidgetLayout