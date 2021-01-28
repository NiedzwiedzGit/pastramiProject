import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { storage } from '../../shared/firebase';

export const fetchMainContentSuccess = (path, fullPath) => {
    // console.log('path of img ', path);
    // console.log('fullPath of img ', fullPath);
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_SUCCESS,
        path: path,
        fullPath: fullPath,
    };

};
export const fetchMainContentStart = () => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_START
    };
};
export const fetchMainContentFail = (error) => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_FAIL,
        error: error
    };
};


export const fetchPostContentSuccess = (postContent) => {
    return {
        type: actionTypes.FETCH_POST_CONTENT_SUCCESS,
        postContent: postContent
    };
};
export const fetchPrzepisySuccess = (Przepisy) => {
    // console.log('[reduser Przepisy] ', Przepisy);
    return {
        type: actionTypes.FETCH_PRZEPISY_SUCCESS,
        Przepisy: Przepisy
    };
};
export const fetchPostContentStart = () => {
    return {
        type: actionTypes.FETCH_POST_CONTENT_START
    };
};
export const fetchPostContentFail = (error) => {
    return {
        type: actionTypes.FETCH_POST_CONTENT_FAIL,
        error: error
    };
};

export const fetchTextSuccess = (textVar) => {
    // console.log('[reduser textVar] ', textVar);
    return {
        type: actionTypes.FETCH_TEXT_SUCCESS,
        textVar: textVar
    };
};

export const fetchComentSuccess = (comentVar) => {
    // console.log('[reduser textVar] ', comentVar);
    return {
        type: actionTypes.FETCH_COMENT_SUCCESS,
        comentVar: comentVar
    };
};


export const getUrlArray = (urlArray) => {
    // console.log("getUrlArray ", urlArray)

    return {
        type: actionTypes.FETCH_POST_URL_LIST,
        urlArray: urlArray

    }
}

export const checkFormIsValid = (formIsValid) => {
    return {
        type: actionTypes.CHECK_FORM_IS_VALID,
        formIsValid: formIsValid
    }
}


export const fetchPostContent = () => {
    return dispatch => {
        dispatch(() => fetchPostContentStart());
        axios.get('/newposts.json')
            .then(response => {
                const fetchOrders = [];
                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchPostContentSuccess(fetchOrders));
            }).catch(error => {
                dispatch(fetchPostContentFail(error));
            });

    };
};

export const fetchPrzepisyContent = () => {
    return dispatch => {
        dispatch(() => fetchPostContentStart());
        axios.get('/przepisy.json')
            .then(response => {
                // console.log('[reduser Przepisy!!!] ', Przepisy);
                const Przepisy = [];
                for (let key in response.data) {
                    Przepisy.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchPrzepisySuccess(Przepisy));
            }).catch(error => {
                dispatch(fetchPostContentFail(error));
            });
    }
}
export const fetchTextContent = (folderName) => {
    let textVar = [];
    return dispatch => {
        dispatch(() => fetchMainContentStart());

        if (folderName == "clean") {
            dispatch(fetchTextSuccess(textVar))
        } else {
            axios.get(`/${folderName}.json`)
                .then(response => {
                    // console.log('[reduser Przepisy!!!] ', Przepisy);

                    for (let key in response.data) {
                        textVar.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                    dispatch(fetchTextSuccess(textVar));
                }).catch(error => {
                    dispatch(fetchMainContentFail(error));
                });
        }
    }
}
export const fetchComentContent = (folderName) => {
    return dispatch => {
        dispatch(() => fetchMainContentStart());
        axios.get(`/${folderName}.json`)
            .then(response => {
                // console.log('[reduser Przepisy!!!] ', Przepisy);
                const comentVar = [];
                for (let key in response.data) {
                    comentVar.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchComentSuccess(comentVar));
                //console.log("comentVar ", comentVar)
            }).catch(error => {
                dispatch(fetchMainContentFail(error));
            });
    }
}
export const deletePost = (id, imgName, key, folderName) => {
    // console.log('[you want delete]=>', id)
    // console.log('[you want delete imgName]=>', imgName)
    return dispatch => {
        axios.delete(`/${folderName}/${id}.json`, { data: { imgName: imgName } }).then(response => {
            // console.log(response);
        });
        axios.delete(`/${folderName}/${id}.json`, { data: { imgName: imgName } }).then(response => {
            // console.log(response);
        });
        Array.from(imgName.split(",")).map(rer => {
            // console.log(rer)
            return storage.ref(`/images/${rer}?key=${key}`).delete();

        })
        //storage.ref(`/images/${imgName}?key=${key}`).delete();
        //     console.log('[you want delete path',`/images/${imgName}?key=${key}`)        
    };

    // storage.ref(`/images/${img.file.name}?key=${response.data.name}`).remove();
    // userRef.remove()
    // const uploadTask = storage.ref(`/images/${img.file.name}?key=${response.data.name}`).put(img.file);
};



export const deleteComent = (id, key) => {
    // console.log('[you want delete]=>', id)
    // console.log('[you want delete key]=>', key)
    return dispatch => {
        axios.delete(`/coment/${id}.json`, { data: { key: key } }).then(response => {
        });

    };
}

