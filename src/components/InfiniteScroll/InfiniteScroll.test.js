import { render, screen, fireEvent } from '@testing-library/react';
import { InfiniteScroll } from './InfiniteScroll';

describe('InfiniteScroll component', () =>
{
  let originalWindow;
  beforeEach(() =>
  {
    originalWindow = global.window;
    global.window = {
      innerHeight: 2000
    };
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 })
  });
  afterEach(() =>
  {
    global.window = originalWindow;
  });
  it('should render the children', () =>
  {
    const content = 'children';
    render(<InfiniteScroll><div>{content}</div></InfiniteScroll>);
    const child = screen.getByText(content);
    expect(child).toBeInTheDocument();
  });
  it('should render the loading element if isComplete prop is falsy', () =>
  {
    render(<InfiniteScroll></InfiniteScroll>);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });
  it('should not render the loading element if isComplete prop is truty', () =>
  {
    render(<InfiniteScroll isComplete></InfiniteScroll>);
    const loadingElement = screen.queryByText('Loading...');
    expect(loadingElement).not.toBeInTheDocument();
  });

  describe('on scroll event', () =>
  {
    let onLoadElementVisible;
    let root;
    let loadingTag;
    beforeEach(() =>
    {
      onLoadElementVisible = jest.fn();
      render(<InfiniteScroll onLoadElementVisible={onLoadElementVisible}></InfiniteScroll>);
      root = screen.getByTestId('root');
      loadingTag = screen.getByText('Loading...');
    });
    it('should call the onLoadElementVisible if the loading tag became visible', () =>
    {
      loadingTag.getBoundingClientRect = () => ({
        top: 900
      });
      fireEvent.scroll(root, {});
      expect(onLoadElementVisible).toHaveBeenCalled();
    });

    it('should not call the onLoadElementVisible callback if the loading tag still be out of screen', () =>
    {
      loadingTag.getBoundingClientRect = () => ({
        top: 1100
      });
      fireEvent.scroll(root, {});
      expect(onLoadElementVisible).not.toHaveBeenCalled();
    })
  });
});