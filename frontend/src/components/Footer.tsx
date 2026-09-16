const Footer = () => {
    return(
        <footer className="bg-blue-700 p-7">
            <div className="container flex flex-wrap items-center justify-between space-y-3 md:space-y-0">
                <span className="text-lg sm:text-2xl text-white font-medium md:font-bold tracking-tight">MernHolidays.com</span>

                <div className="flex justify-between md:justify-start gap-10 text-white text-sm md:font-bold">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;