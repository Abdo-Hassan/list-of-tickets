import { FpsView } from 'react-fps';
import './App.css';
import TicketsList from './components/TicketsList';

function App() {
  // generate custom tickets
  const Tickets = new Array(20000).fill(true).map((val, id) => ({
    Subject: `${id}-defect ticket`,
    Priority: 'High',
    status: 'active',
    Description: 'Lorem ipsum dolor sit amet consectetur',
  }));

  return (
    <div className='App'>
      {/* this is fps meter to checkout that there is no any performance issues */}
      <FpsView />
      <h1 className='main-title'>
        Customer Tickets: ({Tickets.length}) Ticket
      </h1>
      {/* list of tickets */}
      <TicketsList rows={Tickets} />
    </div>
  );
}

export default App;
