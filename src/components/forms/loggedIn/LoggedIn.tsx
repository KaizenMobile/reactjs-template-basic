import { Container, Typography } from "@mui/material";

const LoggedIn = () => {
    return (
        <Container sx={{textAlign: "center", mt:'25%'}}>
            <Typography component="h3" variant="h3">
                You're logged in!
            </Typography>
        </Container>
    )
};

export default LoggedIn;