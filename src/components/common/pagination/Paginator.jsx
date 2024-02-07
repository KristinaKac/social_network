import React, { useState } from 'react';
import css from './Paginator.module.css';

const Paginator = (props) => {
    let pages = [];
    let pagesCount = Math.ceil(props.totalPages / props.maxPortionOnPage);
    const [portionNumber, setPortionNumber] = useState(1);

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / props.portionSize);
    
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return (

        <div className={css.paginator_wrapper}>
            <div className={css.pages}>
                {portionNumber > 1 && <button className={css.btn} onClick={() => setPortionNumber(portionNumber - 1)}>&lt;</button>}
                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page =>
                        <span className={props.currentPage === page ? css.activePage : css.page}
                            onClick={(e) => { props.onClickChangePage(page) }}>{page}</span>
                    )}
                {portionNumber < portionCount && <button className={css.btn} onClick={() => setPortionNumber(portionNumber + 1)}>&gt;</button>}
            </div>
        </div>
    )
}

export default Paginator;