// store/reducers/myReducer.js


const initialState = {
  currentLayerDataVariable: null,
  currentLayerNameVariable: null,
  queryDataVariable: null
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'layerData':
      return {
        ...state,
        currentLayerDataVariable: action.payload,
      };
    case 'queryData':
      return {
        ...state,
        queryDataVariable: action.payload,
      };
    case 'nameData':
      return {
        ...state,
        currentLayerNameVariable: action.payload,
      };
    default:
      return state;
  }
};

export default myReducer;