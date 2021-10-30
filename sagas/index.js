import { all, fork } from "redux-saga/effects";

import cart from './cart';

export default function* rootSaga() {
    yield all([
        fork(cart),
    ])
}
