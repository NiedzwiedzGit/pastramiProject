import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    imageContentPath: [],
    imageContentFullPath: [],
    loading: null,
    loadingContent: null,
    postContent: [],
    Przepisy: [],
    textVar: [],
    comentVar: [],
    refresh: false,
    urlArray: null,
    adminId: 'shkliarskiyigor@gmail.com',
    formIsValid: false,
    payActive: false
};

const fetchMainContentStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMainContentSuccess = (state, action) => {
    return updateObject(state, {
        imageContentPath: action.path,
        imageContentFullPath: action.fullPath,
        loading: false,
        refresh: true
    });
};
const fetchMainContentFail = (state, action) => {
    return updateObject(state, { loading: false });
};


const fetchPostContentStart = (state, action) => {
    return updateObject(state, { loadingContent: true });
};

const fetchPostContentSuccess = (state, action) => {
    return updateObject(state, {
        loadingContent: false,
        postContent: action.postContent
    });

};
const fetchPrzepisySuccess = (state, action) => {
    return updateObject(state, {
        // loadingContent: false,
        Przepisy: action.Przepisy
    });
};

const fetchTextSuccess = (state, action) => {
    return updateObject(state, {
        // loadingContent: false,
        textVar: action.textVar
    });
};

const fetchComentSuccess = (state, action) => {
    return updateObject(state, {
        // loadingContent: false,
        comentVar: action.comentVar
    });
};

const fetchPostContentFail = (state, action) => {
    return updateObject(state, { loadingContent: false });
};
const fetchPostUrlList = (state, action) => {
    return updateObject(state, { urlArray: action.urlArray });
};
const fetchFormIsValid = (state, action) => {
    return updateObject(state, { formIsValid: action.formIsValid });
};
const fetchPay = (state, action) => {
    return updateObject(state, { payActive: action.payActive });

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MAIN_CONTENT_START: return fetchMainContentStart(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_SUCCESS: return fetchMainContentSuccess(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_FAIL: return fetchMainContentFail(state, action);
        case actionTypes.FETCH_POST_CONTENT_START: return fetchPostContentStart(state, action);
        case actionTypes.FETCH_POST_CONTENT_SUCCESS: return fetchPostContentSuccess(state, action);
        case actionTypes.FETCH_POST_CONTENT_FAIL: return fetchPostContentFail(state, action);
        case actionTypes.FETCH_POST_URL_LIST: return fetchPostUrlList(state, action);
        case actionTypes.FETCH_PRZEPISY_SUCCESS: return fetchPrzepisySuccess(state, action);
        case actionTypes.FETCH_TEXT_SUCCESS: return fetchTextSuccess(state, action);
        case actionTypes.FETCH_COMENT_SUCCESS: return fetchComentSuccess(state, action);
        case actionTypes.CHECK_FORM_IS_VALID: return fetchFormIsValid(state, action);
        case actionTypes.CHECK_PAY: return fetchPay(state, action);
        default: return state;
    }
};

export default reducer;