import { ADD_ITEM, CLEAR_ITEM, DECREMENT_ITEM, REFRESH_ITEM } from "./constant";

export const actAddItem = (item) => ({
    type: ADD_ITEM,
    payload: {
        item: {
            ...item,
            product: item.product || item 
        }
    }
});

export const actDecItem = (item) => ({
    type: DECREMENT_ITEM,
    payload: {
        item: item
    }
});

export const actClearItem = () => ({
    type: CLEAR_ITEM
})

export const actRefreshItem = (payload) => ({
    type: REFRESH_ITEM,
    payload
})