import React, { useEffect, useState } from "react";
//import PageTitle from "../layouts/PageTitle";
import PageTitle from "../../../layouts/PageTitle";
import { Link } from "react-router-dom";



const Todo = () => {
    const [contents, setContents] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
    
        fetch(`http://localhost:4000/getinternships`)
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
        <>
            <PageTitle activeMenu='Prakse' motherMenu='Lista' />
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h4 className='card-title'>PODATCI O STRUČNOJ PRAKSI</h4>
                    
                    <Link 
                    
                    //  ovdje se nalazi add button, TODO: onClick metoda na njega i neki izbornik. 
                            to="#"
                            className='btn btn-primary shadow btn-xs sharp mr-2'
                            onClick={() => (true)}>
                            <i className='fa fa-plus'></i>
                    </Link>
                    </div>
                    <div className='card-body'>
                        <div className='w-100 table-responsive'>
                            
                            <div
                                id='example_wrapper'
                                className='dataTables_wrapper'>
                                <table
                                    id='example'
                                    className='display w-100 dataTable'>
                                    <thead>
                                        <tr>
                                            <th>Naziv</th>
                                            <th>Opis</th>
                                            <th>Početni plan</th>
                                            <th>Kriteriji</th>
                                            <th>Tip</th>
                                            <th>Mentor</th>
                                            <th>Aktivan</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                    {contents.map((content) => (
                                            <tr>
                                                <td>
                                                    {
                                                        content.Name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        content.Description
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        content.InitialPlan
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        content.Criteria
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        content.InternshipType
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        content.InternshipId
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        content.IsActive
                                                    }
                                                </td>
                                                <Link
                                                    to={`mentor/${content.ProfessorID}`}>
                                                    <td>
                                                        {
                                                            content.FirstName
                                                        }
                                                    </td>
                                                </Link>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Todo;
