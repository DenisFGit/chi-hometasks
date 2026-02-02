
import { loginUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import LoginForm from "../components/LoginForm";


const LoginPage = () => {

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => Boolean(state.user.token)
    );

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        dispatch(loginUser(data));

    }

    return (
        <div>
            <h1>LoginPage</h1>
            {/* <p>Enter name and password to log in</p> */}
            {isAuthenticated
                ? 'You are logged in successfully'
                : <p>Enter name and password to log in</p>
            }
            <LoginForm handleSubmit={handleSubmit} />
        </div>

    )
}

export default LoginPage