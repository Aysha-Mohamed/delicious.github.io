import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiIndianPalace,GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


function Category() {
  return (
    <List>
        <SLink to={'/cuisine/Italian'}>
            <FaPizzaSlice />
            <h4>Italian</h4>
        </SLink>
        <SLink to={'/cuisine/American'}>
            <FaHamburger />
            <h4>American</h4>
        </SLink>
        <SLink to={'/cuisine/Indian'}>
            <GiIndianPalace />
            <h4>Indian</h4>
        </SLink>
        <SLink to={'/cuisine/Japanese'}>
            <GiChopsticks />
            <h4>Japanese</h4>
        </SLink>
    </List>
  )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`;

//to style NavLink, which is a react Component, You have to do like below

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 2rem;
    background: rgb(84,9,121);
    background: linear-gradient(90deg, rgba(84,9,121,1) 21%, rgba(78,9,121,1) 100%, rgba(0,212,255,1) 100%);
    width: 6rem;
    height: 6rem;
    transform: scale(0.8);

    h4{
        color: white;
        font-size: 0.8rem;

    }
    svg{
        color: white;
        font-size:1.5rem;
    }
    // style the link when it is clicked by addressing active
    &.active{
        background: rgb(56,9,121);
        background: linear-gradient(90deg, rgba(56,9,121,1) 0%, rgba(0,212,255,1) 0%, rgba(5,136,178,1) 100%, rgba(9,79,121,1) 100%);
        
    }
    `;

export default Category