//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )-----*/
    const [personList, setPersonList] = useState([]);
    
    
    /*---일반변수-----------------------------------*/
    
    /*---일반 메소드 -------------------------------*/
    const getPersonList = ()=>{
        axios({
            method: 'get', 			// put, post, delete                   
            url: 'http://localhost:9000/api/persons',

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타
            //personList = response.data;
            setPersonList(response.data);

        }).catch(error => {
            console.log(error);
        });

    };


    /*---생명주기 + 이벤트 관련 메소드(handle메소드)--*/
    //마운트 되었을때
    useEffect(() => {
        console.log("마운트 됐어요");

        //서버에서데이터 가져오기 그리기
        getPersonList();

    }, []);

    //삭제버튼 클릭했을대
    const handleDel = (no)=>{
        console.log('삭제버튼 클릭');
        console.log(no);
        axios({
            method: 'delete', 			// put, post, delete                   
            url: 'http://localhost:9000/api/persons/'+no,
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log("==================================");
            console.log(response); //수신데이타
            console.log(response.data);
            console.log("==================================");

            

            getPersonList();

            

        }).catch(error => {
            console.log(error);
        });
        
    };


    return (
        <>
            <h1>전화번호부</h1>

            <h2>전화번호-리스트</h2>

            <p>등록된 전화번호 리스트 입니다.</p>

            {personList.map((personVo)=>{
                return (
                    <div key={personVo.personId}>
                        <table border="1">
                        <tbody>
                            <tr>
                                <th>이름(name)</th>
                                <td>{personVo.name}</td>
                            </tr>
                            <tr>
                                <th>핸드폰(hp)</th>
                                <td>{personVo.hp}</td>
                            </tr>
                            <tr>
                                <th>회사(company)</th>
                                <td>{personVo.company}</td>
                            </tr>
                            <tr>
                                <td><Link to={'/editform/' + personVo.personId} rel="noreferrer noopener">[수정폼으로 이동]</Link></td>
                                <td><button type="button" onClick={()=>{ handleDel(personVo.personId) }}>삭제</button></td>
                            </tr>

                        </tbody>
                    </table>
                    <br/>

                    </div>
                )

            })}


            <br />
            <Link to="/writeform" rel="noreferrer noopener">등록폼으로 이동</Link>

        </>
    );
}

export default List;