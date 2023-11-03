import { SET_CATEGORY, SET_PAGE, SET_SEARCH, SET_TAGS, SET_TOTAL_ITEM } from "./constants"

export const actSetCategory = (payload) => ({
    type: SET_CATEGORY,
    payload
});

export const actSetSearch = (payload) => ({
    type: SET_SEARCH,
    payload
});

export const actSetTags = (payload) => ({
    type: SET_TAGS,
    payload
});

export const actSetPage = (payload) => ({
    type: SET_PAGE,
    payload
});

export const actSetTotalItem = (payload) => ({
    type: SET_TOTAL_ITEM,
    payload
});