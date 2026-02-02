type RegisterFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterForm = ({ handleSubmit }: RegisterFormProps) => {
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="username" />
            </label>
            <label>
                Password:
                <input type="text" name="password" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default RegisterForm;