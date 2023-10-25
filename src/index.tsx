import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Footer } from './components/embedded-layout/footer';
import './assets/scss/styles.scss';
import reportWebVitals from './reportWebVitals';
import router from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
