import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('atoms/input/text', () => {
  it('should render input with label', () => {
    render(<Input label="Input" />);
    
    expect(screen.getByLabelText('Input')).toBeInTheDocument();
  });

  it('should render input with placeholder', () => {
    render(<Input placeholder="Input" />);
    
    expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
  });

  it('should invoke onChange input', () => {
    const onChangeFn = jest.fn();

    render(<Input onChange={onChangeFn} data-testid="inputTest" />);
    
    userEvent.type(screen.getByTestId('inputTest'), 'test');

    expect(onChangeFn).toHaveBeenCalledTimes(5);
  });

  it('should be disabled', () => {
    const onChangeFn = jest.fn();

    render(<Input onChange={onChangeFn} disabled value="test" data-testid="inputTest" />);
    
    userEvent.type(screen.getByTestId('inputTest'), 'something different');

    expect(onChangeFn).toHaveBeenCalledTimes(1);
  });

  it('should be readOnly', () => {
    const onChangeFn = jest.fn();

    render(<Input onChange={onChangeFn} readOnly value="test" data-testid="inputTest" />);
    
    userEvent.type(screen.getByTestId('inputTest'), 'something different');

    expect(onChangeFn).toHaveBeenCalledTimes(1);
  });

  it('should validate input', () => {
    const validate = jest.fn((val: string) => val === 'test');

    const { container } = render(<Input required validate={validate} data-testid="inputTest" />);
    
    userEvent.type(screen.getByTestId('inputTest'), 'te');

    for (let i = 0; i < 3; i++) {
      expect(validate.mock.results[ i ].value).toBeFalsy();
    }

    userEvent.type(screen.getByTestId('inputTest'), 'st');

    expect(validate.mock.results[ 4 ].value).toBeTruthy();
    expect(container.getElementsByClassName('ne-input-validation--valid')).toHaveLength(1);
  });

  it('should focus input on floating label click', () => {
    render(<Input label="Input" data-testid="inputTest" />);
    
    userEvent.click(screen.getByText('Input'));

    expect(screen.getByTestId('inputTest')).toHaveFocus();
  });

  it('should handle onClick', () => {
    const onClick = jest.fn();

    render(<Input onClick={onClick} data-testid="inputTest" />);

    userEvent.click(screen.getByTestId('inputTest'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should show clear button when type search and value not empty', () => {
    render(<Input type="search" clearButtonText="Clear" value="test" data-testid="inputTest" />);

    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('should hide clear button when type search and value empty', () => {
    const { container } = render(<Input type="search" clearButtonText="Clear" data-testid="inputTest" />);

    expect(container.getElementsByClassName('ne-input-search-clear')).toHaveLength(0);
  });

  it('should invoke onSearchClear', () => {
    const onSearchClear = jest.fn();
    const { container } = render(
      <Input
        type="search"
        clearButtonText="Clear"
        onSearchClear={onSearchClear}
        value="test"
        data-testid="inputTest"
      />
    );

    expect(screen.getByTestId('inputTest')).toHaveValue('test');

    userEvent.click(screen.getByText('Clear'));

    expect(container.getElementsByClassName('ne-input-search-clear')).toHaveLength(0);
    expect(screen.getByTestId('inputTest')).toHaveValue('');
    expect(onSearchClear).toHaveBeenCalledTimes(1);
  });
});
