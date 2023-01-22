import styled from "styled-components";
import { motion } from "framer-motion";
import { Link,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// useParams is used to pull keyword from url

function Cuisine() {


    // we are going to store the recipes in state
    const [cuisine,setCuisine] = useState([]);

    const [classGrid,setClassGrid] = useState('');
    // get the param type from url using useParams, to know which cuisine is selected.
    let params = useParams();

    //we have to invoke the getCuisine function on component mount and when cuisine changes . hence useEffect
    useEffect(()=>{
        getCuisine(params.type);
    },[params.type]);

    const getCuisine = async(name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&cuisine=${name}`)
        const recipes = await data.json();
        setCuisine(recipes.results);
        setClassGrid(name);
    }


  return (
    <Grid
        className={classGrid}
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition = {{duration:0.5}}>
        {cuisine.map((item) => {
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>

                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
}


//while adding motion , we have to change the <Grid> but instead of changing it in jsx, change in styles as follows
const Grid= styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem,1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`;

const MotionComponent = motion(Grid);
motion(Grid, { forwardMotionProps: true })
export default Cuisine;