import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('buttons/index', () => {
  it('should render', () => {
    render(<Button>test button</Button>);

    expect(screen.getByText('test button')).toBeInTheDocument();
  });

  it('should render as link type', () => {
    render(
      <Button
        type='link'
        href='https://example.com/'
        target='_blank'
        rel='noreferrer'
      >
        test button
      </Button>
    );

    const linkElem = screen.getByText('test button').closest('a');
    expect(linkElem).toHaveAttribute('href', 'https://example.com/');
    expect(linkElem).toHaveAttribute('target', '_blank');
    expect(linkElem).toHaveAttribute('rel', 'noreferrer');
  });

  it('should invoke onClick when not disabled', () => {
    const onClickMock = jest.fn();

    render(
      <Button
        disabled={false}
        onClick={onClickMock}
      >
        test button
      </Button>
    );

    userEvent.click(screen.getByText('test button'));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not invoke onClick when disabled', () => {
    const onClickMock = jest.fn();

    render(
      <Button
        disabled={true}
        onClick={onClickMock}
      >
        test button
      </Button>
    );

    userEvent.click(screen.getByText('test button'));

    expect(onClickMock).toHaveBeenCalledTimes(0);
  });

  it('should be accessible', () => {
    render(<Button>test button</Button>);

    userEvent.tab();

    expect(screen.getByText('test button')).toHaveFocus();
  });

  it('should invoke onClick when pressed enter or space on focus', () => {
    const onClickMock = jest.fn();

    render(<Button onClick={onClickMock}>test button</Button>);

    userEvent.tab();
    userEvent.type(screen.getByText('test button'), '{enter}', { skipClick: true });
    expect(onClickMock).toHaveBeenCalledTimes(1);
    userEvent.type(screen.getByText('test button'), '{space}', { skipClick: true });
    expect(onClickMock).toHaveBeenCalledTimes(2);
  });

  it('should combine classNames', () => {
    const { container } = render(<Button className='test-classname'>test button</Button>);

    expect(container.firstChild).toHaveClass('ne-button');
    expect(container.firstChild).toHaveClass('test-classname');
  });
});
