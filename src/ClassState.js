import React, { Component } from 'react'
import { Loading } from './Loading'

const SECURITY_CODE = 'paradigma'

class ClassState extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      error: false,
      loading: false
    }
  }

  // UNSAFE_componentWillMount () {
  //   console.log('componentWillMount')
  // }

  // componentDidMount () {
  //   console.log('componentDidMount')
  // }

  componentDidUpdate () {
    console.log('componentDidUpdate')
    if (this.state.loading) {
      setTimeout(() => {
        console.log('Empezando validacion')
        if (this.state.value === SECURITY_CODE) {
          this.setState({ error: false, loading: false })
        } else {
          this.setState({ error: true, loading: false })
        }
        console.log('Terminando validacion')
      }, 3000)
    }
  }

  render () {
    const { error, value, loading } = this.state
    return (
      <div>
        <h2>Eliminar ClassState</h2>
        <p>Por favor escribe el código de seguridad.</p>

        {(error && !loading) && <p>El código de seguridad es incorrecto.</p>}
        {loading && <Loading />}

        <input
          placeholder='Código de seguridad'
          value={value}
          onChange={e => {
            this.setState({ value: e.target.value })
          }}
        />
        <button
          onClick={() =>
            this.setState({ loading: true })}
        >
          Comprobar
        </button>
      </div>
    )
  }
}

export { ClassState }
