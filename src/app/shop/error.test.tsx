import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Error from './error';

it('renders the error heading', () => {
  renderError();

  screen.getByRole('heading', { level: 1, name: 'שגיאה בטעינת העמוד' });
});

it('renders the error message', () => {
  renderError();

  screen.getByText('סליחה, יקירה, אבל יש שגיאה בטעינת העמוד. בואי ננסה שוב ביחד.');
});

it('calls reset callback when try-again button is clicked', async () => {
  const { user, reset } = renderError();

  const button = screen.getByRole('button', { name: 'נסי שוב' });
  await user.click(button);

  expect(reset).toHaveBeenCalledTimes(1);
});

function renderError() {
  const user = userEvent.setup();
  const reset = jest.fn();
  const renderResult = render(<Error reset={reset} />);

  return { renderResult, user, reset };
}
