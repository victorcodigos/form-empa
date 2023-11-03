import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type FormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation:string;


};

const Form = () => {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setSubmittedData(data);
        reset();
    };

    const watchPassword = watch("password");

    return (
        <div className="app-container">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name ? "Name is required." : ""}
                        {...register("name", { required: true })}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        fullWidth
                        label="E-mail"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email ? "Email is required." : ""}
                        {...register("email", {
                            required: true,
                            validate: (value) => isEmail(value),
                        })}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password ? "Password is required and should have at least 7 characters." : ""}
                        {...register("password", { required: true, minLength: 7 })}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        fullWidth
                        type="password"
                        label="Password confirmation"
                        variant="outlined"
                        error={!!errors.passwordConfirmation}
                        helperText={errors.passwordConfirmation ? "Password confirmation is required and should match the password.": ""}
                        {...register("passwordConfirmation", { required: true, validate: (value) => value === watchPassword })}
                    />
                </div>

                <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                        SEND
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Form;