import { render, screen } from '@testing-library/react';
import List from './List';

describe('Testing <List /> component', () => {
  it('should display Test as the list name', () => {
    render(<List listName="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  it('should display add', () => {
    render(<List listName="Test" />);
    expect(screen.getByText('add')).toBeVisible();
  });
});
