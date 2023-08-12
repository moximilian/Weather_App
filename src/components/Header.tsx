import { Link } from 'react-router-dom'
export default function Header() {
    return <>
        <div className="navbar">
            <ul className="row">
                <div className='fadeInUp-animation'>
                    <span className="row-low">
                        <div className="geoposition"></div>
                        <li className='fadeInUp-animation'><Link to="/here">Find me</Link></li>
                    </span>
                </div>

                <li className='fadeInUp-animation'><Link to="/">Other place</Link></li>
                <li className='fadeInUp-animation'><Link to="/about">About us</Link></li>
            </ul>
        </div>
    </>
};