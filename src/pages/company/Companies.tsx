import {Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import Paper from '@mui/material/Paper';
//TODO Fake data (remove after backend)
const companies = [
    {name: "Apple",
        address: "Minsk",
        phone: "8735635735",
        email: "test@test.com"
    },
    {
        name: "Google",
        address: "Minsk",
        phone: "8735635735",
        email: "test@test.com"
    },
    {
        name: "Amazon",
        address: "Minsk",
        phone: "8735635735",
        email: "test@test.com"
    }
]

const mainContainerStyle = {
    pt: 3
}

const titleStyle = {
    mb: 3
}

const rowStyle = {
    '&:last-child td, &:last-child th': {border: 0}
}

function Companies() {
    return (
        <>
            <Container maxWidth="xl" sx={mainContainerStyle}>
                <Typography variant="h2" sx={titleStyle}>Companies listing</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="companies table">
                        <TableHead>
                            <TableRow sx={rowStyle}>
                                <TableCell>Company name</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">E-mail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                companies.map((company, index) => {
                                    //TODO change key to id from backend
                                    //TODO Company name is a link to show page
                                    return (<TableRow key={index}>
                                            <TableCell component="th" scope="row">{company.name}</TableCell>
                                            <TableCell align="right">{company.address}</TableCell>
                                            <TableCell align="right">{company.phone}</TableCell>
                                            <TableCell align="right">{company.email}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </>


    )
}

export default Companies;