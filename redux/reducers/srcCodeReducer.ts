// srcCodeReducer.js

const initialState = {
  sourceCodeData: [], // Initial state for your source code data as an empty array
};

const srcCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SOURCE_CODE_DATA':
      return {
        ...state,
        sourceCodeData: action.payload, // Update the sourceCodeData with the payload
      };
    default:
      return state;
  }
};

export default srcCodeReducer;
