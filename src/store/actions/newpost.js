import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { storage } from '../../shared/firebase';

export const addNewPostStart = () => {
    return {
        type: actionTypes.ADD_NEW_POST_START
    };
};
export const addNewPostSuccess = (imageFile) => {
    return {
        type: actionTypes.ADD_NEW_POST_SUCCESS,
        imageFile: imageFile
    };
};

export const addNewPostFail = () => {
    return {
        type: actionTypes.ADD_NEW_POST_FAIL
    };
};
export const animateSuccesErrorButton = () => {
    return {
        type: actionTypes.ADD_ANIMATE_SCS_ERR_BTN
    };
};

export const addComentContent = (dataContent) => {
    console.log("fetchComentContent ", dataContent)
    return dispatch => {
        dispatch(addNewPostStart());
        let data = {
            name: dataContent.name,
            date: dataContent.date,
            textField: dataContent.textField,
            key: dataContent.key,
            email: dataContent.email,
            price: dataContent.price,
            //imgName: imgName.toString(),
            url: dataContent.url
        };
        axios.post(`/coment.json`, data)
            .then(response => {
                // dispatch(addNewPostSuccess(formData.imageFile));
                console.log('---------', dataContent.key);
                window.location.reload(false);
            })
            .catch(err => {
                dispatch(addNewPostFail())
            }
            );

    }
}
export const addNewPost = (formData, isUpdate, folderName) => {
    return dispatch => {
        dispatch(addNewPostStart());
        let imgName = [];
        let urlList = [];
        let data = {};
        //let folderName = '';
        let index = 0;
        //formData.Przepisy ? folderName = 'Przepisy' : folderName = 'newposts';
        // console.log('addNewPost action folderName2', folderName2);
        if (formData.imageFile.length == null && !isUpdate) {
            console.log('formData.imgName 1', formData);

            data = {
                location: formData.location,
                photographs: formData.photographs,
                przygotowanie: formData.przygotowanie,
                year: formData.year,
                textField: formData.textField,
                skladniki: formData.skladniki,
                describeData: formData.describeData,
                webAddress: formData.webAddress,
                key: formData.key,
                date: formData.date,
                price: formData.price,
                //imgName: imgName.toString(),
                url: urlList.toString()
            };
            axios.post(`/${folderName}.json`, data)
                .then(response => {
                    dispatch(addNewPostSuccess(formData.imageFile));
                    console.log('---------', data.key);
                })
                .catch(err => {
                    dispatch(addNewPostFail())
                }
                );
        } else
            if (!formData.imgName && !isUpdate) {
                Array.from(formData.imageFile).map((img, index) => {
                    imgName.push(img.file.name);
                    return imgName;
                });
                Array.from(formData.imageFile).map(img => {///${formData.key}
                    return storage.ref(`/images/${img.file.name}?key=${formData.key}`).put(img.file)
                        .then(res => {
                            storage
                                .ref(`${res.ref.fullPath}`)
                                .getDownloadURL().then(
                                    url => {
                                        console.log('addNewPost action imgName', imgName);
                                        console.log(url.toString());
                                        urlList.push(url);
                                        data = {
                                            location: formData.location,
                                            photographs: formData.photographs,
                                            przygotowanie: formData.przygotowanie,
                                            year: formData.year,
                                            textField: formData.textField,
                                            skladniki: formData.skladniki,
                                            describeData: formData.describeData,
                                            webAddress: formData.webAddress,
                                            key: formData.key,
                                            date: formData.date,
                                            price: formData.price,
                                            imgName: imgName.toString(),
                                            url: urlList.toString()
                                        };
                                        index++;
                                        if (formData.imageFile.length === index) {
                                            axios.post(`/${folderName}.json`, data)
                                                .then(response => {
                                                    dispatch(addNewPostSuccess(formData.imageFile));
                                                    console.log('---------', data.key);
                                                })
                                                .catch(err => {
                                                    dispatch(addNewPostFail())
                                                }
                                                );
                                        }
                                    }
                                )
                        });
                });
                console.log('formData.imgName ', imgName);

            } else {
                console.log('2');
                if (formData.imageFile.length >= 1) {
                    console.log('3');
                    storage.ref(`/images/${formData.imgName}?key=${formData.key}`).delete().then(response => {
                        axios.delete(`/${folderName}/${formData.id}.json`, { data: { key: formData.key } }).then(response => {
                            Array.from(formData.imageFile).map(img => {
                                return storage.ref(`/images/${img.file.name}?key=${formData.key}`).put(img.file)
                                    .then(res => {
                                        let data = {};
                                        storage
                                            .ref(`${res.ref.fullPath}`)
                                            .getDownloadURL().then(
                                                url => {
                                                    console.log(url.toString());
                                                    data = {
                                                        location: formData.location,
                                                        photographs: formData.photographs,
                                                        przygotowanie: formData.przygotowanie,
                                                        year: formData.year,
                                                        describeData: formData.describeData,
                                                        webAddress: formData.webAddress,
                                                        skladniki: formData.skladniki,
                                                        textField: formData.textField,
                                                        key: formData.key,
                                                        date: formData.date,
                                                        price: formData.price,
                                                        imgName: imgName.toString(),
                                                        url: urlList.toString()
                                                    };
                                                    axios.post(`/${folderName}.json`, data)
                                                        .then(response => {
                                                            dispatch(addNewPostSuccess(formData.imageFile));
                                                        })
                                                        .catch(err => {
                                                            dispatch(addNewPostFail())
                                                        }
                                                        );
                                                }
                                            )
                                    });
                            });
                        })
                    })
                } else {
                    console.log('4');
                    axios.delete(`/${folderName}/${formData.id}.json`, { data: { key: formData.key } }).then(response => {
                        console.log(response);
                        axios.post(`/${folderName}.json`, formData)
                            .then(response => {
                                dispatch(addNewPostSuccess());
                                console.log('-----update----', formData);

                            })
                            .catch(err => {
                                dispatch(addNewPostFail())
                            }
                            );
                    });
                }
            }

        // initiates the firebase side uploading
        // uploadTask.on('state_changed',
        //     (snapShot) => {
        //         //takes a snap shot of the process as it is happening
        //         console.log(snapShot)
        //     }, (err) => {
        //         console.log(err)
        //     }, () => {
        //         storage.ref('images').child(this.state.imageFile.name).getDownloadURL()
        //             .then(fireBaseUrl => {
        //                 console.log('[storege ref] ' + fireBaseUrl);
        //             })
        //     })
    };
};

export const addNewPostContainer = () => {
    return {
        type: actionTypes.ADD_NEW_POST_CONTAINER
    }
}
export const updatePostData = (postData) => {
    return {
        type: actionTypes.UPDATE_POST_DATA,
        updateData: postData
    }
}

export const updateComentContent = (data) => {
    return dispatch => {
        axios.delete(`/coment/${data.id}.json`, { data: { key: data.key } }).then(response => {
            axios.post(`/coment.json`, data)
                .then(response => {
                    // dispatch(addNewPostSuccess(formData.imageFile));
                    window.location.reload(false);
                })
                .catch(err => {
                    dispatch(addNewPostFail())
                })
        });

    };
}


// export const addNewPrzepisyContainerStart = () => {
//     return {
//         type: actionTypes.ADD_NEW_PRZEPISY_CONTAINER_START
//     }
// }
// export const addNewPrzepisyContainerSuccess = (PrzepisyData) => {
//     return {
//         type: actionTypes.ADD_NEW_PRZEPISY_CONTAINER_SUCCESS,
//         PrzepisyData: PrzepisyData
//     }
// }
// export const addNewPrzepisyContainerFail = () => {
//     return {
//         type: actionTypes.ADD_NEW_PRZEPISY_CONTAINER_FAIL
//     }
// }
// export const addNewPrzepisyContainer = (PrzepisyData) => {
//     return dispatch => {

//     }
// }

