import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { Registration } from '../registration/registration';
import { selectUser } from '../../redux/selectors';
import styled from 'styled-components';
import { setHeaderNameMenuDisplay } from '../../redux/reducers';
import { ApplicationTable } from './components';
import { useMemo, useState } from 'react';
import { debounce } from '../../utils/debounce';

export const Main = () => {
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	const dispatch = useAppDispatch();
	const user = useSelector(selectUser);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }: { target: any }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return user.email !== null ? (
		<MainContainer onClick={() => dispatch(setHeaderNameMenuDisplay(false))}>
			<div className="top-block">
				<h1>Таблица заявок</h1>
				<input type="text" placeholder="Поиск..." value={searchPhrase} onChange={onSearch} />
			</div>
			<ApplicationTable shouldSearch={shouldSearch} searchPhrase={searchPhrase} />
		</MainContainer>
	) : (
		<Registration />
	);
};

const MainContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 1100px;
	margin: 60px auto 0;
	padding-top: 25px;

	& h1 {
		margin-bottom: 25px;
	}

	& input {
		width: 250px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 5px;
		margin-bottom: 25px;
	}
`;
