import {Typography, Container, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearError} from "../../store/errorSlice";

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50px',
}

function NotFoundPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rootRoute = () => {
        dispatch(clearError());
        navigate("/home");
    };
    return (
        <Container maxWidth="xl" sx={containerStyle}>
            <Typography variant="h3" component="div">Sorry!</Typography>
            <Typography variant="subtitle1" component="div" sx={{mb: 3}}>Something went wrong</Typography>
            <Button variant="outlined" onClick={rootRoute}>Back to home page</Button>
        </Container>
    )
};

export default NotFoundPage;