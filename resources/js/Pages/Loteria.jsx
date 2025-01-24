import { Head, Link } from '@inertiajs/react';
import logo from '../../../public/images/logo.png';

export default function Loteria({ auth, laravelVersion, phpVersion }) {
    

    return (
        <>
            <Head title="Loteria" />
            <div className="bg-gray-50 text-black/50">
           
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#112D20] selection:text-blue">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            
                            
                            <div className="flex lg:col-start-2 lg:justify-center">
                            <img className="h-12 w-auto lg:h-16" src={logo} height={50} width={50} />
                               
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        
                                        <Link
                                            href={route('loteria')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                        >
                                            Loteria
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                           Ingresar
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Registro
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-2">
                            <div className="grid gap-12 lg:grid-cols-1 lg:gap-2 border-4 border-cyan-600 rounded-lg max-h-40 overflow-y-auto">
                                <div
                                    className=" rounded-lg bg-white p-3 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] "
                                >
                                   

                                       
                                        <div className="grid grid-cols-10 gap-2 text-white/70">
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >01</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >02</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >03</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >04</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >05</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >06</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >07</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >08</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >09</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >10</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >11</div>
                                            <div className='bg-red-600 rounded-lg p-2 text-center' > X</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >13</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >14</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >15</div>
                                            <div className='bg-red-600 rounded-lg p-2 text-center' > X</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >17</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >18</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >19</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >20</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >21</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >22</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >23</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >24</div>
                                            <div className='bg-red-600 rounded-lg p-2 text-center' > X</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >26</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >27</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >28</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >29</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >30</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >31</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >32</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >33</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >04</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >04</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >04</div>
                                            <div className='bg-cyan-900 rounded-lg p-2 text-center' >04</div>
                                        </div>
                                    
                                </div>

                                

                               
                            </div>

                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
