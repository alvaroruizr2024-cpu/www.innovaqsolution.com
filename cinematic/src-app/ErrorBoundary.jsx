import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="nowebgl" role="alert">
        <p style={{ padding: 28, maxWidth: 520 }}>
          WebGL no pudo iniciar en este dispositivo. Escríbanos a contacto@innovaqsolution.com o use el formulario más abajo.
        </p>
      </div>
    )
  }
}
