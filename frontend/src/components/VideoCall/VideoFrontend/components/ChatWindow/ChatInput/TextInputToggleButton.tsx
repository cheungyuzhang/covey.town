import React from 'react'
import { Button, Tooltip } from '@chakra-ui/react'
import { EditOutlined, LinkOutlined} from '@material-ui/icons';

interface TextInputToggleButtonProps {
    isInputUrl: boolean,
    setIsInputUrl: (isInputUrl: boolean) => void,
}

/**
 * This button allows users to choose if input a text ot a URL in the text input area
 */
function TextInputToggleButton({setIsInputUrl, isInputUrl}: TextInputToggleButtonProps) {

  return (
    <Tooltip label={isInputUrl ? "Switch to Input a Text" : "Switch to Input a URL"}>
        <Button onClick={() => setIsInputUrl(!isInputUrl)} colorScheme='gray' variant='ghost'>
            {isInputUrl ? <EditOutlined/> : <LinkOutlined/>}
        </Button>
    </Tooltip>
  )
}

export default TextInputToggleButton