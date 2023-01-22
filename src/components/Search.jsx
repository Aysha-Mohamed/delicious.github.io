import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

//useNavigate is used to navigate to other pages.
import { useNavigate } from "react-router-dom";

function Search() {

    const [searchText,setSearchText] = useState('');
    const navigate = useNavigate();

    const searchRecipeHandler = (event) => {
        setSearchText(event.target.value);
        
    }

    //to handle submit,

    const submitHandler = (event) =>{
        event.preventDefault();
        navigate("/searched/"+searchText);
    }

  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
            <FaSearch></FaSearch>
            <input type="text" value={searchText} onChange={searchRecipeHandler}/>
        </div>    
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0rem 17rem;
    div{
        width: 100%;
        position: relative;
    }
    input{
        border: none;
        background: rgb(84,9,121);
        background: linear-gradient(90deg, rgba(84,9,121,1) 21%, rgba(78,9,121,1) 100%, rgba(0,212,255,1) 100%);
        font-size: 1.5rem;
        color: white;
        border-radius: 1rem;
        outline: none;
        width: 100%;
        padding: 1rem 3rem;
        
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%,-50%);
        color: white;
    }
    @media(max-width: 767px){
        margin: 0;
    }
    @media(min-width: 768px) and (max-width: 992px){
        margin: 0rem 10rem;
    }
`;
export default Search