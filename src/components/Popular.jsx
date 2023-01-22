import { Splide,SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';

//to navigate to the recipe detail page on clicking the recipe, we use Link

import { Link } from "react-router-dom";

function Popular() {

    // we are going to use useState, so that when the popular data changes, the UI will get updated.

    const [popular,setPopular] = useState([]);
    
  

    //useEffect is used to retrieve the api data on component mount. In the second array parameter, we can specify the element on whic
    //use effect should be executed. here we have to execute on mount of component, so empty array is given.
    useEffect(()=>{
        getPopular();
    },[])

    // create a getPopular function to fetch the popular recipes from API.
    const getPopular = async () =>{

        //check localStorage if popular is already stored. If yes, then get data from localStorage.
        //If else, hit the api.

        const check = localStorage.getItem('popular');

        //JSON.parse is done, because in local storage only strings can be stored. So it is parsed.
        if(check){
            setPopular(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();
            // we are going to set the state for popular.
            //JSON.stringify is done, because in local storage only strings can be stored. So response is converted to string.
            localStorage.setItem('popular',JSON.stringify(data.recipes));
            setPopular(data.recipes);
        }
        
    }
  return (
    // we are going to create a list of popular items by using map function.
    //-	While using map function, you will get a “unique key” error. So you have to give a unique key when using map to display list items. 
    //Here in this api response we will get a unique id, which we can assign it to the parent div.

    
    
    <div>
        <Wrapper>
        <h3>Popular Picks</h3>
        <Splide options={{
            perPage:4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
            breakpoints:{
                992:{
                    perPage:2,
                    gap:'3rem'
                }
            }
        }}>
        {popular.map((recipe) =>{
            return(
               
                    <SplideSlide key={recipe.id}>
                        <Card>
                            <Link to={'/recipe/'+recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title}/>
                                <Gradient />
                            </Link>
                        </Card>
                    </SplideSlide>
                
            )
        })}
        </Splide>
        </Wrapper>
    </div>



  )


  

}
const Wrapper = styled.div`
margin: 4rem 0rem;`;

const Card = styled.div`
min-height:15rem;
border-radius:2rem;
overflow:hidden;
position: relative;

img{
    border-radius: 2rem;
    width: 100%;
    position:absolute;
    object-fit:cover;
    height: 100%;
    left:0;
}
p{
    position:absolute;
    left: 50%;
    bottom:0;
    z-index: 10;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
@media(max-width: 767px){
    min-height:10rem;
    p{
        font-size: 0.6rem;
    }
}
`;

const Gradient = styled.div`
    width: 100%;
    height: 100%;
    z-index:3;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
    position:absolute;
    
`
export default Popular