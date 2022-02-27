import { SyntheticEvent, useState } from 'react';
import * as Styled from './ListItem.styled';
import { Todo } from './List';

interface ListItemProps {
  todoItem: Todo;
  onUpdateItem(item: Todo): void;
  onDeleteItem(item: Todo): void;
}

const ListItem = ({ todoItem, ...props }: ListItemProps) => {
  const [currValue, setCurrValue] = useState(todoItem.title);
  const [isEditing, setIsEditing] = useState(!Boolean(todoItem.title));
  const [isChecked, setChecked] = useState(todoItem.completed);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onUpdateItem({
      ...todoItem,
      title: currValue,
    });
    setIsEditing(false);
  };

  const onCheckboxChange = () => {
    const newValue = !isChecked;
    setChecked(newValue);
    props.onUpdateItem({
      ...todoItem,
      completed: newValue,
    });
  };

  return (
    <Styled.FlexDiv>
      <Styled.Form id="form" onSubmit={onSubmit} tabIndex={0}>
        <Styled.CheckBox
          id="checkbox"
          type="checkbox"
          name="todoItemBox"
          defaultChecked={isChecked}
          onClick={onCheckboxChange}
        />
        {isEditing && !isChecked ? (
          <Styled.Input
            name="todoItem"
            autoFocus
            value={currValue}
            onBlur={onSubmit}
            onChange={(evt: SyntheticEvent) =>
              setCurrValue((evt.target as HTMLInputElement).value)
            }
          />
        ) : (
          <Styled.Span isChecked={isChecked} onClick={() => setIsEditing(true)}>
            {todoItem.title}
          </Styled.Span>
        )}
        {Boolean(todoItem.title) && (
          <Styled.IconButton type="button">
            <Styled.IconSpan
              onClick={() => props.onDeleteItem(todoItem)}
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
