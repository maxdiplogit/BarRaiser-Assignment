// React Hooks
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Compponents
import App from './App';

// Store
import store from './store/index';

import './index.css';


let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<>
		<HashRouter>
			<Provider store={ store }>
				<PersistGate loading={ null } persistor={ persistor }>
					<App />
				</PersistGate>
			</Provider>
		</HashRouter>
	</>
);