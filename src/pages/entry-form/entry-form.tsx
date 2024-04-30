import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../redux/selectors';
import { setHeaderNameMenuDisplay } from '../../redux/reducers';
import { AuthFormError, Button, Input } from '../../components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { dateNow, request } from '../../utils';

const appointmentFormScheme = yup.object().shape({
	name: yup.string().required('Заполните имя').min(6, 'Слишком короткое ФИО. Минимум 6 символов').max(40, 'Слишком длинное ФИО. Максимум 40 символов'),
	phone: yup.string().required('Заполните телефон').min(3, 'Слишком короткий номер телефона. Минимум 3 символов').max(12, 'Слишком длинный номер телефона. Максимум 12 символов'),
	problem: yup.string(),
});

export const EntryForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			problem: '',
		},
		resolver: yupResolver(appointmentFormScheme),
	});

	const navigate = useNavigate();

	const [serverError, setServerError] = useState('');

	const dispatch = useAppDispatch();

	const user = useSelector(selectUser);

	const onSubmit = ({ name, phone, problem = '' }: { name: string; phone: string; problem?: string }) => {
		request('/application', 'POST', { date: dateNow(), name, phone, problem }).then(({ error }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			navigate('/');
		});
	};

	const formError = errors?.name?.message || errors?.phone?.message;
	const errorMessage = formError || serverError;

	if (user.email === null) {
		return <Navigate to="/" />;
	}

	return (
		<EntryFormContainer onClick={() => dispatch(setHeaderNameMenuDisplay(false))}>
			<h1>Записаться к врачу</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p>ФИО</p>
				<Input type="name" placeholder="ФИО..." width="300px" {...register('name', { onChange: () => setServerError('') })} />
				<p>Номер телефона</p>
				<Input type="phone" placeholder="Номер телефона..." width="300px" {...register('phone', { onChange: () => setServerError('') })} />
				<p>Опишите вашу проблему</p>
				<textarea placeholder="Ваша проблема..." {...register('problem', { onChange: () => setServerError('') })} />
				<Button className="send-form-button" description="Записаться к врачу" type="submit" disabled={!!formError} />
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</EntryFormContainer>
	);
};

const EntryFormContainer = styled.div`
	background-color: #e5e5e5;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 700px;
	height: 600px;
	margin: 100px auto;
	border-radius: 10px;

	& form {
		display: flex;
		flex-direction: column;
	}

	& p {
		font-size: 18px;
		margin: 0 0 -10px 10px;
	}

	& button {
		width: 200px;
	}

	& textarea {
		resize: none;
		width: 300px;
		min-height: 150px;
		border-radius: 5px;
		margin: 10px 0;
		padding: 10px;
		font-size: 18px;
	}

	& button:hover {
		background-color: #f1f1f1;
		color: #090909;
		transition: 0.3s;
	}

	& .send-form-button {
		margin-top: 40px;
	}
`;
