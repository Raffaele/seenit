import { render, screen } from '@testing-library/react';
import { VideoItem } from "./VideoItem";

describe('VideoItem component', () =>
{
  describe('default behaviour', () =>
  {
    const row = {
      duration: 123.3232,
      firstName: 'Foo',
      lastName: 'Bar',
      thumbnailUrl: 'http://hello-world/',
      likes: 35
    };
    beforeEach(() =>
    {
      render(<VideoItem item={row} />);
    });


    it('should include the correct thumbnail path', () =>
    {
      const img = screen.getByAltText('Foo thumbnail');
      expect(img).toBeInTheDocument();
      expect(img.src).toBe(row.thumbnailUrl);
    });
    it('should containt the full name of the video provider', () =>
    {
      const nameDiv = screen.getByText('Foo Bar');
      expect(nameDiv).toBeInTheDocument();
    });
    it('should show the number of like', () =>
    {
      const nameDiv = screen.getByText(row.likes);
      expect(nameDiv).toBeInTheDocument();
    });
  });

  describe('the duration time', () =>
  {
    it('should show the correct duration time including hours', () =>
    {
      const row = {
        duration: 123.3232,
      };
      render(<VideoItem item={row} />);
      const span = screen.getByText('2:03:19');
      expect(span).toBeInTheDocument();
    });

    it('should not zero-fill hours', () =>
    {
      const row = {
        duration: 123.3232,
      };
      render(<VideoItem item={row} />);
      const span = screen.getByText('2:03:19');
      expect(span).toBeInTheDocument();
    });

    it('should zero-fill minutes if hours>0', () =>
    {
      const row = {
        duration: 123.3232,
      };
      render(<VideoItem item={row} />);
      const span = screen.getByText('2:03:19');
      expect(span).toBeInTheDocument();
    });

    it('should should show the correct duration time without hours', () =>
    {
      const row = {
        duration: 23.3232,
      };
      render(<VideoItem item={row} />);
      const span = screen.getByText('23:19');
      expect(span).toBeInTheDocument();
    });

    it('should not zero-fill minutes if hours=0', () =>
    {
      const row = {
        duration: 3.3232,
      };
      render(<VideoItem item={row} />);
      const span = screen.getByText('3:19');
      expect(span).toBeInTheDocument();
    });

    it('should show the correct duration with 0 minutes', () =>
    {
      const row = {
        duration: 0.3232,
      };
      render(<VideoItem item={row} />);
      const span = screen.getByText('0:19');
      expect(span).toBeInTheDocument();
    });

    it('should zero-fill the seconds', () =>
    {
      const row = {
        duration: 0.1232,
      };
      render(<VideoItem item={row} />);
      const span = screen.getByText('0:07');
      expect(span).toBeInTheDocument();
    });
  });

});