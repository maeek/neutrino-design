import * as React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '../index';
it('Avatar - component', () => {
  it('Renders', () => {
    const wrapper = shallow(<Avatar text="Testing value" />);
  })
});
