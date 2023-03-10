import React, { useEffect, useState } from "react";
//import PageTitle from "../layouts/PageTitle";
import PageTitle from "../../../layouts/PageTitle";
import { Link } from "react-router-dom";



const Todo = () => {
    const [contents, setContents] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
    
        fetch(`http://localhost:4000/getinernshipmentors`)
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => setContents(data), 200);
            });
    }, [reload]);

    return contents.length == 0 ? (
        <>
            <div id='preloader'>
                <div className='sk-three-bounce'>
                    <div className='sk-child sk-bounce1'></div>
                    <div className='sk-child sk-bounce2'></div>
                    <div className='sk-child sk-bounce3'></div>
                </div>
            </div>
        </>
    ) : (
        // od linije 50 do 54 moj dio, dodan button. Treba napraviti onClick metodu na button i da napravimo da se u njemu otvara dropdown menu s mogućnošću odabira. 
        //TODO: dodati sql naredbu za ispis odabrane stručne prakse za mentora, nije bitan izgled
        <>
            <PageTitle activeMenu='Odabir' motherMenu='Lista' />
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h4 className='card-title'>ISPIS O ODABRANOJ STRUČNOJ PRAKSI ZA MENTORA</h4>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Todo;
