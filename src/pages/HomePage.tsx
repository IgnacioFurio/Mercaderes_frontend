function HomePage() {
    return (
        <main className="min-vh-100 bg-light">
        <section className="container py-5">
            <div className="row align-items-center min-vh-100">
            <div className="col-12 col-lg-8 col-xl-7">
                <p className="text-uppercase text-primary fw-semibold mb-2">
                Proyecto Mercaderes
                </p>

                <h1 className="display-4 fw-bold mb-4">
                Generador de mercaderes para partidas de rol
                </h1>

                <p className="lead text-secondary mb-4">
                Crea mercaderes, genera inventarios temporales, personaliza los
                objetos de venta y guarda tiendas completas para tus sesiones.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3">
                <button type="button" className="btn btn-primary btn-lg">
                    Generar mercader
                </button>

                <button type="button" className="btn btn-outline-secondary btn-lg">
                    Ver mercaderes guardados
                </button>
                </div>
            </div>
            </div>
        </section>
        </main>
    )
}

export default HomePage