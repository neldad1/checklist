import { SyntheticEvent, useState } from 'react';
import * as Styled from './ListItem.styled';
import { Item } from './List';

export interface ListItemProps {
  listItem: Item;
  onUpdateItem(item: Item): void;
  onDeleteItem(item: Item): void;
}

const ListItem = ({ listItem, ...props }: ListItemProps) => {
  const [currValue, setCurrValue] = useState(listItem.title);
  const [isEditing, setIsEditing] = useState(!Boolean(listItem.title));
  const [isChecked, setChecked] = useState(listItem.completed);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onUpdateItem({
      ...listItem,
      title: currValue,
    });
    setIsEditing(false);
  };

  const onCheckboxChange = () => {
    const newValue = !isChecked;
    setChecked(newValue);
    props.onUpdateItem({
      ...listItem,
      completed: newValue,
    });
  };

  return (
    <Styled.FlexDiv>
      <Styled.Form id="form" onSubmit={onSubmit} tabIndex={0}>
        <Styled.CheckBox
          data-testid="itemCheckBox"
          name="itemCheckBox"
          type="checkbox"
          defaultChecked={isChecked}
          onClick={onCheckboxChange}
        />
        {isEditing && !isChecked ? (
          <Styled.Input
            data-testid="itemInput"
            name="itemInput"
            autoFocus
            value={currValue}
            onBlur={onSubmit}
            onChange={(evt: SyntheticEvent) =>
              setCurrValue((evt.target as HTMLInputElement).value)
            }
          />
        ) : (
          <Styled.Span
            data-testid="itemSpan"
            data-checked={isChecked}
            isChecked={isChecked}
            onClick={() => setIsEditing(true)}
          >
            {listItem.title}
          </Styled.Span>
        )}
        {Boolean(listItem.title) && (
          <Styled.IconButton data-testid="itemButton" type="button">
            <Styled.IconSpan
              onClick={() => props.onDeleteItem(listItem)}
              className="material-icons"
            >
              delete
            </Styled.IconSpan>
          </Styled.IconButton>
        )}
      </Styled.Form>
    </Styled.FlexDiv>
  );
};

export default ListItem;
