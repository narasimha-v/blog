import { createContext } from 'react';
import { User } from '../types/User';

export interface Authorization {
	isAuthorized: boolean;
	user?: User;
}

export const AuthContext = createContext<{
	authorization: Authorization;
	setAuthorization: React.Dispatch<React.SetStateAction<Authorization>>;
}>({
	authorization: { isAuthorized: false },
	setAuthorization: () => {}
});
