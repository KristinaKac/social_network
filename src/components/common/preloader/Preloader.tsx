import React from 'react';
import preloader from '../../../img/preloader.gif'

const Preloader = () => {
    return (
        <div>
            <img style={{ width: '50px', height: '50px' }} src={preloader} alt="preloader" />
        </div>
    )
}
export default Preloader;