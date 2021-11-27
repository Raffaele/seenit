import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () =>
{
  it('renders learn react link', () =>
  {
    render(<Header />);
    const linkElement = screen.getByText('Library');
    expect(linkElement).toBeInTheDocument();
  });

});
