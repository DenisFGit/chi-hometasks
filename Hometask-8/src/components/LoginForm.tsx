
type LoginFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
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
            {/* </div> */}
        </form>
    )
}

export default LoginForm;