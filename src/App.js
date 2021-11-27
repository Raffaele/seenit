import { useEffect } from 'react';
import styled from 'styled-components';
import { Header } from './components/Header/Header';
import { VideoItem } from './components/VideoItem/VideoItem';
import { useData } from './hooks/useData/useData';
import { InfiniteScroll } from './components/InfiniteScroll/InfiniteScroll';

const MainPanel = styled.div`
  padding: 10px 30px;
`;

export const App = () =>
{
  const { rows, total, loadNext } = useData();
  useEffect(() =>
  {
    loadNext();
  }, []);
  return <MainPanel>
    <Header />
    <InfiniteScroll onLoadElementVisible={loadNext} isComplete={rows?.length >= total}>
      {rows?.map(row => <VideoItem key={row.id} item={row} data-testid="video-item" />)}
    </InfiniteScroll>
  </MainPanel>;
};
