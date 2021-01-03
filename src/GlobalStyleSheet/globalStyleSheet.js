import { createGlobalStyle } from 'styled-components';

/**------ Colors ------*/
const PRIMARY_PURPLE = '#5673E8',
	FADED_PURPLE = '#d6dcf9';
const PRIMARY_DARK = '#343a40',
	FADED_DARK = '#eccecf';
const SECONDARY_DARK = '#74788d',
	FADED_SECONDARY_DARK = '#dcdde2';
const GREEN = '34c38f',
	FADED_GREEN = '#ccf0e8';
const BLUE = '#50a5f1',
	FADED_BLUE = '#d3e8fb';
const YELLOW = 'f1b44c',
	FADED_YELLOW = '#Fbecd2';
const RED = '#f46a6a',
	FADED_RED = '#fcdada';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
    background-color: #f5f6f8;
    color: #464648;
    font-size: 16px;
    text-rendering: optimizeLegibility;
  }

  /* Hide scrollbar */
  ::-webkit-scrollbar{
    width: 0px;
    background: transparent;
  }

  /*------------ Reused Styles ---------------*/

  h1,h2,h3,h4,h5{
    font-family: 'Poppins', sans-serif;
  }

  p,a,button{
    font-family: 'PT Serif', serif;
    font-size:100%;
  }

  input{
    padding: 5px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #000;
  }
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none !important;
  }

  button{
    padding:5px;
  }

  .button-primary{
    background-color:${PRIMARY_PURPLE};
    color:#fff;
    border: 1px solid ${PRIMARY_PURPLE};
    outline: none;
    cursor:pointer;
    padding:5px 10px;
    transition: all ease 0.2s;
  }
  .button-primary:hover{
    color:${PRIMARY_PURPLE};
    background-color:${FADED_PURPLE};
    border: 1px solid ${FADED_PURPLE};
  }

  .cards{
    padding:10px;
    border-radius: 4px;
    background-color:#fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.19);
  }

  .mainHeader{
    position:absolute;
    top:0;
    right:0;
    width:85vw;
  }

  .navigationText{
    font-family: 'Poppins', sans-serif;
    color:${SECONDARY_DARK};
  }
  
  .navLinks{
    padding:5px;
    padding-left:20px;
    cursor:pointer;
    transition: all 0.2s ease;
  }

  .navLinks:hover{
    background-color:${FADED_PURPLE};
  }

  .activeNavLink{
    background-color:${FADED_PURPLE};
  }
  


`;

export default GlobalStyle;
