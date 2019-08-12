import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('<Button>', () => {
    it(':renders children', () => {
        const component = renderer.create(<Button>Test String</Button>).toJSON();
        expect(component).toMatchSnapshot();
    });
    it(':can have a border', () => {
        const component = renderer.create(
            <Button
                hasBorder={true}>
                Test String
            </Button>
        ).toJSON();
        expect(component).toMatchSnapshot();
    });
    it(':can be disabled', () => {
        const component = renderer.create(
            <Button
                disabled={true}>
                Test String
            </Button>
        ).toJSON();
        expect(component).toMatchSnapshot();
    });
});
