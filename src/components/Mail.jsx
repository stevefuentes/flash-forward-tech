import { useStore } from '../helpers/store';

import Window from './Window';

export default function Mail(props) {  
  const store = useStore();

  const sendEmail = function(e){
    e.preventDefault();    
    let formData = new FormData(e.target)
    const formObject = Object.fromEntries(formData.entries());
    
    window.location.href = `mailto:${ props.data.email }?subject=${formObject['subject']}&body=${formObject['body']}`
       
  }
return (
    <>
    { (store.openApps.includes( props.title )) ?
      <Window { ...props }>
        <div className="mail windowContent">
          <p className='text-sm'>{ props.data.text }&nbsp;<a href={`mailto:${ props.data.email }`}>{ props.data.email }</a></p>
          <form id="mail" onSubmit={ sendEmail } className='pt-2'>
            <label htmlFor="subject" className='text-sm'>Subject</label>
            <input id="subject" className="w-full border p-[10px] text-sm bg-white" type="text" name="subject" placeholder="Hi, FFT!"/>
            <label className="text-sm" htmlFor="body">Body</label>
            <textarea className="w-full border min-h-[200px] p-[10px] text-sm bg-white" name="body" id="body" placeholder="Let's work together!"/>
            <button className="border  p-[10px] text-sm bg-white" type="submit">Send Message</button>
          </form>
        </div>
          
      </Window>
    : null }
    </>
  );
}