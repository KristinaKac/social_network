import React, { useState } from 'react';
import css from './Paginator.module.css';

type PropsType = {
    totalPages: number,
    maxPortionOnPage: number,
    portionSize: number,
    currentPage: number
    onClickChangePage: (page: number) => void
}

const Paginator: React.FC<PropsType> = ({totalPages ,maxPortionOnPage, portionSize, currentPage, onClickChangePage}) => {
    let pages = [] as Array<number>;
    let pagesCount: number = Math.ceil(totalPages / maxPortionOnPage);
    const [portionNumber, setPortionNumber] = useState(1);

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount: number = Math.ceil(pagesCount / portionSize);

    let leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber: number = portionNumber * portionSize;

    return (

        <div className={css.paginator_wrapper}>
            <div className={css.pages}>
                {portionNumber > 1 && <button className={css.btn} onClick={() => setPortionNumber(portionNumber - 1)}>&lt;</button>}
                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page =>
                        <span key={page} className={currentPage === page ? css.activePage : css.page}
                            onClick={(e) => { onClickChangePage(page) }}>{page}</span>
                    )}
                {portionNumber < portionCount && <button className={css.btn} onClick={() => setPortionNumber(portionNumber + 1)}>&gt;</button>}
            </div>
        </div>
    )
}

export default Paginator;