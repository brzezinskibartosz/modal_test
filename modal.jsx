import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Box,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    Grid,
    Divider
} from '@mui/material';
import { 
    ListSubheader, 
    List, 
    ListItemButton, 
    ListItemText, 
    ListItemIcon, 
    Collapse,
    ListItem
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';
import ButtonResults from '../../Contacts/submitButton';
import { ButtonWrapper, Form, FormGroup, Message } from './modalElements';
import { formModalContent } from '../services/Data';

export default function MaxWidthDialog({ id, popupText, rightForm, rightText }) {

    const [state, setState] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClick = key => () => {
        setState({ [key]: !state[key] });
    };

    const lists = [
        {
            key: "1",
            label: "Inbox",
            icon: InboxIcon,
            items: [{ key: "starred", label: "Starred", icon: StarBorder }]
        },
        {
            key: "2",
            label: "Drafts",
            icon: DraftsIcon,
            items: [{ key: "send", label: "Sent Items", icon: SendIcon }]
        },
        {
            key: "3",
            label: "New",
            icon: InboxIcon,
            items: [{ key: "starred", label: "Starred", icon: StarBorder }]
        },
    ];

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xl');

    const validationSchema = Yup.object().shape({
        yourName: Yup.string()
            .required("Your name is required")
            .min(2, "Your name must be at least 2 characters"),
        email: Yup.string()
            .required("Your email is required")
            .email("Email is invalid"),
        subject: Yup.string()
            .required("You need to enter subject.")
            .min(15, "Your message must be at least 15 characters"),
        description: Yup.string()
            .required("You need to short description.")
            .min(20, "Description must be at least 20 characters")
    });

    const { 
        handleSubmit, 
        register,
        control,
        reset,
        formState: { errors } 
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    const submitQuote = async(form) => {

        const response = await fetch("http://localhost:3001/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ form }),
        })
        .then((res) => res.json())
        .then(async (res) => {
            const resData = await res;
            console.log(resData);
            if (resData.status === "success") {
                console.log("Message Sent");
            } else if (resData.status === "fail") {
                console.log("Message failed to send");
            }
        }).then(() => {
            reset({ 
                yourName: "",
                email: "",
                phone: "",
                subject: "",
                description: "",
            })
        })
    };

    const useStyles = makeStyles(theme => ({
        root: {
            minWidth: '70%',
            "& input::placeholder": {
                fontSize: "16px",
                color: "#3A5988"
            },
            "& label.Mui-focused": {
                fontSize: "16px",
                color: "#3A5988"
            },
            "& .MuiInput-underline:hover:not(focused):before": {
                borderBottomColor: "#3A5988"
            },
            "& .MuiInput-underline:after": {
                borderBottomColor: "#3A5988"
            },
            "& .MuiInput-underline:hover": {
                borderBottomColor: "#3A5988"
            }
        },
        container: {
            gridTemplateColumns: "repeat(12, 1fr)",
            gridGap: theme.spacing(3)
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "center",
            color: theme.palette.text.secondary,
            whiteSpace: "nowrap",
            marginBottom: theme.spacing(1)
        },
        width_val: {
            height: "100px"
        },
        divider: {
            margin: theme.spacing(2, 0)
        },
        title: {
            color: "#333333",
            fontWeight: "900",
            fontSize: '25px',
            fontFamily: 'Lato',
            textAlign: 'center',
            margin: '24px'
        },
        rightTitle: {
            color: "#333333",
            fontWeight: "900",
            fontSize: '25px',
            fontFamily: 'Lato',
            textAlign: 'center',
            marginTop: '40px'
        },
        mainDescription: {
            color: "#333333",
            fontSize: '20px',
            fontFamily: 'Lato',
            marginLeft: '24px',
            marginBottom: '24px',
            marginRight: '24px'
        },
        subtitle: {
            color: "#333333",
            fontSize: '16px',
            fontFamily: 'Lato',
            textAlign: 'center',
            marginTop: '24px'
        },
        services: {
            color: "#333333",
            fontSize: '16px',
            fontFamily: 'Lato',
            fontWeight: "700",
            textAlign: 'justify',
            marginLeft: '24px',
            marginBottom: '10px',
            marginRight: '24px',
            marginTop: '10px',
        },
        services_desc: {
            color: "#474747",
            fontSize: '14px',
            fontFamily: 'Lato',
            marginLeft: '24px',
            marginBottom: '10px',
            marginRight: '30px'
        },
        custom: {
            color: "#111111",
            fontWeight: "900",
            padding: "30px 135px"
        },
        image: {
            maxWidth: '30%',
            maxHeight: '30%',
        },
        icon: {
            alignItems: 'center',
            marginRight: '5px',
            color: "#676768",
        },
        formGroup: {
            minWidth: '600px',
            alignItems: 'center'
        },
        column2Container: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center"
        },
        buttonWrapper: {
            marginBottom: "50px",
            marginTop: "50px"
        }
    }));

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setState(false);
    };


    return (
        <>
            <Typography className={classes.custom} variant="button" onClick={handleClickOpen}>
                WIĘCEJ
            </Typography>

            <Dialog
                sx={{ height: '100vh' }}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={6} direction="row">
                        <Grid>
                            <Typography>
                                <Box className={classes.title} sx={{ textAlign: 'left', m: 3 }}>
                                    <SchoolIcon className={classes.icon} />
                                    {id}
                                </Box>
                            </Typography>
                        </Grid>
                        <Typography>
                            <Box className={classes.mainDescription}>
                                {popupText}
                            </Box>
                        </Typography>
                        <Typography>
                            <List
                            component="nav"
                            subheader={
                                <ListSubheader component="div">Nested List Items</ListSubheader>
                            }
                            >
                                {lists.map(({ key, label, icon: Icon, items }) => {
                                    const open = state[key] || false;
                                    return (
                                        <div key={key}>
                                            <ListItem button onClick={handleClick(key)}>
                                            <ListItemIcon>
                                                <Icon />
                                            </ListItemIcon>
                                            <ListItemText inset primary={label} />
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItem>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {items.map(({ key: childKey, label: childLabel, icon: ChildIcon }) => (
                                                <ListItem key={childKey} button className={classes.nested}>
                                                    <ListItemIcon>
                                                    <ChildIcon />
                                                    </ListItemIcon>
                                                    <ListItemText inset primary={childLabel} />
                                                </ListItem>
                                                ))}
                                            </List>
                                            </Collapse>
                                        </div>
                                    );
                                })}
                            </List>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} direction="row" sx={{ bgcolor: "#d8d8d8"}}>
                        <DialogActions>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                                >
                                <CloseIcon />
                            </IconButton>
                        </DialogActions>
                        <Typography>
                            <Box className={classes.rightTitle}>
                                {rightForm}
                            </Box>
                        </Typography>
                        <Typography>
                            <Box className={classes.subtitle}>
                                {rightText}
                            </Box>
                        </Typography>
                        <Form>
                            <form onSubmit={handleSubmit(submitQuote)}>
                                    {formModalContent.inputs.map((input, key) => {
                                        return (
                                            <FormGroup>
                                                <Controller
                                                    name={input.name}
                                                    key={key}
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field, fieldState }) => {
                                                        return (
                                                                <TextField
                                                                    className={classes.root}
                                                                    placeholder={input.placeholder}
                                                                    label={input.label}
                                                                    variant={input.variant}
                                                                    {...register(input.name)}
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    error={!!fieldState.error}
                                                                    helperText={fieldState.error?.message}
                                                                />
                                                            )
                                                        }}
                                                />
                                            </FormGroup>
                                        )
                                    })}
                                <Message>
                                    <Controller
                                        name="description"
                                        defaultValue=""
                                        control={control}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <TextField
                                                    className={classes.root}
                                                    placeholder="Type Short Description"
                                                    label="Description"
                                                    rows={4}
                                                    variant="standard"
                                                    multiline
                                                    name="description"
                                                    {...register("description")}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                />
                                                )
                                            }}
                                    />
                                </Message>
                                <Box className={classes.buttonWrapper}>
                                    <ButtonWrapper>
                                        <ButtonResults className={classes.buttonWrapper} />
                                    </ButtonWrapper>
                                </Box>
                            </form>
                        </Form>    

                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};
