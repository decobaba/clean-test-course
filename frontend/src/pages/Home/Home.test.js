import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Home from '.';
import { API_URL } from '../../utils/constants';

describe('Home Page', () => {
  let mockGet;

  beforeEach(() => {
    // Mock axios.get for each test
    mockGet = jest.spyOn(axios, 'get').mockImplementation((url) => {
      switch (url) {
        case `${API_URL}/api/category/?format=json`:
          return Promise.resolve({
            data: {
              status: 'success',
              data: [
                {
                  id: 1,
                  name: 'Handhelds',
                  description: "So big, you don't need thumbs.",
                },
                {
                  id: 2,
                  name: 'Appeteasers',
                  description: 'Tease the hangry hippo, he get hangrier',
                },
              ],
            },
          });
        default:
          return Promise.resolve({
            data: {
              status: 'fail',
            },
          });
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders categories from the API', async () => {
    render(<Home />);
    // There should be 2 categories as defined in the mock response above
    expect(await screen.findAllByTestId(/category-item/i)).toHaveLength(2);
    // The word Appeteasers should be in there as defined in the mock response above.
    expect(await screen.findByText('Appeteasers')).toBeInTheDocument();
  });
});