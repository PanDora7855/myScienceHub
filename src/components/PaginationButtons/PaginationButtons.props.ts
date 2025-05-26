export interface IPaginationButtons {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}
