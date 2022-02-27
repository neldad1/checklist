import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';
import { Item } from './List';
import { ListItemProps } from './ListItem';

const item: Item = {
  id: 0,
  title: 'Item 1',
  completed: false,
};

const props: ListItemProps = {
  listItem: item,
  onDeleteItem: () => jest.fn(),
  onUpdateItem: () => jest.fn(),
};

describe('Testing <ListItem />', () => {
  it('should create a new item', () => {
    render(<ListItem {...props} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});
