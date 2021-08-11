import {ToastsContainer, ToastsStore} from 'react-toasts';
 
export default function Fetch(){
  render();
    return <div>
        <button onClick={() => ToastsStore.success("Hey, you just clicked!")}>Click me</button>
        <ToastsContainer store={ToastsStore}/>
    </div>

}