import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from '../selectores.js';
import {createUpdateObjCita, validarAgregarCita, createDataBase_IndexDB} from '../funciones.js';
class App{
    constructor(){
        this.initApp();
    }
    initApp(){
        mascotaInput.addEventListener('change', createUpdateObjCita);
        propietarioInput.addEventListener('change', createUpdateObjCita);
        telefonoInput.addEventListener('change', createUpdateObjCita);
        fechaInput.addEventListener('change', createUpdateObjCita);
        horaInput.addEventListener('change', createUpdateObjCita);
        sintomasInput.addEventListener('change', createUpdateObjCita);
        formulario.addEventListener('submit', validarAgregarCita);
        createDataBase_IndexDB();
    }
}
export default App;