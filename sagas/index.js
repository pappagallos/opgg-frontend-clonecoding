import { all, fork } from "redux-saga/effects";

import summoner from './summoner';

export default function* rootSaga() {
    yield all([
        fork(summoner),
    ])
}
