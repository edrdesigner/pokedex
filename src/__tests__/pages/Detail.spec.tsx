import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import Detail from '../../pages/Detail';
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
const pokemonId = 1;

const mockedHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ goBack: mockedHistoryGoBack }),
    Link: ({ children }: { children: React.ReactNode }) => children,
    useParams: () => ({ pokemonId: 1 }),
  };
});

describe('Detail Page', () => {
  beforeEach(() => {
    mockedHistoryGoBack.mockClear();
  });

  it('should be able to render Detail page', async () => {
    const { getByText } = render(<Detail />);

    apiMock.onGet(`pokemon/${pokemonId}`).replyOnce(200, bulbasaurMock);
    await actWait();
    expect(getByText(bulbasaurMock.name)).toBeTruthy();
    expect(getByText(bulbasaurMock.id.toString())).toBeTruthy();
  });

  it('should be able to back to dashboard', async () => {
    const { getByTestId } = render(<Detail />);

    apiMock.onGet(`pokemon/${pokemonId}`).replyOnce(200, bulbasaurMock);
    await actWait();
    const mockBackButton = getByTestId('back');

    expect(mockBackButton).toBeTruthy();
    fireEvent.click(mockBackButton);
    expect(mockedHistoryGoBack).toHaveBeenCalled();
  });
});
