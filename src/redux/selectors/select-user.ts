interface UserStore {
	user: {
		email: string | null,
		roleId: number | null,
	}
}

export const selectUser = (state: UserStore) => state.user
