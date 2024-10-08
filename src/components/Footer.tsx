export default function Footer() {
    return (
        <>
            <footer>
                <div className="fadeInUp-animation">
                    <ul className="row">
                        <li>Brought by Maxim Syrov</li>
                        <li>2023 - {(new Date().getFullYear())}</li>
                        <li>Free Use</li>
                    </ul>
                </div>
            </footer>
        </>
    )
}
