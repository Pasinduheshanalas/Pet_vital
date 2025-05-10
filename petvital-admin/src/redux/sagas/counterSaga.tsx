import { increment } from "../reducer/counterReducer";
import { takeEvery, put, delay } from "typed-redux-saga";

// import { put } from "redux-saga/effects";

function* incrementAsyncSaga() {
  yield delay(1000); // Wait for 1 second
  yield put(increment());
}

export function* watchCounterSaga() {
  yield takeEvery("counter/incrementAsync", incrementAsyncSaga);
}
