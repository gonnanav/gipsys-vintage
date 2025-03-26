import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ErrorPage } from './error-page';

it('renders the error heading', () => {
  renderError();

  screen.getByRole('heading', { level: 1, name: 'שגיאה בטעינת העמוד' });
});

it('renders the error message', () => {
  renderError();

  screen.getByText('סליחה, אבל קרתה שגיאה בטעינת העמוד. בואי ננסה שוב ביחד.');
});

it('calls reset when resetting', async () => {
  const { user, reset } = renderError();

  const button = screen.getByRole('button', { name: 'נסי שוב' });
  await user.click(button);

  expect(reset).toHaveBeenCalledTimes(1);
});

function renderError() {
  const user = userEvent.setup();
  const error = new Error('error');
  const reset = jest.fn();
  const renderResult = render(<ErrorPage error={error} reset={reset} />);

  return { renderResult, user, reset };
}
