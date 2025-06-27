import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NASA Project title', () => {
  render(<App />);
  const titleElement = screen.getByText(/NASA Project/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to NASA Project/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders feature sections', () => {
  render(<App />);
  const apodFeature = screen.getByText(/Astronomy Picture of the Day/i);
  const marsFeature = screen.getByText(/Mars Rover Photos/i);
  const searchFeature = screen.getByText(/NASA Image Search/i);
  
  expect(apodFeature).toBeInTheDocument();
  expect(marsFeature).toBeInTheDocument();
  expect(searchFeature).toBeInTheDocument();
}); 