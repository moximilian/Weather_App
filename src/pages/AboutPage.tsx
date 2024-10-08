import Footer from '../components/Footer'
import Header from '../components/Header'

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="fadeInUp-animation">
                <div className="about">
                    Этот сайт был разработан лично мною как пример моего опыта работы на React-TS,
                    использование хуков, различных API и CSS на высоком уровне. Приложение позволяет
                    определить погоду в указанном городе.
                </div>
            </div>
            <Footer />
        </>
    )
}
