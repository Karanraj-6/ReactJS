function Button(){
    const handleClick = (e) => {e.target.textContent = e.target.textContent === "click me" ? "Ouch!" : "click me";}
    return (
        <button className="btn btn-primary" onClick={(e) => handleClick(e)}>click me</button>
    )
}

export default Button;