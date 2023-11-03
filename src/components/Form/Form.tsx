import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, MenuItem, Select, FormGroup } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type FormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    profession: string;
    event: string;
    typeofevent: string;
    privacyTerms: boolean;
    yearlyRepetition: boolean;

};

const Form = () => {
    const [profession, setProfession] = useState('');
    const [typeOfEvent, setTypeOfEvent] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setSubmittedData(data);
        reset();
        setProfession('');
        setTypeOfEvent('');
        setSelectedDate(null);
    };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>();

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
                        helperText={errors.passwordConfirmation ? "Password confirmation is required and should match the password." : ""}
                        {...register("passwordConfirmation", { required: true, validate: (value) => value === watchPassword })}
                    />
                </div>

                <div className="form-group">
                    <Select
                        fullWidth
                        label="Profession"
                        variant="outlined"
                        error={!!errors.profession}
                        value={profession} 
                        onChange={(e) => setProfession(e.target.value)}
                    >

                        <MenuItem value="0">Select your profession...</MenuItem>
                        <MenuItem value="developer">Software Developer</MenuItem>
                        <MenuItem value="senior">Senior Consultant</MenuItem>
                        <MenuItem value="manager">Senior Manager</MenuItem>
                        <MenuItem value="associate">Associate consultant</MenuItem>
                        <MenuItem value="consultant">Consultant</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.profession && (<p className="error-message">Profession is required.</p>)}
                </div>

                <div className="form-group">
                    <TextField
                        fullWidth
                        label="Event"
                        variant="outlined"
                        error={!!errors.event}
                        helperText={errors.event ? "Event is required." : ""}
                        {...register("event", { required: true })}
                    />
                </div>

                <div className="form-group">
                    <Select
                        fullWidth
                        label="Type of event"
                        variant="outlined"
                        error={!!errors.typeofevent}
                        value={typeOfEvent}
                        onChange={(e) => setTypeOfEvent(e.target.value)}
                    >
                        <MenuItem value="0">Select your type of event...</MenuItem>
                        <MenuItem value="private">Private</MenuItem>
                        <MenuItem value="company">Company</MenuItem>
                        <MenuItem value="voluntary">Voluntary</MenuItem>
                        <MenuItem value="partner">Partner </MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.typeofevent && (<p className="error-message">Type of event is required.</p>)}
                </div>

                <div className="form-group">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={selectedDate} 
                            onChange={(newDate) => setSelectedDate(newDate)} 
                        />
                    </LocalizationProvider>
                </div>


                <div className="form-group">
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register("privacyTerms", {
                                    validate: (value) => value === true,
                                })}
                            />
                        }
                        label="I agree with the privacy terms."
                    />
                    {errors.privacyTerms && (
                        <p className="error-message">You must agree with the privacy terms.</p>
                    )}
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