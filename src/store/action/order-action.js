export const ADD_ORDER = 'ADD_ORDER';


export const addOrder = () => {
    return async dispatch => {
  
    //   const date = new Date();
    //   const response = await fetch(
    //     `https://rn-shoppingapp-4e485.firebaseio.com/orders/${userId}.json?auth=${token}`,
    //     {
    //       method: 'POST',
    //       headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify({
    //         cartItems,
    //         totalAmount,
    //         date: date.toISOString(),
    //       }),
    //     },
    //   );
  
    //   if (!response.ok) {
    //     throw new Error('Something wrong!');
    //   }
  
    //   const resData = await response.json();
  
      dispatch({
        type: ADD_ORDER,
      });
    };
  };