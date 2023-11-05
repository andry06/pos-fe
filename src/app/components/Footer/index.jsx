const Footer = () => {
    const style = { position: 'fixed', bottom: '0', width: '100%'
     }
    return(
        <footer style={{ style }} className="bg-primary text-white pb-2 pt-2 ">
        <div className="align-middle"><a href="/" className="text-white text-decoration-none fw-bold"> SEJAM CAFE </a>- Created By <a href="https://andrisuryono.vercel.app/" className="text-white text-decoration-none fw-bold">Andri Suryono</a></div>
    </footer>
    )
}

export default Footer;