const initialState = {
    lastSubmitData: [], // Initial state for your source code data as an empty array
};
  
const lastSubmitReducer = (state = initialState, action) => {
switch (action.type) {
    case 'UPDATE_LAST_SUBMIT_DATA':
        return {
            ...state,
            lastSubmitData: action.payload, // Update the sourceCodeData with the payload
        };
    default:
        return state; 
}
};

export default lastSubmitReducer;
