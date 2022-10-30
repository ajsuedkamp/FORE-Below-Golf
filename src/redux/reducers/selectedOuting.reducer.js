const selectedOutting = (state = {}, action) => {
    switch (action.type) {
      case 'SET_VENUE_DETAILS':
        return action.payload;
      default:
        return state;
    }
  }

  export default selectedOutting;