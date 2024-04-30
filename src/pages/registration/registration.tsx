import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Button, Input, AuthFormError } from '../../components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/reducers';
import { selectUser } from '../../redux/selectors';
import { request } from '../../utils';

const regFormScheme = yup.object().shape({
	email: yup
		.string()
		.required('Заполните e-mail')
		.matches(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Неверно заполнен e-mail.',
		),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %')
		.min(6, 'Неверныо заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверныо заполнен пароль. Максимум 30 символов'),
	passCheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), ''], 'пароли не совпадают'),
});

export const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passCheck: '',
		},
		resolver: yupResolver(regFormScheme),
	});

	const navigate = useNavigate();

	const [serverError, setServerError] = useState('');

	const dispatch = useAppDispatch();

	const user = useSelector(selectUser);

	const onSubmit = ({ email, password }: { email: string; password: string }) => {
		request('/register', 'POST', { email, password }).then(({ error }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser({ email }));
			navigate('/');
		});
	};

	const formError = errors?.email?.message || errors?.password?.message || errors?.passCheck?.message;
	const errorMessage = formError || serverError;

	if (user.email !== null) {
		return <Navigate to="/" />;
	}

	return (
		<RegistrationContainer>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type="email" placeholder="E-mail..." width="300px" {...register('email', { onChange: () => setServerError('') })} />
				<Input type="password" placeholder="Пароль..." width="300px" {...register('password', { onChange: () => setServerError('') })} />
				<Input type="password" placeholder="Повторите пароль..." width="300px" {...register('passCheck', { onChange: () => setServerError('') })} />
				<Button className="reg-button" description="Зарегистрироваться" type="submit" disabled={!!formError} />
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
			<Button description="Авторизация" onClick={() => navigate('/login')} />
		</RegistrationContainer>
	);
};

const RegistrationContainer = styled.div`
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

	& .reg-button {
		margin-top: 40px;
	}
`;
