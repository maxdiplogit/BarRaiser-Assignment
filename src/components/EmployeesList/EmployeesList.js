// React Hooks
import { useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// Components
import { Link } from 'react-router-dom';

// Styles
import classes from './EmployeesList.module.css';


const EmployeesList = (props) => {
    const inputRef = useRef();

    const permanentList = props.employeesList;
    const [ temp, setTemp ] = useState(props.employeesList);

    const searchBarChangeHandler = (event) => {
        let result = permanentList.filter((employee) => employee.first_name.toLowerCase().includes(event.target.value) || employee.last_name.toLowerCase().includes(event.target.value));
        setTemp(result);
    };

    const filterChangeHandler = (event) => {
        if (event.target.value === 'x') {
            let result = permanentList.filter((employee) => employee.salary.split(',').join('') >= 100000);
            setTemp(result);
        } else if (event.target.value === 'y') {
            let result = permanentList.filter((employee) => employee.salary.split(',').join('') < 100000);
            setTemp(result);
        } else {
            setTemp(permanentList);
        }
    }


    return (
        <div className={ classes.list }>
            <h2>Employees List</h2>
            <div className={ classes.content }>
                <div className={ classes.actions }>
                    <div>
                        <label htmlFor="search" className={ classes.search }>Search by First or Last Name</label>
                        <input id="search" ref={ inputRef } class="form-control" type="search" placeholder="Enter" onChange={ searchBarChangeHandler }></input>
                    </div>
                    <div>
                        <i className={ classes.filters }>Filters: </i><br></br>
                        <select onChange={ filterChangeHandler } class="form-select">
                            <option value="none" selected disabled hidden>Select an Option</option>
                            <option value="x">Salary { '>=' } 100000</option>
                            <option value="y">Salary { '<' } 100000</option>
                            <option value="z">No Filters</option>
                        </select>
                    </div>
                </div>
                <TableContainer component={ Paper }>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>ID</TableCell>
                                <TableCell align='center'>First Name</TableCell>
                                <TableCell align='center'>Last Name</TableCell>
                                <TableCell align='center'>Date of Birth</TableCell>
                                <TableCell align='center'>Address</TableCell>
                                <TableCell align='center'>Date of Joining</TableCell>
                                <TableCell align='center'>Salary</TableCell>
                                <TableCell align='center'>Designation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { temp.map((employee) => (
                                <TableRow key={ employee.id }>
                                    <TableCell align='center'><Link to={ `/employees/${ employee.first_name }` }>{ employee.id }</Link></TableCell>
                                    <TableCell align='center'>{ employee.first_name }</TableCell>
                                    <TableCell align='center'>{ employee.last_name }</TableCell>
                                    <TableCell align='center'>{ employee.date_of_birth }</TableCell>
                                    <TableCell align='center'>{ employee.address }</TableCell>
                                    <TableCell align='center'>{ employee.date_of_joining }</TableCell>
                                    <TableCell align='center'>{ employee.salary }</TableCell>
                                    <TableCell align='center'>{ employee.designation }</TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};


export default EmployeesList;