// Action creator function for updating source code data
const setLastSubmitData = (data) => {
    return {
        type: 'UPDATE_LAST_SUBMIT_DATA', // Specify the action type
        payload: data, // Attach the payload
    };
};

export { setLastSubmitData }; // Export the action creator(s)
