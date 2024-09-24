//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';

const ItemPerson = (props) => {

    const {person , handleDel} = props;

    return (
        <>
                    <table border="1" >
                        <tbody>
                            <tr>
                                <th>이름(name)</th>
                                <td>{person.name}</td>
                            </tr>
                            <tr>
                                <th>핸드폰(hp)</th>
                                <td>{person.hp}</td>
                            </tr>
                            <tr>
                                <th>회사(company)</th>
                                <td>{person.company}</td>
                            </tr>
                            <tr>
                                <td><Link to={`/editform/${person.personId}`} rel="noreferrer noopener">[수정폼으로 이동]</Link></td>
                                <td><button type="button" onClick = {() => {return handleDel(person.personId)}}>삭제</button></td>
                            </tr>

                        </tbody>
                    </table>
                    <br/>
        </>
    );
        
}
export default ItemPerson;