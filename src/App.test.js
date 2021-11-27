import { render, screen } from '@testing-library/react';
import { App } from './App';

let mockUseDataHook;
jest.mock('./hooks/useData/useData', () => ({
  useData: () => mockUseDataHook
}));
jest.mock('./components/InfiniteScroll/InfiniteScroll', () => ({
  InfiniteScroll: (props) => <div>{props.children}</div>
}));
jest.mock('./components/VideoItem/VideoItem', () => ({
  VideoItem: (props) => <div data-testid={props['data-testid']}></div>
}));

describe('App component', () =>
{
  beforeEach(() =>
  {
    const loadNext = jest.fn();
    mockUseDataHook = {
      loadNext,
      total: 0,
      rows: []
    };
  });
  it('should call immediately the loadNext method', () =>
  {
    render(<App />);
    expect(mockUseDataHook.loadNext).toHaveBeenCalledWith();
  });

  it('should render all video images', () =>
  {
    mockUseDataHook.total = 500;
    mockUseDataHook.rows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    render(<App />);
    const videoItems = screen.getAllByTestId('video-item');
    expect(videoItems).toHaveLength(mockUseDataHook.rows.length);
  });

});
