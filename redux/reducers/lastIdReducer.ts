const initialState = {
    lastIdData: [], // Initial state for your source code data as an empty array
  };
  
  const lastIdReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_LAST_ID_DATA':
        return {
          ...state,
          lastIdData: action.payload, // Update the sourceCodeData with the payload
        };
      default:
        return state;
    }
  };
  
  export default lastIdReducer;
  