import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    const [profession, setProfession] = useState("");
    const [typeOfEvent, setTypeOfEvent] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const watchPassword = watch("password");

    const onSubmit: SubmitHandler<FormData> = (data) => {

        const newData = {
            ...data,
            profession: profession,
            typeofevent: typeOfEvent,
        };

        setSubmittedData(newData);
        reset();
        setProfession("");
        setTypeOfEvent("");
        setSelectedDate(null);
    };

    return (
        <div className="app-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* INPUT NAME */}
                <h2>Personal information </h2>
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
                {/* INPUT EMAIL */}
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
                {/* INPUT PASSWORD */}
                <div className="form-group">
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={
                            errors.password
                                ? "Password is required and should have at least 7 characters."
                                : ""
                        }
                        {...register("password", { required: true, minLength: 7 })}
                    />
                </div>
                {/* INPUT CONFIRM PASSWORD */}
                <div className="form-group">
                    <TextField
                        fullWidth
                        type="password"
                        label="Password confirmation"
                        variant="outlined"
                        error={!!errors.passwordConfirmation}
                        helperText={
                            errors.passwordConfirmation
                                ? "Password confirmation is required and should match the password."
                                : ""
                        }
                        {...register("passwordConfirmation", {
                            required: true,
                            validate: (value) => value === watchPassword,
                        })}
                    />
                </div>
                {/* INPUT PROFESSION */}
                <div className="form-group">
                    <Select
                        fullWidth
                        label="Profession"
                        variant="outlined"
                        error={!!errors.profession}
                        value={profession}
                        onChange={(e) => setProfession(e.target.value as string)}
                    >
                        <MenuItem value="0">Select your profession...</MenuItem>
                        <MenuItem value="Developer">Software Developer</MenuItem>
                        <MenuItem value="Senior">Senior Consultant</MenuItem>
                        <MenuItem value="Manager">Senior Manager</MenuItem>
                        <MenuItem value="Associate">Associate consultant</MenuItem>
                        <MenuItem value="Consultant">Consultant</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.profession && (
                        <p className="error-message">Profession is required.</p>
                    )}
                </div>
                <h2>Data & Management Consulting </h2>
                {/* INPUT ABOUT THE EVENT */}
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
                {/* INPUT TYPE OF EVENT  */}
                <div className="form-group">
                    <Select
                        fullWidth
                        label="Type of event"
                        variant="outlined"
                        error={!!errors.typeofevent}
                        value={typeOfEvent}
                        onChange={(e) => setTypeOfEvent(e.target.value as string)}
                    >
                        <MenuItem value="0">Select your type of event...</MenuItem>
                        <MenuItem value="Private">Private</MenuItem>
                        <MenuItem value="Company">Company</MenuItem>
                        <MenuItem value="Voluntary">Voluntary</MenuItem>
                        <MenuItem value="Partner">Partner</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.typeofevent && (
                        <p className="error-message">Type of event is required.</p>
                    )}
                </div>
                {/* INPUT DATE OF EVENT  */}
                <div className="form-group">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)}
                        />
                    </LocalizationProvider>
                </div>
                {/* INPUT CHECK IF THIS EVENT HAPPENS EVERY YEAR  */}
                <div className="form-group">
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register("yearlyRepetition")}
                                name="yearlyRepetition"
                                color="primary"
                            />
                        }
                        label="By clicking this button, you are confirming that this event takes place every year."
                    />
                </div>
                {/* INPUT PRIVACY TERMS  */}
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
                {/* BUTTON SEND  */}
                <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                        SEND
                    </Button>
                </div>
            </form>
            <div className="submitted-data">
                <h4>Below you will see the information after send it</h4>
                {submittedData && (
                    <div>
                        <p>Name: {submittedData.name}</p>
                        <p>Email: {submittedData.email}</p>
                        <p>Profession: {submittedData.profession}</p>
                        <p>Type of event: {submittedData.typeofevent}</p>
                        <p>Event: {submittedData.event}</p>
                        <p>Yearly Repetition: {submittedData.yearlyRepetition ? 'Yes' : 'No'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;
