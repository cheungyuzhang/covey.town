// Reference:
// https://javascript.plainenglish.io/how-to-upload-files-to-aws-s3-in-react-591e533d615e

import React, { useState } from 'react';
import AWS from 'aws-sdk'
import FileAddOutlined from '@material-ui/icons/AttachFileOutlined'
import { Button, Tooltip } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core';
import { MessageBodyType } from '../../../../../../classes/TextConversation';
import { nanoid } from 'nanoid';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET as string;
const REGION = process.env.REACT_APP_REGION as string;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESSKEY_ID as string,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY as string
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const useStyles = makeStyles(theme => ({
    fileInput: {
        display: 'none',
    }
}))

interface UploadProps {
    onChange: (message: string, bodyType: MessageBodyType) => void;
}

/**
 * File uploader by storing files in S3 bucket
 */
export default function FileUpload({ onChange }: UploadProps) {
    const classes = useStyles()
    const [progress, setProgress] = useState(0);

    const handleFileInput = (files: FileList | null) => {
        if (files) {
            const file = files[0]
            const randomFileName = nanoid() + file.name
            const params = {
                ACL: 'public-read',
                Body: file,
                Bucket: S3_BUCKET,
                Key: randomFileName
            };
            myBucket.putObject(params)
                .on('httpUploadProgress', (evt) => {
                    setProgress(Math.round((evt.loaded / evt.total) * 100))
                    console.log(evt)
                })
                .send((err, data) => {
                    if (err) console.log(err)
                    else {
                        onChange(process.env.REACT_APP_FILE_PATH_PREFIX as string + randomFileName, MessageBodyType.FILE)
                    }
                })
        }
    }

    return (
        <Tooltip label="Send a File">
            <Button colorScheme='gray' variant='ghost'>
            <label htmlFor="file-input">
                <FileAddOutlined />
            </label>
            <input id="file-input" type="file"
                onChange={(e) => { handleFileInput(e.target.files) }}
                className={classes.fileInput} />
        </Button>
        </Tooltip>
        )
}