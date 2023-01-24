import { getActiveUser, getUser } from "../../base/05-functions";

import  "@testing-library/jest-dom/extend-expect"



describe(`Tests in ${__filename} file`, () => {
    const objTest1 = {
        uid      : "123ABC123",
        username : "thom_maurick"
    }
    const objTest2 = {
        uid      : "123ABC123",
        username : "carlos"
    }
    test(`Must return ${JSON.stringify(objTest1)} without params`, () => {
        
        const receive = getUser()
        expect(receive).toEqual(objTest1)
    });
    
    test(`Must return ${JSON.stringify(objTest2)} with param carlos`, () => { 
        const receive = getActiveUser("carlos")
        expect(receive).toEqual(objTest2)
    });
    
});
