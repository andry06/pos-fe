import { CHECKLIST_ITEM } from "./constants";

export const actChecklistItem = (payload) => ({
    type: CHECKLIST_ITEM,
    payload
});