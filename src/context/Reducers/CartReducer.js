export const CartReducer=(state,action)=>{
    switch (action.type) {
        case 'ADD_TO_CART':
            return{
                ...state,
                cart:[...state.cart,{...action.payload,qty:1}]
            }
         
        case 'REMOVE_FROM_CART':
            return{
                ...state,
                cart:state.cart.filter(c=>{
                    return c.menu_id!==action.payload.menu_id
                })
            }
        case 'ON_CHANGE_QUANTITY':
            return{
                ...state,
                cart:state.cart.filter(c=>{
                    return c.menu_id===action.payload.id?c.qty=action.payload.qty:c.qty
                })
            }
        
        case 'CLEAR_CART':
            return{
                cart:[]
            }
        
        default:
            throw new Error('Invalid Action!')
    }
}