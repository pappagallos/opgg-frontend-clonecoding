/**
 * 리듀서 정의
 * @/reducer/cart.js
 */

// 리듀서 호출 타입 정의
export const RDU_CART_SAVE = "RDU_CART_SAVE";

/**
 * 리듀서의 액션 정의
 * @/actions/cart.js
 */

// 액션 타입 정의
export const ACT_CART_SAVE = "ACT_CART_SAVE";

// 리듀서가 가질 상태 정의
const initialState = {
    cart: {}
};

// 리듀서 정의
const cart = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        // 오늘의 집 API에서 받아온 장바구니 리스트를 Redux-saga 스토어에 저장하는 리듀서
        case RDU_CART_SAVE: {
            newState.cart = action.payload;

            return newState;
        }

        default: {
            return newState;
        }
    }
}

//================================================================================================

/**
 * 리듀서의 액션 정의
 * @/actions/cart.js
 */

// 액션 정의
export const cartSave = (payload) => {
    return {
        type: ACT_CART_SAVE,
        payload
    }
}

export default cart;