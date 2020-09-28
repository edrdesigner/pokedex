import React from 'react';
import { render, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import Dashboard from '../../pages/Dashboard';
import bulbasaurMock from '../../mocks/pokemon';

const wait = (amount = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockData = {
  count: 1050,
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'pokemon/1',
    },
  ],
};

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Dashboard Page', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to render Dashboard with grid container', async () => {
    const { getByTestId } = render(<Dashboard />);
    const dashboardContainer = getByTestId('dashboard');

    apiMock.onGet('pokemon').replyOnce(200, mockData);
    apiMock.onGet(mockData.results[0].url).reply(200, bulbasaurMock);

    expect(dashboardContainer).not.toBeUndefined();
    await actWait();
    expect(getByTestId('grid-container')).toBeTruthy();
    expect(getByTestId('pokemon-bulbasaur')).toBeTruthy();
  });
});
