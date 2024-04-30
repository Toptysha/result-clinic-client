import { Route, Routes } from 'react-router-dom';
import { Authorization, Main } from './pages';
import { Header } from './components';
import { useAppDispatch } from './redux/store';
import { useLayoutEffect, useState } from 'react';
import { setUser } from './redux/reducers';
import { EntryForm } from './pages/entry-form/entry-form';
import { request } from './utils';

export default function App() {
	const [loader, setLoader] = useState(true);

	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		request('/user').then(({ error, email }) => {
			if (error) {
				return;
			}

			dispatch(setUser({ email }));
			setLoader(false);
		});
	}, [dispatch]);

	return !loader ? (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/entry_form" element={<EntryForm />} />
			</Routes>
			{/* <Footer /> */}
		</div>
	) : (
		<></>
	);
}
