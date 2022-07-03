import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Mixpanel from '../../services/mixpanel';
import { logout } from '../../Slices/user/userSlice';	

export default function UserMenu(){
    const dispatch = useDispatch();	

    return (
        <div className='bg-white fixed right-20 top-16 h-auto w-[200px] rounded shadow py-2 divide-y divide-gray-100'>
            <div className='py-2 pl-4 hover:bg-gray-100'>
                <p className='text-[#2E2F2F] cursor-pointer'>
                    <Link onClick={() => {Mixpanel.track(Mixpanel.TYPES.GO_TO_PROFILE)}} to='/profile'>Mi Perfil</Link>
                </p>
            </div>
            <div className='py-2 pl-4 hover:bg-gray-100'>
                <p className='text-[#2E2F2F] cursor-pointer' onClick={() => {
                                Mixpanel.track(Mixpanel.TYPES.CLOSE_SESSION);
                                dispatch(logout());
                                }}>
                    Cerrar Sesión
                </p>
            </div>
        </div>
    
    )
}