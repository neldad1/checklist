import { useState, useEffect, SyntheticEvent } from 'react';
import ListItem from './ListItem';
import 'antd/dist/antd.min.css';
import { Popconfirm } from 'antd';
import * as Styled from './List.styled';

export interface Item {
  id: number;
  title: string;
  completed: boolean;
}

interface ListProps {
  listName: string;
}

const List = (props: ListProps) => {
  const [items, setItems] = useState(
    JSON.parse(window.localStorage?.items ?? '[]')
  );
  const [showPopconfirm, setShowPopconfirm] = useState(false);
  const [showAdd, setShowAdd] = useState(true);

  /* new item with default values, use for adding */
  const newItem: Item = {
    id: Math.random() * 1000,
    title: '',
    completed: false,
  };

  const onAddItem = (event: SyntheticEvent) => {
    event.preventDefault();
    /* do not show the add button to prevent adding another item without finishing the current item */
    setShowAdd(false);
    setItems([...items, newItem]);
  };

  const onUpdateItem = (updatedItem: Item) => {
    const tempList: Item[] = [...items];
    const targetIndex: number = items.findIndex(
      (item: Item) => item.id === updatedItem.id
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
      setItems(tempList);
    }
  };

  const onDeleteItem = (listItem: Item) => {
    setItems(items.filter((item: Item) => item.id !== listItem.id));
  };

  const onDeleteItems = () => {
    const tempList = items.filter((item: Item) => item.completed === false);
    setItems(tempList);
  };

  const onPopupVisibleChange = (show: boolean) => {
    if (!show || items.length === 0) {
      setShowPopconfirm(false);
      return;
    }

    /* Check first if there are completed items */
    const tempList: Item[] = items.filter(
      (item: Item) => item.completed === true
    );
    if (tempList.length === 0) {
      setShowPopconfirm(true);
    }
  };

  const onPopupConfirm = () => {
    if (!showPopconfirm) return;

    /* User confirmed to clear the list */
    new Promise((resolve) => {
      setItems([]);
    });
  };

  /* Listen to any changes of items and save in the localStorage */
  useEffect(() => {
    const json = JSON.stringify(items);
    window.localStorage.setItem('items', json);
  }, [items]);

  return (
    <Styled.MainDiv>
      <Styled.H1>{props.listName}</Styled.H1>
      {items.map((listItem: Item, index: number) => (
        <ListItem
          key={listItem.id}
          listItem={listItem}
          onUpdateItem={onUpdateItem}
          onDeleteItem={onDeleteItem}
        />
      ))}
      <Styled.HideShowDiv showAdd={showAdd} onClick={onAddItem}>
        <Styled.IconButton>
          <Styled.IconSpan className="material-icons">add</Styled.IconSpan>
        </Styled.IconButton>
      </Styled.HideShowDiv>
      {Boolean(items.length) && (
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
