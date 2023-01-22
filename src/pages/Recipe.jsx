import { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {

    let params = useParams();

    console.log("params",params);

    const [details,setDetails] = useState({});
    //for button functionality
    const [activeTab,setActiveTab] = useState('instructions');

    useEffect(()=>{
        fetchDetails();
    },[params.name]);

    const fetchDetails = async() =>{
        //refer https://spoonacular.com/food-api/docs#Get-Recipe-Information for this fetch url
        const data= await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);


    }
  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.title} />
        </div>
        <Info>
            <Button className={`instructions ${ activeTab === 'instructions' ? 'active' : ''}`} onClick={()=> setActiveTab('instructions')}>
                Instructions
            </Button>
            <Button className={`ingredients ${activeTab === 'ingredients' ? 'active' : ''}`} onClick={()=> setActiveTab('ingredients')}>
                Ingredients
            </Button>
            {activeTab === 'instructions' && (
                <div>
                <h3 dangerouslySetInnerHTML={{__html:details.summary}}></h3>
                <h3 dangerouslySetInnerHTML={{__html:details.instructions}}></h3>
            </div>
            )}
            {activeTab === 'ingredients' && (
                <ul>
                {details.extendedIngredients.map((ingredient,index) =>{
                    return(
                        <li key={index}>{ingredient.original}</li>
                    )
                })}
            </ul>
            )}
            
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: rgb(84,9,121);
        background: linear-gradient(90deg, rgba(84,9,121,1) 21%, rgba(78,9,121,1) 100%, rgba(0,212,255,1) 100%);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li,h3{
        font-size: 1rem;
        line-height: 1.5rem;
    }
    ul{
        margin-top: 2rem;
        margin-top: 2rem;
    list-style: disc;
    padding-left: 1rem;
    }
    .instructions{
        margin-right:1rem;
    }
    @media(max-width:992px){
        flex-direction: column;
        margin-top: 3rem;
        img{
            width: 100%;
            margin-bottom: 1rem;
        }
    }

`;


const Button = styled.button`
    padding: 1rem 2rem;
    color: #540979;
    background: white;
    border: 2px solid #540979;
    font-weight: 600;
    cursor: pointer;
    
`;

const Info = styled.div`
    margin-left: 1rem;
    @media(max-width: 992px){
        margin-left: 0;
    }
`;
export default Recipe;