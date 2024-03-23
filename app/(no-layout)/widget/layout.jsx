import '@styles/globals.css';
import { Suspense } from 'react';

export const metadata = {
    title: "FACEIT Tracker Widget",
    description: "the widget thing :)",
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