import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import SideBarMenu from "../elements/SideBarMenu";


function GetUser() {
    const [tocken, setTocken] = useState(false)
    const [User, setUser] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/admin/user`, {
            headers: {
                "Authorization": tocken
            }
        })
            .then(async (response) => {
                setUser(await response.json())
            }).catch(() => {
            return {resultCount: 0, results: []}
        })
    }, [])



    return (
        <div>
            <SideBarMenu/>
            <div className={'navigate'}>
                <a href={`../../`}>Начало/</a>
                <a href={`../../commands`}>Список команд</a>
            </div>
            <h3>получить информацию</h3>
            <div className={'list-product'}>
                {User.map((good, index) =>
                    (
                        <div>
                            <li key={index} className={'product-wrapper'}>
                                <a href={`/goods/getbyid/${good.Id_good}`}>Product: {good.type}</a>
                                <br/>
                                <br/>
                                <a>Company: {good.company}</a>
                            </li>

                        </div>
                    ))}
            </div>

        </div>
    );
}

export default GetUser;
