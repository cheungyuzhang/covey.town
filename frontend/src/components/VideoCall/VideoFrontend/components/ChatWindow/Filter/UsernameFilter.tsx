import { CUIAutoComplete } from 'chakra-ui-autocomplete';

interface Item {
  label: string;
  value: string;
}

interface UsernameFilterProps {
  selectedItems: Item[];
  setSelectedItems: (items: Item[]) => void;
  allSenders: Map<string, string>;
}

function getItemsFromMap(senders: Map<string, string>): Item[] {
  const items: Item[] = [];
  for (const [key, value] of senders) {
    items.push({label: value, value: key});
  }
  return items;
}

/**
 * Displays the UsernameFilter component of the AdvanceFilter
 * 
 * Set the filtering usernames with user input
 */
export default function UsernameFilter({selectedItems, setSelectedItems, allSenders}: UsernameFilterProps) {
  const pickerItems = getItemsFromMap(allSenders);

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <CUIAutoComplete
      label='By usernames'
      placeholder='Type a username'
      items={pickerItems}
      disableCreateItem
      hideToggleButton
      selectedItems={selectedItems}
      onSelectedItemsChange={changes => handleSelectedItemsChange(changes.selectedItems)}
    />
  );
}
