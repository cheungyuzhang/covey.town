import { Box, Image} from "@chakra-ui/react"

interface ImageMessageProps {
    src: string;
}

/**
 * Display an image message
 */
export default function ImageMessage({ src }: ImageMessageProps) {

    return (
        <Box>
            <Image src={src} alt='Image' />
        </Box>
    )
}