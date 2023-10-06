// Action creator function for updating source code data
const setLastIdData = (data) => {
    return {
        type: 'UPDATE_LAST_ID_DATA', // Specify the action type
        payload: data, // Attach the payload
    };
};

export { setLastIdData }; // Export the action creator(s)
