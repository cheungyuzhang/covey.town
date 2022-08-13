import { Box, Image } from "@chakra-ui/react"
import linkify from 'linkify-it';

interface UrlMessageProps {
    src: string;
}

/**
 * Display a url message, showing the preview information if possible
 * Known best for YouTube, Google Map, etc.
 */
export default function UrlMessage({src}:UrlMessageProps) {
    const matches = linkify().test(src);
    if (!matches) 
      return <div>Not a valid URL</div>;
    return (
        <Box>
            <iframe 
                width='100%'
                height='100%'
                src={src}
                allowFullScreen
                scrolling='no'
            />
        </Box>
    )
}