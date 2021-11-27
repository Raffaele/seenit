import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Header } from './components/Header/Header';
import { VideoItem } from './components/VideoItem/VideoItem';
import { VideoDetails } from './components/VideoDetails/VideoDetails';
import { useData } from './hooks/useData/useData';
import { InfiniteScroll } from './components/InfiniteScroll/InfiniteScroll';

const MainPanel = styled.div`
  padding: 10px 30px;
`;

export const App = () =>
{
  const [selectedContent, setSelectedContent] = useState(null);
  const { rows, total, loadNext } = useData();
  useEffect(() =>
  {
    loadNext();
  }, []);
  const modalStyle = {
    content: {
      display: 'flex'
    }
  };
  return <MainPanel>
    <Modal
      contentLabel="Example Modal"
      ariaHideApp={false}
      isOpen={!!selectedContent}
      onRequestClose={() => setSelectedContent(null)}
      style={modalStyle}>
      <VideoDetails content={selectedContent} />
    </Modal>
    <Header />
    <InfiniteScroll onLoadElementVisible={loadNext} isComplete={rows?.length >= total}>
      {rows?.map(row => <VideoItem key={row.id} item={row} data-testid="video-item" onImageClick={() => { setSelectedContent(row) }} />)}
    </InfiniteScroll>
  </MainPanel >;
};
