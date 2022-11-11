import React from 'react';

const Question = ({title,info}) => {

    const [showInfo,setShowInfo] = React.useState(false);

  return( 
  <article className="question">
<header>
    <h4>{title}</h4>
    <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "-" : "+"}</button>
</header>
{showInfo && <p>{info}</p>}
  </article>
  )
};

export default Question;