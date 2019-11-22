const Reducer=( state={locations:[]},action)=>{
  switch(action.type){
    case 'ADD':
      return {locations:[...state.locations,action.location]}
    case 'DELETE':
      return {locations:state.locations.filter((element,index)=> action.index!==index)}
    default:
      return state;
  }
}

export default Reducer;