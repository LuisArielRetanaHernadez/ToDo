

const Err = ({message, code}) => {

    return (  
        <div>
            <h2>{code}</h2>
            <h1>{message}</h1>
        </div>
    )
}

export default Err