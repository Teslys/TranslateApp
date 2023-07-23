import {render, fireEvent} from '@testing-library/react-native'
import Home from '../Home'
import { Provider } from 'react-redux';
import store from '../../../store/store';

describe("home",() => {

    it("Home translate input",() => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        const input = getByTestId('translateInput');
        fireEvent.changeText(input, 'Merhaba Dünya');
        expect(input.props.value).toBe('Merhaba Dünya')
    })
})