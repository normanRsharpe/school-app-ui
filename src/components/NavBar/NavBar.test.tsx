import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from '../../components/NavBar/NavBar';

describe('<NavBar>', () => {
  it('renders a default view', () => {
    const tree = renderer.create(<NavBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
