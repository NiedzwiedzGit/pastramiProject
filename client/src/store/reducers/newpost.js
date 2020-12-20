import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    animate: false,
    imageFile:null,
    addNewPostContainer:false,
    updateData:null,
    updateHandler:false
};


const addNewPostStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addNewPostSuccess = (state, action) => {
    return updateObject(state, { loading: false, imageFile:action.imageFile});
};


const addNewPostFail = (state, action) => {
    return updateObject(state, { loading: true });
};

const animateSuccesErrorButton = (state, action) => {
    return updateObject(state, { animate: !state.animate });
}
const addNewPostContainerHandler=(state, action)=>{ 
    return updateObject(state, { addNewPostContainer: !state.addNewPostContainer });
}
const updatePostData=(state, action)=>{
    return updateObject(state, { updateData: action.updateData,
    updateHandler:!state.updateHandler
     });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_POST_START: return addNewPostStart(state, action);
        case actionTypes.ADD_NEW_POST_SUCCESS: return addNewPostSuccess(state, action);
        case actionTypes.ADD_NEW_POST_FAIL: return addNewPostFail(state, action);
        case actionTypes.ADD_ANIMATE_SCS_ERR_BTN: return animateSuccesErrorButton(state, action);
        case actionTypes.ADD_NEW_POST_CONTAINER: return addNewPostContainerHandler(state, action);
        case actionTypes.UPDATE_POST_DATA: return updatePostData(state, action);

        default: return state;
    }
};

export default reducer;