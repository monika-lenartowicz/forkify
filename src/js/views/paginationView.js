import View from "./View.js";
const icons = new URL("../../img/icons.svg", import.meta.url);

class PaginationView extends View {
	_parentElement = document.querySelector(".pagination");

	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const buttonEl = e.target.closest(".btn--inline");
			if (!buttonEl) return;

			const goToPage = +buttonEl.dataset.goto;

			handler(goToPage);
		});
	}

	_generateMarkup() {
		const currentPage = this._data.page;
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

		// page 1 and there other page
		if (currentPage === 1 && numPages > 1) {
			return `
          <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
		}

		// last page
		if (currentPage === numPages && numPages > 1) {
			return `
         <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
		}

		// other page
		if (currentPage < numPages) {
			return `
         <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${currentPage + 1}"class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
		}
		// page 1 and no other page
		return "";
	}
}
export default new PaginationView();
