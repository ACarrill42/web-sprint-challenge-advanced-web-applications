import React from 'react';
import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';
import {axiosWithAuth as mockFetch} from '../helpers/axiosWithAuth';

jest.mock('../helpers/axiosWithAuth');

test("Renders without errors", ()=> {
  render(<BubblePage/>);
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    mockFetch.mockResolvedValueOnce({data:[]})
    render(<BubblePage/>)
    await waitFor(() => {
    const header = screen.getByText(/colors/i)
    expect(header).toHaveTextContent('colors')      
    })
});