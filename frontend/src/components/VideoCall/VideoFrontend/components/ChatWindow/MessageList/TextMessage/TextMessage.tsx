import React from 'react';
import { Link } from '@material-ui/core';
import linkify from 'linkify-it';

interface TextMessageProps {
  text: string;
}
/**
 * Display a text message, make the url-like text as a link
 */
export default function TextMessage({text}: TextMessageProps) {
  const matches = linkify().match(text);
  if (!matches) 
    return <div>{text}</div>;

  const results = [];
  let lastIndex = 0;

  matches.forEach((match, i) => {
    results.push(text.slice(lastIndex, match.index));
    results.push(
      <Link target="_blank" rel="noreferrer" href={match.url} key={i}>
        {match.text}
      </Link>
    );
    lastIndex = match.lastIndex;
  });

  results.push(text.slice(lastIndex, text.length));

  return <div>{results}</div>;
}
