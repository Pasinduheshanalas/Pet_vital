import { call, put } from "redux-saga/effects"; // ✅ Correct import
import { fetchDataApi } from "../../productAction";
import {
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
} from "../reducer/productSlice";
import { takeLatest } from "typed-redux-saga";

// Define a proper return type for the saga function
function* fetchDataSaga(): Generator<any, void, any> {
  try {
    const data = yield call(fetchDataApi);
    yield put(fetchDataSuccess(data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* productSaga() {
  yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}
