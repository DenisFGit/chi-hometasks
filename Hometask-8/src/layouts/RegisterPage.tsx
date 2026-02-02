
import { registerUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/hooks";

import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {

    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        dispatch(registerUser(data));

    }


    return (
        <div className="register">
            <h2> RegisterPage</h2>
            <RegisterForm handleSubmit={handleSubmit} />

        </div>
    )
}

export default RegisterPage