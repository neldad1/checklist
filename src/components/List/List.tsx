import { useState, useEffect, SyntheticEvent } from 'react';
import ListItem from './ListItem';
import 'antd/dist/antd.min.css';
import { Popconfirm } from 'antd';
import * as Styled from './List.styled';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface ListProps {
  listName: string;
}

const List = (props: ListProps) => {
  const [todoItems, setTodoItems] = useState(
    JSON.parse(window.localStorage?.todoItems ?? '[]')
  );
  const [showPopconfirm, setShowPopconfirm] = useState(false);
  const [showAdd, setShowAdd] = useState(true);

  /* new item with default values, use for adding */
  const newItem: Todo = {
    id: Math.random() * 1000,
    title: '',
    completed: false,
  };

  const onAddItem = (event: SyntheticEvent) => {
    event.preventDefault();
    /* do not show the add button to prevent adding another item without finishing the current item */
    setShowAdd(false);
    setTodoItems([...todoItems, newItem]);
  };

  const onUpdateItem = (updatedItem: Todo) => {
    const tempList: Todo[] = [...todoItems];
    const targetIndex: number = todoItems.findIndex(
      (item: Todo) => item.id === updatedItem.id
    );
    if (updatedItem.title.length === 0) {
      /* delete an empty title and show add button, probably user wants to stop adding */
      onDeleteItem(updatedItem);
      setShowAdd(true);
    } else {
      tempList[targetIndex] = updatedItem;
      if (!showAdd) {
        /* push another newItem if in adding state */
        tempList.push(newItem);
      }
      setTodoItems(tempList);
    }
  };

  const onDeleteItem = (todoItem: Todo) => {
    setTodoItems(todoItems.filter((item: Todo) => item.id !== todoItem.id));
  };

  const onDeleteItems = () => {
    const tempList = todoItems.filter((item: Todo) => item.completed === false);
    setTodoItems(tempList);
  };

  const onPopupVisibleChange = (show: boolean) => {
    if (!show || todoItems.length === 0) {
      setShowPopconfirm(false);
      return;
    }

    /* Check first if there are completed items */
    const tempList: Todo[] = todoItems.filter(
      (item: Todo) => item.completed === true
    );
    if (tempList.length === 0) {
      setShowPopconfirm(true);
    }
  };

  const onPopupConfirm = () => {
    if (!showPopconfirm) return;

    /* User confirmed to clear the list */
    new Promise((resolve) => {
      setTodoItems([]);
    });
  };

  /* Listen to any changes of todoItems and save in the localStorage */
  useEffect(() => {
    const json = JSON.stringify(todoItems);
    window.localStorage.setItem('todoItems', json);
  }, [todoItems]);

  return (
    <Styled.MainDiv>
      <Styled.H1>{props.listName}</Styled.H1>
      {todoItems.map((listItem: Todo, index: number) => (
        <ListItem
          key={listItem.id}
          todoItem={listItem}
          onUpdateItem={onUpdateItem}
          onDeleteItem={onDeleteItem}
        />
      ))}
      <Styled.HideShowDiv showAdd={showAdd} onClick={onAddItem}>
        <Styled.IconButton>
          <Styled.IconSpan className="material-icons">add</Styled.IconSpan>
        </Styled.IconButton>
      </Styled.HideShowDiv>
      {Boolean(todoItems.length) && (
        <Styled.FlexDiv>
          <Popconfirm
            title="Do you want to clear the list?"
            visible={showPopconfirm}
            onConfirm={onPopupConfirm}
            onVisibleChange={onPopupVisibleChange}
          >
            <Styled.ActionButton onClick={onDeleteItems}>
              Delete
            </Styled.ActionButton>
          </Popconfirm>
        </Styled.FlexDiv>
      )}
    </Styled.MainDiv>
  );
};

export default List;
