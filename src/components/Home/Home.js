// React Hooks
import { Link } from 'react-router-dom';

// Styles
import classes from './Home.module.css';

const Home = () => {
    return (
        <div className={ classes.home }>
            <h1>BarRaiser Assignment</h1>
            <h6>[This is the first time that I am using Material-UI (MUI)]</h6>
            <nav className={ classes.nav }>
                <b className={ classes.links }>Links: </b>
                <Link to='/employees' className={ classes.link }>Employees</Link>
                <Link to='/employees/hierarchy' className={ classes.link }>Hierarchy</Link>
            </nav>
        </div>
    );
};


export default Home;