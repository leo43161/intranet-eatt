import Pagination from 'react-bootstrap/Pagination';

export default function PaginationTouch({ perPages, total, page, paginate, type }) {
    /*  */
    const lastPage = Math.ceil(total / perPages);
    const delta = 2;
    const range = [];

    for (let i = Math.max(2, (page - delta)); i <= Math.min((lastPage - 1), (page + delta)); i += 1) {
        range.push(i);
    }

    if ((page - delta) > 2) {
        range.unshift('...');
    }

    if ((page + delta) < (lastPage - 1)) {
        range.push('...');
    }

    range.unshift(1);
    if (lastPage !== 1) range.push(lastPage);

    /*  */

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / perPages); i++) {
        pageNumbers.push(i);
    }

    return total > 0 ? (
        <Pagination className={"pagination-" + type} size="lg">
            <Pagination.Item
                onClick={() => paginate(page - 1)}
                disabled={page === 1}>
                Anterior
            </Pagination.Item>
            {range.map((number, index) =>
                !isNaN(number) ?
                    <Pagination.Item onClick={() => paginate(number)} key={index} active={number === page}>
                        {number}
                    </Pagination.Item>
                    :
                    <Pagination.Ellipsis key={index} onClick={() => paginate(index === 1 ? page - 3 : page + 3)} />
            )}
            <Pagination.Item
                onClick={() => paginate(page + 1)}
                disabled={pageNumbers.length === page}>
                Siguiente
            </Pagination.Item>
        </Pagination>
    ) : (<div></div>)
}
