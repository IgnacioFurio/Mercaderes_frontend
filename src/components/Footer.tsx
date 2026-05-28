import { FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer className="container-fluid py-4 border-top border-light border-opacity-10">
        <div className="container">
            <div className="row gy-4 align-items-start">
            <div className="col-12 col-lg-4">
                <p className="mb-1 fw-bold text-light">Eddieden DM</p>
                <p className="mb-0 small text-light-emphasis">
                Desarrollador full-stack en formación y creador de herramientas
                para DMs, rol y gestión de partidas.
                </p>
            </div>

            <div className="col-12 col-lg-5">
                <p className="mb-1 fw-bold text-light">Mercaderes</p>
                <p className="mb-0 small text-light-emphasis">
                Generador simple de comerciantes, inventarios, precios dinámicos
                y ventas rápidas para partidas de rol de fantasía.
                </p>
            </div>

            <div className="col-12 col-lg-3">
                <p className="mb-2 fw-bold text-light">Dónde encontrarme</p>

                <div className="d-flex gap-3">
                <a
                    href="https://github.com/IgnacioFurio"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link d-flex justify-content-center align-items-center"
                    aria-label="GitHub de Ignacio Furió"
                >
                    <FaGithub />
                </a>

                <a
                    href="https://www.instagram.com/eddieden_dm"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link d-flex justify-content-center align-items-center"
                    aria-label="Instagram de Eddieden DM"
                >
                    <FaInstagram />
                </a>

                <a
                    href="https://www.youtube.com/@eddieden_dm"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link d-flex justify-content-center align-items-center"
                    aria-label="YouTube de Eddieden DM"
                >
                    <FaYoutube />
                </a>
                </div>
            </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-4 pt-3 border-top border-light border-opacity-10 small text-light-emphasis">
            <span>Mercaderes v1.0 · Generador simple</span>
            <span>Hecho para mesa, no para perder tiempo.</span>
            </div>
        </div>
        </footer>
    )
}