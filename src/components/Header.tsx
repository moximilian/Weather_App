

export default function Header() {
    return <>

        <div className="navbar">
            <ul className="row">
                <div className='fadeInUp-animation'>
                    <span className="row-low">
                        <div className="geoposition"></div>
                        <li><a href="/">Find me</a></li>
                    </span>
                </div>

                <li className='fadeInUp-animation'><a href="/">Other place</a></li>
                <li className='fadeInUp-animation'><a href="/">About us</a></li>
            </ul>
        </div>
    </>;
}