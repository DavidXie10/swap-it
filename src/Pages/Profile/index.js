
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../../Components/AlertMessage';
import Button from '../../Components/Button';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Spinner from '../../Components/Spinner';
import { updateUser } from '../../Slices/user/requests/updateUser';

export default function Profile() {
    const userState = useSelector(
        (state) => state.user
    );

    const [user, setUser] = useState({
        fullName: userState.user.fullName,
        email: userState.user.email,
        phoneNumber: userState.user.phoneNumber,
        location: userState.user.location,
        photoUrl: userState.user.photoUrl
    });

    const [photo, setPhoto] = useState(null);
    const anonymousProfilePhoto = 'https://ci0137.s3.amazonaws.com/swap-it/uploads/anonymous_profile_photo.png';
    const handleChange = (key, value) => {
        setUser({
            ...user,
            [key]: value,
        });
    };

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState(userState.errorMessage);
    const [success, setSuccess] = useState(userState.isUpdated);
    const loading = useSelector( (state) => state.app.loading ); 
    const [fullNameErrorMessage, setFullNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

    const isValidForm = () => {
        let isValid = true;
        if(user.fullName === '') {
            isValid = false;
            setFullNameErrorMessage('Por favor ingrese su nombre');
        } else {
            setFullNameErrorMessage('');
        }
        if(user.email === '') {
            isValid = false;
            setEmailErrorMessage('Por favor ingrese su correo');
        } else {
            setEmailErrorMessage('');
        }
        if(user.phoneNumber === '') {
            isValid = false;
            setPhoneNumberErrorMessage('Por favor ingrese su número de teléfono');
        } else {
            setPhoneNumberErrorMessage('');
        }
        
        return isValid;
    }

    return (
        loading ? (<Spinner />) : (
            <div className='flex min-h-screen flex-col justify-between'>
                <Header/>
                {errorMessage ? <AlertMessage success={false} message={errorMessage} buttonType='close' onClick={() => setErrorMessage('')}/> : <></>}
                {success ?  <AlertMessage success={true} message='Perfil actualizado exitosamente' buttonType='close' onClick={() => setSuccess(false)}/>:<></>}  
                <div className='p-8 w-full sm:px-6 md:px-8 lg:px-16'>
                    <div className='flex mb-6 items-center'>
                        <div className='flex grow mr-10 lg:max-h-[14rem] lg:max-w-[14rem] md:max-h-[14rem] md:max-w-[14rem] sm:max-h-[12rem] sm:max-w-[12rem]'>
                            <img id='photoUrl' className='border rounded-full h-full w-full' src={photo?URL.createObjectURL(photo):user.photoUrl?user.photoUrl:anonymousProfilePhoto} alt='Foto de perfil'/>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="photo" className='w-fit h-8 text-left font-bold underline cursor-pointer'> 
                                Actualizar foto
                            </label>
                            <input
                                id="photo"
                                name="photo"
                                hidden
                                multiple={false}
                                type="file"
                                onChange={(evt) => {
                                setPhoto(evt.target.files[0]);
                                }} 
                            />
                        </div>
                    </div>
                    <div className='w-full lg:flex md:flex lg:my-5 md:my-5 sm:mt-5'>
                        <div className='w-full lg:mr-20 md:mr-20 sm:mb-5'>
                            <Label text='Nombre completo' width='w-full' size='text-lg'/>
                            <Input id='fullName' placeholder='Ingrese su nombre' value={user.fullName} marginBottom='mb-0' onChange={(evt) => {handleChange('fullName', evt.target.value)}}/>
                            {fullNameErrorMessage && <p className="text-red-500 font-bold mt-2">{fullNameErrorMessage}</p>}
                        </div>
                        <div className='w-full sm:mb-5'>
                            <Label text='Provincia' width='w-full' textalign='text-left' size='text-lg'/>
                            <select 
                                id='location' 
                                value={user.location}
                                className='w-full h-10 px-4 rounded-md focus:outline-none text-lg font-semibold border border-solid border-gray-600 appearance-none' 
                                onChange={(evt) => {
                                    handleChange('location', evt.target.value);
                                }}
                            >
                                <option disabled  label="Seleccione su provincia de residencia" value={-1} />
                                <option label='San José' value={1} />
                                <option label='Alajuela' value={2} />
                                <option label='Cartago' value={3} />
                                <option label='Heredia' value={4} />
                                <option label='Guancaste' value={5} />
                                <option label='Puntarenas' value={6} />
                                <option label='Limón' value={7} />
                            </select>
                        </div>
                    </div>
                    <div className='w-full lg:flex md:flex'>
                        <div className='w-full lg:mr-20 md:mr-20 sm:mb-5'>
                            <Label text='Correo' width='w-full' size='text-lg'/>
                            <Input id='email' type='email' placeholder='Ingrese su correo electrónico' value={user.email} marginBottom='mb-0' onChange={(evt) => {handleChange('email', evt.target.value)}}/>
                            {emailErrorMessage && <p className="text-red-500 font-bold mt-2">{emailErrorMessage}</p>}
                        </div>
                        <div className='w-full sm:mb-5'>
                            <Label text='Teléfono' width='w-full' size='text-lg'/>
                            <Input placeholder='Ingrese su número de teléfono' value={user.phoneNumber} marginBottom='mb-0' onChange={(evt) => {handleChange('phoneNumber', evt.target.value)}}/>
                            {phoneNumberErrorMessage && <p className="text-red-500 font-bold mt-2">{phoneNumberErrorMessage}</p>}
                        </div>
                    </div>
                    
                    <div className='text-right mt-5 w-full'>
                        <Button label='Guardar' textcolor='text-white' width='lg:w-fit md:w-fit sm:w-full' height='h-12' textSize='text-xl' onClick={()=>{
                            if(isValidForm()) {
                                dispatch(updateUser({user, photo}));
                            }
                        }}/>
                    </div>
                    
                </div>
                <Footer/>
            </div>  
        )  
    )
}