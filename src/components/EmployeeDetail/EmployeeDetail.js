// Importing axios
import axios from 'axios';

// React Hooks
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Styles
import classes from './EmployeeDetail.module.css';


const EmployeeDetail = () => {
    const params = useParams();

    const employeeName = params.name;

    const employeesList = useSelector((state) => state.employeesList.employeesListValue);
    const [ employeeDetails, setEmployeeDetails ] = useState({});

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const res = await axios.get(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/${ employeeName }`);
                console.log(res.data[0]);
                setEmployeeDetails(res.data[0]);
            } catch (err) {
                console.log(`Oh no! Could not fetch ${ employeeName }'s details! Fetching details from the redux store.`);
                console.log(err);
                let result = employeesList.filter((employee) => employee.first_name.toLowerCase() === employeeName.toLowerCase());
                setEmployeeDetails(result[0]);
            }
        };

        fetchEmployeeDetails();
    }, []);

    const StyledTableContainer = withStyles((theme) => ({
        root: {
            width: '30%'
        }
    }))(TableContainer);


    return (
        <>
            <h2>{ employeeName }'s Details</h2>
            <StyledTableContainer component={ Paper }>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>First Name</TableCell>
                            <TableCell align='right'>{ employeeDetails.first_name }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left'>Last Name</TableCell>
                            <TableCell align='right'>{ employeeDetails.last_name }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left'>Date of Birth</TableCell>
                            <TableCell align='right'>{ employeeDetails.date_of_birth }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left'>Address</TableCell>
                            <TableCell align='right'>{ employeeDetails.address }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left'>Date of Joining</TableCell>
                            <TableCell align='right'>{ employeeDetails.date_of_joining }</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </StyledTableContainer>
        </>
    );
};


export default EmployeeDetail;