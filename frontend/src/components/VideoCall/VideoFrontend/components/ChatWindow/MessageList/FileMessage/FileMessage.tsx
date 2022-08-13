import React from 'react';
import { Link } from '@material-ui/core';
import linkify from 'linkify-it';
import FileOutlined from '@ant-design/icons/FileOutlined'

interface FileMessageProps {
  src: string;
}

/**
 * Display a file message with a link that allows users
 * to download the file
 */
export default function FileMessage({src}: FileMessageProps) {
    const matches = linkify().test(src);
    if (!matches) 
      return <div>Not a valid URL</div>;
    return (
        <>
            <FileOutlined />
            <Link target="_blank" rel="noreferrer" href={src}>
                {src.slice(src.lastIndexOf('/')+1)}
            </Link>
        </> 
    )
}
