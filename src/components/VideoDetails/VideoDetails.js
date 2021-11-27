import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  max-width: 500px;
`;

export const VideoDetails = (props) =>
{
  const { content } = props;
  if (!content) return null;
  const { imageUrl, firstName, lastName } = content;
  return <Root>
    <Image src={imageUrl} alt={`${firstName} ${lastName}`} />
  </Root>;
};