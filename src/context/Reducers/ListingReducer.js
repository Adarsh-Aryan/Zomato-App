export const ListingReducer=(state,action)=>{
    switch (action.type) {
        case 'FILTER_BY_SORT':
            return{
                ...state,
                sort:action.payload
            }

        case 'FILTER_BY_CUISINE':
            return{
                ...state,
                byCuisine:action.payload
            }

        case 'FILTER_BY_COST':
            return{
                ...state,
                byCost:action.payload
            }

        case 'CLEAR_FILTERS':
            return{
                sort:'',
                byCuisine:'',
                byCost:''
            }
            
    
        default:
            throw new Error('Invalid Action!')
    }

}