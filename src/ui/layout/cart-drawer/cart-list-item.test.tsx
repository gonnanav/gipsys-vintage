import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartListItem } from './cart-list-item';
import { placeholderImage, Product } from '@/core/product';
import { cottonScarf, puffSleeveTop } from '@/fixtures/products';

it("renders the item's name", () => {
  renderCartListItem(puffSleeveTop);

  expect(getCartListItem()).toHaveTextContent(puffSleeveTop.name);
});

it("renders the item's price", () => {
  renderCartListItem(puffSleeveTop);

  expect(getCartListItem()).toHaveTextContent(`₪${puffSleeveTop.price}`);
});

it("renders the item's main image", () => {
  renderCartListItem(puffSleeveTop);

  expect(getCartItemMainImage(puffSleeveTop)).toBeInTheDocument();
});

it("renders the placeholder image when the item doesn't have an image", () => {
  renderCartListItem(cottonScarf);

  expect(getCartItemImage(placeholderImage.alt)).toBeInTheDocument();
});

it("calls removeFromCart with the item's id when the remove button is clicked", async () => {
  const user = userEvent.setup();
  const { removeFromCart } = renderCartListItem(puffSleeveTop);

  await user.click(getRemoveCartItemButton());

  expect(removeFromCart).toHaveBeenCalledWith(puffSleeveTop.id);
});

function renderCartListItem(item: Product) {
  const removeFromCart = jest.fn();
  const renderResult = render(<CartListItem item={item} removeFromCart={removeFromCart} />);

  return { ...renderResult, removeFromCart };
}

function getCartListItem() {
  return screen.getByRole('listitem');
}

function getCartItemMainImage(item: Product) {
  const mainImageName = item.images?.[0].alt;

  return getCartItemImage(mainImageName);
}

function getCartItemImage(name?: string) {
  return within(getCartListItem()).getByRole('img', { name });
}

function getRemoveCartItemButton() {
  return screen.getByRole('button', { name: 'הסירי מסל הקניות' });
}
