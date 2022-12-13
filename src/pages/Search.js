import React, {useEffect, useState} from "react";
import SideBarMenu from "../elements/SideBarMenu";

function Search(){
    const [query, setQuery] = useState('')
    const [startList, setstartList] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/goods`)
            .then(async (response) => {
                setstartList(await response.json())
            }).catch(() => {
            return {resultCount: 0, results: []}
        })
    }, [])

    const filterGoods = () => {
        return startList.filter((good) => good.type.toLowerCase().includes(query.toLowerCase()))
    }
    return(
        <div>
            <SideBarMenu/>
            <div className={'navigate'}>
                <a href={`././`} >Начало/</a>
                <a href={`./command`} >Список команд/</a>
                <a href={`./search`} >Поиск</a>
            </div>
            <form>
                <input type="text" name="text" className=" search" placeholder="Search here!" value={query} onChange={event => setQuery(event.target.value)}/>
                <input type="submit" name="submit" className="submit" value="Search"/>
            </form>

            <div className={'list-product'}>
                {filterGoods().map((good, index) =>
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

    )
}
export default Search

