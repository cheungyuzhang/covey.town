import { Box, Image} from "@chakra-ui/react"

interface ImageMessageProps {
    src: string;
}

export default function ImageMessage({ src }: ImageMessageProps) {

    return (
        <Box>
            <Image src={src} alt='Image' />
        </Box>
    )
}