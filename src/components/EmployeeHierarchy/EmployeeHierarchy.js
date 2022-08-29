// React Hooks
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Accordion } from '@material-ui/core';

// Components
import TreeData from './Tree/Tree';

// Styles
import classes from './EmployeeHierarchy.module.css';


const getHierarchy = (employeeID, object) => {
    const x = object[employeeID];
    if (!x) {
        const result = {
            id: employeeID,
            children: []
        };
        return result;
    }
    const temp = [
        {
            id: employeeID,
            children: []
        }
    ];
    for (let i = 0; i < x.length; i++) {
        let y = getHierarchy(x[i], object);
        temp[0].children.push(y);
    }
    return temp;
}


const EmployeeHierarchy = () => {
    const employeesList = useSelector((state) => state.employeesList.employeesListValue);

    let tempManagersList = [];
    for (let i = 0; i < employeesList.length; i++) {
        tempManagersList.push({ managerID: employeesList[i].id, employeesIDList: [] });
    }

    for (let i = 0; i < tempManagersList.length; i++) {
        let managerID = tempManagersList[i].managerID;
        for (let j = 0; j < tempManagersList.length; j++) {
            if (managerID == employeesList[j].manager_id && j !== i) {
                tempManagersList[i].employeesIDList.push(employeesList[j]);
            }
        }
    }

    let managersList = tempManagersList.filter((managerDetails) => managerDetails.employeesIDList.length !== 0);

    let object = {};

    for (let i = 0; i < managersList.length; i++) {
        for (let j = 0; j < managersList[i].employeesIDList.length; j++) {
            if (!object[managersList[i].managerID]) {
                object[managersList[i].managerID] = [ managersList[i].employeesIDList[j].id ];
            } else {
                object[managersList[i].managerID].push(managersList[i].employeesIDList[j].id);
            }
        }
    }

    const tempTreeData = getHierarchy('EMP001', object);
    console.log(tempTreeData);
    

    return (
        <>
            <h2>Employees Hierarchy</h2>
            <TreeData data={ tempTreeData } />
        </>
    );
};


export default EmployeeHierarchy;