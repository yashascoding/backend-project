import Mailgen from "mailgen";

const emailVerificationMailgenContent=(username,VerficationUrl)=>{
    return{
        body:{
            name:username,
            intro:"Welcome to our app we are excited to have you in our board",
            action:{
                instruction:"To verify email  please click on the following button",
           
            button:{
                color:"#22BC69",
                text:"VerifyYouremail",
                link:VerficationUrl

            },
        },
        outro:"Need help,just reply we would love to help you"
    },
};
}


const ForgotPasswordMailgenContent=(username,VerficationUrl)=>{
    return{
        body:{
            name:username,
            intro:"We got a request to reset you account password",
            action:{
                instruction:"To reset password click on the following button",
           
            button:{
                color:"#22BC",
                text:"Reset password",
                link:passwordResetUrl,

            },
        },
        outro:"Need help,just reply we would love to help you"
    },
};
};

export{
    ForgotPasswordMailgenContent,
    emailVerificationMailgenContent

}