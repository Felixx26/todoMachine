import React, { useEffect } from 'react'

const SECURITY_CODE = 'paradigma'

const UseState = ({ name }) => {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  })

  // const [error, setError] = React.useState(false)
  // const [value, setValue] = React.useState('')
  // const [loading, setLoading] = React.useState(false)

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true
    })
  }

  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: true
    })
  }

  const onWrite = newValue => {
    setState({
      ...state,
      value: newValue
    })
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true
    })
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true
    })
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    })
  }

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
          onChange={e => {
            onWrite(e.target.value)
            // setValue(e.target.value)
          }}
        />
        <button
          onClick={() => {
            // setError(false)
            onCheck()
          }}
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
          onClick={() => {
            onDelete()
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            onReset()
          }}
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
          onClick={() => {
            onReset()
          }}
        >
          Volver a crear
        </button>
      </>
    )
  }
}

export { UseState }
