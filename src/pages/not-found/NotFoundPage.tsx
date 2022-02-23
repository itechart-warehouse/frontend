import {Typography, Container, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50px',
}

function NotFoundPage() {

    const navigate = useNavigate();

    const rootRoute = () => {
        navigate("/home");
    };
    return (
        <Container maxWidth="xl" sx={containerStyle}>
            <Typography variant="h3" component="div">404 page</Typography>
            <Typography variant="subtitle1" component="div" sx={{mb: 3}}>Oops! Page does not exist.</Typography>
            <Button variant="outlined" onClick={rootRoute}>Back to home page</Button>
        </Container>
    )
};

export default NotFoundPage;