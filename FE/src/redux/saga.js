
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { AUTH_ACTIONS, USER_ACTIONS, REGISTER_ACTIONS } from './action'
import { loginAPI, registerAPI } from '../services/authAPI'
import { Navigate } from 'react-router'
import { 
  push,
} from 'react-router-redux'
import store from '../index'


function* logout(action) {
  yield put({ type: 'LOGOUT_SUCCESS' })
}
// register
function* register(action) {
  try {
    // Call api from 3rd party

    const response = yield registerAPI(action.username, action.name, action.dob, action.password)
    yield put({ type: REGISTER_ACTIONS.REGISTER_SUCCESS })
  }
  catch (e) {
    console.log(e)
    yield put({ type: REGISTER_ACTIONS.REGISTER_ERROR, payload: e.response.data.message })
  }
}
function* login(action) {
  try {
    // Call api from 3rd party
    const response = yield loginAPI(action.username, action.password)
    // check if response is ok
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    yield put({
      type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: {
        token: response.data.token,
        user: response.data.user
      }
    })
    window.location.reload()
  }
  catch (e) {
    console.log(e)
    yield put({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: e.response.data.message })
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery(AUTH_ACTIONS.LOGIN, login)
  yield takeEvery(REGISTER_ACTIONS.REGISTER, register)
  yield takeEvery('LOGOUT', logout)
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/

export default mySaga
