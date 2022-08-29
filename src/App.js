// Importing axios
import axios from 'axios';

// React hooks
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// 'employeesList' actions for dispatching to reducers for our store
import { employeesListActions } from './store/index';

// Components
import Home from './components/Home/Home';
import EmployeesList from './components/EmployeesList/EmployeesList';
import EmployeeDetail from './components/EmployeeDetail/EmployeeDetail';
import EmployeeHierarchy from './components/EmployeeHierarchy/EmployeeHierarchy'

import './App.css';


const App = () => {
	const dispatch = useDispatch();

	const employeesList = useSelector((state) => state.employeesList.employeesListValue);

	useEffect(() => {
        const fetchEmployeesList = async () => {
            try {
                const res = await axios.get('https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees');
                dispatch(employeesListActions.changeEmployeesList(res.data));
            } catch (err) {
                console.log('Oh no! Could not fetch the Employees list!');
                console.log(err);
            }
        };

        fetchEmployeesList();
    }, []);

	return (
		<>
			<Routes>
				<Route path='/' element={ <Home /> } />
				<Route path='/employees' element={ <EmployeesList employeesList={ employeesList } /> } />
				<Route path='/employees/:name' element={ <EmployeeDetail /> } />
				<Route path='/employees/hierarchy' element={ <EmployeeHierarchy /> } />
			</Routes>
		</>
	);
};


export default App;