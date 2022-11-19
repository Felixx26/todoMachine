import React, { useEffect } from 'react'

const SECURITY_CODE = 'paradigma'

const UseReducer = ({ name }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const onConfirm = () => dispatch({ type: actionTypes.confirm })

  const onError = () => dispatch({ type: actionTypes.error })

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value })
  }

  const onCheck = () => dispatch({ type: actionTypes.check })

  const onDelete = () => dispatch({ type: actionTypes.delete })

  const onReset = () => dispatch({ type: actionTypes.reset })

  useEffect(() => {
    console.log('Empezando efecto')
    if (state.loading) {
      setTimeout(() => {
        console.log('Empezando validacion')
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
        }
        console.log('Terminando validacion')
      }, 3000)
    }
    console.log('Terminando efecto')
  }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el código de seguridad.</p>

        {(state.error && !state.loading) && <p>El código de seguridad es incorrecto.</p>}

        {state.loading && <p>Cargando...</p>}

        <input
          placeholder='Código de seguridad'
          value={state.value}
          onChange={onWrite}
        />
        <button
          onClick={onCheck}
        >
          Comprobar
        </button>
      </div>
    )
  } else if (!state.deleted && state.confirmed) {
    return (
      <>
        <p>
          ¿Estás seguro de que quieres eliminar el componente?
        </p>
        <button
          onClick={onDelete}
        >
          Si, eliminar
        </button>
        <button
          onClick={onReset}
        >
          No, me arrepentí
        </button>
      </>
    )
  } else {
    return (
      <>
        <p>
          El componente ha sido eliminado.
        </p>
        <button
          onClick={onReset}
        >
          Volver a crear
        </button>
      </>
    )
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  check: 'CHECK',
  write: 'WRITE',
  delete: 'DELETE',
  reset: 'RESET'
}

const reducerObj = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true
  },
  ERROR: {
    ...state,
    loading: false,
    error: true
  },
  CHECK: {
    ...state,
    loading: true
  },
  WRITE: {
    ...state,
    value: payload
  },
  DELETE: {
    ...state,
    deleted: true
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
    value: ''
  }
})

const reducer = (state, action) => {
  if (reducerObj(state)[action.type]) {
    return reducerObj(state, action.payload)[action.type]
  } else {
    return state
  }
}

export { UseReducer }
