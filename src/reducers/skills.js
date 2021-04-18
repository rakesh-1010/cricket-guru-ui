import {
    CREATE_SKILL,
    RETRIEVE_SKILLS,
    UPDATE_SKILLS,
    DELETE_SKILL,
    DELETE_ALL_SKILLS
} from "../actions/types";

const initialState = [];

function skillReducer(skills = initialState, action) {
const { type, payload } = action;

switch (type) {
    case CREATE_SKILL:
    return [...skills, payload];

    case RETRIEVE_SKILLS:
    return payload;

    case UPDATE_SKILLS:
    return skills;

    case DELETE_SKILL:
    return skills.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_SKILLS:
    return [];

    default:
    return skills;
}
};

export default skillReducer;