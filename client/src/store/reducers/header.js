import *as actionTypes from '../actions/actionTypes';
const initialState = {
    headerTitles: [
        { title: 'PRASA' },
        { title: 'INFO' },
        { title: 'HISTORIA' },
        { title: 'KLIENCI' },
        { title: 'KONTAKT' },
        { title: 'POBIERZ' }
    ]
};

const addHeaderItem = (state, action) => {
    // console.log("work");
    return state;
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_HEADER_ITEM: return addHeaderItem(state, action);
        default: return state;
    }
};
export default reducer;