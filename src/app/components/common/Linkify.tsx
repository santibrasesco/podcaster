import ReactLinkify from "react-linkify"

const componentDecorator = (href: string, text: string, key: number) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
    </a>
);

export const Linkify = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactLinkify componentDecorator={componentDecorator} >
            {children}
        </ReactLinkify>
    )
}