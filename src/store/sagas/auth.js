import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import firebase from '@firebase/app';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    firebase.auth().signOut()

        .then(function () {
            console.log('Signout Succesfull')
        }, function (error) {
            console.log('Signout Failed')
        });
    yield put(actions.logoutSucceed());
}


export function* checkAuthTimeoutSaga(action) {
    yield delay(action.experationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkmIasd-HZWvFqxSS8XEQRA5wMJTuUQCw';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkmIasd-HZWvFqxSS8XEQRA5wMJTuUQCw';
    }

    try {

        const response = yield axios.post(url, authData);
        console.log("[work]] ", response);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        console.log("[work]]expirationDate ", expirationDate);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));

        console.log("[work]] localStorage", localStorage);
    } catch (error) {
        console.log("[noooo]]");
        yield put(actions.authFail(error.response.data.error));
    }
}
export function* authUserSagaSn(action) { //social network google, facebook etc.
    yield put(actions.authStart());
    const authData = {
        returnSecureToken: true,
        sNlogin: action.sNlogin
    };
    let provider = new firebase.auth.GoogleAuthProvider();
    if (action.sNlogin == 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    }
    yield firebase.auth().signInWithPopup(provider).then(response => {
        var token = response.credential.accessToken;
        var user = response.user;

        // axios.post(`/users.json`, data)
        //     .then(response => {
        //         dispatch(addNewPostSuccess(formData.imageFile));
        //         console.log('---------', data.key);
        //     })
        //     .catch(err => {
        //         dispatch(addNewPostFail())
        //     }
        //     );

        // response = response;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', response.credential.accessToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.user.uid);
        put(actions.authSuccess(response.credential.accessToken, response.user.uid));
        put(actions.checkAuthTimeout(3600));
        window.location.reload(false);
    }).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        put(actions.authFail(errorMessage));

    });



}

export function* authCheckStateSaga(action) {

    const token = yield localStorage.getItem('token');
    if (!token) {
        console.log("work !token");
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            console.log("work expirationDate <= new Date()");
            yield put(actions.logout());
        } else {
            console.log("work auto authCheckStateSaga");
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }

    }
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            console.log(" User is signed in.", user);

        }
        else {
            // User is signed out.
            console.log(" User is signed out..");

        }
    })
}