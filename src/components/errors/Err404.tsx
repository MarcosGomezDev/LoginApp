import { Link } from 'react-router-dom'

export const Error404 = () => {
    return (
        <div>
            <hr />
            <h1>Error 404</h1>
            <p>Esta página no existe</p>
            <Link to="/inicio">Volver a inicio</Link>
        </div>
    )
}
