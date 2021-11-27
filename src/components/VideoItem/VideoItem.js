import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heart } from "../Heart/Heart";

const Root = styled.div`
  width: 15%;
  margin-bottom: 25px;
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const TimeLabel = styled.span`
  position: absolute;
  display: inline-block;
  background-color: rgba(20,20,20,.8);
  color: white;
  padding: 5px;
  border-radius: 8px;
  font-size: small;
  top: 5px;
  left: 5px;
  font-weight: bold;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const TextInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikePanel = styled.div`
  display: flex;
`;

export const VideoItem = (props) =>
{
  const { item, onImageClick } = props;

  const getDisplayTime = (timeInMinutes) =>
  {
    const totalMinutes = Math.trunc(timeInMinutes);
    const minutes = totalMinutes % 60;
    const hours = (totalMinutes - minutes) / 60;
    const extraTime = timeInMinutes - totalMinutes;
    const seconds = Math.trunc(extraTime * 60);
    const timeArray = [minutes, seconds];
    if (hours)
    {
      timeArray.unshift(hours);
    }

    return timeArray.map((n, i) => (i && n < 10) ? `0${n}` : `${n}`).join(':');
  }

  const displayTime = getDisplayTime(item.duration);

  return <Root>
    <ImageWrapper>
      <TimeLabel>{displayTime}</TimeLabel>
      <Thumbnail onClick={onImageClick} src={item.thumbnailUrl} alt={`${item.firstName} thumbnail`} />
    </ImageWrapper>
    <TextInfo>
      <div>{item.firstName} {item.lastName}</div>
      <LikePanel>{item.likes} <Heart /></LikePanel>
    </TextInfo>
  </Root>
};

VideoItem.propsType = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

