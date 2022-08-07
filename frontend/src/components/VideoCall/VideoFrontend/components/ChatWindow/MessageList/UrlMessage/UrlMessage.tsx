import { Box, Image } from "@chakra-ui/react"
import linkify from 'linkify-it';

interface UrlMessageProps {
    src: string;
  }

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