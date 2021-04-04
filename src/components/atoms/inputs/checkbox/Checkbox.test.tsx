import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckBox from './Checkbox';

describe('atoms/inputs/checkbox', () => {
  it('should render', () => {
    render(<CheckBox data-testid="inputTest" />);
    
    expect(screen.getByTestId('inputTest')).toBeInTheDocument();
  });

  it('should render with initial value', () => {
    const { container } = render(<CheckBox data-testid="inputTest" value={true} />);
    
    expect(container.querySelector('[data-checked="true"]')).toBeInTheDocument();
  });

  it('should switch onClick', () => {
    const onChange = jest.fn();
    const { container } = render(<CheckBox data-testid="inputTest" onChange={onChange} />);

    userEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
    expect(container.querySelector('[data-checked="true"]')).toBeInTheDocument();

    userEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(false);
    expect(container.querySelector('[data-checked="false"]')).toBeInTheDocument();
  });

  it.skip('should switch onEnter', () => { // Fix
    const onChange = jest.fn();
    const { container } = render(<CheckBox data-testid="inputTest" onChange={onChange} />);

    userEvent.type(screen.getByRole('checkbox'), '{Enter}', { skipClick: true });

    expect(onChange).toHaveBeenCalledWith(true);
    expect(container.querySelector('[data-checked="true"]')).toBeInTheDocument();

    userEvent.type(screen.getByRole('checkbox'), '{Enter}', { skipClick: true });

    expect(onChange).toHaveBeenCalledWith(false);
    expect(container.querySelector('[data-checked="false"]')).toBeInTheDocument();
  });
});
