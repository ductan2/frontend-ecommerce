


type PaginationProps = {
   prev: () => void,
   currentPage: number,
   getPaginationGroup: number[],
   next: () => void,
   pages: number,
   handleActive: (item: number) => void
}
export const Pagination = ({
   prev,
   currentPage,
   getPaginationGroup,
   next,
   pages,
   handleActive,
}: PaginationProps) => {


   if(!getPaginationGroup) return null
   return (
      <div className="pagination-area mt-20 mb-20">
         <nav className="Page navigation example">
            <ul className="pagination-area justify-content-start d-flex">
               {getPaginationGroup.length <= 0 ? null : (
                  <li onClick={prev} className="page-item">
                     {currentPage === 1 ? null : (
                        <a className="page-link">
                           <i className="fi-rs-angle-double-small-left"></i>
                        </a>
                     )}
                  </li>
               )}

               {getPaginationGroup.map((item, index) => {
                  return (
                     <li
                        onClick={() => handleActive(item)}
                        key={index}
                        className={
                           currentPage === item
                              ? "page-item active"
                              : "page-item"
                        }
                     >
                        <a className="page-link">{item}</a>
                     </li>
                  );
               })}

               {getPaginationGroup.length <= 0 ? null : (
                  <li onClick={next} className="page-item">
                     {currentPage >= pages ? null : (
                        <a className="page-link">
                           <i className="fi-rs-angle-double-small-right"></i>
                        </a>
                     )}
                  </li>
               )}
            </ul>

            {getPaginationGroup.length <= 0 ? null : (
               <p>
                  show {currentPage} of {pages}
               </p>
            )}
         </nav>
      </div>
   )
}
