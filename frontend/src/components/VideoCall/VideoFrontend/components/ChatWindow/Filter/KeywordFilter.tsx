import { FormLabel,Input,Stack } from "@chakra-ui/react";

interface KeywordFilterProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

/**
 * Displays the KeywordFilter component of the AdvanceFilter
 * 
 * Set the filtering keyword with user input
 */
export default function KeywordFilter({ keyword, setKeyword }: KeywordFilterProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value);

  return (
    <Stack>
      <FormLabel> By a keyword </FormLabel>
      <Input value={keyword} onChange={handleInputChange} name='keywordInput' placeholder="Type a keyword"/>
    </Stack>
  );
}
