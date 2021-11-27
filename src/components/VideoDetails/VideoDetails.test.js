import { render, screen, fireEvent } from '@testing-library/react';
import { VideoDetails } from "./VideoDetails";

describe('VideoDetails component', () =>
{
  describe('when the content is falsy', () =>
  {
    it('should not show any image', () =>
    {
      render(<VideoDetails />);
      const image = screen.queryByRole('img');
      expect(image).toBeNull();
    });
  });

  describe('when the content is truty', () =>
  {
    const content = {
      firstName: 'Foo',
      lastName: 'Bar',
      imageUrl: 'https://foo.bar.com/'
    };
    let image;
    beforeEach(() =>
    {
      render(<VideoDetails content={content} />);
      image = screen.queryByRole('img');
    });
    it('should show the image', () =>
    {
      expect(image).not.toBeNull();
    });
    it('should show the correct image src attribute', () =>
    {
      expect(image.src).toBe(content.imageUrl);
    });
    it('should show the correct image alt attribute', () =>
    {
      expect(image.alt).toBe(`${content.firstName} ${content.lastName}`);
    });
  });




});