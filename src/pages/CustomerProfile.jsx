import billIcon from '/bill_icon.jpg'; 
import personalInfoicon from '/personal_info_icon.avif'; 
import { CustomerNavBar } from '../components/navbar/CustomerNavBar';
import { MenuCard } from '../components/cards/MenuCard';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useEffect, useState } from 'react';

export const CustomerProfile = () => {
    const navigate = useNavigate();
  return (
    <>
        <CustomerNavBar/>
        <div  className="container mt-5">
        <div className="d-flex flex-row-reverse">
                <button
                  className="btn"
                  style={{backgroundColor:"#3aacb0", color:"white"}}
                  onClick={() => navigate('/')}
                >
                  Inicio
                </button>
              </div>
            <h2 className='mb-5 display-5' style={{marginLeft:"450px"}}>Opciones de usuario</h2>
            <div className='row' >
                    <div className='col'>
                        <MenuCard title={'1.Gestionar informacion personal'} link={'/customer/profile/edit_info'} fondo={personalInfoicon}/>
                    </div>
                    <div className='col'>
                        <MenuCard title={'2.Gestionar pedidos'} link={'/customer/profile/bill_management'} fondo={billIcon}/>
                    </div>
                </div>
        </div>
    </>
  )
}