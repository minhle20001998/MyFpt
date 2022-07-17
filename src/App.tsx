import './App.css';
import { useUser } from './context/AuthContext';
import { useRoutes } from 'react-router';
import routes from './routes/routes';

/*
#####################################################################
#                                _oo0oo_							
#                               088888880							
#                               88" . "88							
#                               (| - - |)							
#                                0\ = /0							
#                             ___/'---'\___							
#                           .' \\|     |// '. 						
#                          / \\|||  :  |||// \\						
#                         /_ ||||| -:- |||||- \\					
#                        |   | \\\  -  /// |   |					
#                        | \_|  ''\---/''  |_/ |					
#                        \  .-\__  '-'  __/-.  /					
#                      ___'. .'  /--.--\  '. .'___					
#                   ."" '<  '.___\_<|>_/___.' >'  "". 				
#                  | | : '-  \'.;'\ _ /';.'/ - ' : | |				
#                  \  \ '_.   \_ __\ /__ _/   .-' /  /				
#           =========='-.____'.___ \_____/___.-'____.-'==========
#       	                    '=---='								
#            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/

function App() {
  const { user } = useUser();

  const content = useRoutes(routes({ user }));

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
