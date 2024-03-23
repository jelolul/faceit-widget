import '@styles/globals.css';

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
                {children}
            </body>
        </html>
    )
}

export default WidgetLayout