const personaInitState = {
    persona_isLoading: false,
    persona: []
};

const personaReducer = (state = personaInitState, action) => {
    switch (action.type) {
        case "ADD_persona":
            let Codigopersona = action.payload.Codigopersona;
            let FechaNacimiento = action.payload.FechaNacimiento;
            let TipoConcentrado = action.payload.TipoConcentrado;
            let NumeroCorral = action.payload.NumeroCorral;
            let CodigoCamada = action.payload.CodigoCamada;
            let Razapersona = action.payload.Razapersona;
            let Pesopersona = action.payload.Pesopersona;
            let Tipopersona = action.payload.Tipopersona;
            let Estadopersona = action.payload.Estadopersona;

            let _persona = { "Codigopersona": Codigopersona, "FechaNacimiento": FechaNacimiento,"TipoConcentrado":TipoConcentrado,"NumeroCorral":NumeroCorral,"CodigoCamada":CodigoCamada,"Razapersona":Razapersona,"Pesopersona":Pesopersona,"Tipopersona":Tipopersona,"Estadopersona":Estadopersona };
            return {...state, persona: [...state.persona, _persona] }
        case "persona_LOADING":
            return {...state, persona_isLoading: true };
        case "persona_LOAD_ERROR":
            return {...state, persona_isLoading: false };
        case "persona_LOAD_SUCCES":
            return {...state, persona: action.payload.persona, persona_isLoading: false };
        case "NEW_persona_ADDED":
            return {...state, persona: [...state.persona, action.payload.data], persona_isLoading: false  };
        case "persona_CHANGE_COLOR":
            let _npersona = state.persona.map(
              (_persona, i ) => {
                if(_persona._id === action.payload._Id) {
                  _persona.Estadopersona = action.payload.Estadopersona;
                  return _persona;
                }
                return _persona;
              }
            );
            console.log(action);
            return { ...state, persona : _npersona};
        default:
            return state;
    }
}

export default personaReducer;
