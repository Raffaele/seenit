import { useRef } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  overflow-y: scroll;
  max-height: 550px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LoadingTag = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 40px;
  font-weight: bold;
`;

export const InfiniteScroll = (props) =>
{
  const { children, onLoadElementVisible, isComplete } = props;
  const loadingElement = useRef();
  const handleScrolling = () =>
  {
    if (!loadingElement.current ||
      loadingElement.current?.getBoundingClientRect().top > window.innerHeight)
    {
      return;
    }
    onLoadElementVisible();
  }
  return <Root onScroll={handleScrolling} data-testid="root">
    <Container>
      {children}
    </Container>
    {isComplete || <LoadingTag ref={loadingElement}>Loading...</LoadingTag>}
  </Root>;
};