import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from './ListItem';
import { Item } from './List';
import { ListItemProps } from './ListItem';

let item: Item = {
  id: 0,
  title: 'Item 1',
  completed: false,
};

const props: ListItemProps = {
  listItem: item,
  onDeleteItem: () => jest.fn(),
  onUpdateItem: () => jest.fn(),
};

describe('Testing <ListItem /> based on title', () => {
  it('should create a new item', () => {
    render(<ListItem {...props} />);
    expect(
      (screen.getByTestId('itemCheckBox') as HTMLInputElement).checked
    ).toEqual(false);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByTestId('itemButton')).toBeInTheDocument();
  });
  it('should create an empty item', () => {
    item.title = '';
    render(<ListItem {...props} />);
    expect(
      (screen.getByTestId('itemCheckBox') as HTMLInputElement).checked
    ).toEqual(false);
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
    expect(screen.getByTestId('itemInput')).toBeVisible();
    expect(screen.queryByTestId('itemButton')).toBeFalsy();
  });
});

describe('Testing <ListItem /> events', () => {
  it('should check the checkbox and set checked to true', () => {
    item.title = 'Item 1';
    render(<ListItem {...props} />);
    const checkBox: HTMLInputElement = screen.getByTestId(
      'itemCheckBox'
    ) as HTMLInputElement;
    const spanELement: HTMLSpanElement = screen.getByTestId(
      'itemSpan'
    ) as HTMLSpanElement;
    expect(checkBox.checked).toEqual(false);
    fireEvent.click(checkBox);
    expect(checkBox.checked).toEqual(true);
    expect(checkBox).toBeChecked();
    expect(spanELement.getAttribute('data-checked')).toEqual('true');
  });
  it('should click span and show input', () => {
    render(<ListItem {...props} />);
    let spanELement: HTMLSpanElement = screen.getByTestId(
      'itemSpan'
    ) as HTMLSpanElement;
    expect(spanELement).toBeInTheDocument();
    expect(screen.queryByTestId('itemInput')).toBeFalsy();
    fireEvent.click(spanELement);
    expect(screen.getByTestId('itemInput')).toBeInTheDocument();
    expect(screen.getByTestId('itemInput')).toHaveValue(item.title);
    expect(screen.queryByTestId('itemSpan')).toBeFalsy();
    expect(screen.getByTestId('itemButton')).toBeVisible();
  });
  it('should click button and delete item', () => {
    render(<ListItem {...props} />);
    fireEvent.click(screen.getByTestId('itemSpan'));
    expect(screen.getByTestId('itemButton')).toBeVisible();
    fireEvent.click(screen.getByTestId('itemButton'));
    expect(screen.queryByText('Item 1')).toBeFalsy();
  });
});
