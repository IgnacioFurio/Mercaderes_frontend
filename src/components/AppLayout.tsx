import { Outlet } from 'react-router-dom'

import { Footer } from './Footer'

export const AppLayout = () => {
    return (
        <main className="min-vh-100 bg-dark text-light d-flex flex-column">
            <div className="flex-grow-1">
                <Outlet />
            </div>

            <Footer />
        </main>
    )
}