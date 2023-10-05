// Action creator function for updating source code data
const setSourceCodeData = (data) => {
  return {
    type: 'UPDATE_SOURCE_CODE_DATA', // Specify the action type
    payload: data, // Attach the payload
  };
};

export { setSourceCodeData }; // Export the action creator(s)
