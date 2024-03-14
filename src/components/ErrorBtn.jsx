import { Link, useNavigate } from 'react-router-dom'

export default function ErrorBtn() {
    let navigate = useNavigate()
    let goBack = () => {
        navigate(-1)
    }
    return (
        <main>
            <div className="d-flex justify-content-around">
                <div>
                    <Link to={`/`} className="text-decoration-none btn btn-outline-warning text-dark">
                        الصفحة الرئيسية
                    </Link>
                </div>
                <div>
                    <button onClick={goBack} className="text-decoration-none btn btn-outline-warning text-dark">
                        الرجوع
                    </button>
                </div>
            </div>
        </main>
    )
}
