interface AppStore {
	app: {
		headerNameMenuDisplay: boolean,
	}
}

export const selectApp = (state: AppStore) => state.app
