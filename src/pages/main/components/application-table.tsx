import styled from 'styled-components';
import { request } from '../../../utils';
import { useEffect, useState } from 'react';
import { Pagination } from './pagination';

export const ApplicationTable = ({ shouldSearch, searchPhrase }: { shouldSearch: boolean; searchPhrase: string }) => {
	const [applications, setApplications] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const PAGINATION_LIMIT = 2;

	useEffect(() => {
		request(`/applications?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(({ data }) => {
			setApplications(data.applications);
			setLastPage(data.lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	return (
		<ApplicationTableContainer>
			<table>
				<thead>
					<tr className="main-tr">
						<td>Дата отправки</td>
						<td>ФИО</td>
						<td>Телефон</td>
						<td>Проблема</td>
					</tr>
				</thead>
				<tbody>
					{applications.map(({ date, name, phone, problem }, index) => (
						<tr key={index}>
							<td className="date">{date}</td>
							<td className="name">{name}</td>
							<td className="phone">{phone}</td>
							<td className="problem">{problem}</td>
						</tr>
					))}
				</tbody>
			</table>
			{lastPage > 1 && <Pagination page={page} setPage={setPage} lastPage={lastPage} />}
		</ApplicationTableContainer>
	);
};

const ApplicationTableContainer = styled.div`
	& table {
		height: 0;
		width: 900px;
		text-align: center;
		border-spacing: 0px;
	}

	& tr {
		height: 40px;
	}

	& td {
		border: 1px solid black;
	}

	& .main-tr {
		font-weight: bold;
		height: 70px;
	}

	& td.date {
		width: 200px;
	}

	& td.name {
		width: 250px;
	}

	& td.phone {
		width: 200px;
	}

	& td.problem {
		width: 250px;
	}
`;
