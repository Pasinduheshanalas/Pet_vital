// import { watchCounterSaga } from "./counterSaga";
import { all } from "typed-redux-saga";
import { productSaga } from "../../pages/products/redux/saga/productSaga";
// import { watchAuthSaga } from "./authSaga";
// import { watchProfileSaga } from "./profileSaga";

export default function* rootSaga() {
  yield all([productSaga()]);
}
