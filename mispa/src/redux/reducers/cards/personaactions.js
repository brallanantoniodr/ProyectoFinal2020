import axios from 'axios';

export const addNewpersona = (newpersona) => {
  return {
    type: "NEW_persona_ADDED",
    payload: { data: newpersona }
  }
}

export const isLoadingpersona = () => {
    return {
        type: "persona_LOADING",
        payload: { "isLoading": true }
    }
}


export const loadingError = () => {
    return {
        type: "persona_LOAD_ERROR",
        payload: { "isLoading": false }
    }
}

export const personaLoaded = (persona) => {
    return {
        type: "persona_LOAD_SUCCES",
        payload: { "isLoading": false, "persona": persona || [] }
    }
}

export const loadpersonafranciscomorazan = () => {
    return (dispatch) => {
        dispatch(isLoadingpersona());
        axios.get('http://localhost:3000/api/censo/franciscomorazan')
            .then(
                (response) => {
                    dispatch(personaLoaded(response.data));
                }
            )
            .catch(
                (response) => {
                    console.log(response);
                    dispatch(loadingError);
                }
            );
    }
}

export const loadpersonacortes = () => {
    return (dispatch) => {
        dispatch(isLoadingpersona());
        axios.get('http://localhost:3000/api/censo/cortes')
            .then(
                (response) => {
                    dispatch(personaLoaded(response.data));
                }
            )
            .catch(
                (response) => {
                    console.log(response);
                    dispatch(loadingError);
                }
            );
    }
}

export const loadpersonaolancho = () => {
    return (dispatch) => {
        dispatch(isLoadingpersona());
        axios.get('http://localhost:3000/api/censo/olancho')
            .then(
                (response) => {
                    dispatch(personaLoaded(response.data));
                }
            )
            .catch(
                (response) => {
                    console.log(response);
                    dispatch(loadingError);
                }
            );
    }
}

export const addpersona = (Nombrepersona,FechaNacimiento,Tipogenero,Numerocedula,Codigoarea,estadocivil,Pesopersona,departamento) => {
  return (dispatch) => {
    dispatch(isLoadingpersona());
    axios.post('http://localhost:3000/api/censo/newpersona',
    {Nombrepersona:Nombrepersona,
       FechaNacimiento:FechaNacimiento, 
       Tipogenero:Tipogenero, 
       Numerocedula:Numerocedula,
       Codigoarea:Codigoarea,
       estadocivil:estadocivil,
       Pesopersona:Pesopersona,
       departamento:departamento,
       })
      .then(
        (response) => {
          window.location.reload();
        }
      )
      .catch(
        (response) => {
          console.log(response);
          dispatch(loadingError);
        }
      );
  }
}