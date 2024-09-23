//import 라이브러리
import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditForm = () => {
    /*---라우터 관련-------------------------------*/
    const{no} = useParams();
    const navigate = useNavigate(); // useNavigate 훅 사용

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleHp = (event) => {
        setHp(event.target.value);
    }
    const handleCompany = (event) => {
        setCompany(event.target.value);
    }

    //수정버튼 클릭 이벤트
    const handleUpdate = (event) => {
        console.log("수정버튼 클릭");
        event.preventDefault();
        const personVo = {
            name: name,
            hp: hp,
            company: company
        }
        console.log(personVo);

        axios({
            method: 'put', 			// put, post, delete                   
            url: 'http://localhost:9000/api/persons/'+no,

            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            data: personVo,     // put, post,  JSON(자동변환됨)

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data.result); //수신데이타
            if (response.data.result === 'success') {
                navigate("/list");
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    /*---일반 변수--------------------------------*/
    const[name,setName] = useState('');
    const[hp,setHp] = useState('');
    const[company,setCompany] = useState('');
    /*---일반 메소드 -----------------------------*/
   

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    useEffect(() => {
        console.log("마운트 될때만 실행.");
        console.log(no);

        //서버로 id값 보내서 데이터 받은 후 화면에 출력.
        axios({
            method: 'get', 			// put, post, delete                   
            url: 'http://localhost:9000/api/persons/'+no,

        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            if(response.data.result === "success"){
                //성공시 출력
                setName(response.data.apiData.name);
                setHp(response.data.apiData.hp);
                setCompany(response.data.apiData.company);
            }else {
                //실패시 출력
                navigate("/list");
            }
        }).catch(error => {
            console.log(error);
        });
        

    },[]);


    return (
        <>
            <h1>전화번호부</h1>

            <h2>전화번호-수정폼</h2>

            <p>수정할 항목을 입력한 후 수정버튼을 클릭해 주세요</p>

            <form action="" method="" onSubmit = {handleUpdate}>
                <div>
                    <label htmlFor="txt-name">이름(name):</label> 
                    <input id="txt-name" type="text" name="" value={name} placeholder="이름" onChange = {handleName}/>
                </div>
                
                <div>
                    <label htmlFor="txt-hp">핸드폰(hp):</label> 
                    <input id="txt-hp" type="text" name="" value={hp} placeholder="핸드폰" onChange ={handleHp}/>
                </div>
                
                <div>
                    <label htmlFor="txt-company">회사(company):</label> 
                    <input id="txt-company" type="text" name="" value={company} placeholder="회사" onChange = {handleCompany}/>
                </div>
                
                
                <br/>
                <button type="submit">수정(전송)</button>
            </form>

            <br/><br/>
            <Link to="/list">리스트로 가기</Link>
        </>
    );
}
export default EditForm;
