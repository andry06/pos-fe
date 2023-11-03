import { useDispatch } from "react-redux";
import { actSetPage } from "../../features/Product/actions";
import ReactPaginate from "react-paginate";

const PaginationComp = ({currentPage, totalPage}) => {

    const dispatch = useDispatch();
    const handlePageClick = (data) => {
        dispatch(actSetPage(data.selected));
    }

    return(
        <ReactPaginate 
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center mt-4'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            initialPage={currentPage}
        />
    )
}

export default PaginationComp;