import PropTypes from 'prop-types';
import { Button } from '../../../components';
import styled from 'styled-components';
import { SetStateAction } from 'react';

export const Pagination = ({ page, setPage, lastPage }: { page: number; setPage: React.Dispatch<SetStateAction<number>>; lastPage: number }) => {
	return (
		<PaginationContainer>
			<Button description="В начало" disabled={page === 1} onClick={() => setPage(1)} />
			<Button description="Предыдущая" disabled={page === 1} onClick={() => setPage(page - 1)} />
			<div className="currentPage">Страница: {page}</div>
			<Button description="Следующая" disabled={page === lastPage} onClick={() => setPage(page + 1)} />
			<Button description="В конец" disabled={page === lastPage} onClick={() => setPage(lastPage)} />
		</PaginationContainer>
	);
};

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 20px 0 20px;
	padding: 0 20px;
	width: 900px;

	& button {
		margin: 0 20px;
		width: 180px;
	}

	& .currentPage {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #000;
		border-radius: 5px;
		width: 180px;
		margin: 0 20px;
		font-size: 17px;
		font-weight: 500;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	lastPage: PropTypes.number.isRequired,
};
