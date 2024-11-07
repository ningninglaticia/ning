import { createContext } from "react";

export const AdvisorContext = createContext()

const AdvisorContextProvider = (props) => {

    const value = {

    }

    return (
        <AdvisorContext.Provider value={value}>
            {props.children}
        </AdvisorContext.Provider>
    )
}

export default AdvisorContextProvider