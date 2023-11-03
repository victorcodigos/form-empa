import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


type FormData = {
    name: string;
  
   
};

const Form = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const onSubmit: SubmitHandler <FormData> = (data) => {
        setSubmittedData(data);
        reset();
    };

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
                    <Button type="submit" variant="contained" color="primary">
                        SEND
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Form;