import "./Loader.scss";
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <>
            <div className="loader-container">
                <div className="message">
                    <img className='img' alt="logo" loading='lazy'
                        src={`https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png`} />
                    <div className="title">
                        Welcome to  Aventuras
                        &nbsp;
                    </div>
                </div>
                <br />
                <div className="spinner-container">Loading data please wait...
                    <CircularProgress className='circular' />
                </div>
            </div>
        </>
    )
}

export default Loader;