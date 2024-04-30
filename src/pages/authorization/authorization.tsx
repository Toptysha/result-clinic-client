import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { AuthFormError, Button, Input } from '../../components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../redux/selectors';
import { setUser } from '../../redux/reducers';
import { request } from '../../utils';

const authFormScheme = yup.object().shape({
	email: yup.string().required('Заполните логин'),
	password: yup.string().required('Заполните пароль'),
});

export const Authorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormScheme),
	});

	const [serverError, setServerError] = useState('');

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const user = useSelector(selectUser);

	const onSubmit = ({ email, password }: { email: string; password: string }) => {
		request('/login', 'POST', { email, password }).then(({ error }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser({ email }));
			navigate('/');
		});
	};

	const formError = errors?.email?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (user.email !== null) {
		return <Navigate to="/" />;
	}

	return (
		<AuthorizationContainer>
			<h1>Вход</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type="text" placeholder="E-mail..." width="300px" {...register('email', { onChange: () => setServerError('') })} />
				<Input type="password" placeholder="Пароль..." width="300px" {...register('password', { onChange: () => setServerError('') })} />
				<Button className="email-button" description="Войти" type="submit" disabled={!!formError} />

				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
			<Button description="Зарегистрироваться" onClick={() => navigate('/')} />
		</AuthorizationContainer>
	);
};

export const AuthorizationContainer = styled.div`
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

	& button {
		width: 200px;
	}

	& button:hover {
		background-color: #f1f1f1;
		color: #090909;
		transition: 0.3s;
	}

	& .email-button {
		margin-top: 40px;
	}
`;
