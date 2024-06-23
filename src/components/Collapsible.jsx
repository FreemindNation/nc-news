import { useState } from "react";

const Collapsible = ({ children, contentDescriptor, commentCount })=> {

    const [isHidden, setIsHidden] = useState(false);

    const toggleIsHidden = ()=> {
        setIsHidden(!isHidden);
    }

    return (
        <section>
            <button onClick={toggleIsHidden}>
                {isHidden ? 'hide' : 'Show'} {contentDescriptor} ({commentCount})
            </button>
            {isHidden ? children : null}
        </section>
    );


};



export default Collapsible;